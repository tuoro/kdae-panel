import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const configPath = join(here, '.work', 'config.dae')

const PASSWORD = 'e2e-Password-2026'
const NODE_LINK = 'trojan://demo@e2e-node.example.com:443?sni=e2e-node.example.com#E2E-01'
const NODE_LINKS = [
  NODE_LINK,
  'ss://YWVzLTI1Ni1nY206ZGVtbw@sg1.example.com:8388#SG-01',
  'vless://00000000-0000-4000-8000-000000000001@us1.example.com:443?security=reality#US-01',
].join('\n')
const UPDATE_SCREENSHOTS = process.env.UPDATE_README_SCREENSHOTS === 'true'

async function capture(page: import('@playwright/test').Page, name: string, width: number, height: number) {
  if (!UPDATE_SCREENSHOTS) return
  await page.setViewportSize({ width, height })
  await page.evaluate(() => window.scrollTo(0, 0))
  const content = page.locator('.app-content > .n-layout-scroll-container')
  if (await content.count()) {
    await content.evaluate((element) => {
      element.scrollTop = 0
      element.scrollLeft = 0
    })
  }
  await expect(page.locator('.n-message:visible')).toHaveCount(0, { timeout: 6_000 })
  await page.screenshot({
    path: join(here, '..', 'docs', 'screenshots', name),
    animations: 'disabled',
  })
}

async function maskConfigPathForScreenshot(route: import('@playwright/test').Route) {
  if (route.request().method() !== 'GET') return route.continue()
  const response = await route.fetch()
  const body = await response.json()
  await route.fulfill({
    response,
    json: { ...body, path: '/etc/dae/config.dae' },
  })
}

async function mockInstalledGeoForScreenshot(route: import('@playwright/test').Route) {
  if (route.request().method() !== 'GET') return route.continue()
  const response = await route.fetch()
  const body = await response.json()
  const files = body.status.files.map((file: { name: string }) => ({
    ...file,
    present: true,
    path: `/etc/dae/${file.name}`,
    targetPath: `/etc/dae/${file.name}`,
    size: file.name === 'geoip.dat' ? 24_371_200 : 47_923_712,
    modTime: '2026-08-01T08:00:00Z',
    shadowed: [],
  }))
  await route.fulfill({
    response,
    json: {
      ...body,
      status: {
        ...body.status,
        files,
        targetDir: '/etc/dae',
        managed: {
          source: 'loyalsoldier',
          repositories: ['Loyalsoldier/geoip', 'Loyalsoldier/v2ray-rules-dat'],
          tag: '20260801',
          updatedAt: '2026-08-01T08:00:00Z',
        },
        problem: undefined,
        warnings: [],
        serviceState: 'active',
      },
    },
  })
}

async function clickVisibleOption(page: import('@playwright/test').Page, text: string) {
  const option = page.locator('.n-base-select-option:visible', { hasText: text })
  await option.waitFor({ state: 'visible' })
  // Naive UI 的选项会随下拉动画移动，DOM 点击可避免 Playwright 在稳定性等待期间错过它。
  await option.evaluate((element) => (element as HTMLElement).click())
}

async function expectCardsAligned(locator: import('@playwright/test').Locator) {
  await expect.poll(async () => {
    const boxes = await locator.evaluateAll((cards) => cards.map((card) => {
      const box = card.getBoundingClientRect()
      return { top: Math.round(box.top), height: box.height }
    }))
    const rows = Map.groupBy(boxes, ({ top }) => top)
    const sharedRows = [...rows.values()].filter((row) => row.length > 1)
    if (!sharedRows.length) return Number.POSITIVE_INFINITY
    return Math.max(...sharedRows.map((row) => {
      const heights = row.map(({ height }) => height)
      return Math.max(...heights) - Math.min(...heights)
    }))
  }).toBeLessThanOrEqual(1)
}

async function expectColumnsAligned(locator: import('@playwright/test').Locator) {
  await expect.poll(async () => {
    const bottoms = await locator.evaluateAll((columns) => columns.map((column) => column.getBoundingClientRect().bottom))
    if (bottoms.length < 2) return Number.POSITIVE_INFINITY
    return Math.max(...bottoms) - Math.min(...bottoms)
  }).toBeLessThanOrEqual(1)
}

// 一条链路走完初始化 → 概览 → 编排保存 → 退出重登：
// 这是唯一同时压到路由守卫、CSRF、配置事务与 dae 校验桩的测试，
// 步骤之间共享账号与磁盘状态，因此收在一个用例里按序执行。
test('首次初始化到编排保存的完整链路', async ({ page }) => {
  test.setTimeout(UPDATE_SCREENSHOTS ? 150_000 : 120_000)
  await test.step('通过一次性链接初始化管理员', async () => {
    await page.goto('/setup#bootstrap=e2e-bootstrap')
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', '/favicon.svg')
    expect((await page.request.get('/favicon.svg')).status()).toBe(200)
    await expect(page.getByRole('heading', { name: '创建管理员' })).toBeVisible()
    await expect(page.getByRole('button', { name: '完成初始化' })).toBeVisible()
    await capture(page, 'setup.png', 1600, 900)
    await page.getByPlaceholder('至少 12 个字符').fill(PASSWORD)
    await page.locator('.n-form-item', { hasText: '确认密码' }).locator('input').fill(PASSWORD)
    await page.getByRole('button', { name: '完成初始化' }).click()
    // 初始化成功即已登录，落在运行概览
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
  })

  await test.step('概览呈现 systemd 桩给出的健康状态', async () => {
    const metrics = page.locator('.metric-card')
    await expect(metrics).toHaveCount(3)
    await expect(metrics.first()).toContainText('运行中')
    await expectCardsAligned(metrics)
    await expect(page.getByText('本次运行时长', { exact: true })).toBeVisible()
    await expect(page.getByText('随系统启动', { exact: true })).toBeVisible()
    await expect(page.getByText('dae version v1.0.6')).toBeVisible()
    await expectCardsAligned(page.locator('.equal-height-grid .panel-card'))
  })

  await test.step('Geo 数据是独立入口并可持久化自定义来源', async () => {
    const dashboardLink = page.locator('.app-sidebar a[href="/"]')
    const geoLink = page.locator('.app-sidebar a[href="/geo"]')
    await geoLink.click()
    await expect(page).toHaveURL(/\/geo$/)
    await expect(page.getByRole('heading', { name: 'Geo 数据', level: 2 })).toBeVisible()
    await expect(page.locator('.app-sidebar .n-menu-item-content', { hasText: 'Geo 数据' })).toHaveClass(/n-menu-item-content--selected/)
    await expect(dashboardLink).not.toHaveAttribute('aria-current', 'page')
    await expect(dashboardLink).not.toHaveClass(/router-link-active/)
    expect(await dashboardLink.evaluate((link) => !link.closest('.n-menu-item-content')?.matches(':focus-within'))).toBe(true)
    expect(await geoLink.evaluate((link) => document.activeElement === link)).toBe(true)
    expect(await dashboardLink.evaluate((link) => {
      const item = link.closest('.n-menu-item-content')
      return item ? getComputedStyle(item, '::before').transitionDuration : null
    })).toBe('0s')
    await expect(page.getByText('geoip.dat', { exact: true })).toBeVisible()
    await expect(page.getByText('geosite.dat', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: '来源管理' }).click()
    const manager = page.locator('.n-modal', { hasText: 'Geo 数据来源' })
    await manager.getByRole('button', { name: '添加来源' }).click()
    const editor = page.locator('.n-modal', { hasText: '添加自定义来源' })
    await editor.getByPlaceholder('例如：自建规则集').fill('E2E 自建规则')
    await editor.getByPlaceholder('https://…/geoip.dat', { exact: true }).fill('https://assets.example.com/geoip.dat')
    await editor.getByPlaceholder('https://…/geoip.dat.sha256sum', { exact: true }).fill('https://checks.example.com/geoip.dat.sha256sum')
    await editor.getByPlaceholder('https://…/geosite.dat', { exact: true }).fill('https://assets.example.com/geosite.dat')
    await editor.getByPlaceholder('https://…/geosite.dat.sha256sum', { exact: true }).fill('https://checks.example.com/geosite.dat.sha256sum')
    await editor.getByRole('button', { name: '保存来源' }).click()
    await expect(manager.getByText('E2E 自建规则')).toBeVisible()
    await manager.locator('.n-base-close').click()

    await page.reload()
    await page.getByRole('button', { name: '来源管理' }).click()
    const reopenedManager = page.locator('.n-modal', { hasText: 'Geo 数据来源' })
    const sourceRow = reopenedManager.locator('.geo-custom-source-row', { hasText: 'E2E 自建规则' })
    await expect(sourceRow).toContainText('assets.example.com')
    await reopenedManager.locator('.n-base-close').click()
    await expect(reopenedManager).toBeHidden()

    if (UPDATE_SCREENSHOTS) {
      await page.route('**/api/v1/dae/geo', mockInstalledGeoForScreenshot)
      await page.reload()
      await expect(page.getByText('/etc/dae/geoip.dat')).toBeVisible()
      await expect(page.getByText('Loyalsoldier 规则集', { exact: true })).toBeVisible()
    }
    await capture(page, 'geo.png', 1600, 1000)
    if (UPDATE_SCREENSHOTS) {
      await page.unroute('**/api/v1/dae/geo', mockInstalledGeoForScreenshot)
      await page.reload()
    }

    await page.setViewportSize({ width: 390, height: 844 })
    await page.getByRole('button', { name: '来源管理' }).click()
    const mobileManager = page.locator('.n-modal', { hasText: 'Geo 数据来源' })
    await expect(mobileManager.getByText('E2E 自建规则')).toBeVisible()
    const modalBox = await mobileManager.boundingBox()
    expect(modalBox).not.toBeNull()
    expect(modalBox!.x).toBeGreaterThanOrEqual(0)
    expect(modalBox!.x + modalBox!.width).toBeLessThanOrEqual(390)
    expect(await mobileManager.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
    await mobileManager.locator('.n-base-close').click()
    await expect(mobileManager).toBeHidden()

    await page.setViewportSize({ width: 1600, height: 900 })
    await page.getByRole('button', { name: '来源管理' }).click()
    const cleanupManager = page.locator('.n-modal', { hasText: 'Geo 数据来源' })
    const cleanupRow = cleanupManager.locator('.geo-custom-source-row', { hasText: 'E2E 自建规则' })
    await expect(cleanupRow).toBeVisible()
    await cleanupRow.getByRole('button', { name: '删除来源' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '删除来源' }).click()
    await expect(cleanupRow).toHaveCount(0)
    await expect(cleanupManager.getByText('尚未添加自定义来源')).toBeVisible()
    await cleanupManager.locator('.n-base-close').click()

    const residualRoute = async (route: import('@playwright/test').Route) => {
      if (route.request().method() !== 'GET') return route.continue()
      const response = await route.fetch()
      const body = await response.json()
      await route.fulfill({
        response,
        json: {
          ...body,
          status: {
            ...body.status,
            updatable: false,
            problem: '发现上次 Geo 更新遗留的回滚点',
            residuals: [
              {
                path: '/etc/dae/geosite.dat.kdae-panel-previous',
                kind: 'rollback',
                size: 47_923_712,
                modTime: '2026-08-01T07:00:00Z',
                targetPath: '/etc/dae/geosite.dat',
                restorable: true,
                deletable: false,
              },
              {
                path: '/etc/dae/.kdae-panel-geo-abandoned-transaction-file-with-a-long-name',
                kind: 'temporary',
                size: 24_371_200,
                modTime: '2026-08-01T06:00:00Z',
                restorable: false,
                deletable: true,
              },
            ],
          },
        },
      })
    }
    await page.route('**/api/v1/dae/geo', residualRoute)
    await page.reload()
    await expect(page.getByRole('button', { name: '恢复缺失文件' })).toBeVisible()
    await expect(page.getByRole('button', { name: '清理安全残留' })).toBeVisible()
    await page.setViewportSize({ width: 390, height: 844 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/dae/geo', residualRoute)
    await page.setViewportSize({ width: 1600, height: 900 })
  })

  await test.step('导入节点并保存重载，改动落到磁盘', async () => {
    await page.route('**/api/v1/host/interfaces', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        { name: 'dae0', addresses: ['10.0.0.1/24'] },
        { name: 'ens2', addresses: ['192.168.50.23/24', 'fe80::1/64'] },
        { name: 'lo', addresses: ['127.0.0.1/8', '::1/128'] },
      ]),
    }))
    await page.goto('/proxy')
    await expect(page.getByText('检测到入口配置缺少 dns 节')).toBeVisible()
    await expectCardsAligned(page.locator('.equal-height-grid .panel-card'))
    for (const [toolbar, content] of [
      ['subscription-add', 'subscription-list'],
      ['group-add', 'group-list'],
    ] as const) {
      const positions = await Promise.all([
        page.getByTestId(toolbar).evaluate((element) => element.getBoundingClientRect().top),
        page.getByTestId(content).first().evaluate((element) => element.getBoundingClientRect().top),
      ])
      expect(positions[0], `${toolbar} 应固定在内容区上方`).toBeLessThan(positions[1])
    }

    const global = page.getByTestId('global-card')
    await expect(global).toBeVisible()
    await global.getByRole('button', { name: '编辑设置' }).click()
    const globalModal = page.getByTestId('global-editor-modal')
    const logLevel = globalModal.locator('.global-field', { hasText: '日志级别' })
    const logLevelSelect = logLevel.locator('.n-base-selection')
    await expect(logLevelSelect).toContainText('info')
    await logLevelSelect.click()
    await clickVisibleOption(page, 'debug')
    const lanInterface = globalModal.locator('.global-field', { hasText: '局域网接口' })
    await lanInterface.locator('.n-base-selection').click()
    const ens2Option = page.locator('.interface-option', { hasText: 'ens2' })
    await expect(ens2Option).toContainText('192.168.50.23/24')
    await ens2Option.click()
    await expect(lanInterface.locator('.n-base-selection')).toContainText('ens2')

    const wanInterface = globalModal.locator('.global-field', { hasText: '广域网接口' })
    await wanInterface.locator('.n-base-selection').click()
    const autoOption = page.locator('.interface-option', { hasText: '自动识别' })
    await expect(autoOption).toContainText('由 dae 自动选择默认广域网接口')
    await autoOption.click()
    await expect(wanInterface.locator('.n-base-selection')).toContainText('自动识别')
    await globalModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(global).toContainText('debug')
    await expect(global).toContainText('auto')

    const dns = page.getByTestId('dns-card')
    await expect(dns).toContainText('2 个上游')
    await expect(dns).toContainText('4 条规则')
    await dns.getByRole('button', { name: '编辑 DNS' }).click()
    const dnsModal = page.getByTestId('dns-editor-modal')
    const dnsSimpleTab = dnsModal.locator('.n-tabs-tab', { hasText: '简单模式' })
    const dnsAdvancedTab = dnsModal.locator('.n-tabs-tab', { hasText: '进阶模式' })
    await expect(dnsSimpleTab).toHaveClass(/n-tabs-tab--active/)
    await expect.poll(async () => (await dnsModal.boundingBox())?.height || 0).toBeGreaterThan(600)
    const dnsModalLayout = await dnsModal.evaluate((element) => {
      const content = element.querySelector<HTMLElement>(':scope > .n-card-content')
      const footer = element.querySelector<HTMLElement>(':scope > .n-card__footer')
      const modalRect = element.getBoundingClientRect()
      const contentRect = content?.getBoundingClientRect()
      const footerRect = footer?.getBoundingClientRect()
      return {
        background: getComputedStyle(element).backgroundColor,
        height: modalRect.height,
        overflow: getComputedStyle(element).overflow,
        contentOverflowY: content ? getComputedStyle(content).overflowY : '',
        contentInside: !!contentRect && contentRect.bottom <= modalRect.bottom + 1,
        footerInside: !!footerRect && footerRect.bottom <= modalRect.bottom + 1,
      }
    })
    expect(dnsModalLayout).toMatchObject({
      background: 'rgb(44, 44, 50)',
      overflow: 'hidden',
      contentOverflowY: 'auto',
      contentInside: true,
      footerInside: true,
    })
    expect(dnsModalLayout.height).toBeGreaterThan(600)
    const ipPreferenceSelect = dnsModal.locator('.dns-settings-grid label', { hasText: 'IP 版本偏好' }).locator('.n-base-selection')
    await ipPreferenceSelect.click()
    const dnsSelectMenu = page.locator('.n-base-select-menu:visible')
    await expect(dnsSelectMenu).toBeVisible()
    await expect.poll(() => dnsSelectMenu.evaluate((element) => getComputedStyle(element).backgroundColor))
      .toBe('rgb(23, 26, 29)')
    await clickVisibleOption(page, '跟随请求（默认）')
    const simpleUpstream = dnsModal.getByTestId('dns-upstreams-editor').getByLabel('上游地址').first().locator('input')
    await simpleUpstream.fill('udp://1.1.1.1:53')
    await dnsAdvancedTab.click()
    const dnsSource = dnsModal.locator('textarea')
    const originalDNSBody = await dnsSource.inputValue()
    await expect(originalDNSBody).toContain("alidns: 'udp://223.5.5.5:53'")
    const advancedDNSDraft = `${originalDNSBody}\n# 仅保留在进阶草稿`
    await dnsSource.fill(advancedDNSDraft)
    await dnsSimpleTab.click()
    await expect(simpleUpstream).toHaveValue('udp://1.1.1.1:53')
    await dnsAdvancedTab.click()
    await expect(dnsSource).toHaveValue(advancedDNSDraft)
    await dnsModal.getByRole('button', { name: '取消' }).click()

    // 取消后两份草稿都应丢弃；重开看到的仍是配置正文，而不是任一未应用草稿。
    await dns.getByRole('button', { name: '编辑 DNS' }).click()
    const reopenedDNSModal = page.getByTestId('dns-editor-modal')
    await reopenedDNSModal.locator('.n-tabs-tab', { hasText: '进阶模式' }).click()
    await expect(reopenedDNSModal.locator('textarea')).toHaveValue(originalDNSBody)
    await reopenedDNSModal.locator('.n-tabs-tab', { hasText: '简单模式' }).click()
    await reopenedDNSModal.getByTestId('dns-upstreams-editor').getByLabel('上游地址').first().locator('input').fill('udp://1.1.1.1:53')
    const requestRules = reopenedDNSModal.getByTestId('dns-request-rules-editor')
    await requestRules.getByRole('button', { name: '添加规则' }).click()
    const nodeDNSRule = requestRules.locator('.dns-rule-row').last()
    await nodeDNSRule.getByLabel('DNS 条件类型').click()
    await clickVisibleOption(page, '节点解析 · node')
    await nodeDNSRule.getByLabel('DNS 条件字段').click()
    await clickVisibleOption(page, '节点名称包含')
    await nodeDNSRule.getByLabel('DNS 条件值').locator('input').fill('hk')
    await expect(nodeDNSRule.getByLabel('DNS 规则目标').locator('.n-base-selection')).toContainText('alidns')
    await reopenedDNSModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(page.getByText('DNS 设置已应用到编排，保存并重载后生效')).toBeVisible()

    const groups = page.getByTestId('groups-card')
    await groups.getByPlaceholder('新分组名，如 proxy').fill('proxy')
    await groups.getByRole('button', { name: '新建' }).click()

    await page.getByRole('button', { name: '导入节点' }).click()
    await page.getByPlaceholder(/vmess/).fill(NODE_LINKS)
    await expect(page.getByTestId('import-node-groups')).toContainText('proxy')
    await page.getByRole('button', { name: '加入编排' }).click()
    await expect(page.getByText('e2e-node.example.com').first()).toBeVisible()
    const groupItem = groups.locator('.group-item', { hasText: 'proxy' })
    await groupItem.locator('.group-row').first().locator('.n-base-selection').first().click()
    await clickVisibleOption(page, '固定节点')
    const fixedGroupModal = page.getByTestId('group-editor-modal')
    await expect(fixedGroupModal.getByRole('spinbutton')).toHaveCount(0)
    await fixedGroupModal.getByTestId('group-fixed-node-picker').locator('.n-base-selection').click()
    await clickVisibleOption(page, 'SG-01')
    await fixedGroupModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(groupItem.getByText('SG-01', { exact: true })).toBeVisible()
    await page.getByTestId('nodes-card').getByRole('button', { name: '编辑原文' }).click()
    const nodeSourceModal = page.locator('.n-modal', { hasText: '编辑节点原文' })
    await expect(nodeSourceModal).toBeVisible()
    await expect(page).toHaveURL(/\/proxy$/)
    await nodeSourceModal.getByRole('button', { name: '取消' }).click()

    const subscriptions = page.getByTestId('subscriptions-card')
    await subscriptions.getByPlaceholder('标签(可选)').fill('e2e_sub')
    await subscriptions.getByPlaceholder('https://example.com/subscription').fill('https://example.com/e2e')
    await subscriptions.getByRole('button', { name: '添加', exact: true }).click()
    const subscriptionRow = subscriptions.locator('tr', { hasText: 'e2e_sub' })
    await expect(subscriptionRow).toBeVisible()
    await subscriptionRow.getByRole('button', { name: '编辑' }).click()
    const subscriptionModal = page.locator('.n-modal', { hasText: '编辑订阅' })
    await subscriptionModal.getByPlaceholder('https://example.com/subscription').fill('https-file://example.com/e2e-updated')
    await subscriptionModal.getByRole('button', { name: '确定' }).click()
    await expect(subscriptionRow).toContainText('e2e-updated')

    await groupItem.getByRole('button', { name: '编辑' }).click()
    const groupModal = page.getByTestId('group-editor-modal')
    await groupModal.getByTestId('group-policy-picker').locator('.n-base-selection').click()
    await clickVisibleOption(page, 'min_moving_avg')
    await groupModal.getByRole('button', { name: '选择节点' }).click()
    await groupModal.getByTestId('group-node-picker').locator('.n-base-selection').click()
    await clickVisibleOption(page, 'E2E-01')
    await groupModal.getByRole('button', { name: '订阅节点' }).click()
    await groupModal.getByTestId('group-subscription-node-source').locator('.n-base-selection').click()
    await clickVisibleOption(page, 'e2e_sub')
    await groupModal.getByTestId('group-subscription-node-picker').locator('.n-base-selection').click()
    await clickVisibleOption(page, 'SUB-HK')
    await groupModal.getByRole('button', { name: '整份订阅' }).click()
    await groupModal.getByTestId('group-subscription-picker').locator('.n-base-selection').click()
    await clickVisibleOption(page, 'e2e_sub')
    await groupModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(groupItem).toContainText('节点：E2E-01')
    await expect(groupItem).toContainText('订阅 e2e_sub：SUB-HK')
    await expect(groupItem).toContainText('订阅：e2e_sub')

    await page.setViewportSize({ width: 390, height: 844 })
    await groupItem.getByRole('button', { name: '编辑', exact: true }).click()
    const mobileGroupModal = page.getByTestId('group-editor-modal')
    const mobileNodePicker = mobileGroupModal.getByTestId('group-node-picker-mobile')
    await expect(mobileNodePicker).toHaveText('已选择 1 个节点')
    await mobileNodePicker.click()
    const mobileNodeDrawer = page.locator('.mobile-node-picker-drawer')
    await expect(mobileNodeDrawer).toBeVisible()
    await mobileNodeDrawer.getByPlaceholder('搜索节点名称、协议或地址').fill('E2E')
    await expect(mobileNodeDrawer.locator('.mobile-node-picker-option')).toHaveCount(1)
    await expect(mobileNodeDrawer).toContainText('E2E-01')
    expect(await page.evaluate(() => document.body.scrollWidth)).toBeLessThanOrEqual(390)
    await mobileNodeDrawer.getByRole('button', { name: '完成' }).click()
    await mobileGroupModal.getByRole('button', { name: '取消' }).click()
    await page.setViewportSize({ width: 1600, height: 900 })

    const routing = page.getByTestId('routing-card')
    await routing.getByRole('button', { name: '添加规则' }).click()
    const ruleModal = page.getByTestId('routing-rule-modal')
    await ruleModal.getByRole('button', { name: '应用到编排' }).click()
    const rule = routing.locator('.routing-rule', { hasText: 'domain(geosite:gfw)' })
    await expect(rule).toContainText('proxy')
    await rule.getByRole('button', { name: '编辑' }).click()
    await ruleModal.getByPlaceholder('geosite:gfw').fill('geosite:cn')
    await ruleModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(routing.getByText('domain(geosite:cn)')).toBeVisible()

    const compoundMatch = 'pname(AdGuardHome) && l4proto(udp) && dport(53)'
    await routing.getByRole('button', { name: '添加规则' }).click()
    await ruleModal.locator('.n-base-selection').first().click()
    await clickVisibleOption(page, '高级匹配表达式')
    const compoundInput = ruleModal.getByPlaceholder('domain(geosite:gfw) && dport(443)')
    await compoundInput.fill(compoundMatch)
    await ruleModal.getByRole('button', { name: '应用到编排' }).click()

    const compoundRule = routing.locator('.routing-rule', { hasText: compoundMatch })
    await compoundRule.getByRole('button', { name: '编辑' }).click()
    await expect(ruleModal.locator('.n-base-selection').first()).toContainText('高级匹配表达式')
    await expect(compoundInput).toHaveValue(compoundMatch)
    await ruleModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(routing.getByText(compoundMatch, { exact: true })).toBeVisible()

    await routing.getByRole('button', { name: '编辑路由' }).click()
    const routingModal = page.getByTestId('routing-editor-modal')
    const advancedTab = routingModal.locator('.n-tabs-tab', { hasText: '高级模式' })
    const simpleTab = routingModal.locator('.n-tabs-tab', { hasText: '简单模式' })
    await expect(advancedTab).toHaveClass(/n-tabs-tab--active/)
    await expect(page).toHaveURL(/\/proxy$/)
    const originalAdvanced = await routingModal.locator('textarea').inputValue()
    await simpleTab.click()
    await advancedTab.click()
    await expect(routingModal.locator('textarea')).toHaveValue(originalAdvanced)
    await routingModal.getByRole('button', { name: '取消' }).click()
    await expect(routing.getByText('domain(geosite:cn)')).toBeVisible()

    await routing.getByRole('button', { name: '编辑路由' }).click()
    const reopenedRoutingModal = page.getByTestId('routing-editor-modal')
    await reopenedRoutingModal.locator('.n-tabs-tab', { hasText: '简单模式' }).click()
    await reopenedRoutingModal.getByRole('button', { name: '应用到编排' }).click()
    await expect(routing.getByText('pname(NetworkManager, systemd-resolved, dnsmasq)')).toBeVisible()

    await page.locator('.page-toolbar').getByRole('button', { name: '保存并重载' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '保存并重载' }).click()
    await expect(page.getByText('编排结果已保存并完成无损重载').first()).toBeVisible()

    // 面板宣称保存成功，磁盘上必须真的有这一行——这是配置事务的最终断言
    const saved = readFileSync(configPath, 'utf8')
    expect(saved).toContain(NODE_LINK)
    expect(saved).toContain(`E2E-01: '${NODE_LINK}'`)
    expect(saved).toContain("e2e_sub: 'https-file://example.com/e2e-updated'")
    expect(saved).toContain('filter: name(E2E-01)')
    expect(saved).toContain('filter: subtag(e2e_sub)')
    expect(saved).toContain('filter: subtag(e2e_sub) && name(SUB-HK)')
    expect(saved).toContain('domain(geosite:gfw) -> proxy')
    expect(saved).toContain('log_level: debug')
    expect(saved).toContain("lan_interface: 'ens2'")
    expect(saved).toContain("wan_interface: 'auto'")
    expect(saved).toContain("alidns: 'udp://1.1.1.1:53'")
    expect(saved).toContain('node(name_keyword: hk) -> alidns')
    expect(saved).not.toContain('仅保留在进阶草稿')

    await capture(page, 'orchestration.png', 1600, 1120)
    const capabilityPattern = '**/api/v1/dae/capabilities'
    const maskCapabilityPath = async (route: import('@playwright/test').Route) => {
      const response = await route.fetch()
      const body = await response.json()
      await route.fulfill({ response, json: { ...body, binary: '/usr/bin/dae' } })
    }
    if (UPDATE_SCREENSHOTS) {
      await page.route(capabilityPattern, maskCapabilityPath)
    }
    await page.goto('/')
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
    await expect(page.getByText('运行中', { exact: true })).toBeVisible()
    await expect(page.getByText('dae version v1.0.6')).toBeVisible()
    await expect(page.locator('.metric-card .n-skeleton')).toHaveCount(0)
    await page.getByRole('button', { name: '暂停' }).click()
    await page.getByRole('button', { name: '确认暂停' }).click()
    await expect(page.getByText('dae 已暂停', { exact: true })).toBeVisible()
    await expect(page.getByText('代理流量处理已停止，但 dae 进程仍在运行；点击“无损重载”即可恢复。')).toBeVisible()
    await page.getByRole('button', { name: '无损重载' }).click()
    await expect(page.getByText('dae 已暂停', { exact: true })).toHaveCount(0)
    await capture(page, 'dashboard.png', 1600, 900)
    if (UPDATE_SCREENSHOTS) {
      await page.unroute(capabilityPattern, maskCapabilityPath)
    }
  })

  await test.step('原始配置与动态能力页面展示当前 dae 数据', async () => {
    if (UPDATE_SCREENSHOTS) {
      await page.route('**/api/v1/config', maskConfigPathForScreenshot)
    }
    await page.goto('/config')
    await expect(page.getByRole('heading', { name: '入口配置', level: 2 })).toBeVisible()
    await expect(page.locator('.config-editor textarea')).toHaveValue(/global \{/)
    await capture(page, 'config.png', 1600, 1120)
    if (UPDATE_SCREENSHOTS) {
      await page.unroute('**/api/v1/config', maskConfigPathForScreenshot)
    }

    await page.goto('/schema')
    await expect(page.getByRole('heading', { name: '动态配置能力', level: 2 })).toBeVisible()
    await expect(page.locator('.schema-loading')).toHaveCount(0)
    await expect(page.locator('.outline-node.root')).toHaveCount(2)
    await capture(page, 'schema.png', 1600, 1120)
  })

  await test.step('配置存档可以命名、恢复并删除', async () => {
    await page.goto('/backups')
    await expect(page.getByRole('heading', { name: '配置历史', level: 2 })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: '备份编号' })).toHaveCount(0)
    await page.getByRole('button', { name: '保存当前配置' }).click()
    const editor = page.locator('.n-modal', { hasText: '保存当前配置' })
    await editor.getByPlaceholder('例如：稳定线路').fill('E2E 稳定配置')
    await editor.getByPlaceholder('记录这份配置的用途或适用场景').fill('E2E 回档测试')
    await editor.getByRole('button', { name: '保存存档' }).click()
    const row = page.locator('tr', { hasText: 'E2E 稳定配置' })
    await expect(row).toContainText('E2E 回档测试')

    await row.getByTitle('编辑名称和备注').click()
    const editModal = page.locator('.n-modal', { hasText: '编辑配置存档' })
    await editModal.getByPlaceholder('例如：稳定线路').fill('E2E 已命名配置')
    await editModal.getByRole('button', { name: '保存修改' }).click()
    const renamedRow = page.locator('tr', { hasText: 'E2E 已命名配置' })
    await expect(renamedRow).toContainText('E2E 回档测试')
    await expect(renamedRow.getByRole('button', { name: '对比' })).toBeVisible()
    const downloadPromise = page.waitForEvent('download')
    await renamedRow.getByRole('button', { name: '导出' }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe('E2E 已命名配置.dae')
    const downloadedPath = await download.path()
    expect(downloadedPath).not.toBeNull()
    expect(readFileSync(downloadedPath!, 'utf8')).toContain('global {')

    await page.getByRole('button', { name: '保存当前配置' }).click()
    const batchEditor = page.locator('.n-modal', { hasText: '保存当前配置' })
    await batchEditor.getByPlaceholder('例如：稳定线路').fill('E2E 批量配置')
    await batchEditor.getByRole('button', { name: '保存存档' }).click()
    await expect(page.locator('tr', { hasText: 'E2E 批量配置' })).toBeVisible()
    await capture(page, 'backups.png', 1600, 900)

    await page.setViewportSize({ width: 390, height: 844 })
    const mobileBackupList = page.getByTestId('mobile-backup-list')
    const mobileSelection = page.getByTestId('mobile-backup-selection')
    await expect(mobileBackupList).toBeVisible()
    await expect(mobileSelection).toBeVisible()

    const toolbarButtons = page.locator('.backup-toolbar-actions .n-button')
    await expect(toolbarButtons).toHaveCount(3)
    const toolbarTops = await toolbarButtons.evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().top))
    expect(Math.max(...toolbarTops) - Math.min(...toolbarTops)).toBeLessThanOrEqual(1)

    const selectAll = mobileSelection.getByRole('checkbox', { name: '全选', exact: true })
    await selectAll.check()
    const mobileBackupCheckboxes = mobileBackupList.getByRole('checkbox')
    const mobileBackupCount = await mobileBackupCheckboxes.count()
    expect(mobileBackupCount).toBeGreaterThan(0)
    for (let index = 0; index < mobileBackupCount; index += 1) {
      await expect(mobileBackupCheckboxes.nth(index)).toBeChecked()
    }
    await expect(mobileSelection).toHaveText(/已选 (\d+) \/ 共 \1 项/)
    await selectAll.uncheck()

    const firstMobileActions = mobileBackupList.locator('.backup-mobile-actions').first()
    const actionButtons = firstMobileActions.locator('.n-button')
    await expect(actionButtons).toHaveCount(5)
    const actionTops = await actionButtons.evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().top))
    expect(Math.max(...actionTops) - Math.min(...actionTops)).toBeLessThanOrEqual(1)
    await expect(firstMobileActions.getByRole('button', { name: /编辑/ })).toBeVisible()
    await expect(firstMobileActions.getByRole('button', { name: /删除/ })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)

    await page.setViewportSize({ width: 320, height: 720 })
    const narrowActionTops = await actionButtons.evaluateAll((buttons) => buttons.map((button) => button.getBoundingClientRect().top))
    expect(Math.max(...narrowActionTops) - Math.min(...narrowActionTops)).toBeLessThanOrEqual(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1)

    await page.setViewportSize({ width: 1600, height: 900 })
    await expect(page.locator('tr', { hasText: 'E2E 已命名配置' })).toBeVisible()

    await renamedRow.getByRole('button', { name: '恢复' }).click()
    const diffModal = page.locator('.n-modal', { hasText: '配置差异 · E2E 已命名配置' })
    await expect(diffModal.getByText('这份存档与当前配置内容相同，无需恢复。')).toBeVisible()
    await expect(diffModal.getByRole('button', { name: '恢复并重载' })).toBeDisabled()
    await diffModal.getByRole('button', { name: '关闭' }).click()

    // 先让当前配置与存档产生差异，再验证“预览 -> 恢复”的完整事务入口。
    await page.goto('/config')
    const configEditor = page.locator('.config-editor textarea')
    await expect(configEditor).toHaveValue(/global \{/)
    await configEditor.fill(`${(await configEditor.inputValue()).trimEnd()}\n\n# E2E 恢复差异\n`)
    await page.locator('.page-toolbar').getByRole('button', { name: '保存并重载' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '保存并重载' }).click()
    await expect(page.locator('.n-message').getByText('配置已保存并完成无损重载')).toBeVisible()
    await page.goto('/backups')
    const restorableRow = page.locator('tr', { hasText: 'E2E 已命名配置' })
    await restorableRow.getByRole('button', { name: '恢复' }).click()
    const restorableDiff = page.locator('.n-modal', { hasText: '配置差异 · E2E 已命名配置' })
    await expect(restorableDiff.locator('.backup-diff-add, .backup-diff-remove')).not.toHaveCount(0)
    await restorableDiff.getByRole('button', { name: '恢复并重载' }).click()
    await expect(page.getByText('配置已恢复并完成无损重载')).toBeVisible()

    await page.locator('tr', { hasText: 'E2E 已命名配置' }).getByRole('checkbox').check()
    await page.locator('tr', { hasText: 'E2E 批量配置' }).getByRole('checkbox').check()
    await page.getByRole('button', { name: '批量删除 (2)' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '删除 2 份' }).click()
    await expect(page.locator('tr', { hasText: 'E2E 已命名配置' })).toHaveCount(0)
    await expect(page.locator('tr', { hasText: 'E2E 批量配置' })).toHaveCount(0)
  })

  await test.step('设置页左右列保持同一底边', async () => {
    const targetPanelVersion = 'v1.0.0'
    let upgradeStarted = false
    let updateChannel: 'stable' | 'preview' = 'stable'
    await page.route('**/api/v1/panel/update/check', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        check: {
          current: 'v0.9.6',
          latest: targetPanelVersion,
          updateAvailable: true,
          checkedAt: '2026-07-30T00:00:00Z',
        },
        status: {
          current: 'v0.9.6',
          binaryPath: '/usr/bin/kdae-panel',
          platform: 'linux/amd64',
          enabled: true,
          updatable: true,
          channel: updateChannel,
        },
        job: { phase: 'idle' },
      }),
    }))
    await page.route('**/api/v1/panel/update/preference', async (route) => {
      if (route.request().method() !== 'PUT') return route.continue()
      const body = route.request().postDataJSON() as { channel?: 'stable' | 'preview'; enabled?: boolean }
      if (!body.channel) return route.continue()
      updateChannel = body.channel
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            current: 'v0.9.6',
            binaryPath: '/usr/bin/kdae-panel',
            platform: 'linux/amd64',
            enabled: true,
            updatable: true,
            channel: updateChannel,
          },
        }),
      })
    })
    await page.route('**/api/v1/panel/update', async (route) => {
      if (route.request().method() !== 'POST') return route.continue()
      upgradeStarted = true
      await route.fulfill({
        status: 202,
        contentType: 'application/json',
        body: JSON.stringify({ job: { phase: 'downloading' } }),
      })
    })
    await page.route('**/api/v1/health', (route) => {
      if (!upgradeStarted) return route.continue()
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ status: 'ok', version: targetPanelVersion }),
      })
    })

    await page.goto('/settings')
    await expect(page.getByRole('heading', { name: '面板设置', level: 2 })).toBeVisible()
    await expectColumnsAligned(page.locator('.settings-page .equal-height-grid > *'))

    const githubCard = page.locator('.settings-github')
    await expect(githubCard.getByText('匿名访问')).toBeVisible()
    await githubCard.getByPlaceholder('github_pat_...').fill('github_pat_e2e0123456789abcdefghijklmnop')
    await githubCard.getByRole('button', { name: '保存 Token' }).click()
    await expect(githubCard.getByText('已配置')).toBeVisible()
    await expect(githubCard.getByPlaceholder('github_pat_...')).toHaveValue('')
    await githubCard.getByRole('button', { name: '清除' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '清除' }).click()
    await expect(githubCard.getByText('匿名访问')).toBeVisible()

    const forcedPanelCheck = page.waitForResponse((response) =>
      response.url().endsWith('/api/v1/panel/update/check') && response.request().method() === 'POST')
    await page.getByRole('button', { name: '立即检查' }).click()
    expect((await forcedPanelCheck).status()).toBe(200)

    const upgradeButton = page.getByTestId('panel-upgrade')
    await expect(upgradeButton).toHaveText(`升级到 ${targetPanelVersion}`)

    const currentVersion = page.locator('.settings-update-details dd').filter({ hasText: 'v0.9.6' })
    for (let index = 0; index < 5; index++) await currentVersion.click()
    const channelPicker = page.getByLabel('面板更新通道')
    await expect(channelPicker).toBeVisible()
    await channelPicker.locator('.n-base-selection').click()
    await clickVisibleOption(page, '预发布版（测试）')
    await expect(channelPicker).toContainText('预发布版（测试）')
    await channelPicker.locator('.n-base-selection').click()
    await clickVisibleOption(page, '稳定版')
    await expect(channelPicker).toContainText('稳定版')
    await capture(page, 'settings.png', 1600, 1250)

    await page.setViewportSize({ width: 390, height: 844 })
    await expect.poll(() => page.locator('.app-content').evaluate((content) =>
      content.getBoundingClientRect().left)).toBeLessThanOrEqual(64)
    const buttonBoxes = await page.locator('.settings-update-buttons .n-button').evaluateAll((buttons) =>
      buttons.map((button) => button.getBoundingClientRect().toJSON()))
    expect(buttonBoxes).toHaveLength(2)
    expect(buttonBoxes[1].top).toBeGreaterThanOrEqual(buttonBoxes[0].bottom)
    expect(await page.evaluate(() => document.body.scrollWidth)).toBeLessThanOrEqual(390)
    for (const box of buttonBoxes) expect(box.right).toBeLessThanOrEqual(390)
    await page.setViewportSize({ width: 1600, height: 900 })

    const panelUpgrade = page.waitForRequest((request) =>
      request.url().endsWith('/api/v1/panel/update') && request.method() === 'POST')
    await upgradeButton.click()
    const restarted = page.waitForEvent('load')
    await page.locator('.n-dialog').getByRole('button', { name: '下载并升级' }).click()
    const upgradeRequest = await panelUpgrade
    expect(upgradeRequest.postDataJSON()).toEqual({ version: targetPanelVersion })
    await restarted
    await page.unroute('**/api/v1/panel/update/check')
    await page.unroute('**/api/v1/panel/update')
    await page.unroute('**/api/v1/panel/update/preference')
    await page.unroute('**/api/v1/health')
    await expect(page.getByRole('heading', { name: '面板设置', level: 2 })).toBeVisible()

    const selfUpdate = page.getByRole('switch', { name: '允许面板一键升级' })
    await expect(selfUpdate).toBeChecked()
    await expect(selfUpdate).toBeEnabled()
    await selfUpdate.click()
    await expect(selfUpdate).not.toBeChecked()
    await page.reload()
    const reloadedSelfUpdate = page.getByRole('switch', { name: '允许面板一键升级' })
    await expect(reloadedSelfUpdate).not.toBeChecked()
    await expect(reloadedSelfUpdate).toBeEnabled()
    await reloadedSelfUpdate.click()
    await expect(reloadedSelfUpdate).toBeChecked()
  })

  await test.step('卸载 dae 时由用户独立选择配置与 geo 去留', async () => {
    await page.route('**/api/v1/dae/install', async (route) => {
      if (route.request().method() !== 'GET') return route.continue()
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            binaryPath: '/usr/bin/dae',
            platform: 'linux-amd64',
            ready: true,
            present: true,
            version: 'dae version v2.0.0',
            managed: {
              source: 'official',
              ref: 'v2.0.0',
              label: 'v2.0.0',
              installedAt: '2026-07-30T00:00:00Z',
              sha256: 'e2e',
            },
            rollbackAvailable: false,
            serviceActive: true,
          },
          job: { phase: 'idle' },
        }),
      })
    })
    await page.route('**/api/v1/dae/versions**', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ versions: [] }),
    }))

    await page.goto('/versions')
    await expect(page.getByRole('button', { name: '去设置 Token' })).toBeVisible()
    await page.getByRole('button', { name: '卸载 dae' }).click()
    const dialog = page.locator('.n-dialog')
    const purgeConfig = dialog.getByRole('checkbox', { name: '同时删除 dae 主配置文件' })
    const purgeGeo = dialog.getByRole('checkbox', { name: '同时删除面板可见的全部 geo 数据副本' })
    await expect(purgeConfig).toBeVisible()
    await expect(purgeGeo).toBeVisible()
    await expect(purgeConfig).not.toBeChecked()
    await expect(purgeGeo).not.toBeChecked()
    await dialog.getByRole('button', { name: '取消' }).click()
    await page.unroute('**/api/v1/dae/install')
    await page.unroute('**/api/v1/dae/versions**')
  })

  await test.step('预检并切换直接进入安装事务且不再二次确认', async () => {
    let installRequests = 0
    let compatibilityRequests = 0
    await page.route('**/api/v1/dae/install', async (route) => {
      if (route.request().method() === 'POST') {
        installRequests++
        expect(route.request().postDataJSON()).toEqual({
          source: 'official', ref: 'v1.9.0', label: 'v1.9.0',
        })
        await route.fulfill({
          status: 202,
          contentType: 'application/json',
          body: JSON.stringify({
            job: { phase: 'downloading', source: 'official', ref: 'v1.9.0', label: 'v1.9.0' },
          }),
        })
        return
      }
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            binaryPath: '/usr/bin/dae', platform: 'linux-amd64', ready: true, present: true,
            version: 'dae version v2.0.0',
            managed: {
              source: 'official', ref: 'v2.0.0', label: 'v2.0.0',
              installedAt: '2026-07-30T00:00:00Z', sha256: 'e2e',
            },
            rollbackAvailable: true, serviceActive: true,
          },
          job: { phase: installRequests ? 'done' : 'idle' },
        }),
      })
    })
    await page.route('**/api/v1/dae/versions**', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ versions: [{
        source: 'official', ref: 'v1.9.0', label: 'v1.9.0', description: '待切换版本',
        publishedAt: '2026-07-01T00:00:00Z', installable: true,
      }] }),
    }))
    await page.route('**/api/v1/dae/compatibility', async (route) => {
      compatibilityRequests++
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ job: { phase: 'idle' } }),
      })
    })

    await page.goto('/versions')
    await page.locator('tr', { hasText: 'v1.9.0' }).getByRole('button', { name: '预检并切换' }).click()
    await expect.poll(() => installRequests).toBe(1)
    await expect(page.locator('.n-dialog')).toHaveCount(0)
    expect(compatibilityRequests).toBe(0)

    await page.unroute('**/api/v1/dae/install')
    await page.unroute('**/api/v1/dae/versions**')
    await page.unroute('**/api/v1/dae/compatibility')
  })

  await test.step('切换中隐藏事务告警并可管理本地版本', async () => {
    let applying = true
    let cached = true
    let deleted: unknown
    await page.route('**/api/v1/dae/install', async (route) => {
      if (route.request().method() !== 'GET') return route.continue()
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            binaryPath: '/usr/bin/dae',
            platform: 'x86_64_v3_avx2',
            architecture: 'x86_64',
            preferredPlatform: 'x86_64_v3_avx2',
            ready: true,
            present: true,
            version: applying ? 'dae version v1.9.0' : 'dae version v2.0.0',
            managed: {
              source: 'official',
              ref: 'v2.0.0',
              label: 'v2.0.0',
              platform: 'x86_64_v2_sse',
              installedAt: '2026-07-30T00:00:00Z',
              sha256: 'e2e',
            },
            drifted: applying,
            rollbackAvailable: true,
            serviceActive: true,
            warnings: applying
              ? ['发现上一次安装留下的暂存备份，说明它在中途被打断；请核对上面的运行版本是否符合预期']
              : [],
          },
          job: applying
            ? { phase: 'applying', source: 'official', ref: 'v1.9.0', label: 'v1.9.0', cached: true }
            : { phase: 'idle' },
        }),
      })
    })
    await page.route('**/api/v1/dae/versions**', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        versions: [
          {
            source: 'official', ref: 'v2.0.0', label: 'v2.0.0', description: '当前稳定版',
            publishedAt: '2026-07-09T00:00:00Z', installable: true, cached: true,
            cachedAt: '2026-07-30T00:00:00Z', cachedBytes: 33_554_432,
          },
          {
            source: 'official', ref: 'v1.9.0', label: 'v1.9.0', description: '已保存在本机',
            publishedAt: '2026-07-01T00:00:00Z', installable: true, cached,
            cachedAt: '2026-07-30T00:00:00Z', cachedBytes: 33_554_432,
          },
          {
            source: 'official', ref: 'v1.8.0', label: 'v1.8.0', description: '历史稳定版',
            publishedAt: '2026-06-12T00:00:00Z', installable: true,
          },
          {
            source: 'official', ref: 'v1.7.2', label: 'v1.7.2', description: '历史稳定版',
            publishedAt: '2026-05-18T00:00:00Z', installable: true,
          },
        ],
      }),
    }))
    await page.route('**/api/v1/dae/cache', async (route) => {
      if (route.request().method() !== 'DELETE') return route.continue()
      deleted = route.request().postDataJSON()
      cached = false
      await route.fulfill({ status: 204, body: '' })
    })

    await page.goto('/versions')
    await expect(page.getByText('正在验证配置并替换二进制，随后会重启 dae，期间连接会短暂中断…')).toBeVisible()
    await expect(page.getByText(/发现上一次安装留下的暂存备份/)).toHaveCount(0)
    await expect(page.getByText(/磁盘上的二进制与面板记录不一致/)).toHaveCount(0)

    applying = false
    await page.reload()
    const installCard = page.locator('.n-card', { hasText: '当前安装' }).first()
    await expect(installCard.getByText('x86_64', { exact: true })).toBeVisible()
    await expect(installCard.getByText('x86_64_v3_avx2', { exact: true })).toBeVisible()
    await expect(installCard.getByText('x86_64_v2_sse', { exact: true })).toBeVisible()
    const currentRow = page.locator('tr', { hasText: 'v2.0.0' })
    await expect(currentRow.getByRole('button', { name: '删除 v2.0.0 的本地缓存' })).toHaveCount(0)
    const row = page.locator('tr', { hasText: 'v1.9.0' })
    await expect(row.getByText('已下载')).toBeVisible()
    await capture(page, 'versions.png', 1600, 1120)
    await row.getByRole('button', { name: '删除 v1.9.0 的本地缓存' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '删除缓存' }).click()
    await expect.poll(() => deleted).toEqual({ source: 'official', ref: 'v1.9.0' })
    await expect(row.getByText('已下载')).toHaveCount(0)

    await page.unroute('**/api/v1/dae/install')
    await page.unroute('**/api/v1/dae/versions**')
    await page.unroute('**/api/v1/dae/cache')
  })

  await test.step('连接活动分别展示历史流水与实时出站端点', async () => {
    const reference = Date.now()
    const at = (secondsAgo: number) => new Date(reference - secondsAgo * 1000).toISOString()
    await page.route('**/api/v1/connections?*', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        snapshotAt: at(0),
        snapshotOk: true,
        serviceRunning: true,
        socketWindowSeconds: 30,
        logsOk: true,
        logLevel: 'info',
        summary: {
          outboundTcp: 32, udpSockets: 1, sampledTcpPeak: 38, sampledUdpPeak: 4,
          windowEvents: 205, windowClients: 4, windowTargets: 8,
        },
        facets: {
          targets: [
            { id: 'api.github.com', label: 'api.github.com', count: 72 },
            { id: 'registry.npmjs.org', label: 'registry.npmjs.org', count: 49 },
            { id: 'www.youtube.com', label: 'www.youtube.com', count: 33 },
            { id: 'cdn.jsdelivr.net', label: 'cdn.jsdelivr.net', count: 21 },
            { id: 'www.bilibili.com', label: 'www.bilibili.com', count: 13 },
            { id: 'mirrors.example.net', label: 'mirrors.example.net', count: 8 },
            { id: 'dns.google', label: 'dns.google', count: 5 },
            { id: 'ntp.org', label: 'ntp.org', count: 4 },
          ],
          clients: [
            { id: 'mac:02:00:00:00:00:10', label: '192.168.31.10', count: 96, note: '02:00:00:00:00:10' },
            { id: 'mac:02:00:00:00:00:11', label: '192.168.31.11', count: 57, note: '02:00:00:00:00:11' },
            { id: 'ip:2001:db8::10', label: '2001:db8::10', count: 31 },
            { id: 'ip:192.168.31.12', label: '192.168.31.12', count: 21 },
          ],
          nodes: [
            { id: 'demo-sg', label: 'demo-sg', count: 124 },
            { id: 'demo-us', label: 'demo-us', count: 46 },
            { id: 'demo-jp', label: 'demo-jp', count: 22 },
          ],
          groups: [
            { id: 'proxy', label: 'proxy', count: 183 },
            { id: 'direct', label: 'direct', count: 22 },
          ],
        },
        endpoints: [
          { address: '144.34.225.42:30128', count: 26 },
          { address: '223.6.6.6:443', count: 4 },
          { address: '38.55.107.116:443', count: 2 },
          { address: '203.0.113.90:8443', count: 1 },
        ],
        entries: [
          {
            at: at(12), network: 'tcp4', src: '192.168.31.10:51324',
            dst: 'api.github.com:443', dstAddr: '140.82.113.6:443', sniffed: 'api.github.com',
            outbound: 'proxy', dialer: 'demo-sg', policy: 'min_moving_avg', pname: 'curl', mac: '02:00:00:00:00:10',
          },
          {
            at: at(48), network: 'tcp6', src: '[2001:db8::10]:52100',
            dst: '[2606:4700::6810:85e5]:443', dstAddr: '[2606:4700::6810:85e5]:443',
            outbound: 'proxy', dialer: 'demo-us',
          },
          {
            at: at(96), network: 'tcp4', src: '192.168.31.11:51325',
            dst: 'registry.npmjs.org:443', dstAddr: '104.16.31.34:443', sniffed: 'registry.npmjs.org',
            outbound: 'direct', mac: '02:00:00:00:00:11',
          },
          {
            at: at(150), network: 'udp4', src: '192.168.31.12:5353',
            dst: 'dns.example:53', dstAddr: '198.51.100.53:53', outbound: 'proxy', dialer: 'demo-jp',
          },
          {
            at: at(220), network: 'tcp4', src: '192.168.31.13:51326',
            dst: 'cdn.jsdelivr.net:443', dstAddr: '104.16.85.20:443', sniffed: 'cdn.jsdelivr.net',
            outbound: 'proxy', offloaded: true, mac: '02:00:00:00:00:10',
          },
          {
            at: at(1800), network: 'tcp4', src: '192.168.31.14:51327',
            dst: 'old.example:443', dstAddr: '198.51.100.9:443', outbound: 'direct',
          },
        ],
      }),
    }))
    await page.goto('/connections')
    await expect(page.getByRole('heading', { name: '连接活动', level: 2 })).toBeVisible()
    await expect(page.locator('.connection-pulse')).toContainText('32当前 TCP 出站')
    await expect(page.locator('.connection-snapshot-note')).toContainText('近 30 秒已采样峰值：TCP 38 · UDP 4')
    await expect(page.locator('.connection-facet-row', { hasText: 'api.github.com' })).toBeVisible()
    await page.locator('.connection-facet-row', { hasText: 'api.github.com' }).click()
    await expect(page.locator('tbody tr')).toHaveCount(1)
    await page.locator('.connection-facet-row', { hasText: 'api.github.com' }).click()
    await expect(page.locator('tbody tr')).toHaveCount(5)
    await page.locator('.connection-facet-modes .n-radio-button', { hasText: '客户端' }).click()
    await page.locator('.connection-facet-row', { hasText: '192.168.31.10' }).click()
    await expect(page.locator('tbody tr')).toHaveCount(2)
    await page.locator('.connection-facet-row', { hasText: '192.168.31.10' }).click()
    await page.locator('.connection-facet-modes .n-radio-button', { hasText: '目标' }).click()
    await page.getByRole('button', { name: 'TCP 端点 4' }).click()
    await expect(page.locator('.n-drawer').getByText('203.0.113.90:8443')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.n-drawer')).not.toBeVisible()
    await expect(page.locator('tbody tr')).toHaveCount(5)
    await expect(page.getByText('old.example:443')).toHaveCount(0)
    await expect(page.getByText('存活', { exact: true })).toHaveCount(0)

    await page.setViewportSize({ width: 1600, height: 600 })
    const scrollState = await page.locator('.app-content > .n-layout-scroll-container').evaluate((element) => {
      element.scrollTop = 320
      return {
        contentScrollTop: element.scrollTop,
        contentOverflows: element.scrollHeight > element.clientHeight,
        pageScrollTop: window.scrollY,
      }
    })
    expect(scrollState.contentOverflows).toBe(true)
    expect(scrollState.contentScrollTop).toBeGreaterThan(0)
    expect(scrollState.pageScrollTop).toBe(0)
    await expect.poll(async () => (await page.locator('.app-sidebar').boundingBox())?.y).toBe(0)

    await page.setViewportSize({ width: 1600, height: 1000 })
    await capture(page, 'connections.png', 1600, 1000)

    await page.setViewportSize({ width: 390, height: 844 })
    await expect(page.locator('.connection-mobile-row')).toHaveCount(5)
    await expect(page.locator('.n-data-table')).toHaveCount(0)
    await capture(page, 'connections-mobile.png', 390, 844)
    await page.locator('.connection-facet-mobile').click()
    await expect(page.locator('.n-drawer').getByText('活动分布')).toBeVisible()
    await expect(page.locator('.n-drawer').getByText('api.github.com')).toBeVisible()
    const drawerModes = page.locator('.connection-facet-drawer-modes button')
    await expect(drawerModes).toHaveCount(4)
    const modeBoxes = await drawerModes.evaluateAll((buttons) => buttons.map((button) => {
      const box = button.getBoundingClientRect()
      return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width) }
    }))
    expect(modeBoxes[0].y).toBe(modeBoxes[1].y)
    expect(modeBoxes[2].y).toBe(modeBoxes[3].y)
    expect(modeBoxes[2].y).toBeGreaterThan(modeBoxes[0].y)
    expect(Math.max(...modeBoxes.map(({ width }) => width)) - Math.min(...modeBoxes.map(({ width }) => width))).toBeLessThanOrEqual(1)
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'TCP 端点 4' }).click()
    await expect(page.locator('.n-drawer').getByText('144.34.225.42:30128')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)

    await page.unroute('**/api/v1/connections?*')
    await page.route('**/api/v1/connections?*', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        snapshotAt: at(0), snapshotOk: true, serviceRunning: true, socketWindowSeconds: 30,
        logsOk: true, logLevel: 'warn',
        summary: {
          outboundTcp: 0, udpSockets: 0, sampledTcpPeak: 0, sampledUdpPeak: 0,
          windowEvents: 0, windowClients: 0, windowTargets: 0,
        },
        facets: { targets: [], clients: [], nodes: [], groups: [] },
        endpoints: [],
        entries: [],
      }),
    }))
    await page.goto('/connections')
    await expect(page.getByText('当前 dae 输出级别为')).toBeVisible()
    await expect(page.getByRole('button', { name: '切换为 info' })).toBeVisible()
    await expect(page.getByText('当前日志级别不记录连接建立流水')).toBeVisible()
    await expect(page.locator('.connection-pulse').getByText('未捕获', { exact: true })).toHaveCount(3)
    await expect(page.locator('.connection-snapshot-note')).toContainText('“未捕获”不代表没有代理流量')
    await expect(page.getByRole('button', { name: 'TCP 端点 未捕获' })).toBeDisabled()
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.setViewportSize({ width: 1600, height: 900 })
    await page.unroute('**/api/v1/connections?*')
  })

  await test.step('日志页展示多级近期记录并保持最新在前', async () => {
    await page.route('**/api/v1/logs?*', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        { timestamp: '2026-08-01T08:28:31Z', priority: 6, level: 'info', message: 'level=info msg="Network online."', pid: '1487' },
        { timestamp: '2026-08-01T08:28:32Z', priority: 6, level: 'info', message: 'level=info msg="Subscriptions fetched" duration=812ms', pid: '1487' },
        { timestamp: '2026-08-01T08:28:33Z', priority: 7, level: 'debug', message: 'level=debug msg="Group selects dialer" dialer=demo-sg group=proxy network=tcp4', pid: '1487' },
        { timestamp: '2026-08-01T08:28:34Z', priority: 6, level: 'info', message: 'level=info msg="Control plane built" duration=386ms', pid: '1487' },
        { timestamp: '2026-08-01T08:28:35Z', priority: 4, level: 'warning', message: 'level=warning msg="[Reload] Serve"', pid: '1487' },
        { timestamp: '2026-08-01T08:28:36Z', priority: 6, level: 'info', message: 'level=info msg="Bind to LAN" interface=ens2', pid: '1487' },
        { timestamp: '2026-08-01T08:28:37Z', priority: 6, level: 'info', message: 'level=info msg="Bind to WAN" interface=ens2', pid: '1487' },
        { timestamp: '2026-08-01T08:28:38Z', priority: 4, level: 'warning', message: 'level=warning msg="[Reload] Finished"', pid: '1487' },
      ]),
    }))
    await page.goto('/logs')
    await expect(page.getByRole('heading', { name: 'journald 日志', level: 2 })).toBeVisible()
    await expect(page.locator('.log-level-control')).toContainText('dae 输出级别')
    await expect(page.locator('.log-select .n-base-selection')).toContainText('显示全部记录')
    await expect(page.locator('.log-row')).toHaveCount(8)
    await expect(page.locator('.log-row').first()).toContainText('[Reload] Finished')
    await page.locator('.log-output-select .n-base-selection').click()
    await clickVisibleOption(page, '信息 · info')
    await page.getByRole('button', { name: '应用并重载' }).click()
    await page.locator('.n-dialog').getByRole('button', { name: '保存并重载' }).click()
    await expect(page.locator('.log-level-status')).toContainText('info')
    expect(readFileSync(configPath, 'utf8')).toContain('log_level: info')
    await capture(page, 'logs.png', 1600, 900)
    await page.unroute('**/api/v1/logs?*')
  })

  await test.step('故障诊断中心聚合公开检查并提供操作建议', async () => {
    await page.route('**/api/v1/diagnostics/report', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        generatedAt: '2026-08-01T08:30:00Z',
        overall: 'warning',
        counts: { ok: 7, warning: 1, error: 0, unknown: 1 },
        items: [
          { id: 'service', category: '服务', title: 'dae 服务', level: 'ok', summary: '服务运行正常', details: ['状态：active/running', '主进程 PID：1487'] },
          { id: 'service-boot', category: '服务', title: '开机状态', level: 'ok', summary: 'dae 已设为开机启动', details: ['systemd 状态：enabled'] },
          { id: 'configuration', category: '配置', title: '当前配置', level: 'ok', summary: '当前配置已通过 dae validate', details: ['路径：/etc/dae/config.dae'] },
          { id: 'geo', category: '数据', title: 'Geo 数据', level: 'warning', summary: '面板可见目录缺少 geosite.dat', suggestion: '如果路由使用 geosite，请先到 Geo 数据页更新数据' },
          { id: 'kernel', category: '运行环境', title: 'Linux 内核', level: 'ok', summary: 'Linux 内核信息可读', details: ['内核：6.12.0-amd64'] },
          { id: 'logs', category: '日志', title: '近期异常日志', level: 'unknown', summary: '无法读取 journald 日志', details: ['permission denied while reading a deliberately long diagnostic detail that must wrap on mobile instead of widening the page'] },
        ],
      }),
    }))
    await page.goto('/diagnostics')
    await expect(page.getByRole('heading', { name: '故障诊断', level: 2 })).toBeVisible()
    await expect(page.getByText('基础检查通过，但有需要确认的项目')).toBeVisible()
    await expect(page.getByText('当前配置已通过 dae validate')).toBeVisible()
    await expect(page.getByText('如果路由使用 geosite，请先到 Geo 数据页更新数据')).toBeVisible()
    await expect(page.locator('.diagnostic-item')).toHaveCount(6)
    await expectCardsAligned(page.locator('.diagnostic-item'))
    await capture(page, 'diagnostics.png', 1600, 1120)
  })

  await test.step('移动端导航、核心列表与编辑器使用独立布局', async () => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/proxy')
    await expect(page.getByRole('heading', { name: '代理编排', level: 2 })).toBeVisible()
    await expect(page.locator('.n-layout-sider')).toHaveCount(0)
    await expect(page.getByRole('button', { name: '打开导航' })).toBeVisible()
    await page.getByRole('button', { name: '打开导航' }).click()
    const drawer = page.locator('.n-drawer')
    await expect(drawer.getByText('kdae-panel')).toBeVisible()
    const drawerDashboard = drawer.locator('.n-menu-item-content', { hasText: '运行概览' })
    const drawerOrchestration = drawer.locator('.n-menu-item-content', { hasText: '代理编排' })
    await expect(drawerOrchestration).toHaveClass(/n-menu-item-content--selected/)
    await expect.poll(() => drawerOrchestration.locator('a').evaluate((link) => document.activeElement === link)).toBe(true)
    await expect(drawerDashboard).not.toHaveClass(/n-menu-item-content--selected/)
    expect(await drawerDashboard.evaluate((item) => item.matches(':focus-within'))).toBe(false)
    await drawer.getByText('Geo 数据', { exact: true }).click()
    await expect(drawer).not.toBeVisible()
    await expect(page).toHaveURL(/\/geo$/)
    await page.getByRole('button', { name: '打开导航' }).click()
    const drawerGeo = drawer.locator('.n-menu-item-content', { hasText: 'Geo 数据' })
    await expect(drawerGeo).toHaveClass(/n-menu-item-content--selected/)
    await expect.poll(() => drawerGeo.locator('a').evaluate((link) => document.activeElement === link)).toBe(true)
    expect(await drawerDashboard.evaluate((item) => item.matches(':focus-within'))).toBe(false)
    await drawer.getByText('代理编排', { exact: true }).click()
    await expect(drawer).not.toBeVisible()
    await expect(page).toHaveURL(/\/proxy$/)

    let overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await expect(page.getByTestId('mobile-node-list')).toBeVisible()
    await expect(page.getByTestId('mobile-subscription-list')).toBeVisible()
    await expect(page.locator('.mobile-save-bar')).toBeVisible()

    await page.getByTestId('groups-card').locator('.group-item', { hasText: 'proxy' })
      .getByRole('button', { name: '编辑', exact: true }).click()
    const mobileGroupModal = page.getByTestId('group-editor-modal')
    await mobileGroupModal.getByTestId('group-policy-picker').locator('.n-base-selection').click()
    await clickVisibleOption(page, '固定节点')
    expect(await mobileGroupModal.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    await expect(mobileGroupModal.locator('.group-fixed-node-hint')).toBeVisible()
    await mobileGroupModal.getByRole('button', { name: '取消' }).click()

    await page.getByTestId('global-card').getByRole('button', { name: '编辑设置' }).click()
    const globalModal = page.getByTestId('global-editor-modal')
    const globalModalBox = await globalModal.boundingBox()
    expect(globalModalBox).not.toBeNull()
    expect(globalModalBox!.x).toBeGreaterThanOrEqual(0)
    expect(globalModalBox!.x + globalModalBox!.width).toBeLessThanOrEqual(390)
    await expect(globalModal).toHaveCSS('height', '844px')
    expect(await globalModal.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    await globalModal.getByRole('button', { name: '取消' }).click()

    await page.getByTestId('dns-card').getByRole('button', { name: '编辑 DNS' }).click()
    const dnsModal = page.getByTestId('dns-editor-modal')
    const dnsModalBox = await dnsModal.boundingBox()
    expect(dnsModalBox).not.toBeNull()
    expect(dnsModalBox!.x).toBeGreaterThanOrEqual(0)
    expect(dnsModalBox!.x + dnsModalBox!.width).toBeLessThanOrEqual(390)
    await expect(dnsModal).toHaveCSS('height', '844px')
    expect(await dnsModal.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    await dnsModal.getByRole('button', { name: '取消' }).click()

    await page.getByTestId('routing-card').getByRole('button', { name: '编辑路由' }).click()
    const routingModal = page.getByTestId('routing-editor-modal')
    const modalBox = await routingModal.boundingBox()
    expect(modalBox).not.toBeNull()
    expect(modalBox!.x).toBeGreaterThanOrEqual(0)
    expect(modalBox!.x + modalBox!.width).toBeLessThanOrEqual(390)
    await expect(routingModal).toHaveCSS('height', '844px')
    expect(await routingModal.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    await routingModal.getByRole('button', { name: '取消' }).click()

    await page.route('**/api/v1/dae/install', async (route) => {
      if (route.request().method() !== 'GET') return route.continue()
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          status: {
            binaryPath: '/usr/bin/dae', platform: 'linux-amd64', ready: true, present: true,
            version: 'dae version v2.0.0',
            managed: { source: 'official', ref: 'v2.0.0', label: 'v2.0.0', installedAt: '2026-07-30T00:00:00Z', sha256: 'e2e' },
            rollbackAvailable: true, serviceActive: true,
          },
          job: { phase: 'idle' },
        }),
      })
    })
    await page.route('**/api/v1/dae/versions**', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({ versions: [{
        source: 'official', ref: 'v2.0.0', label: 'v2.0.0', description: '稳定版本',
        publishedAt: '2026-07-30T00:00:00Z', installable: true, cached: true,
        cachedBytes: 33554432, cachedAt: '2026-07-30T00:00:00Z',
      }] }),
    }))
    await page.goto('/versions')
    const versionActions = page.locator('.version-toolbar-actions')
    const refreshAction = versionActions.getByRole('button', { name: '刷新' })
    const rollbackAction = versionActions.getByRole('button', { name: '回滚上一版' })
    const uninstallAction = versionActions.getByRole('button', { name: '卸载 dae' })
    await expect(refreshAction).toBeVisible()
    await expect(rollbackAction).toBeVisible()
    await expect(uninstallAction).toBeVisible()
    const actionBoxes = await Promise.all([
      refreshAction.boundingBox(),
      rollbackAction.boundingBox(),
      uninstallAction.boundingBox(),
    ])
    expect(actionBoxes.every((box) => box !== null)).toBe(true)
    const actionRows = actionBoxes.map((box) => box!.y)
    expect(Math.max(...actionRows) - Math.min(...actionRows)).toBeLessThanOrEqual(1)
    const mobileVersions = page.getByTestId('mobile-version-list')
    await expect(mobileVersions).toBeVisible()
    await expect(mobileVersions.getByText('已下载', { exact: true })).toBeVisible()
    await expect(mobileVersions.getByRole('button', { name: '删除 v2.0.0 的本地缓存' })).toHaveCount(0)
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/dae/install')
    await page.unroute('**/api/v1/dae/versions**')

    await page.route('**/api/v1/config/backups', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([{
        id: 'mobile-e2e', name: '手机端存档', note: '验证长备注在窄屏内正常换行',
        createdAt: '2026-07-30T00:00:00Z', hash: '0123456789abcdef', size: 4096,
      }]),
    }))
    await page.goto('/backups')
    const mobileBackups = page.getByTestId('mobile-backup-list')
    await expect(mobileBackups).toBeVisible()
    await expect(mobileBackups.getByText('手机端存档')).toBeVisible()
    await mobileBackups.getByRole('checkbox', { name: '选择手机端存档' }).check()
    await expect(page.getByRole('button', { name: '批量删除 (1)' })).toBeVisible()
    await expect(mobileBackups.getByRole('button', { name: '对比' })).toBeVisible()
    await expect(mobileBackups.getByRole('button', { name: '导出' })).toBeVisible()
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/config/backups')

    await page.goto('/diagnostics')
    await expect(page.getByRole('heading', { name: '故障诊断', level: 2 })).toBeVisible()
    await expect(page.locator('.diagnostic-item')).toHaveCount(6)
    const diagnosticsPageBox = await page.locator('.diagnostics-page').boundingBox()
    const finalDiagnosticBox = await page.locator('.diagnostic-item').last().boundingBox()
    const fullLogsButton = page.getByRole('button', { name: '查看完整运行日志' })
    const fullLogsButtonBox = await fullLogsButton.boundingBox()
    expect(diagnosticsPageBox).not.toBeNull()
    expect(finalDiagnosticBox).not.toBeNull()
    expect(fullLogsButtonBox).not.toBeNull()
    expect(Math.abs(fullLogsButtonBox!.x - diagnosticsPageBox!.x)).toBeLessThanOrEqual(1)
    expect(Math.abs(fullLogsButtonBox!.width - diagnosticsPageBox!.width)).toBeLessThanOrEqual(1)
    expect(fullLogsButtonBox!.y - finalDiagnosticBox!.y - finalDiagnosticBox!.height).toBeGreaterThanOrEqual(8)
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/diagnostics/report')

    await page.route('**/api/v1/logs?*', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify([
        { timestamp: '2026-07-30T10:00:00Z', priority: 3, level: 'error', message: '较早的错误', pid: '101' },
        { timestamp: '2026-07-30T10:01:00Z', priority: 6, level: 'info', message: '中间的信息', pid: '101' },
        { timestamp: '2026-07-30T10:02:00Z', priority: 7, level: 'debug', message: '最新的调试', pid: '101' },
      ]),
    }))
    await page.goto('/logs')
    await expect(page.getByRole('heading', { name: 'journald 日志', level: 2 })).toBeVisible()
    const logRows = page.locator('.log-row')
    await expect(logRows).toHaveCount(3)
    await expect(logRows.nth(0)).toContainText('最新的调试')
    await page.locator('.log-select .n-base-selection').click()
    await clickVisibleOption(page, '调试')
    await expect(logRows).toHaveCount(1)
    await expect(logRows.nth(0)).toContainText('最新的调试')
    await page.goto('/dashboard')
    await page.goto('/logs')
    await expect(page.locator('.log-select .n-base-selection')).toContainText('调试')
    await expect(logRows).toHaveCount(1)
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/logs?*')

    const longDescription = '用于验证移动端能够完整展示由当前 dae 导出的具体字段说明，即使说明包含连续地址 https://resolver.example.com/dns-query?client=mobile-with-a-very-long-identifier 也不能被裁掉。'
    await page.route('**/api/v1/dae/outline', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        version: 'mobile-e2e',
        leaves: ['string', 'map[string]string'],
        structure: [{
          name: 'Routing', mapping: 'routing', desc: '路由设置',
          structure: [{
            name: 'DomainResolver',
            mapping: 'routing_domain_resolver_with_a_very_long_mapping_name',
            type: 'map[string]string',
            desc: longDescription,
            defaultValue: 'https://resolver.example.com/dns-query?client=mobile-with-a-very-long-identifier',
          }],
        }],
      }),
    }))
    await page.goto('/schema')
    const schemaDescription = page.locator('.outline-description').filter({ hasText: longDescription })
    await expect(schemaDescription).toHaveText(longDescription)
    expect(await schemaDescription.evaluate((element) => {
      const style = getComputedStyle(element)
      return element.getBoundingClientRect().height / Number.parseFloat(style.lineHeight)
    })).toBeGreaterThan(2)
    expect(await page.locator('.outline-node.root').evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/dae/outline')

    await page.setViewportSize({ width: 430, height: 932 })
    await page.goto('/config')
    await expect(page.locator('.mobile-save-bar')).toBeVisible()
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)

    let mobileSuspended = true
    await page.route('**/api/v1/service', (route) => route.fulfill({
      contentType: 'application/json',
      body: JSON.stringify({
        name: 'dae.service', activeState: 'active', subState: 'running', mainPid: 1487,
        suspended: mobileSuspended,
      }),
    }))
    await page.route('**/api/v1/service/actions/reload', (route) => {
      mobileSuspended = false
      return route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ status: 'ok', action: 'reload', suspended: false }),
      })
    })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
    const suspendedAlert = page.locator('.service-suspended-alert')
    await expect(suspendedAlert).toBeVisible()
    await expect(suspendedAlert.getByText('代理流量处理已停止，但 dae 进程仍在运行；点击“无损重载”即可恢复。')).toBeVisible()
    expect(await suspendedAlert.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1)
    const mobileServiceCard = page.locator('.panel-card').filter({ hasText: '服务控制' })
    await expect(mobileServiceCard.getByRole('button', { name: /暂停/ })).toBeDisabled()
    await page.getByRole('button', { name: '无损重载' }).click()
    await expect(suspendedAlert).toHaveCount(0)
    overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    await page.unroute('**/api/v1/service/actions/reload')
    await page.unroute('**/api/v1/service')
  })

  await test.step('退出后凭密码重新登录', async () => {
    await page.getByRole('button', { name: '退出登录' }).click()
    await expect(page.getByRole('heading', { name: '管理员登录' })).toBeVisible()
    await capture(page, 'login.png', 1600, 900)
    await page.getByPlaceholder('admin').fill('admin')
    await page.getByPlaceholder('输入管理员密码').fill(PASSWORD)
    await page.getByRole('button', { name: '登录', exact: true }).click()
    await expect(page.getByRole('heading', { name: '运行状态' })).toBeVisible()
  })
})
