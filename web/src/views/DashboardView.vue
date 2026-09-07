<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { NAlert, NButton, NIcon, NSkeleton, NTag, NText, useDialog, useMessage } from 'naive-ui'
import { PauseOutline, PlayOutline, RefreshOutline, ReloadOutline, StopOutline } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import { APIError, getJSON, postJSON } from '../api/client'
import type {
  ConnectionsResponse,
  ConfigDocument,
  DaeReport,
  DiagnosticReport,
  GeoStatus,
  LatencyResult,
  LatencyTarget,
  PanelUpdatePayload,
  ServiceStatus,
} from '../types/api'
import { formatBytes, formatDateTime, formatElapsedSince } from '../utils/format'

function formatClock(value: string): string {
  return formatDateTime(value).split(' ').pop() ?? ''
}
import { parseGroups, readSection } from '../utils/daeconf'
import { latencyTarget, parseNodeLink } from '../utils/nodelink'
import { updateDaeLogLevel, type DaeLogLevel } from '../utils/loglevel'

const TRAFFIC_WINDOW_MINUTES = 15
const TRAFFIC_BUCKETS = 60
// 出站健康只需要从最近的流水里认出每个组当前在走哪个节点，不需要整页明细。
const TRAFFIC_ENTRY_LIMIT = 200
const POLL_INTERVAL_MS = 15_000
// 延迟探测会让面板主动向外发包，首页是会自动打开的页面，因此复用服务端缓存；
// 用户点刷新时不带这个参数，强制真实测量。
const LATENCY_MAX_AGE_SECONDS = 300

const message = useMessage()
const dialog = useDialog()

const loading = ref(true)
const refreshing = ref(false)
const actionLoading = ref('')
const levelSwitching = ref(false)

const service = ref<ServiceStatus | null>(null)
const dae = ref<DaeReport | null>(null)
const configContent = ref<string | null>(null)
const traffic = ref<ConnectionsResponse | null>(null)
const geo = ref<GeoStatus | null>(null)
const diagnostics = ref<DiagnosticReport | null>(null)
const panelUpdate = ref<PanelUpdatePayload | null>(null)
const latency = ref(new Map<string, LatencyResult>())
const probing = ref(false)

const serviceError = ref('')
const trafficError = ref('')
const now = ref(Date.now())
let clockTimer: number | undefined
let pollTimer: number | undefined

const running = computed(() => service.value?.activeState === 'active')
const suspended = computed(() => service.value?.suspended === true)
const statusLabel = computed(() =>
  suspended.value ? '已暂停' : running.value ? '运行中' : service.value?.activeState === 'failed' ? '运行失败' : '未运行')
const statusTone = computed(() =>
  suspended.value ? 'warn' : running.value ? 'ok' : service.value?.activeState === 'failed' ? 'danger' : 'idle')
// dae --version 的原文是 "dae version v1.0.6"，窄栏左边已经写了 dae，去掉前缀只留版本号
const daeVersion = computed(() => (dae.value?.version ?? '').replace(/^dae\s+version\s+/i, '').trim())
const uptime = computed(() => running.value
  ? formatElapsedSince(service.value?.startedAt || service.value?.activeSince, now.value)
  : '—')

/* ---------- 流量观测 ---------- */

// 日志级别不足时不会产生连接建立流水。这不是"没有流量"，而是"测不到"，
// 页面必须走另一条分支，不能把空数据画成一条贴底的零线。
const telemetryOff = computed(() => {
  const current = traffic.value?.logLevel
  const required = traffic.value?.requiredLogLevel
  if (!current || !required) return false
  const rank = { error: 0, warn: 1, info: 2, debug: 3, trace: 4 } as Record<string, number>
  return (rank[current] ?? 0) < (rank[required] ?? 0)
})
const requiredLevel = computed(() => traffic.value?.requiredLogLevel ?? 'info')
const windowEvents = computed(() => traffic.value?.summary.windowEvents ?? 0)

// socket 快照只统计 dae 持有的 userspace socket；直连和 eBPF 数据面连接不经过
// 它，因此这个数经常是 0。它只能当旁证，不能当头条，措辞上也要说清楚。
function socketText(value?: number): string {
  if (!traffic.value) return '—'
  if (!traffic.value.serviceRunning) return '未运行'
  if (!traffic.value.snapshotOk) return '—'
  return value && value > 0 ? String(value) : '未捕获'
}
const socketPeakNote = computed(() => {
  const summary = traffic.value?.summary
  if (!summary || !traffic.value?.snapshotOk) return ''
  const seconds = Math.max(1, traffic.value.socketWindowSeconds)
  const peak = Math.max(summary.sampledTcpPeak, summary.sampledUdpPeak)
  return peak > 0 ? `近 ${seconds} 秒峰值 TCP ${summary.sampledTcpPeak}` : `近 ${seconds} 秒未采样到`
})

interface SparkPoint {
  x: number
  y: number
  covered: boolean
}

const SPARK_WIDTH = 1000
const SPARK_HEIGHT = 132

// 曲线按 seriesSince 分成"已覆盖"和"面板不知道"两段。未覆盖段不画线也不填色，
// 否则会把无知报成零——和 socket 快照的"未捕获"是同一类错误。
const spark = computed(() => {
  const series = traffic.value?.series ?? []
  if (series.length === 0) return null
  const since = traffic.value?.seriesSince ? Date.parse(traffic.value.seriesSince) : Number.NaN
  const peak = Math.max(1, ...series.map((bucket) => bucket.count))
  const step = series.length > 1 ? SPARK_WIDTH / (series.length - 1) : SPARK_WIDTH
  const points: SparkPoint[] = series.map((bucket, index) => ({
    x: index * step,
    y: SPARK_HEIGHT - (bucket.count / peak) * (SPARK_HEIGHT - 12) - 6,
    // 存储为空(尚无任何记录)时不把整幅图涂成未覆盖：日志读取成功却没有连接行，
    // 本身就是"这段时间确实没有新建连接"的证据，画成零线并由下方注记说明即可。
    // 真正需要留白的是存储起点晚于窗口起点那一段——那才是面板确实不知道的区间。
    covered: Number.isNaN(since) || Date.parse(bucket.at) >= since,
  }))
  const covered = points.filter((point) => point.covered)
  const line = covered.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ')
  const area = covered.length > 1
    ? `${line} L${covered[covered.length - 1].x.toFixed(1)} ${SPARK_HEIGHT} L${covered[0].x.toFixed(1)} ${SPARK_HEIGHT} Z`
    : ''
  const uncoveredWidth = covered.length > 0 ? covered[0].x : SPARK_WIDTH
  return { line, area, peak, uncoveredWidth, coveredCount: covered.length }
})

const seriesSinceLabel = computed(() => {
  const since = traffic.value?.seriesSince
  if (!since) return '面板尚未采集到任何连接记录'
  const start = now.value - TRAFFIC_WINDOW_MINUTES * 60_000
  if (Date.parse(since) <= start) return ''
  return `面板从 ${formatDateTime(since)} 起才开始记录，更早的区间无从判断`
})

/* ---------- 出站健康 ---------- */

interface OutboundRow {
  group: string
  policy: string
  node: string
  server?: string
  protocol?: string
  members: number
  target: LatencyTarget | null
  latency?: LatencyResult
}

const nodeIndex = computed(() => {
  const index = new Map<string, ReturnType<typeof parseNodeLink>>()
  if (configContent.value === null) return index
  for (const entry of readSection(configContent.value, 'node').entries) {
    if (entry.tag) index.set(entry.tag, parseNodeLink(entry.value))
  }
  return index
})

// dae 自己决定分组里走哪个节点，面板不读它的内部状态。当前节点从连接建立
// 流水反推：同一出站组下最近一条记录的 dialer 就是它此刻实际在用的节点。
const currentDialer = computed(() => {
  const latest = new Map<string, string>()
  for (const event of traffic.value?.entries ?? []) {
    if (!event.outbound || !event.dialer) continue
    if (!latest.has(event.outbound)) latest.set(event.outbound, event.dialer)
  }
  return latest
})

const outbounds = computed<OutboundRow[]>(() => {
  if (configContent.value === null) return []
  return parseGroups(configContent.value).map((group) => {
    const node = currentDialer.value.get(group.name) ?? ''
    const info = node ? nodeIndex.value.get(node) ?? null : null
    const target = latencyTarget(info)
    return {
      group: group.name,
      policy: group.policy?.value || 'min_moving_avg',
      node,
      server: info?.host,
      protocol: info?.protocol,
      members: group.filters.length,
      target,
      latency: target ? latency.value.get(`${target.host}:${target.port}`) : undefined,
    }
  })
})

function latencyTone(value?: number): string {
  if (value === undefined) return 'idle'
  if (value < 80) return 'ok'
  if (value < 200) return 'warn'
  return 'danger'
}

const latencyProbedAt = computed(() => {
  let newest = ''
  for (const result of latency.value.values()) {
    if (result.probedAt && (!newest || result.probedAt > newest)) newest = result.probedAt
  }
  return newest
})

/* ---------- 需要注意 ---------- */

interface AttentionItem {
  id: string
  tone: 'warn' | 'danger' | 'info'
  title: string
  detail: string
  to?: string
  action?: string
}

const attention = computed<AttentionItem[]>(() => {
  const items: AttentionItem[] = []
  if (configContent.value !== null && readSection(configContent.value, 'node').entries.length === 0) {
    items.push({
      id: 'no-nodes', tone: 'warn', title: '还没有任何节点',
      detail: '粘贴分享链接导入，或添加订阅', to: '/proxy', action: '代理配置',
    })
  }
  for (const file of geo.value?.files ?? []) {
    if (!file.present) {
      items.push({
        id: `geo-${file.name}`, tone: 'warn', title: `${file.name} 尚未安装`,
        detail: '路由规则用到 geosite 时需要先下载', to: '/geo', action: 'Geo 数据',
      })
    }
  }
  const report = diagnostics.value
  if (report && report.counts.error > 0) {
    items.push({
      id: 'diag-error', tone: 'danger', title: `诊断发现 ${report.counts.error} 项故障`,
      detail: report.items.find((item) => item.level === 'error')?.summary ?? '',
      to: '/diagnostics', action: '故障诊断',
    })
  } else if (report && report.counts.warning > 0) {
    items.push({
      id: 'diag-warn', tone: 'warn', title: `诊断有 ${report.counts.warning} 项需要确认`,
      detail: report.items.find((item) => item.level === 'warning')?.summary ?? '',
      to: '/diagnostics', action: '故障诊断',
    })
  }
  if (panelUpdate.value?.check.updateAvailable) {
    items.push({
      id: 'panel-update', tone: 'info', title: `面板有新版本 ${panelUpdate.value.check.latest}`,
      detail: `当前 ${panelUpdate.value.check.current}`, to: '/settings', action: '面板设置',
    })
  }
  if (service.value && service.value.unitFileState !== 'enabled' && running.value) {
    items.push({
      id: 'not-enabled', tone: 'info', title: 'dae 未设为开机自启',
      detail: '系统重启后不会自动恢复代理', to: '/diagnostics', action: '故障诊断',
    })
  }
  return items
})

/* ---------- 数据加载 ---------- */

async function refreshCore(silent: boolean) {
  const [serviceResult, daeResult, configResult] = await Promise.allSettled([
    getJSON<ServiceStatus>('/api/v1/service'),
    getJSON<DaeReport>('/api/v1/dae/capabilities'),
    getJSON<ConfigDocument>('/api/v1/config'),
  ])
  if (serviceResult.status === 'fulfilled') {
    service.value = serviceResult.value
    serviceError.value = ''
  } else if (!silent) {
    serviceError.value = serviceResult.reason instanceof Error ? serviceResult.reason.message : '无法读取服务状态'
  }
  if (daeResult.status === 'fulfilled') dae.value = daeResult.value
  if (configResult.status === 'fulfilled') {
    configContent.value = configResult.value.content
  } else if (configResult.reason instanceof APIError && configResult.reason.status === 404) {
    configContent.value = null
  }
}

async function refreshTraffic() {
  try {
    traffic.value = await getJSON<ConnectionsResponse>(
      `/api/v1/connections?window=${TRAFFIC_WINDOW_MINUTES}&buckets=${TRAFFIC_BUCKETS}&limit=${TRAFFIC_ENTRY_LIMIT}`,
    )
    trafficError.value = ''
  } catch (error) {
    trafficError.value = error instanceof Error ? error.message : '读取连接活动失败'
  }
}

// 这三项都不随流量变化，只在进页面和手动刷新时取一次：诊断会真的去跑一遍
// 系统检查，面板更新检查会走网络，都不适合跟着 15 秒轮询。
async function refreshAttention() {
  const [geoResult, diagResult, updateResult] = await Promise.allSettled([
    getJSON<GeoStatus>('/api/v1/dae/geo'),
    getJSON<DiagnosticReport>('/api/v1/diagnostics/report'),
    getJSON<PanelUpdatePayload>('/api/v1/panel/update'),
  ])
  if (geoResult.status === 'fulfilled') geo.value = geoResult.value
  if (diagResult.status === 'fulfilled') diagnostics.value = diagResult.value
  if (updateResult.status === 'fulfilled') panelUpdate.value = updateResult.value
}

// force 为真时不带 maxAgeSeconds，绕过服务端缓存重新测量。
async function probeLatency(force = false) {
  const targets = new Map<string, LatencyTarget>()
  for (const row of outbounds.value) {
    if (row.target) targets.set(`${row.target.host}:${row.target.port}`, row.target)
  }
  if (targets.size === 0) return
  probing.value = true
  try {
    const { results } = await postJSON<{ results: LatencyResult[] }>('/api/v1/net/latency', {
      targets: [...targets.values()],
      ...(force ? {} : { maxAgeSeconds: LATENCY_MAX_AGE_SECONDS }),
    })
    const merged = new Map(latency.value)
    for (const result of results) merged.set(`${result.host}:${result.port}`, result)
    latency.value = merged
  } catch (error) {
    if (force) message.error(error instanceof Error ? error.message : '延迟探测失败')
  } finally {
    probing.value = false
  }
}

async function refreshAll(silent = false) {
  if (silent) refreshing.value = true
  else loading.value = true
  await Promise.all([refreshCore(silent), refreshTraffic()])
  await refreshAttention()
  loading.value = false
  refreshing.value = false
  void probeLatency()
}

async function poll() {
  if (document.visibilityState !== 'visible') return
  refreshing.value = true
  await Promise.all([refreshCore(true), refreshTraffic()])
  refreshing.value = false
  // 命中节点变了就重新探：缓存按 host:port 做键，新节点自然没有条目。
  void probeLatency()
}

/* ---------- 动作 ---------- */

async function runAction(action: string) {
  actionLoading.value = action
  try {
    const result = await postJSON<{ message?: string }>(`/api/v1/service/actions/${action}`)
    message.success(result.message || `${actionName(action)}已执行`)
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    await refreshAll(true)
  } catch (error) {
    message.error(error instanceof Error ? error.message : `${actionName(action)}失败`)
  } finally {
    actionLoading.value = ''
  }
}

function actionName(action: string): string {
  return ({ start: '启动', stop: '停止', restart: '重启', reload: '重载', suspend: '暂停' } as Record<string, string>)[action] || action
}

// 与连接活动页同一套说明和确认流程：切级别要改配置、校验并重载 dae。
function enableTelemetry() {
  const level = requiredLevel.value
  dialog.warning({
    title: '启用连接建立流水',
    content: level === 'debug'
      ? '当前 kdae 只在 debug 级别输出连接建立流水。这会增加日志量和运行开销；配置会先校验，并在保存成功后重载 dae。'
      : '这会把 global.log_level 切换为 info，保存前校验配置并在成功后重载 dae。',
    positiveText: `切换为 ${level}`,
    negativeText: '取消',
    onPositiveClick: async () => {
      levelSwitching.value = true
      try {
        const result = await updateDaeLogLevel(level as DaeLogLevel)
        message.success(result.deferred
          ? '日志级别已保存，dae 下次启动后开始记录连接流水'
          : `日志级别已切换为 ${level}，新的连接会出现在曲线里`)
        await refreshTraffic()
      } catch (error) {
        message.error(error instanceof Error ? error.message : '更新 dae 日志级别失败')
      } finally {
        levelSwitching.value = false
      }
    },
  })
}

function onMoreAction(key: string) {
  const copy: Record<string, string> = {
    restart: '重启会中断现有连接，确认继续？',
    suspend: '暂停后可通过无损重载恢复。',
    stop: '停止 dae 后代理流量将不可用。',
  }
  dialog.warning({
    title: actionName(key),
    content: copy[key],
    positiveText: `确认${actionName(key)}`,
    negativeText: '取消',
    onPositiveClick: () => runAction(key),
  })
}

function onVisibility() {
  if (document.visibilityState === 'visible') void poll()
}

onMounted(() => {
  void refreshAll()
  clockTimer = window.setInterval(() => { now.value = Date.now() }, 1000)
  pollTimer = window.setInterval(() => { void poll() }, POLL_INTERVAL_MS)
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  if (clockTimer !== undefined) window.clearInterval(clockTimer)
  if (pollTimer !== undefined) window.clearInterval(pollTimer)
  document.removeEventListener('visibilitychange', onVisibility)
})

// 分组或命中节点变化后补探新目标；缓存让这里不会变成重复发包。
watch(() => outbounds.value.map((row) => row.target && `${row.target.host}:${row.target.port}`).join('|'), () => {
  void probeLatency()
})
</script>

<template>
  <div class="page-stack dashboard-page">
    <NAlert v-if="serviceError" type="error" closable @close="serviceError = ''">{{ serviceError }}</NAlert>

    <!-- 服务状态窄栏：状态和主操作常驻，但不占据第一屏的主要位置 -->
    <section class="dash-service" :class="`tone-${statusTone}`">
      <div class="dash-service-copy">
        <span class="dash-dot" :class="`tone-${statusTone}`" />
        <strong>dae {{ statusLabel }}</strong>
        <NSkeleton v-if="loading" text style="width: 220px" />
        <template v-else>
          <span v-if="daeVersion" class="dash-service-meta">{{ daeVersion }}</span>
          <span class="dash-service-meta">{{ service?.unitFileState === 'enabled' ? '开机自启' : '不随系统启动' }}</span>
          <span v-if="running" class="dash-service-meta">{{ uptime }}</span>
          <span v-if="running" class="dash-service-meta">{{ formatBytes(service?.memoryBytes, 1) }}</span>
        </template>
      </div>
      <div class="dash-service-actions">
        <!-- 启动与无损重载是同一个位置的互斥两态：没跑就启动，跑着就重载。
             重启/暂停/停止则常驻，不可用时禁用。 -->
        <NButton v-if="!running" type="primary" size="small" :loading="actionLoading === 'start'"
                 :disabled="actionLoading !== ''" @click="runAction('start')">
          <template #icon><NIcon><PlayOutline /></NIcon></template>启动 dae
        </NButton>
        <NButton v-else type="primary" size="small" :loading="actionLoading === 'reload'"
                 :disabled="actionLoading !== ''" @click="runAction('reload')">
          <template #icon><NIcon><ReloadOutline /></NIcon></template>无损重载
        </NButton>
        <!-- 服务控制是这一页的核心动作，不该被折进溢出菜单：每次重启或暂停
             都多一次点击，而它们本来就是用户到这一页来做的事。破坏性的
             "停止"用危险色区分，不靠藏起来防误触——确认对话框才是防线。 -->
        <NButton size="small" secondary :disabled="actionLoading !== '' || !running"
                 :loading="actionLoading === 'restart'" @click="onMoreAction('restart')">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>重启
        </NButton>
        <NButton size="small" secondary :disabled="actionLoading !== '' || !running || suspended"
                 :loading="actionLoading === 'suspend'" @click="onMoreAction('suspend')">
          <template #icon><NIcon><PauseOutline /></NIcon></template>暂停
        </NButton>
        <NButton size="small" quaternary type="error" :disabled="actionLoading !== '' || !running"
                 :loading="actionLoading === 'stop'" @click="onMoreAction('stop')">
          <template #icon><NIcon><StopOutline /></NIcon></template>停止
        </NButton>
        <NButton quaternary circle size="small" :loading="refreshing" title="刷新" aria-label="刷新"
                 @click="refreshAll(true)">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>
        </NButton>
      </div>
    </section>

    <NAlert v-if="suspended" type="warning" :bordered="false" class="service-suspended-alert">
      <!-- 状态窄栏已经写了"dae 已暂停"，这里不再重复状态，只补它意味着什么 -->
      代理流量处理已停止，但 dae 进程仍在运行；点击“无损重载”即可恢复。
    </NAlert>

    <!-- 流量：三种状态各有各的画法，绝不用 0 或空白冒充测量值 -->
    <section class="dash-card dash-traffic">
      <NSkeleton v-if="loading" text :repeat="4" />

      <template v-else-if="!traffic?.serviceRunning">
        <header class="dash-card-head">
          <strong>此刻流量</strong>
          <RouterLink class="dash-link" to="/connections">连接活动 ↗</RouterLink>
        </header>
        <div class="dash-telemetry-empty">
          <span class="dash-beacon idle" />
          <span>dae 未运行，现在没有可观测的出站连接。</span>
        </div>
      </template>

      <!-- 日志级别不够：不画任何数字，说清楚为什么没有、代价是什么，给一个开关 -->
      <template v-else-if="telemetryOff">
        <header class="dash-card-head">
          <strong>流量观测未开启</strong>
          <RouterLink class="dash-link" to="/connections">连接活动 ↗</RouterLink>
        </header>
        <div class="dash-telemetry-off">
          <span class="dash-beacon idle" />
          <div class="dash-telemetry-copy">
            <p>
              当前 dae 把连接建立流水写入 <code>{{ requiredLevel }}</code>，而输出级别是
              <code>{{ traffic?.logLevel }}</code>，因此没有可读的流水。
              dae 持有的 socket 快照也不能代替——直连和 eBPF 数据面的连接不经过 userspace socket，数不进去。
            </p>
            <p class="dash-telemetry-cost">
              切换会增加日志量和运行开销。配置会先校验，保存成功后无损重载，不中断现有连接。
            </p>
            <NButton type="primary" size="small" :loading="levelSwitching" @click="enableTelemetry">
              切换为 {{ requiredLevel }} 并重载
            </NButton>
          </div>
          <dl class="dash-socket">
            <dt>dae 当前持有的 socket</dt>
            <dd>
              <span>TCP <strong>{{ socketText(traffic?.summary.outboundTcp) }}</strong></span>
              <span>UDP <strong>{{ socketText(traffic?.summary.udpSockets) }}</strong></span>
            </dd>
            <dd class="dash-socket-note">{{ socketPeakNote }} · 仅供参考，不代表全部流量</dd>
          </dl>
        </div>
      </template>

      <template v-else>
        <div class="dash-traffic-head">
          <div class="dash-traffic-primary">
            <div class="dash-traffic-label">
              <span class="dash-beacon" :class="windowEvents > 0 ? 'live' : 'idle'" />
              <span>最近 {{ TRAFFIC_WINDOW_MINUTES }} 分钟新建连接</span>
            </div>
            <div class="dash-traffic-value">
              <strong>{{ windowEvents.toLocaleString() }}</strong><span>条</span>
            </div>
            <small>来自 dae 连接建立日志</small>
          </div>

          <dl class="dash-traffic-metrics">
            <div><dt>客户端</dt><dd>{{ traffic?.summary.windowClients ?? 0 }}</dd></div>
            <div><dt>目标主机</dt><dd>{{ traffic?.summary.windowTargets ?? 0 }}</dd></div>
          </dl>

          <dl class="dash-socket">
            <dt>dae 当前持有的 socket</dt>
            <dd>
              <span>TCP <strong>{{ socketText(traffic?.summary.outboundTcp) }}</strong></span>
              <span>UDP <strong>{{ socketText(traffic?.summary.udpSockets) }}</strong></span>
            </dd>
            <dd class="dash-socket-note">
              {{ socketPeakNote }} · 只含 dae 持有的 userspace socket，直连与 eBPF 数据面连接不计入
            </dd>
          </dl>

          <RouterLink class="dash-link" to="/connections">连接活动 ↗</RouterLink>
        </div>

        <div class="dash-spark">
          <svg :viewBox="`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`" preserveAspectRatio="none" role="img"
               :aria-label="`最近 ${TRAFFIC_WINDOW_MINUTES} 分钟新建连接曲线，峰值每桶 ${spark?.peak ?? 0} 条`">
            <defs>
              <linearGradient id="dashSpark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.22" />
                <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
              </linearGradient>
            </defs>
            <line v-for="ratio in [0.25, 0.5, 0.75]" :key="ratio" class="dash-spark-grid"
                  x1="0" :y1="SPARK_HEIGHT * ratio" :x2="SPARK_WIDTH" :y2="SPARK_HEIGHT * ratio" />
            <!-- 未覆盖区间只留底纹：面板不知道，不等于当时没有流量 -->
            <rect v-if="spark && spark.uncoveredWidth > 0" class="dash-spark-unknown"
                  x="0" y="0" :width="spark.uncoveredWidth" :height="SPARK_HEIGHT" />
            <path v-if="spark?.area" :d="spark.area" fill="url(#dashSpark)" />
            <path v-if="spark?.line" class="dash-spark-line" :d="spark.line" />
          </svg>
          <div class="dash-spark-axis">
            <span>{{ TRAFFIC_WINDOW_MINUTES }} 分钟前</span>
            <span v-if="seriesSinceLabel" class="dash-spark-note">{{ seriesSinceLabel }}</span>
            <span>现在</span>
          </div>
        </div>
      </template>

      <NAlert v-if="trafficError" type="warning" :bordered="false" class="card-alert">{{ trafficError }}</NAlert>
      <NAlert v-else-if="traffic && !traffic.logsOk" type="warning" :bordered="false" class="card-alert">
        暂时无法读取 dae 日志，曲线保留已经收集到的记录。
      </NAlert>
    </section>

    <div class="dash-columns">
      <!-- 出站健康：当前节点从连接流水反推，不读 dae 内部状态 -->
      <section class="dash-card">
        <header class="dash-card-head">
          <div class="dash-card-title">
            <strong>出站健康</strong>
            <NText depth="3" v-if="latencyProbedAt">入口延迟 {{ formatClock(latencyProbedAt) }} 探测</NText>
          </div>
          <div class="dash-card-tools">
            <NButton quaternary size="tiny" :loading="probing" @click="probeLatency(true)">重新探测</NButton>
            <RouterLink class="dash-link" to="/proxy">代理配置 ↗</RouterLink>
          </div>
        </header>

        <NSkeleton v-if="loading" text :repeat="3" />
        <div v-else-if="outbounds.length === 0" class="dash-empty">
          <strong>还没有分组</strong>
          <span>分组是路由规则的出站目标，按策略从命中的节点中选择。先导入节点，再建一个分组，这里就会显示每个分组当前实际在走哪个节点。</span>
          <RouterLink to="/proxy"><NButton size="small" secondary type="primary">去代理配置</NButton></RouterLink>
        </div>
        <ul v-else class="dash-outbounds">
          <li v-for="row in outbounds" :key="row.group">
            <code class="dash-group">{{ row.group }}</code>
            <div class="dash-outbound-node">
              <template v-if="row.node">
                <div class="dash-outbound-name">
                  <strong>{{ row.node }}</strong>
                  <NTag v-if="row.protocol" size="tiny" :bordered="false">{{ row.protocol }}</NTag>
                </div>
                <small>{{ row.policy }}<template v-if="row.server"> · {{ row.server }}</template></small>
              </template>
              <template v-else>
                <strong class="dash-muted">最近无流量</strong>
                <small>{{ row.policy }} · 这段时间没有命中该组的连接，无法判断当前节点</small>
              </template>
            </div>
            <div class="dash-latency" :class="`tone-${latencyTone(row.latency?.latencyMs)}`">
              <template v-if="!row.node">—</template>
              <template v-else-if="!row.target">节点地址无法解析</template>
              <template v-else-if="probing && !row.latency">探测中…</template>
              <template v-else-if="row.latency?.reachable && row.latency.latencyMs !== undefined">
                {{ Math.round(row.latency.latencyMs) }} ms
              </template>
              <template v-else-if="row.latency">不可达</template>
              <template v-else>未探测</template>
            </div>
          </li>
        </ul>
        <NText depth="3" class="dash-foot-note">
          入口延迟不经 dae 转发，测的是面板到节点入口的可达性，不代表经过代理的实际体验。
        </NText>
      </section>

      <section class="dash-card">
        <header class="dash-card-head">
          <div class="dash-card-title">
            <strong>需要注意</strong>
            <NTag v-if="attention.length" size="tiny" round type="warning">{{ attention.length }}</NTag>
          </div>
        </header>
        <NSkeleton v-if="loading" text :repeat="3" />
        <div v-else-if="attention.length === 0" class="dash-empty compact">
          <strong>没有需要处理的事项</strong>
          <span>服务、配置、Geo 数据与面板版本都正常。</span>
        </div>
        <ul v-else class="dash-attention">
          <li v-for="item in attention" :key="item.id">
            <span class="dash-dot" :class="`tone-${item.tone}`" />
            <div>
              <strong>{{ item.title }}</strong>
              <small v-if="item.detail">{{ item.detail }}</small>
            </div>
            <RouterLink v-if="item.to" class="dash-link" :to="item.to">{{ item.action }} ↗</RouterLink>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
