package subscriptioncache

import (
	"encoding/base64"
	"net/url"
	"strings"
	"testing"
)

func TestNormalizeClashMihomoSubscription(t *testing.T) {
	content := []byte(`mixed-port: 7890
proxies:
  - name: "香港 SS"
    type: ss
    server: ss.example.com
    port: 8388
    cipher: aes-128-gcm
    password: secret
  - name: "新加坡 Reality"
    type: vless
    server: 2001:db8::1
    port: 443
    uuid: 11111111-1111-1111-1111-111111111111
    network: grpc
    flow: xtls-rprx-vision
    servername: example.com
    client-fingerprint: chrome
    reality-opts:
      public-key: public-key
      short-id: 0088
    grpc-opts:
      grpc-service-name: edge
  - name: "美国 VMess"
    type: vmess
    server: vmess.example.com
    port: 443
    uuid: 22222222-2222-2222-2222-222222222222
    alterId: 0
    tls: true
    network: ws
    ws-opts:
      path: /socket
      headers:
        Host: cdn.example.com
  - name: "暂不支持"
    type: wireguard
    server: wg.example.com
    port: 51820
`)
	normalized, nodes, skipped, err := Normalize(content)
	if err != nil {
		t.Fatal(err)
	}
	if nodes != 3 || skipped != 1 {
		t.Fatalf("nodes = %d, skipped = %d", nodes, skipped)
	}
	raw, err := base64.StdEncoding.DecodeString(string(normalized))
	if err != nil {
		t.Fatal(err)
	}
	lines := strings.Split(strings.TrimSpace(string(raw)), "\n")
	if len(lines) != 3 || !strings.HasPrefix(lines[0], "ss://") || !strings.HasPrefix(lines[2], "vmess://") {
		t.Fatalf("转换结果异常: %q", lines)
	}
	vless, err := url.Parse(lines[1])
	if err != nil {
		t.Fatal(err)
	}
	query := vless.Query()
	if vless.Host != "[2001:db8::1]:443" || query.Get("security") != "reality" ||
		query.Get("pbk") != "public-key" || query.Get("sid") != "0088" ||
		query.Get("serviceName") != "edge" || query.Get("flow") != "xtls-rprx-vision" {
		t.Fatalf("VLESS 转换结果异常: %s", lines[1])
	}
	parsed, invalid, err := parseSubscription(normalized)
	if err != nil || len(parsed) != 3 || invalid != 0 {
		t.Fatalf("标准化缓存无法回读: nodes=%+v skipped=%d err=%v", parsed, invalid, err)
	}
}

func TestNormalizePlainURIList(t *testing.T) {
	content := []byte("trojan://password@example.com:443#one\nss://cipher@host:8388#two\n")
	normalized, nodes, skipped, err := Normalize(content)
	if err != nil || nodes != 2 || skipped != 0 {
		t.Fatalf("Normalize() nodes=%d skipped=%d err=%v", nodes, skipped, err)
	}
	if string(normalized) == string(content) {
		t.Fatal("普通 URI 列表未转换成 Base64 缓存")
	}
}

func TestNormalizeRejectsClashWithoutConvertibleNodes(t *testing.T) {
	_, _, skipped, err := Normalize([]byte(`proxies:
  - name: wg
    type: wireguard
    server: example.com
    port: 51820
`))
	if err == nil || skipped != 1 || !strings.Contains(err.Error(), "没有可转换") {
		t.Fatalf("Normalize() skipped=%d err=%v", skipped, err)
	}
}

func TestNormalizeSkipsClashNodesDaeCannotConsume(t *testing.T) {
	content := []byte(`proxies:
  - name: legacy-vmess
    type: vmess
    server: example.com
    port: 443
    uuid: 11111111-1111-1111-1111-111111111111
    alterId: 64
  - name: xhttp-vless
    type: vless
    server: example.com
    port: 443
    uuid: 22222222-2222-2222-2222-222222222222
    network: xhttp
  - name: obfuscated-hy2
    type: hysteria2
    server: example.com
    port: 443
    password: secret
    obfs: salamander
    obfs-password: secret
`)
	_, _, skipped, err := Normalize(content)
	if err == nil || skipped != 3 {
		t.Fatalf("Normalize() skipped=%d err=%v", skipped, err)
	}
}

func TestNormalizeModernDaeProtocols(t *testing.T) {
	content := []byte(`proxies:
  - name: tuic-node
    type: tuic
    server: tuic.example.com
    port: 443
    uuid: user-id
    password: secret
    alpn: [h3]
    congestion-controller: bbr
    udp-relay-mode: native
  - name: anytls-node
    type: anytls
    server: anytls.example.com
    port: 443
    password: secret
    sni: edge.example.com
  - name: juicity-node
    type: juicity
    server: juicity.example.com
    port: 443
    uuid: user-id
    password: secret
    congestion-controller: bbr
`)
	normalized, nodes, skipped, err := Normalize(content)
	if err != nil || nodes != 3 || skipped != 0 {
		t.Fatalf("Normalize() nodes=%d skipped=%d err=%v", nodes, skipped, err)
	}
	raw, err := base64.StdEncoding.DecodeString(string(normalized))
	if err != nil {
		t.Fatal(err)
	}
	for _, scheme := range []string{"tuic://", "anytls://", "juicity://"} {
		if !strings.Contains(string(raw), scheme) {
			t.Fatalf("转换结果缺少 %s: %s", scheme, raw)
		}
	}
}

func TestNormalizeShadowsocks2022KeepsRawPSK(t *testing.T) {
	const password = "RCF/0OOYmo6crue3LwlEyD8izLAbuUuyPic/vasJH/o="
	content := []byte(`proxies:
  - name: ss2022-node
    type: ss
    server: ss2022.example.com
    port: 443
    cipher: 2022-blake3-aes-256-gcm
    password: ` + password + "\n")
	normalized, nodes, skipped, err := Normalize(content)
	if err != nil || nodes != 1 || skipped != 0 {
		t.Fatalf("Normalize() nodes=%d skipped=%d err=%v", nodes, skipped, err)
	}
	raw, err := base64.StdEncoding.DecodeString(string(normalized))
	if err != nil {
		t.Fatal(err)
	}
	link, err := url.Parse(strings.TrimSpace(string(raw)))
	if err != nil {
		t.Fatal(err)
	}
	credential, err := base64.RawURLEncoding.DecodeString(link.User.Username())
	if err != nil {
		t.Fatal(err)
	}
	if got, want := string(credential), "2022-blake3-aes-256-gcm:"+password; got != want {
		t.Fatalf("SS2022 凭据被改写: got %q want %q", got, want)
	}
}
