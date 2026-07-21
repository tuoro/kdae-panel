package app

import (
	"fmt"
	"net"
	"net/http"
	"net/netip"
	"strings"
)

type proxyTrust struct {
	prefixes []netip.Prefix
}

func parseProxyTrust(value string) (proxyTrust, error) {
	var trust proxyTrust
	for _, rawPrefix := range strings.Split(value, ",") {
		rawPrefix = strings.TrimSpace(rawPrefix)
		if rawPrefix == "" {
			continue
		}
		prefix, err := netip.ParsePrefix(rawPrefix)
		if err != nil {
			return proxyTrust{}, fmt.Errorf("可信代理 CIDR %q 无效: %w", rawPrefix, err)
		}
		trust.prefixes = append(trust.prefixes, prefix.Masked())
	}
	return trust, nil
}

func (t proxyTrust) contains(address netip.Addr) bool {
	for _, prefix := range t.prefixes {
		if prefix.Contains(address) {
			return true
		}
	}
	return false
}

func (t proxyTrust) peerAddress(request *http.Request) (netip.Addr, bool) {
	host, _, err := net.SplitHostPort(request.RemoteAddr)
	if err != nil {
		host = request.RemoteAddr
	}
	address, err := netip.ParseAddr(strings.Trim(host, "[]"))
	return address.Unmap(), err == nil
}

func (t proxyTrust) clientAddress(request *http.Request) string {
	peer, validPeer := t.peerAddress(request)
	if !validPeer {
		return request.RemoteAddr
	}
	if !t.contains(peer) {
		return peer.String()
	}

	forwarded := strings.Split(request.Header.Get("X-Forwarded-For"), ",")
	for index := len(forwarded) - 1; index >= 0; index-- {
		address, err := netip.ParseAddr(strings.TrimSpace(forwarded[index]))
		if err != nil {
			continue
		}
		address = address.Unmap()
		if !t.contains(address) {
			return address.String()
		}
	}
	return peer.String()
}

func (t proxyTrust) requestScheme(request *http.Request) string {
	if request.TLS != nil {
		return "https"
	}
	peer, ok := t.peerAddress(request)
	if ok && t.contains(peer) {
		if proto := strings.ToLower(strings.TrimSpace(strings.Split(request.Header.Get("X-Forwarded-Proto"), ",")[0])); proto == "https" {
			return "https"
		}
	}
	return "http"
}
