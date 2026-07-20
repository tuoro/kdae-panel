package auth

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"strconv"
	"strings"

	"golang.org/x/crypto/argon2"
)

type PasswordParams struct {
	Memory      uint32
	Iterations  uint32
	Parallelism uint8
	SaltLength  uint32
	KeyLength   uint32
}

type InputError struct {
	Message string
}

func (e *InputError) Error() string {
	return e.Message
}

func DefaultPasswordParams() PasswordParams {
	return PasswordParams{
		Memory:      64 * 1024,
		Iterations:  3,
		Parallelism: 2,
		SaltLength:  16,
		KeyLength:   32,
	}
}

func HashPassword(password string, params PasswordParams) (string, error) {
	if err := validatePassword(password); err != nil {
		return "", err
	}
	if params.Memory == 0 || params.Iterations == 0 || params.Parallelism == 0 || params.SaltLength == 0 || params.KeyLength == 0 {
		return "", errors.New("Argon2id 参数无效")
	}
	salt := make([]byte, params.SaltLength)
	if _, err := rand.Read(salt); err != nil {
		return "", fmt.Errorf("生成密码盐值: %w", err)
	}
	hash := argon2.IDKey([]byte(password), salt, params.Iterations, params.Memory, params.Parallelism, params.KeyLength)
	return fmt.Sprintf(
		"$argon2id$v=%d$m=%d,t=%d,p=%d$%s$%s",
		argon2.Version,
		params.Memory,
		params.Iterations,
		params.Parallelism,
		base64.RawStdEncoding.EncodeToString(salt),
		base64.RawStdEncoding.EncodeToString(hash),
	), nil
}

func VerifyPassword(password, encoded string) (bool, error) {
	params, salt, expected, err := parsePasswordHash(encoded)
	if err != nil {
		return false, err
	}
	actual := argon2.IDKey([]byte(password), salt, params.Iterations, params.Memory, params.Parallelism, uint32(len(expected)))
	return subtle.ConstantTimeCompare(actual, expected) == 1, nil
}

func validatePassword(password string) error {
	if len(password) < 12 {
		return &InputError{Message: "密码至少需要 12 个字符"}
	}
	if len(password) > 1024 {
		return &InputError{Message: "密码长度不能超过 1024 个字符"}
	}
	return nil
}

func parsePasswordHash(encoded string) (PasswordParams, []byte, []byte, error) {
	parts := strings.Split(encoded, "$")
	if len(parts) != 6 || parts[1] != "argon2id" {
		return PasswordParams{}, nil, nil, errors.New("密码哈希格式无效")
	}
	versionValue, found := strings.CutPrefix(parts[2], "v=")
	if !found {
		return PasswordParams{}, nil, nil, errors.New("密码哈希版本无效")
	}
	version, err := strconv.Atoi(versionValue)
	if err != nil || version != argon2.Version {
		return PasswordParams{}, nil, nil, errors.New("不支持的 Argon2id 版本")
	}

	var params PasswordParams
	if _, err := fmt.Sscanf(parts[3], "m=%d,t=%d,p=%d", &params.Memory, &params.Iterations, &params.Parallelism); err != nil {
		return PasswordParams{}, nil, nil, errors.New("密码哈希参数无效")
	}
	if params.Memory < 8*uint32(params.Parallelism) || params.Memory > 1024*1024 || params.Iterations == 0 || params.Iterations > 10 || params.Parallelism == 0 || params.Parallelism > 16 {
		return PasswordParams{}, nil, nil, errors.New("密码哈希参数超出安全范围")
	}
	salt, err := base64.RawStdEncoding.DecodeString(parts[4])
	if err != nil {
		return PasswordParams{}, nil, nil, errors.New("密码盐值无效")
	}
	expected, err := base64.RawStdEncoding.DecodeString(parts[5])
	if err != nil {
		return PasswordParams{}, nil, nil, errors.New("密码摘要无效")
	}
	if len(salt) < 8 || len(expected) < 16 {
		return PasswordParams{}, nil, nil, errors.New("密码哈希长度无效")
	}
	return params, salt, expected, nil
}
