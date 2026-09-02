package app

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"mime"
	"net/http"
	"strings"
	"sync"
	"unicode"

	"github.com/tuoro/kdae-panel/internal/configstore"
	"github.com/tuoro/kdae-panel/internal/managedsubscription"
)

type configContentRequest struct {
	Content              string                            `json:"content"`
	ExpectedHash         string                            `json:"expectedHash"`
	Apply                *bool                             `json:"apply,omitempty"`
	ManagedSubscriptions *[]managedsubscription.Definition `json:"managedSubscriptions,omitempty"`
}

type restoreBackupRequest struct {
	ExpectedHash string `json:"expectedHash"`
	Apply        *bool  `json:"apply,omitempty"`
}

type backupMetadataRequest struct {
	Name string `json:"name"`
	Note string `json:"note,omitempty"`
}

type sectionVersionRequest struct {
	Kind    configstore.SectionKind `json:"kind,omitempty"`
	Name    string                  `json:"name"`
	Content string                  `json:"content"`
}

func registerConfigurationRoutes(router *http.ServeMux, service ConfigurationService, managed ManagedSubscriptionService, operations *sync.Mutex) {
	if service == nil {
		unavailable := func(writer http.ResponseWriter, _ *http.Request) {
			writeAPIError(writer, http.StatusServiceUnavailable, "configuration_unavailable", "配置管理服务尚未初始化")
		}
		router.HandleFunc("GET /api/v1/config", unavailable)
		router.HandleFunc("PUT /api/v1/config", unavailable)
		router.HandleFunc("POST /api/v1/config/validate", unavailable)
		router.HandleFunc("GET /api/v1/config/section-versions", unavailable)
		router.HandleFunc("POST /api/v1/config/section-versions", unavailable)
		router.HandleFunc("PUT /api/v1/config/section-versions/{id}", unavailable)
		router.HandleFunc("DELETE /api/v1/config/section-versions/{id}", unavailable)
		router.HandleFunc("GET /api/v1/config/backups", unavailable)
		router.HandleFunc("POST /api/v1/config/backups", unavailable)
		router.HandleFunc("POST /api/v1/config/backups/import", unavailable)
		router.HandleFunc("PUT /api/v1/config/backups/{id}", unavailable)
		router.HandleFunc("DELETE /api/v1/config/backups/{id}", unavailable)
		router.HandleFunc("GET /api/v1/config/backups/{id}/export", unavailable)
		router.HandleFunc("GET /api/v1/config/backups/{id}/preview", unavailable)
		router.HandleFunc("POST /api/v1/config/backups/{id}/restore", unavailable)
		return
	}

	router.HandleFunc("GET /api/v1/config", func(writer http.ResponseWriter, request *http.Request) {
		document, err := service.Read(request.Context())
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, document)
	})
	router.HandleFunc("POST /api/v1/config/validate", func(writer http.ResponseWriter, request *http.Request) {
		var payload configContentRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		if err := service.Validate(request.Context(), payload.Content); err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, map[string]bool{"valid": true})
	})
	router.HandleFunc("PUT /api/v1/config", func(writer http.ResponseWriter, request *http.Request) {
		var payload configContentRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		if !acquireOperation(writer, operations) {
			return
		}
		defer operations.Unlock()
		var previous []managedsubscription.Definition
		activated := false
		if payload.ManagedSubscriptions != nil {
			if managed == nil {
				writeAPIError(writer, http.StatusServiceUnavailable, "managed_subscriptions_unavailable", "面板托管订阅服务尚未初始化")
				return
			}
			var err error
			previous, err = managed.Activate(*payload.ManagedSubscriptions)
			if err != nil {
				writeAPIError(writer, http.StatusBadRequest, "managed_subscriptions_invalid", err.Error())
				return
			}
			activated = true
		}
		result, err := service.Save(
			request.Context(),
			payload.Content,
			payload.ExpectedHash,
			boolDefaultTrue(payload.Apply),
		)
		if err != nil {
			if activated {
				if restoreErr := managed.Restore(previous); restoreErr != nil {
					err = fmt.Errorf("%w；恢复托管订阅设置失败: %v", err, restoreErr)
				}
			}
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, result)
	})
	router.HandleFunc("GET /api/v1/config/section-versions", func(writer http.ResponseWriter, request *http.Request) {
		versions, err := service.ListSectionVersions(request.Context())
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, versions)
	})
	router.HandleFunc("POST /api/v1/config/section-versions", func(writer http.ResponseWriter, request *http.Request) {
		var payload sectionVersionRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		version, err := service.CreateSectionVersion(
			request.Context(), payload.Kind, payload.Name, payload.Content)
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusCreated, version)
	})
	router.HandleFunc("PUT /api/v1/config/section-versions/{id}", func(writer http.ResponseWriter, request *http.Request) {
		var payload sectionVersionRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		version, err := service.UpdateSectionVersion(
			request.Context(), request.PathValue("id"), payload.Name, payload.Content)
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, version)
	})
	router.HandleFunc("DELETE /api/v1/config/section-versions/{id}", func(writer http.ResponseWriter, request *http.Request) {
		if err := service.DeleteSectionVersion(request.Context(), request.PathValue("id")); err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writer.WriteHeader(http.StatusNoContent)
	})
	router.HandleFunc("GET /api/v1/config/backups", func(writer http.ResponseWriter, request *http.Request) {
		backups, err := service.ListBackups(request.Context())
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, backups)
	})
	router.HandleFunc("POST /api/v1/config/backups", func(writer http.ResponseWriter, request *http.Request) {
		var payload backupMetadataRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		backup, err := service.CreateBackup(request.Context(), payload.Name, payload.Note)
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusCreated, backup)
	})
	router.HandleFunc("POST /api/v1/config/backups/import", func(writer http.ResponseWriter, request *http.Request) {
		request.Body = http.MaxBytesReader(writer, request.Body, configstore.MaxPackageBytes+(1<<20))
		if err := request.ParseMultipartForm(configstore.MaxPackageBytes); err != nil {
			writeAPIError(writer, http.StatusBadRequest, "configuration_package_invalid", "配置包上传无效: "+err.Error())
			return
		}
		file, _, err := request.FormFile("file")
		if err != nil {
			writeAPIError(writer, http.StatusBadRequest, "configuration_package_invalid", "请选择要导入的 .kdae 或 .dae 文件")
			return
		}
		defer file.Close()
		content, err := io.ReadAll(io.LimitReader(file, configstore.MaxPackageBytes+1))
		if err != nil || len(content) > configstore.MaxPackageBytes {
			writeAPIError(writer, http.StatusBadRequest, "configuration_package_invalid", "配置包读取失败或超过大小限制")
			return
		}
		backup, err := service.ImportBackup(
			request.Context(), content, request.FormValue("name"), request.FormValue("note"))
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusCreated, backup)
	})
	router.HandleFunc("PUT /api/v1/config/backups/{id}", func(writer http.ResponseWriter, request *http.Request) {
		var payload backupMetadataRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		backup, err := service.UpdateBackup(
			request.Context(), request.PathValue("id"), payload.Name, payload.Note)
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, backup)
	})
	router.HandleFunc("DELETE /api/v1/config/backups/{id}", func(writer http.ResponseWriter, request *http.Request) {
		if err := service.DeleteBackup(request.Context(), request.PathValue("id")); err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writer.WriteHeader(http.StatusNoContent)
	})
	router.HandleFunc("GET /api/v1/config/backups/{id}/export", func(writer http.ResponseWriter, request *http.Request) {
		if request.URL.Query().Get("format") == "dae" {
			exported, err := service.ExportBackup(request.Context(), request.PathValue("id"))
			if err != nil {
				writeConfigurationError(writer, err)
				return
			}
			writer.Header().Set("Content-Type", "text/plain; charset=utf-8")
			writer.Header().Set("Content-Disposition", mime.FormatMediaType("attachment", map[string]string{
				"filename": backupDownloadName(exported.Backup, ".dae"),
			}))
			writer.Header().Set("Content-Length", fmt.Sprintf("%d", len(exported.Content)))
			writer.WriteHeader(http.StatusOK)
			_, _ = writer.Write(exported.Content)
			return
		}
		exported, err := service.ExportBackupPackage(request.Context(), request.PathValue("id"))
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writer.Header().Set("Content-Type", "application/zip")
		writer.Header().Set("Content-Disposition", mime.FormatMediaType("attachment", map[string]string{
			"filename": backupDownloadName(exported.Backup, ".kdae"),
		}))
		writer.Header().Set("Content-Length", fmt.Sprintf("%d", len(exported.Content)))
		writer.WriteHeader(http.StatusOK)
		_, _ = writer.Write(exported.Content)
	})
	router.HandleFunc("GET /api/v1/config/backups/{id}/preview", func(writer http.ResponseWriter, request *http.Request) {
		preview, err := service.PreviewBackup(request.Context(), request.PathValue("id"))
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, preview)
	})
	router.HandleFunc("POST /api/v1/config/backups/{id}/restore", func(writer http.ResponseWriter, request *http.Request) {
		var payload restoreBackupRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
		if !acquireOperation(writer, operations) {
			return
		}
		defer operations.Unlock()
		result, err := service.Restore(
			request.Context(),
			request.PathValue("id"),
			payload.ExpectedHash,
			boolDefaultTrue(payload.Apply),
		)
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, result)
	})
}

func backupDownloadName(backup configstore.Backup, extension string) string {
	name := strings.TrimSpace(backup.Name)
	name = strings.Map(func(value rune) rune {
		if unicode.IsControl(value) || strings.ContainsRune(`/\:*?"<>|`, value) {
			return '_'
		}
		return value
	}, name)
	name = strings.Trim(name, " .")
	if name == "" {
		name = strings.TrimSuffix(backup.ID, ".dae")
	}
	if !strings.HasPrefix(extension, ".") {
		extension = "." + extension
	}
	if !strings.HasSuffix(strings.ToLower(name), strings.ToLower(extension)) {
		name += extension
	}
	return name
}

// decodeJSONBody 解码必需的请求体，上限按配置大小放宽——保存配置走的正是这条。
func decodeJSONBody(writer http.ResponseWriter, request *http.Request, destination any) bool {
	return decodeBody(writer, request, destination, configstore.MaxConfigBytes+1<<20, false)
}

// decodeBody 是三个解码入口的共同实现。
//
// optional 为真时允许请求体整个缺省（此时 destination 保持零值），
// 用于那些"参数可以不给、给了才生效"的端点。
func decodeBody(
	writer http.ResponseWriter,
	request *http.Request,
	destination any,
	limit int64,
	optional bool,
) bool {
	if optional && (request.Body == nil || request.ContentLength == 0) {
		return true
	}
	request.Body = http.MaxBytesReader(writer, request.Body, limit)
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(destination); err != nil {
		if optional && errors.Is(err, io.EOF) {
			return true
		}
		writeAPIError(writer, http.StatusBadRequest, "invalid_request", "请求 JSON 无效: "+err.Error())
		return false
	}
	if err := decoder.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		writeAPIError(writer, http.StatusBadRequest, "invalid_request", "请求体只能包含一个 JSON 对象")
		return false
	}
	return true
}

func boolDefaultTrue(value *bool) bool {
	return value == nil || *value
}

func writeConfigurationError(writer http.ResponseWriter, err error) {
	var validationErr *configstore.ValidationError
	var applyErr *configstore.ApplyError
	switch {
	case errors.Is(err, configstore.ErrNotFound):
		writeAPIError(writer, http.StatusNotFound, "configuration_not_found", err.Error())
	case errors.Is(err, configstore.ErrConflict):
		writeAPIError(writer, http.StatusConflict, "configuration_conflict", err.Error())
	case errors.Is(err, configstore.ErrInvalid):
		writeAPIError(writer, http.StatusBadRequest, "configuration_backup_invalid", err.Error())
	case errors.As(err, &validationErr):
		writeAPIError(writer, http.StatusUnprocessableEntity, "configuration_invalid", err.Error())
	case errors.As(err, &applyErr):
		writeJSON(writer, http.StatusBadGateway, map[string]any{
			"error": map[string]any{
				"code":       "configuration_apply_failed",
				"message":    err.Error(),
				"rolledBack": applyErr.RolledBack,
			},
		})
	default:
		writeAPIError(writer, http.StatusInternalServerError, "configuration_error", err.Error())
	}
}
