// dae 的订阅持久化约定:scheme 带 `-file` 后缀时,dae 会把成功拉取的内容写入
// config_dir/persist.d/<tag>.sub,并在后续拉取失败时回退使用该缓存。
// 参见上游 example.dae 的 subscription 节。

const PERSIST_SUFFIX = '-file'
const MANAGED_CACHE_PREFIX = 'file://managed.d/'

export interface SubscriptionScheme {
  /** 原文中的 scheme,大小写保持不变。 */
  scheme: string
  /** 去掉 -file 后缀的基础 scheme(小写)。 */
  base: string
  persistent: boolean
  /** file:// 形式的本地订阅:内容由用户自备,不涉及拉取与缓存。 */
  local: boolean
}

export function parseScheme(link: string): SubscriptionScheme | null {
  const matched = /^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//.exec(link.trim())
  if (!matched) return null
  const scheme = matched[1]
  const persistent = scheme.toLowerCase().endsWith(PERSIST_SUFFIX)
  const base = (persistent ? scheme.slice(0, -PERSIST_SUFFIX.length) : scheme).toLowerCase()
  return { scheme, base, persistent, local: base === 'file' }
}

/**
 * 只有需要联网拉取、且基础 scheme 本身不以 -file 结尾的订阅才可切换缓存。
 * 后者(如 x-file-file://)切换后无法往返,与其做成哑控件不如直接标记为不可切换。
 */
export function supportsPersistence(link: string): boolean {
  const parsed = parseScheme(link)
  if (parsed === null || parsed.local) return false
  return !parsed.base.endsWith(PERSIST_SUFFIX)
}

/** 分组节点预览只读取已经落盘的缓存，包括 dae 持久化缓存与面板托管缓存。 */
export function hasReadableCache(link: string): boolean {
  const trimmed = link.trim()
  return parseScheme(trimmed)?.persistent === true
    || trimmed.toLowerCase().startsWith(MANAGED_CACHE_PREFIX)
}

/** 在 `https://` 与 `https-file://` 之间切换,scheme 大小写与链接其余部分原样保留。 */
export function togglePersistence(link: string): string {
  const parsed = parseScheme(link)
  if (!supportsPersistence(link) || !parsed) return link
  const rest = link.trim().slice(parsed.scheme.length)
  const scheme = parsed.persistent
    ? parsed.scheme.slice(0, -PERSIST_SUFFIX.length)
    : parsed.scheme + PERSIST_SUFFIX
  return scheme + rest
}
