package auth

import "testing"

func TestPasswordHashRoundTrip(t *testing.T) {
	params := PasswordParams{Memory: 1024, Iterations: 1, Parallelism: 1, SaltLength: 16, KeyLength: 32}
	hash, err := HashPassword("a secure test password", params)
	if err != nil {
		t.Fatal(err)
	}
	valid, err := VerifyPassword("a secure test password", hash)
	if err != nil || !valid {
		t.Fatalf("正确密码校验失败: valid=%v err=%v", valid, err)
	}
	valid, err = VerifyPassword("the wrong password", hash)
	if err != nil || valid {
		t.Fatalf("错误密码校验结果异常: valid=%v err=%v", valid, err)
	}
}

func TestPasswordMinimumLength(t *testing.T) {
	_, err := HashPassword("too-short", PasswordParams{Memory: 1024, Iterations: 1, Parallelism: 1, SaltLength: 16, KeyLength: 32})
	if err == nil {
		t.Fatal("短密码应该被拒绝")
	}
}
