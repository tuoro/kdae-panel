// 解析常见代理分享链接,仅提取展示与探测所需的字段(协议、名称、服务器、端口)。
// 解析失败不阻塞任何操作:链接仍会原样写入配置,由 dae validate 判定有效性。

export interface NodeLinkInfo {
  protocol: string
  name: string
  host: string
  port: number | null
}

const KNOWN_PROTOCOLS = new Set([
  'vmess', 'vless', 'ss', 'ssr', 'trojan', 'trojan-go', 'tuic', 'juicity',
  'hysteria2', 'hy2', 'socks5', 'socks', 'http', 'https', 'anytls',
])

function decodeBase64(value: string): string | null {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  try {
    const raw = atob(padded)
    return new TextDecoder().decode(Uint8Array.from(raw, (char) => char.charCodeAt(0)))
  } catch {
    return null
  }
}

function decodeName(fragment: string): string {
  try {
    return decodeURIComponent(fragment)
  } catch {
    return fragment
  }
}

/** 从 `[user@]host[:port]` 形式的 authority 中提取主机与端口。 */
function parseAuthority(authority: string): { host: string; port: number | null } {
  const at = authority.lastIndexOf('@')
  let hostPort = at >= 0 ? authority.slice(at + 1) : authority
  let host = hostPort
  let port: number | null = null
  const v6 = /^\[([^\]]+)\](?::(\d+))?$/.exec(hostPort)
  if (v6) {
    host = v6[1]
    port = v6[2] ? Number(v6[2]) : null
  } else {
    const colon = hostPort.lastIndexOf(':')
    if (colon >= 0 && /^\d+$/.test(hostPort.slice(colon + 1))) {
      host = hostPort.slice(0, colon)
      port = Number(hostPort.slice(colon + 1))
    }
  }
  if (port !== null && (port < 1 || port > 65535)) port = null
  return { host, port }
}

function parseURLStyle(protocol: string, rest: string): NodeLinkInfo {
  const fragmentAt = rest.indexOf('#')
  const name = fragmentAt >= 0 ? decodeName(rest.slice(fragmentAt + 1)) : ''
  let authority = fragmentAt >= 0 ? rest.slice(0, fragmentAt) : rest
  authority = authority.split(/[/?]/, 1)[0]
  const { host, port } = parseAuthority(authority)
  return { protocol, name, host, port }
}

function validPort(value: unknown): number | null {
  const port = Number(value)
  return Number.isInteger(port) && port >= 1 && port <= 65535 ? port : null
}

function parseVmess(payload: string): NodeLinkInfo | null {
  const decoded = decodeBase64(payload.split(/[#?]/, 1)[0])
  if (!decoded) return parseURLStyle('vmess', payload)
  try {
    const fields = JSON.parse(decoded) as Record<string, unknown>
    return {
      protocol: 'vmess',
      name: String(fields.ps ?? ''),
      host: String(fields.add ?? ''),
      port: validPort(fields.port),
    }
  } catch {
    return { protocol: 'vmess', name: '', host: '', port: null }
  }
}

function parseShadowsocks(rest: string): NodeLinkInfo {
  const direct = parseURLStyle('ss', rest)
  if (direct.host && direct.port) return direct
  // 整体 base64 形式: ss://base64(method:pass@host:port)#name
  const fragmentAt = rest.indexOf('#')
  const decoded = decodeBase64((fragmentAt >= 0 ? rest.slice(0, fragmentAt) : rest).split(/[/?]/, 1)[0])
  if (!decoded) return direct
  const { host, port } = parseAuthority(decoded)
  return { protocol: 'ss', name: direct.name, host, port }
}

function parseShadowsocksR(rest: string): NodeLinkInfo {
  const decoded = decodeBase64(rest)
  if (!decoded) return { protocol: 'ssr', name: '', host: '', port: null }
  const [main, query = ''] = decoded.split('/?', 2)
  const parts = main.split(':')
  const remarks = /remarks=([A-Za-z0-9+/_=-]*)/.exec(query)
  return {
    protocol: 'ssr',
    name: remarks ? decodeBase64(remarks[1]) || '' : '',
    host: parts.length >= 6 ? parts.slice(0, parts.length - 5).join(':') : '',
    port: parts.length >= 6 && /^\d+$/.test(parts[parts.length - 5]) ? Number(parts[parts.length - 5]) : null,
  }
}

export function parseNodeLink(link: string): NodeLinkInfo | null {
  const trimmed = link.trim()
  const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//.exec(trimmed)
  if (!schemeMatch) return null
  const protocol = schemeMatch[1].toLowerCase()
  const rest = trimmed.slice(schemeMatch[0].length)
  if (protocol === 'vmess') return parseVmess(rest)
  if (protocol === 'ss') return parseShadowsocks(rest)
  if (protocol === 'ssr') return parseShadowsocksR(rest)
  const info = parseURLStyle(protocol === 'hy2' ? 'hysteria2' : protocol, rest)
  if (!KNOWN_PROTOCOLS.has(protocol)) return { ...info, protocol }
  if (protocol === 'trojan' || protocol === 'https') info.port = info.port ?? 443
  return info
}

/**
 * 为导入节点生成 dae 配置键。配置键会成为 dae 运行时的节点名称，分组据此精确引用，
 * 不再依赖不同版本、不同协议解析器对分享链接备注的命名结果。
 */
export function allocateNodeTags(links: string[], existing: Iterable<string> = []): string[] {
  const used = new Set([...existing].map((value) => value.trim()).filter(Boolean))
  return links.map((link) => {
    const info = parseNodeLink(link)
    const displayName = normalizeTag(info?.name || '')
    const endpoint = normalizeTag([info?.protocol, info?.host].filter(Boolean).join('_'))
    const base = displayName || endpoint || 'node'
    let candidate = base
    for (let suffix = 2; used.has(candidate); suffix += 1) candidate = `${base}_${suffix}`
    used.add(candidate)
    return candidate
  })
}

function normalizeTag(value: string): string {
  let normalized = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9_.-]+/g, '_')
    .replace(/^[-.]+|[-.]+$/g, '')
    .replace(/_+/g, '_')
    .slice(0, 64)
    .replace(/[-._]+$/g, '')
  if (normalized === '') return ''
  if (!/^[A-Za-z_]/.test(normalized)) normalized = `node_${normalized}`
  return normalized
}

/**
 * latencyTarget 把节点信息收敛成可探测的目标。校验规则要和后端
 * netprobe 的 Target.validate 对齐：主机不能带空白或斜杠、长度 <=253，
 * 端口必须在 1-65535。首页和编排页共用这一份，避免两边各写一套。
 */
export function latencyTarget(info: NodeLinkInfo | null): { host: string; port: number } | null {
  const host = info?.host
  const port = info?.port
  if (!host || host !== host.trim() || host.length > 253 || /[\s/\\]/.test(host)) return null
  if (typeof port !== 'number' || !Number.isInteger(port) || port < 1 || port > 65535) return null
  return { host, port }
}
