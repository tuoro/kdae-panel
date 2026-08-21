import { describe, expect, it } from 'vitest'
import { hasReadableCache, parseScheme, supportsPersistence, togglePersistence } from './subscription'

describe('parseScheme', () => {
  it('识别持久化后缀与本地订阅', () => {
    expect(parseScheme('https://example.com/sub')).toEqual({
      scheme: 'https', base: 'https', persistent: false, local: false,
    })
    expect(parseScheme('https-file://example.com/sub')).toEqual({
      scheme: 'https-file', base: 'https', persistent: true, local: false,
    })
    expect(parseScheme('file://relative/mysub.sub')).toMatchObject({ base: 'file', local: true })
    expect(parseScheme('不是链接')).toBeNull()
  })
})

describe('supportsPersistence', () => {
  it('只有需要拉取的订阅支持缓存回退', () => {
    expect(supportsPersistence('https://example.com/sub')).toBe(true)
    expect(supportsPersistence('http://example.com/sub')).toBe(true)
    expect(supportsPersistence('file://relative/mysub.sub')).toBe(false)
    expect(supportsPersistence('file-file://x')).toBe(false)
    expect(supportsPersistence('随便写的')).toBe(false)
  })
})

describe('hasReadableCache', () => {
  it('接受 dae 持久化订阅和面板托管订阅', () => {
    expect(hasReadableCache('https-file://example.com/sub')).toBe(true)
    expect(hasReadableCache('file://managed.d/main-0123456789abcdef.sub')).toBe(true)
  })

  it('不把普通远程订阅或任意本地文件当作可预览缓存', () => {
    expect(hasReadableCache('https://example.com/sub')).toBe(false)
    expect(hasReadableCache('file://custom/subscription.txt')).toBe(false)
  })
})

describe('togglePersistence', () => {
  it('只改 scheme,链接其余部分逐字符保留', () => {
    const link = 'https://example.com/sub?token=a%20b&x=1#frag'
    const persistent = togglePersistence(link)
    expect(persistent).toBe('https-file://example.com/sub?token=a%20b&x=1#frag')
    expect(togglePersistence(persistent)).toBe(link)
  })

  it('往返幂等,且不动本地订阅与非链接', () => {
    for (const link of ['http://a/b', 'https://a/b', 'https-file://a/b']) {
      expect(togglePersistence(togglePersistence(link))).toBe(link)
    }
    expect(togglePersistence('file://relative/mysub.sub')).toBe('file://relative/mysub.sub')
    expect(togglePersistence('不是链接')).toBe('不是链接')
  })

  it('保留基础 scheme 的原有大小写,后缀按小写写入', () => {
    expect(togglePersistence('HTTPS://Example.COM/Sub')).toBe('HTTPS-file://Example.COM/Sub')
    expect(togglePersistence('HTTPS-FILE://a/b')).toBe('HTTPS://a/b')
    // 真实 scheme 都是小写，这一形式必须逐字节往返
    expect(togglePersistence(togglePersistence('HTTPS://Example.COM/Sub'))).toBe('HTTPS://Example.COM/Sub')
    expect(parseScheme('HTTPS-FILE://a/b')).toMatchObject({ scheme: 'HTTPS-FILE', base: 'https', persistent: true })
  })

  it('基础 scheme 本身以 -file 结尾时不可切换,不做哑控件', () => {
    expect(supportsPersistence('x-file-file://a/b')).toBe(false)
    expect(togglePersistence('x-file-file://a/b')).toBe('x-file-file://a/b')
  })
})
