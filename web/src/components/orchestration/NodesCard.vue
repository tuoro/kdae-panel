<script setup lang="ts">
import { computed, h, ref } from 'vue'
import {
  NButton,
  NDropdown,
  NCard,
  NDataTable,
  NEmpty,
  NIcon,
  NInput,
  NModal,
  NSelect,
  NSpace,
  NTag,
  NText,
  NTooltip,
  useMessage,
  type DataTableColumns,
} from 'naive-ui'
import { CreateOutline, DownloadOutline, FlashOutline, PricetagOutline, TrashOutline } from '@vicons/ionicons5'
import { postJSON } from '../../api/client'
import { useMobileViewport } from '../../composables/useMobileViewport'
import type { LatencyResult, LatencyTarget } from '../../types/api'
import { appendToSection, isQuotable, isValidTag, parseGroups, quote, readSection, removeLine, replaceLine, type Entry } from '../../utils/daeconf'
import { includeNodesInGroups } from '../../utils/group'
import { allocateNodeTags, latencyTarget, parseNodeLink, type NodeLinkInfo } from '../../utils/nodelink'
import { entryActions, useEntryRewrite, type EntryTarget } from './entry'
import SectionEditorModal from './SectionEditorModal.vue'

interface NodeRow {
  entry: Entry
  info: NodeLinkInfo | null
}

const content = defineModel<string>({ required: true })
const message = useMessage()
const mobile = useMobileViewport()
const { captureEntry, rewriteEntry } = useEntryRewrite(content, message)
const sourceVisible = ref(false)

const nodes = computed<NodeRow[]>(() =>
  readSection(content.value, 'node').entries.map((entry) => ({ entry, info: parseNodeLink(entry.value) })),
)
const anonymousNodes = computed(() => nodes.value.filter((row) =>
  !row.entry.tag && row.entry.editable && isQuotable(row.entry.value),
))

function labelAnonymousNodes() {
  const targets = anonymousNodes.value
  if (targets.length === 0) return
  const targetStarts = new Set(targets.map((row) => row.entry.lineStart))
  const usedNames = nodes.value.flatMap((row) => {
    if (row.entry.tag) return [row.entry.tag]
    if (targetStarts.has(row.entry.lineStart)) return []
    const runtimeName = row.info?.name.trim()
    return runtimeName ? [runtimeName] : []
  })
  const tags = allocateNodeTags(targets.map((row) => row.entry.value), usedNames)
  let next = content.value
  for (let index = targets.length - 1; index >= 0; index -= 1) {
    const entry = targets[index].entry
    next = replaceLine(next, entry.lineStart, entry.lineEnd, `${tags[index]}: ${quote(entry.value)}`)
  }
  content.value = next
  message.success(`已为 ${targets.length} 个匿名节点补全标签；请在分组中重新选择这些标签后保存`)
}

// ---- 导入 ----
const importVisible = ref(false)
const importText = ref('')
const importGroups = ref<string[]>([])
const importGroupOptions = computed(() => parseGroups(content.value).map((group) => {
  const locked = group.filters.some((filter) => !filter.editable)
  return {
    label: locked ? `${group.name}（含跨行条件，需原文编辑）` : group.name,
    value: group.name,
    disabled: locked,
  }
}))

function openImporter() {
  const names = importGroupOptions.value.filter((option) => !option.disabled).map((option) => option.value)
  importGroups.value = names.includes('proxy') ? ['proxy'] : names.length === 1 ? names : []
  importVisible.value = true
}

function importNodes() {
  const links = importText.value.split('\n').map((line) => line.trim()).filter((line) => line !== '')
  if (links.length === 0) {
    message.warning('请粘贴至少一个分享链接')
    return
  }
  const invalid = links.filter((link) => !/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(link))
  if (invalid.length > 0) {
    message.error(`有 ${invalid.length} 行不是有效的分享链接: ${invalid[0].slice(0, 40)}…`)
    return
  }
  const unrepresentable = links.filter((link) => !isQuotable(link))
  if (unrepresentable.length > 0) {
    message.error('链接同时包含单引号和双引号，dae 配置无法无损表示，请先修正链接')
    return
  }
  const existingNames = readSection(content.value, 'node').entries.flatMap((entry) => {
    const runtimeName = parseNodeLink(entry.value)?.name.trim()
    return [entry.tag, runtimeName].filter((value): value is string => Boolean(value))
  })
  const tags = allocateNodeTags(links, existingNames)
  const withNodes = appendToSection(content.value, 'node', links.map((link, index) => `${tags[index]}: ${quote(link)}`))
  content.value = includeNodesInGroups(withNodes, importGroups.value, tags)
  importVisible.value = false
  importText.value = ''
  message.success(`已加入 ${links.length} 个带稳定标签的节点，保存并重载后生效`)
}

function removeNode(row: NodeRow) {
  content.value = removeLine(content.value, row.entry.lineStart, row.entry.lineEnd)
}

// ---- 标签 ----
const tagTarget = ref<EntryTarget | null>(null)
const tagValue = ref('')

function openTagEditor(entry: Entry) {
  tagTarget.value = captureEntry(entry)
  tagValue.value = entry.tag || ''
}

function applyTag() {
  const target = tagTarget.value
  if (!target) return
  const tag = tagValue.value.trim()
  if (tag !== '' && !isValidTag(tag)) {
    message.error('标签只能使用字母、数字、下划线、点或横线，且以字母或下划线开头')
    return
  }
  if (!isQuotable(target.entry.value)) {
    message.error('该链接同时包含单引号和双引号，无法安全改写，请使用卡片右上角的原文编辑')
    return
  }
  const line = tag === '' ? quote(target.entry.value) : `${tag}: ${quote(target.entry.value)}`
  if (rewriteEntry(target, line)) tagTarget.value = null
}

// ---- 节点延迟(公网 ICMP、内网 TCP，非 dae 内部健康检查) ----
const probing = ref(false)
const latency = ref(new Map<string, LatencyResult>())

function latencyKey(info: NodeLinkInfo): string {
  return `${info.host}:${info.port}`
}

/** 与后端 netprobe.Target.validate 一致，避免把明显非法的目标发出去。 */
function probeTarget(info: NodeLinkInfo | null): LatencyTarget | null {
  return latencyTarget(info)
}

async function probeLatency() {
  const targets = new Map<string, LatencyTarget>()
  for (const row of nodes.value) {
    const target = probeTarget(row.info)
    if (target) targets.set(`${target.host}:${target.port}`, target)
  }
  if (targets.size === 0) {
    message.warning('没有可探测的节点(需要能解析出服务器与端口)')
    return
  }
  probing.value = true
  const batch = [...targets.values()]
  const merged = new Map(latency.value)
  try {
    for (let start = 0; start < batch.length; start += 64) {
      const { results } = await postJSON<{ results: LatencyResult[] }>('/api/v1/net/latency', {
        targets: batch.slice(start, start + 64),
      })
      for (const result of results) merged.set(`${result.host}:${result.port}`, result)
      // 逐批发布，某一批失败时前面的结果仍然可见
      latency.value = new Map(merged)
    }
  } catch (error) {
    message.error(error instanceof Error ? error.message : '延迟探测失败')
  } finally {
    probing.value = false
  }
}

function latencyCell(row: NodeRow) {
  if (!row.info || !probeTarget(row.info)) return h(NText, { depth: 3 }, { default: () => '—' })
  const result = latency.value.get(latencyKey(row.info))
  if (!result) return h(NText, { depth: 3 }, { default: () => '未测' })
  if (!result.reachable) {
    const label = result.method === 'icmp' ? '无法测量' : '不可达'
    return h(NTooltip, null, {
      trigger: () => h(NTag, { size: 'small', type: 'error', bordered: false }, { default: () => label }),
      default: () => result.error || '连接失败',
    })
  }
  const value = result.latencyMs || 0
  const type = value < 100 ? 'success' : value < 300 ? 'warning' : 'error'
  const tag = () => h(NTag, { size: 'small', type, bordered: false }, {
    default: () => `${value.toFixed(value < 10 ? 1 : 0)} ms`,
  })
  return h(NTooltip, null, {
    trigger: tag,
    default: () => [
      result.method === 'icmp' ? 'ICMP 网络延迟（不验证代理端口或协议）' : 'TCP 握手延迟',
      result.resolvedIp ? ` · ${result.resolvedIp}` : '',
    ].join(''),
  })
}

function latencyLabel(row: NodeRow): string {
  if (!row.info || !probeTarget(row.info)) return '—'
  const result = latency.value.get(latencyKey(row.info))
  if (!result) return '未测'
  if (!result.reachable) return result.method === 'icmp' ? '无法测量' : '不可达'
  const value = result.latencyMs || 0
  return `${value.toFixed(value < 10 ? 1 : 0)} ms`
}

function latencyType(row: NodeRow): 'success' | 'warning' | 'error' | 'default' {
  if (!row.info || !probeTarget(row.info)) return 'default'
  const result = latency.value.get(latencyKey(row.info))
  if (!result) return 'default'
  if (!result.reachable) return 'error'
  const value = result.latencyMs || 0
  return value < 100 ? 'success' : value < 300 ? 'warning' : 'error'
}

function latencyTitle(row: NodeRow): string {
  if (!row.info) return ''
  const result = latency.value.get(latencyKey(row.info))
  if (!result) return ''
  if (!result.reachable) return result.error || ''
  const method = result.method === 'icmp' ? 'ICMP 网络延迟' : 'TCP 握手延迟'
  return result.resolvedIp ? `${method} · ${result.resolvedIp}` : method
}

const nodeColumns: DataTableColumns<NodeRow> = [
  {
    // 原来"名称"和"标签"是两列：名称渲染 tag || info.name，标签渲染 tag，
    // 有标签时两列内容完全相同——绝大多数行都是。合成一列，没有标签时
    // 显示分享链接里的名字并注明，信息不丢。
    title: '名称',
    key: 'name',
    minWidth: 220,
    ellipsis: { tooltip: true },
    render: (row) => row.entry.tag
      ? row.entry.tag
      : h(NSpace, { size: 6, align: 'center', wrap: false }, {
          default: () => [
            row.info?.name || h(NText, { depth: 3 }, { default: () => '未命名' }),
            h(NText, { depth: 3, style: 'font-size: var(--text-meta)' }, { default: () => '无标签' }),
          ],
        }),
  },
  {
    title: '协议',
    key: 'protocol',
    width: 110,
    render: (row) => h(NTag, { size: 'small', type: 'info', bordered: false }, { default: () => row.info?.protocol || '未知' }),
  },
  {
    title: '服务器',
    key: 'host',
    minWidth: 180,
    ellipsis: { tooltip: true },
    render: (row) => h('span', { class: 'mono' }, row.info?.host || '—'),
  },
  {
    title: '端口',
    key: 'port',
    width: 90,
    render: (row) => row.info?.port ?? '—',
  },
  {
    title: () => h(NTooltip, null, {
      trigger: () => h('span', { class: 'column-hint' }, '节点入口延迟'),
      default: () => '公网节点显示三次 ICMP 网络往返中位数，完全避开 dae 的 TCP/UDP 透明转发；它不验证代理端口或协议可用性。内网节点显示三次 TCP 握手中位数。两者都不是 dae 的健康检查延迟。',
    }),
    key: 'latency',
    width: 110,
    render: latencyCell,
  },
  {
    title: '操作',
    key: 'actions',
    width: 130,
    fixed: 'right',
    render: (row) => entryActions(row.entry, [
      { title: '打标签', icon: PricetagOutline, onClick: () => openTagEditor(row.entry) },
      { title: '移除', icon: TrashOutline, type: 'error', onClick: () => removeNode(row) },
    ]),
  },
]
// 卡片头只留标题、计数、一个主操作和溢出菜单。原来四到六个控件平铺，
// 每张卡片的组合还都不一样，用户得逐张辨认哪个是主要的。
const nodeOverflowOptions = computed(() => [
  { label: '测试入口延迟', key: 'probe', disabled: nodes.value.length === 0 || probing.value },
  ...(anonymousNodes.value.length ? [{ label: '补全标签', key: 'label' }] : []),
  { label: '编辑原文', key: 'source' },
])
function onNodeOverflow(key: string) {
  if (key === 'probe') void probeLatency()
  if (key === 'label') void labelAnonymousNodes()
  if (key === 'source') sourceVisible.value = true
}
</script>

<template>
  <NCard title="节点" class="panel-card" content-style="padding: 0;" data-testid="nodes-card">
    <template #header-extra>
      <NSpace size="small">
        <NTag size="small" :bordered="false">{{ nodes.length }} 个</NTag>
        <NButton size="small" type="primary" @click="openImporter">
          <template #icon><NIcon><DownloadOutline /></NIcon></template>导入节点
        </NButton>
        <NDropdown trigger="click" :options="nodeOverflowOptions" @select="onNodeOverflow">
          <NButton size="small" quaternary aria-label="更多节点操作">⋯</NButton>
        </NDropdown>
      </NSpace>
    </template>
    <NDataTable
      v-if="!mobile"
      :columns="nodeColumns"
      :data="nodes"
      :row-key="(row: NodeRow) => row.entry.lineStart"
      :scroll-x="960"
      :bordered="false"
      size="small"
    >
      <template #empty>
        <div class="orchestrate-empty">
          <NText depth="3">还没有手工节点。粘贴分享链接导入，或使用订阅。</NText>
        </div>
      </template>
    </NDataTable>
    <template v-else>
      <div v-if="nodes.length" class="mobile-record-list" data-testid="mobile-node-list">
        <article v-for="row in nodes" :key="row.entry.lineStart" class="mobile-record">
          <div class="mobile-record-head">
            <div class="mobile-record-title">
              <span>{{ row.entry.tag || row.info?.name || '未命名' }}</span>
              <NTag size="tiny" type="info" :bordered="false">{{ row.info?.protocol || '未知' }}</NTag>
            </div>
            <NTag
              size="small"
              :type="latencyType(row)"
              :bordered="false"
              :title="latencyTitle(row)"
            >{{ latencyLabel(row) }}</NTag>
          </div>
          <p class="mobile-record-description mono">
            {{ row.info?.host || '无法解析服务器' }}<template v-if="row.info?.port">:{{ row.info.port }}</template>
          </p>
          <div class="mobile-record-meta">
            <span v-if="row.entry.tag">标签<strong class="mono">{{ row.entry.tag }}</strong></span>
            <span>配置行<strong>{{ row.entry.lineStart + 1 }}</strong></span>
          </div>
          <div class="mobile-action-row">
            <NButton secondary :disabled="!row.entry.editable" @click="openTagEditor(row.entry)">
              <template #icon><NIcon><PricetagOutline /></NIcon></template>标签
            </NButton>
            <NButton secondary type="error" :disabled="!row.entry.editable" @click="removeNode(row)">
              <template #icon><NIcon><TrashOutline /></NIcon></template>移除
            </NButton>
          </div>
        </article>
      </div>
      <NEmpty v-else description="还没有手工节点。粘贴分享链接导入，或使用订阅。" class="mobile-empty" />
    </template>
  </NCard>

  <NModal v-model:show="importVisible" preset="card" title="导入节点" class="orchestrate-modal">
    <NText depth="3">
      每行一个分享链接，支持 vmess / vless / ss / ssr / trojan / tuic / juicity / hysteria2 / anytls / socks5 / http(s)。
      面板会生成唯一标签，确保分组使用的名称与 dae 运行时一致。
    </NText>
    <NInput
      v-model:value="importText"
      type="textarea"
      class="mono"
      :rows="8"
      placeholder="vmess://…&#10;vless://…&#10;hysteria2://…"
      spellcheck="false"
    />
    <label v-if="importGroupOptions.length" class="node-import-groups">
      <span>同时加入分组</span>
      <NSelect
        v-model:value="importGroups"
        :options="importGroupOptions"
        multiple
        clearable
        placeholder="可选择一个或多个分组"
        data-testid="import-node-groups"
      />
      <NText depth="3">无过滤条件的分组已经包含全部节点，不会重复写入过滤规则。</NText>
    </label>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="importVisible = false">取消</NButton>
        <NButton type="primary" @click="importNodes">加入配置</NButton>
      </NSpace>
    </template>
  </NModal>

  <NModal :show="tagTarget !== null" preset="card" title="节点标签" class="orchestrate-modal" @update:show="tagTarget = null">
    <NText depth="3">标签用于在分组过滤中稳定引用节点，留空则恢复为匿名条目。</NText>
    <NInput v-model:value="tagValue" placeholder="如 hk_01" spellcheck="false" @keyup.enter="applyTag" />
    <template #footer>
      <NSpace justify="end">
        <NButton @click="tagTarget = null">取消</NButton>
        <NButton type="primary" @click="applyTag">确定</NButton>
      </NSpace>
    </template>
  </NModal>

  <SectionEditorModal
    v-model:show="sourceVisible"
    v-model:content="content"
    section="node"
    title="编辑节点原文"
    description="这里只替换 node 节内部内容，适合处理跨行节点或无法用表格安全改写的链接。其他配置保持不变。"
  />
</template>
