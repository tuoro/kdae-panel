package subscriptioncache

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/url"
	"strconv"
	"strings"

	"go.yaml.in/yaml/v3"
)

type clashDocument struct {
	Proxies []map[string]any `yaml:"proxies"`
}

func parseClashSubscription(content []byte) ([]string, int, error) {
	if !bytes.Contains(content, []byte("proxies:")) {
		return nil, 0, errors.New("缓存既不是 SIP008、URI/Base64 节点列表，也不是 Clash/Mihomo 配置")
	}
	decoder := yaml.NewDecoder(bytes.NewReader(content))
	var root yaml.Node
	if err := decoder.Decode(&root); err != nil {
		return nil, 0, errors.New("Clash/Mihomo 配置解析失败")
	}
	forceYAMLStringField(&root, "short-id")
	var document clashDocument
	if err := root.Decode(&document); err != nil {
		return nil, 0, errors.New("Clash/Mihomo 配置解析失败")
	}
	var extra any
	if err := decoder.Decode(&extra); err != io.EOF {
		return nil, 0, errors.New("Clash/Mihomo 配置包含多个 YAML 文档")
	}
	if document.Proxies == nil {
		return nil, 0, errors.New("Clash/Mihomo 配置缺少 proxies 节点列表")
	}
	if len(document.Proxies) > maxNodes {
		return nil, 0, errors.New("订阅节点数量超过 4096 个上限")
	}

	links := make([]string, 0, len(document.Proxies))
	skipped := 0
	for _, proxy := range document.Proxies {
		link, ok := clashProxyURI(proxy)
		if !ok {
			skipped++
			continue
		}
		links = append(links, link)
	}
	return links, skipped, nil
}

func forceYAMLStringField(node *yaml.Node, field string) {
	if node.Kind == yaml.MappingNode {
		for index := 0; index+1 < len(node.Content); index += 2 {
			key, value := node.Content[index], node.Content[index+1]
			if key.Value == field && value.Kind == yaml.ScalarNode {
				value.Tag = "!!str"
			}
		}
	}
	for _, child := range node.Content {
		forceYAMLStringField(child, field)
	}
}

func clashProxyURI(proxy map[string]any) (string, bool) {
	name := text(proxy, "name")
	protocol := strings.ToLower(text(proxy, "type"))
	server := text(proxy, "server")
	port, ok := integer(proxy, "port")
	if name == "" || protocol == "" || server == "" || !ok || port < 1 || port > 65535 {
		return "", false
	}

	switch protocol {
	case "ss":
		return shadowsocksURI(proxy, name, server, port)
	case "vmess":
		return vmessURI(proxy, name, server, port)
	case "vless":
		return xrayURI("vless", proxy, name, server, port)
	case "trojan":
		return xrayURI("trojan", proxy, name, server, port)
	case "hysteria2", "hy2":
		return hysteria2URI(proxy, name, server, port)
	case "tuic":
		return tuicURI(proxy, name, server, port)
	case "anytls":
		return anyTLSURI(proxy, name, server, port)
	case "juicity":
		return juicityURI(proxy, name, server, port)
	default:
		return "", false
	}
}

func shadowsocksURI(proxy map[string]any, name, server string, port int) (string, bool) {
	method, password := text(proxy, "cipher"), text(proxy, "password")
	if method == "" || password == "" {
		return "", false
	}
	credential := base64.RawURLEncoding.EncodeToString([]byte(method + ":" + password))
	query := url.Values{}
	if plugin := text(proxy, "plugin"); plugin != "" {
		if plugin != "v2ray-plugin" && plugin != "obfs" && plugin != "obfs-local" && plugin != "simple-obfs" {
			return "", false
		}
		value := plugin
		if plugin == "obfs" {
			value = "obfs-local"
		}
		if options, ok := proxy["plugin-opts"].(map[string]any); ok {
			for _, key := range []string{"mode", "host", "path"} {
				if option := valueText(options[key]); option != "" {
					if plugin == "v2ray-plugin" && key == "mode" && option == "websocket" {
						continue
					}
					value += ";" + key + "=" + option
				}
			}
			for _, key := range []string{"tls", "mux"} {
				if enabled, exists := valueBool(options[key]); exists && enabled {
					value += ";" + key
				}
			}
		}
		if !strings.Contains(value, ";") {
			value += ";"
		}
		query.Set("plugin", value)
	}
	return buildURI("ss", credential, server, port, query, name), true
}

func vmessURI(proxy map[string]any, name, server string, port int) (string, bool) {
	uuid := text(proxy, "uuid")
	if uuid == "" || integerOr(proxy, "alterId", 0) != 0 {
		return "", false
	}
	transport, host, path := transportValues(proxy)
	if !supportedV2RayTransport(transport) {
		return "", false
	}
	tls := ""
	if boolean(proxy, "tls") {
		tls = "tls"
	}
	value := map[string]any{
		"v": "2", "ps": name, "add": server, "port": strconv.Itoa(port),
		"id": uuid, "aid": integerOr(proxy, "alterId", 0), "scy": textOr(proxy, "cipher", "auto"),
		"net": transport, "type": "none", "host": host, "path": path, "tls": tls,
	}
	if sni := firstText(proxy, "servername", "sni"); sni != "" {
		value["sni"] = sni
	}
	if fp := text(proxy, "client-fingerprint"); fp != "" {
		value["fp"] = fp
	}
	encoded, err := json.Marshal(value)
	if err != nil {
		return "", false
	}
	return "vmess://" + base64.StdEncoding.EncodeToString(encoded), true
}

func xrayURI(protocol string, proxy map[string]any, name, server string, port int) (string, bool) {
	credential := text(proxy, "uuid")
	if protocol == "trojan" {
		credential = text(proxy, "password")
	}
	if credential == "" {
		return "", false
	}
	if protocol == "trojan" {
		if _, reality := stringMap(proxy["reality-opts"]); reality {
			return "", false
		}
	}
	query := url.Values{}
	if protocol == "vless" {
		query.Set("encryption", textOr(proxy, "encryption", "none"))
	}
	security := "none"
	if reality, ok := stringMap(proxy["reality-opts"]); ok {
		security = "reality"
		setQuery(query, "pbk", valueText(reality["public-key"]))
		setQuery(query, "sid", valueText(reality["short-id"]))
	} else if boolean(proxy, "tls") {
		security = "tls"
	}
	query.Set("security", security)
	setQuery(query, "sni", firstText(proxy, "servername", "sni"))
	setQuery(query, "fp", text(proxy, "client-fingerprint"))
	setQuery(query, "flow", text(proxy, "flow"))
	if values := textSlice(proxy["alpn"]); len(values) > 0 {
		query.Set("alpn", strings.Join(values, ","))
	}
	if boolean(proxy, "skip-cert-verify") {
		query.Set("allowInsecure", "1")
	}
	transport, host, path := transportValues(proxy)
	if protocol == "vless" && !supportedV2RayTransport(transport) {
		return "", false
	}
	if protocol == "trojan" && transport != "tcp" && transport != "ws" && transport != "grpc" && transport != "httpupgrade" {
		return "", false
	}
	query.Set("type", transport)
	setQuery(query, "host", host)
	setQuery(query, "path", path)
	if transport == "grpc" {
		setQuery(query, "serviceName", path)
		query.Del("path")
	}
	return buildURI(protocol, url.User(credential).String(), server, port, query, name), true
}

func hysteria2URI(proxy map[string]any, name, server string, port int) (string, bool) {
	password := firstText(proxy, "password", "auth", "auth-str")
	// dae 当前的 Hysteria2 出站尚未实现 URI 中的混淆参数。保留这种节点会
	// 造成“能看到但无法连接”，因此在内核支持前明确跳过。
	if password == "" || text(proxy, "obfs") != "" || text(proxy, "ports") != "" {
		return "", false
	}
	query := url.Values{}
	setQuery(query, "sni", firstText(proxy, "sni", "servername"))
	if boolean(proxy, "skip-cert-verify") {
		query.Set("insecure", "1")
	}
	return buildURI("hysteria2", url.User(password).String(), server, port, query, name), true
}

func tuicURI(proxy map[string]any, name, server string, port int) (string, bool) {
	uuid, password := text(proxy, "uuid"), text(proxy, "password")
	if uuid == "" || password == "" {
		return "", false
	}
	query := url.Values{}
	setQuery(query, "sni", firstText(proxy, "sni", "servername"))
	setQuery(query, "congestion_control", text(proxy, "congestion-controller"))
	setQuery(query, "udp_relay_mode", text(proxy, "udp-relay-mode"))
	if values := textSlice(proxy["alpn"]); len(values) > 0 {
		query.Set("alpn", strings.Join(values, ","))
	}
	if boolean(proxy, "skip-cert-verify") {
		query.Set("allow_insecure", "1")
	}
	if boolean(proxy, "disable-sni") {
		query.Set("disable_sni", "1")
	}
	if boolean(proxy, "reduce-rtt") {
		query.Set("reduce_rtt", "1")
	}
	user := url.UserPassword(uuid, password).String()
	return buildURI("tuic", user, server, port, query, name), true
}

func anyTLSURI(proxy map[string]any, name, server string, port int) (string, bool) {
	password := text(proxy, "password")
	if password == "" {
		return "", false
	}
	query := url.Values{}
	setQuery(query, "sni", firstText(proxy, "sni", "servername"))
	if boolean(proxy, "skip-cert-verify") {
		query.Set("insecure", "1")
	}
	return buildURI("anytls", url.User(password).String(), server, port, query, name), true
}

func juicityURI(proxy map[string]any, name, server string, port int) (string, bool) {
	uuid, password := text(proxy, "uuid"), text(proxy, "password")
	if uuid == "" || password == "" {
		return "", false
	}
	query := url.Values{}
	setQuery(query, "sni", firstText(proxy, "sni", "servername"))
	setQuery(query, "congestion_control", text(proxy, "congestion-controller"))
	setQuery(query, "pinned_certchain_sha256", text(proxy, "pinned-certchain-sha256"))
	if boolean(proxy, "skip-cert-verify") {
		query.Set("allow_insecure", "1")
	}
	return buildURI("juicity", url.UserPassword(uuid, password).String(), server, port, query, name), true
}

func transportValues(proxy map[string]any) (network, host, path string) {
	network = textOr(proxy, "network", "tcp")
	var options map[string]any
	switch network {
	case "ws":
		options, _ = stringMap(proxy["ws-opts"])
	case "grpc":
		options, _ = stringMap(proxy["grpc-opts"])
	case "h2":
		options, _ = stringMap(proxy["h2-opts"])
	case "http":
		options, _ = stringMap(proxy["http-opts"])
	case "httpupgrade":
		options, _ = stringMap(proxy["http-upgrade-opts"])
	case "xhttp", "splithttp":
		network = "xhttp"
		options, _ = stringMap(proxy["xhttp-opts"])
	}
	path = valueText(options["path"])
	host = valueText(options["host"])
	if network == "grpc" {
		path = valueText(options["grpc-service-name"])
	}
	if headers, ok := stringMap(options["headers"]); ok {
		if headerHost := firstMapText(headers, "Host", "host"); headerHost != "" {
			host = headerHost
		}
	}
	if host == "" {
		if hosts := textSlice(options["host"]); len(hosts) > 0 {
			host = hosts[0]
		}
	}
	return network, host, path
}

func supportedV2RayTransport(network string) bool {
	switch network {
	case "tcp", "ws", "grpc", "http", "http2", "h2", "httpupgrade":
		return true
	default:
		return false
	}
}

func buildURI(protocol, user, server string, port int, query url.Values, name string) string {
	authority := net.JoinHostPort(strings.Trim(server, "[]"), strconv.Itoa(port))
	result := fmt.Sprintf("%s://%s@%s", protocol, user, authority)
	if encoded := query.Encode(); encoded != "" {
		result += "?" + encoded
	}
	return result + "#" + url.PathEscape(name)
}

func setQuery(query url.Values, key, value string) {
	if value != "" {
		query.Set(key, value)
	}
}

func text(values map[string]any, key string) string { return valueText(values[key]) }

func firstText(values map[string]any, keys ...string) string {
	for _, key := range keys {
		if value := text(values, key); value != "" {
			return value
		}
	}
	return ""
}

func textOr(values map[string]any, key, fallback string) string {
	if value := text(values, key); value != "" {
		return value
	}
	return fallback
}

func firstMapText(values map[string]any, keys ...string) string {
	for _, key := range keys {
		if value := valueText(values[key]); value != "" {
			return value
		}
	}
	return ""
}

func valueText(value any) string {
	switch typed := value.(type) {
	case string:
		return strings.TrimSpace(typed)
	case int:
		return strconv.Itoa(typed)
	case int64:
		return strconv.FormatInt(typed, 10)
	case uint64:
		return strconv.FormatUint(typed, 10)
	case float64:
		return strconv.FormatFloat(typed, 'f', -1, 64)
	default:
		return ""
	}
}

func integer(values map[string]any, key string) (int, bool) {
	value := valueText(values[key])
	if value == "" {
		return 0, false
	}
	parsed, err := strconv.Atoi(value)
	return parsed, err == nil
}

func integerOr(values map[string]any, key string, fallback int) int {
	if value, ok := integer(values, key); ok {
		return value
	}
	return fallback
}

func boolean(values map[string]any, key string) bool {
	value, _ := valueBool(values[key])
	return value
}

func valueBool(value any) (bool, bool) {
	switch typed := value.(type) {
	case bool:
		return typed, true
	case string:
		parsed, err := strconv.ParseBool(typed)
		return parsed, err == nil
	default:
		return false, false
	}
}

func stringMap(value any) (map[string]any, bool) {
	values, ok := value.(map[string]any)
	return values, ok
}

func textSlice(value any) []string {
	values, ok := value.([]any)
	if !ok {
		if single := valueText(value); single != "" {
			return []string{single}
		}
		return nil
	}
	result := make([]string, 0, len(values))
	for _, value := range values {
		if item := valueText(value); item != "" {
			result = append(result, item)
		}
	}
	return result
}
