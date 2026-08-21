package subscriptioncache

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"net"
	"net/url"
	"strconv"
	"strings"
)

const maxNodes = 4096

// Normalize 将上游订阅转换成 dae 能直接读取的缓存格式。已经兼容的
// SIP008/Base64 订阅保持原样；普通 URI 列表和 Clash/Mihomo YAML 会被
// 转换成标准 Base64 URI 列表。节点预览随后读取同一份结果。
func Normalize(content []byte) (normalized []byte, nodes int, skipped int, err error) {
	parsed, skipped, parseErr := parseSubscription(content)
	if parseErr == nil && len(parsed) > 0 {
		if len(content) > maxFileBytes {
			return nil, 0, skipped, errors.New("订阅缓存超过 8 MiB 上限")
		}
		return content, len(parsed), skipped, nil
	}

	if links := parsePlainLinks(content); len(links) > 0 {
		return encodeLinks(links)
	}

	links, unsupported, clashErr := parseClashSubscription(content)
	if clashErr != nil {
		return nil, 0, 0, clashErr
	}
	if len(links) == 0 {
		return nil, 0, unsupported, errors.New("订阅中没有可转换的节点")
	}
	normalized, nodes, invalid, err := encodeLinks(links)
	return normalized, nodes, unsupported + invalid, err
}

func parsePlainLinks(content []byte) []string {
	lines := strings.Split(string(content), "\n")
	links := make([]string, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimSpace(strings.TrimSuffix(line, "\r"))
		if line == "" {
			continue
		}
		if _, ok := parseNodeLink(line); !ok {
			return nil
		}
		links = append(links, line)
	}
	return links
}

func encodeLinks(links []string) ([]byte, int, int, error) {
	valid := make([]string, 0, len(links))
	skipped := 0
	for _, link := range links {
		if _, ok := parseNodeLink(link); !ok {
			skipped++
			continue
		}
		valid = append(valid, link)
		if len(valid) > maxNodes {
			return nil, 0, skipped, errors.New("订阅节点数量超过 4096 个上限")
		}
	}
	if len(valid) == 0 {
		return nil, 0, skipped, errors.New("订阅中没有可识别节点")
	}
	payload := strings.Join(valid, "\n") + "\n"
	encoded := base64.StdEncoding.EncodeToString([]byte(payload))
	if len(encoded) > maxFileBytes {
		return nil, 0, skipped, errors.New("标准化后的订阅缓存超过 8 MiB 上限")
	}
	return []byte(encoded), len(valid), skipped, nil
}

type sip008 struct {
	Version int            `json:"version"`
	Servers []sip008Server `json:"servers"`
}

type sip008Server struct {
	Remarks    string `json:"remarks"`
	Server     string `json:"server"`
	ServerPort int    `json:"server_port"`
}

func parseSubscription(content []byte) ([]Node, int, error) {
	if nodes, ok := parseSIP008(content); ok {
		return normalizeNodes(nodes)
	}
	raw, err := decodeBase64(strings.TrimSpace(string(content)))
	if err != nil {
		return []Node{}, 0, errors.New("缓存既不是 SIP008,也不是有效的 Base64 节点列表")
	}
	lines := strings.Split(string(raw), "\n")
	nodes := make([]Node, 0, min(len(lines), maxNodes))
	skipped := 0
	for _, line := range lines {
		line = strings.TrimSpace(strings.TrimSuffix(line, "\r"))
		if line == "" {
			continue
		}
		node, ok := parseNodeLink(line)
		if !ok {
			skipped++
			continue
		}
		nodes = append(nodes, node)
		if len(nodes) > maxNodes {
			return []Node{}, skipped, errors.New("订阅节点数量超过 4096 个上限")
		}
	}
	normalized, unnamed, err := normalizeNodes(nodes)
	return normalized, skipped + unnamed, err
}

func parseSIP008(content []byte) ([]Node, bool) {
	var subscription sip008
	if json.Unmarshal(content, &subscription) != nil || subscription.Version != 1 || subscription.Servers == nil {
		return nil, false
	}
	nodes := make([]Node, 0, len(subscription.Servers))
	for _, server := range subscription.Servers {
		nodes = append(nodes, Node{
			Name: strings.TrimSpace(server.Remarks), Protocol: "ss",
			Host: net.JoinHostPort(server.Server, strconv.Itoa(server.ServerPort)),
		})
	}
	return nodes, true
}

func normalizeNodes(nodes []Node) ([]Node, int, error) {
	result := make([]Node, 0, len(nodes))
	indexByName := make(map[string]int, len(nodes))
	skipped := 0
	for _, node := range nodes {
		node.Name = strings.TrimSpace(node.Name)
		if node.Name == "" {
			skipped++
			continue
		}
		if index, exists := indexByName[node.Name]; exists {
			result[index].Matches++
			continue
		}
		node.Matches = 1
		indexByName[node.Name] = len(result)
		result = append(result, node)
		if len(result) > maxNodes {
			return []Node{}, skipped, errors.New("订阅节点数量超过 4096 个上限")
		}
	}
	return result, skipped, nil
}

func parseNodeLink(link string) (Node, bool) {
	protocol, payload, ok := strings.Cut(link, "://")
	if !ok || protocol == "" || payload == "" {
		return Node{}, false
	}
	protocol = strings.ToLower(protocol)
	switch protocol {
	case "vmess":
		return parseVMess(payload)
	case "ssr":
		return parseSSR(payload)
	}
	parsed, err := url.Parse(link)
	if err != nil || parsed.Fragment == "" {
		return Node{}, false
	}
	if protocol == "hy2" {
		protocol = "hysteria2"
	}
	return Node{Name: parsed.Fragment, Protocol: protocol, Host: parsed.Host}, true
}

func parseVMess(payload string) (Node, bool) {
	payload = strings.SplitN(payload, "#", 2)[0]
	payload = strings.SplitN(payload, "?", 2)[0]
	raw, err := decodeBase64(payload)
	if err != nil {
		return Node{}, false
	}
	var value struct {
		Name string      `json:"ps"`
		Host string      `json:"add"`
		Port interface{} `json:"port"`
	}
	if json.Unmarshal(raw, &value) != nil || strings.TrimSpace(value.Name) == "" {
		return Node{}, false
	}
	host := value.Host
	if port := strings.TrimSpace(toString(value.Port)); port != "" {
		host = net.JoinHostPort(value.Host, port)
	}
	return Node{Name: value.Name, Protocol: "vmess", Host: host}, true
}

func parseSSR(payload string) (Node, bool) {
	raw, err := decodeBase64(payload)
	if err != nil {
		return Node{}, false
	}
	main, query, _ := strings.Cut(string(raw), "/?")
	values, _ := url.ParseQuery(query)
	remarks, err := decodeBase64(values.Get("remarks"))
	if err != nil || len(remarks) == 0 {
		return Node{}, false
	}
	parts := strings.Split(main, ":")
	host := ""
	if len(parts) >= 6 {
		host = net.JoinHostPort(strings.Join(parts[:len(parts)-5], ":"), parts[len(parts)-5])
	}
	return Node{Name: string(remarks), Protocol: "ssr", Host: host}, true
}

func decodeBase64(value string) ([]byte, error) {
	value = strings.Map(func(character rune) rune {
		if character == ' ' || character == '\n' || character == '\r' || character == '\t' {
			return -1
		}
		return character
	}, value)
	if value == "" {
		return nil, errors.New("Base64 内容为空")
	}
	for _, encoding := range []*base64.Encoding{
		base64.StdEncoding, base64.RawStdEncoding, base64.URLEncoding, base64.RawURLEncoding,
	} {
		if decoded, err := encoding.DecodeString(value); err == nil {
			return decoded, nil
		}
	}
	return nil, errors.New("Base64 解码失败")
}

func toString(value interface{}) string {
	switch typed := value.(type) {
	case string:
		return typed
	case float64:
		return strconv.FormatFloat(typed, 'f', -1, 64)
	default:
		return ""
	}
}
