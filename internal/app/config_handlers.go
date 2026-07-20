package app

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"

	"github.com/tuoro/kdae-panel/internal/configstore"
)

type configContentRequest struct {
	Content      string `json:"content"`
	ExpectedHash string `json:"expectedHash"`
	Apply        *bool  `json:"apply,omitempty"`
}

type restoreBackupRequest struct {
	ExpectedHash string `json:"expectedHash"`
	Apply        *bool  `json:"apply,omitempty"`
}

func registerConfigurationRoutes(router *http.ServeMux, service ConfigurationService) {
	if service == nil {
		unavailable := func(writer http.ResponseWriter, _ *http.Request) {
			writeAPIError(writer, http.StatusServiceUnavailable, "configuration_unavailable", "配置管理服务尚未初始化")
		}
		router.HandleFunc("GET /api/v1/config", unavailable)
		router.HandleFunc("PUT /api/v1/config", unavailable)
		router.HandleFunc("POST /api/v1/config/validate", unavailable)
		router.HandleFunc("GET /api/v1/config/backups", unavailable)
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
		result, err := service.Save(
			request.Context(),
			payload.Content,
			payload.ExpectedHash,
			boolDefaultTrue(payload.Apply),
		)
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, result)
	})
	router.HandleFunc("GET /api/v1/config/backups", func(writer http.ResponseWriter, request *http.Request) {
		backups, err := service.ListBackups(request.Context())
		if err != nil {
			writeConfigurationError(writer, err)
			return
		}
		writeJSON(writer, http.StatusOK, backups)
	})
	router.HandleFunc("POST /api/v1/config/backups/{id}/restore", func(writer http.ResponseWriter, request *http.Request) {
		var payload restoreBackupRequest
		if !decodeJSONBody(writer, request, &payload) {
			return
		}
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

func decodeJSONBody(writer http.ResponseWriter, request *http.Request, destination any) bool {
	request.Body = http.MaxBytesReader(writer, request.Body, configstore.MaxConfigBytes+1<<20)
	decoder := json.NewDecoder(request.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(destination); err != nil {
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
