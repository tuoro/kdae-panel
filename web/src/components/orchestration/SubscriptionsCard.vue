<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NDropdown,
  NCard,
  NDataTable,
  NEmpty,
  NIcon,
  NInput,
  NInputGroup,
  NModal,
  NSelect,
  NSpace,
  NSwitch,
  NTag,
  NText,
  NTooltip,
  useDialog,
  useMessage,
  type DataTableColumns,
} from 'naive-ui'
import { AddOutline, CreateOutline, RefreshOutline, TimerOutline, TrashOutline } from '@vicons/ionicons5'
import { getJSON, postJSON, putJSON } from '../../api/client'
import { useMobileViewport } from '../../composables/useMobileViewport'
import type { ManagedSubscription, ScheduleStatus } from '../../types/api'
import { appendToSection, isQuotable, isValidTag, quote, readSection, removeLine, type Entry } from '../../utils/daeconf'
import { parseScheme, supportsPersistence, togglePersistence } from '../../utils/subscription'
import { formatDateTime } from '../../utils/format'
import { entryActions, useEntryRewrite, type EntryTarget } from './entry'
import SectionEditorModal from './SectionEditorModal.vue'

const content = defineModel<string>({ required: true })
const managed = defineModel<ManagedSubscription[]>('managed', { required: true })
const props = defineProps<{
  /** 有未保存的配置时不允许"立即刷新"：重载应用的是磁盘配置，会绕过这些改动。 */
  dirty: boolean
}>()

const message = useMessage()
const mobile = useMobileViewport()
const dialog = useDialog()
const { captureEntry, rewriteEntry } = useEntryRewrite(content, message)

const subscriptions = computed<Entry[]>(() => readSection(content.value, 'subscription').entries)
const sourceVisible = ref(false)

// ---- 添加 ----
const subscriptionTag = ref('')
const subscriptionURL = ref('')
const subscriptionPersist = ref(true)
const subscriptionUA = ref('')
const preparing = ref(false)

const UA_OPTIONS = [
  { label: 'dae 原生拉取', value: '' },
  { label: 'Shadowrocket', value: 'Shadowrocket' },
  { label: 'Clash Verge', value: 'clash-verge' },
  { label: 'FlClash', value: 'FlClash' },
]

function managedForEntry(entry: Entry): ManagedSubscription | undefined {
  if (!entry.tag) return undefined
  return managed.value.find((item) => item.tag === entry.tag && item.localUrl === entry.value)
}

function displayURL(entry: Entry): string {
  return managedForEntry(entry)?.url || entry.value
}

function replaceManaged(previousTag: string | undefined, item?: ManagedSubscription) {
  const next = managed.value.filter((candidate) => candidate.tag !== previousTag && candidate.tag !== item?.tag)
  if (item) next.push(item)
  managed.value = next
}

async function prepareManaged(tag: string, url: string, userAgent: string): Promise<ManagedSubscription> {
  return postJSON<ManagedSubscription>('/api/v1/subscriptions/managed/prepare', { tag, url, userAgent })
}

function subscriptionLine(tag: string, url: string): string {
  return tag === '' ? quote(url) : `${tag}: ${quote(url)}`
}

function validSubscription(tag: string, url: string, userAgent = '', editingTag = ''): boolean {
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url) || !isQuotable(url)) {
    message.error('请输入完整的订阅链接，且不能同时包含单引号和双引号')
    return false
  }
  if (tag !== '' && !isValidTag(tag)) {
    message.error('订阅标签只能使用字母、数字、下划线、点或横线，且以字母或下划线开头')
    return false
  }
  if (userAgent !== '' && tag === '') {
    message.error('设置请求 UA 的订阅必须填写唯一标签')
    return false
  }
  if (userAgent !== '' && !/^https?:\/\//i.test(url)) {
    message.error('设置请求 UA 时仅支持 HTTP 或 HTTPS 订阅地址')
    return false
  }
  if (userAgent.includes('\r') || userAgent.includes('\n') || userAgent.length > 256) {
    message.error('请求 UA 不能换行且不能超过 256 个字符')
    return false
  }
  if (tag !== '' && tag !== editingTag && subscriptions.value.some((entry) => entry.tag === tag)) {
    message.error(`订阅标签 ${tag} 已存在`)
    return false
  }
  return true
}

async function addSubscription() {
  const tag = subscriptionTag.value.trim()
  let url = subscriptionURL.value.trim()
  const userAgent = subscriptionUA.value.trim()
  if (!validSubscription(tag, url, userAgent)) return
  preparing.value = true
  try {
    if (userAgent !== '') {
      const item = await prepareManaged(tag, url, userAgent)
      url = item.localUrl
      replaceManaged(undefined, item)
    }
    // 开关是双向的：粘贴的链接已带 -file 而开关关闭时，同样要剥掉后缀
    if (userAgent === '' && supportsPersistence(url) && parseScheme(url)?.persistent !== subscriptionPersist.value) {
      url = togglePersistence(url)
    }
    content.value = appendToSection(content.value, 'subscription', [subscriptionLine(tag, url)])
    subscriptionTag.value = ''
    subscriptionURL.value = ''
    subscriptionUA.value = ''
  } catch (error) {
    message.error(error instanceof Error ? error.message : '准备托管订阅失败')
  } finally {
    preparing.value = false
  }
}

function setPersistence(entry: Entry, persistent: boolean) {
  const next = togglePersistence(entry.value)
  // 开关状态与目标不符时说明重复触发或链接形态不支持，直接忽略
  if (next === entry.value || parseScheme(next)?.persistent !== persistent) return
  // 值与标签来自配置本身，仍需确认它们能被无损写回
  if (!validSubscription(entry.tag || '', next)) return
  rewriteEntry(captureEntry(entry), subscriptionLine(entry.tag || '', next))
}

// ---- 编辑 ----
const editTarget = ref<EntryTarget | null>(null)
const editTag = ref('')
const editURL = ref('')
const editUA = ref('')

function openSubscriptionEditor(entry: Entry) {
  editTarget.value = captureEntry(entry)
  editTag.value = entry.tag || ''
  const item = managedForEntry(entry)
  editURL.value = item?.url || entry.value
  editUA.value = item?.userAgent || ''
}

async function applySubscriptionEdit() {
  const target = editTarget.value
  if (!target) return
  const tag = editTag.value.trim()
  const url = editURL.value.trim()
  const userAgent = editUA.value.trim()
  const previous = managedForEntry(target.entry)
  if (!validSubscription(tag, url, userAgent, target.entry.tag || '')) return
  preparing.value = true
  try {
    let nextURL = url
    let nextManaged: ManagedSubscription | undefined
    if (userAgent !== '') {
      nextManaged = await prepareManaged(tag, url, userAgent)
      nextURL = nextManaged.localUrl
    }
    if (rewriteEntry(target, subscriptionLine(tag, nextURL))) {
      replaceManaged(previous?.tag, nextManaged)
      editTarget.value = null
    }
  } catch (error) {
    message.error(error instanceof Error ? error.message : '准备托管订阅失败')
  } finally {
    preparing.value = false
  }
}

function removeSubscription(entry: Entry) {
  const item = managedForEntry(entry)
  content.value = removeLine(content.value, entry.lineStart, entry.lineEnd)
  if (item) replaceManaged(item.tag)
}

const subscriptionColumns: DataTableColumns<Entry> = [
  {
    title: '标签',
    key: 'tag',
    width: 110,
    ellipsis: { tooltip: true },
    render: (row) => row.tag
      ? h(NTag, { size: 'small', bordered: false }, { default: () => row.tag })
      : h(NText, { depth: 3 }, { default: () => '—' }),
  },
  {
    title: '订阅链接',
    key: 'value',
    minWidth: 200,
    ellipsis: { tooltip: true },
    render: (row) => {
      const item = managedForEntry(row)
      return h('div', { class: 'subscription-source' }, [
        h('span', { class: 'mono' }, displayURL(row)),
        item ? h(NTag, { size: 'tiny', bordered: false, type: 'info' }, { default: () => `UA: ${item.userAgent}` }) : null,
      ])
    },
  },
  {
    title: () => h(NTooltip, null, {
      trigger: () => h('span', { class: 'column-hint' }, '离线缓存'),
      default: () => '开启后 dae 会把拉取成功的订阅内容保存到 persist.d 目录，'
        + '下次拉取失败时回退使用该缓存，成功后自动更新。对 file:// 本地订阅不适用。',
    }),
    key: 'persist',
    width: 100,
    render: (row) => {
      if (managedForEntry(row) || !supportsPersistence(row.value)) return h(NText, { depth: 3 }, { default: () => '—' })
      return h(NSwitch, {
        size: 'small',
        value: parseScheme(row.value)?.persistent === true,
        disabled: !row.editable,
        'onUpdate:value': (value: boolean) => setPersistence(row, value),
      })
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render: (row) => entryActions(row, [
      { title: '编辑', icon: CreateOutline, onClick: () => openSubscriptionEditor(row) },
      {
        title: '移除',
        icon: TrashOutline,
        type: 'error',
        onClick: () => removeSubscription(row),
      },
    ], true),
  },
]

// ---- 订阅刷新:dae 只在 reload 时重新拉取订阅 ----
const refreshing = ref(false)
const scheduleVisible = ref(false)
const scheduleSaving = ref(false)
const reloadSchedule = ref<ScheduleStatus | null>(null)
const scheduleEnabled = ref(false)
const scheduleInterval = ref(1440)

const INTERVAL_OPTIONS = [
  { label: '每 30 分钟', value: 30 },
  { label: '每小时', value: 60 },
  { label: '每 6 小时', value: 360 },
  { label: '每 12 小时', value: 720 },
  { label: '每天', value: 1440 },
  { label: '每周', value: 10080 },
]

const scheduleError = ref('')

async function loadSchedule() {
  try {
    const status = await getJSON<ScheduleStatus>('/api/v1/schedule/reload')
    reloadSchedule.value = status
    scheduleEnabled.value = status.enabled
    scheduleInterval.value = status.intervalMinutes
    scheduleError.value = ''
  } catch (error) {
    // 读不到就不允许保存，否则会用表单默认值覆盖服务端的真实设置
    reloadSchedule.value = null
    scheduleError.value = error instanceof Error ? error.message : '读取自动刷新设置失败'
  }
}

// 每次打开都以服务端状态为准，避免上次取消时留下的编辑残留
async function openSchedule() {
  scheduleVisible.value = true
  await loadSchedule()
}

async function saveSchedule() {
  scheduleSaving.value = true
  try {
    reloadSchedule.value = await putJSON<ScheduleStatus>('/api/v1/schedule/reload', {
      enabled: scheduleEnabled.value,
      intervalMinutes: scheduleInterval.value,
    })
    scheduleVisible.value = false
    message.success(scheduleEnabled.value ? '已开启订阅自动刷新' : '已关闭订阅自动刷新')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存自动刷新设置失败')
  } finally {
    scheduleSaving.value = false
  }
}

function confirmRefreshNow() {
  if (props.dirty) {
    message.warning('有未保存的配置修改，请先保存并重载')
    return
  }
  dialog.info({
    title: '立即刷新订阅',
    content: '面板会先更新带 UA 的托管订阅，再由 dae 无损重载其余订阅，现有连接不会中断。'
      + '重载应用的是磁盘上的当前配置，因此之前"仅保存"而未应用的改动也会一并生效。',
    positiveText: '刷新并重载',
    negativeText: '取消',
    onPositiveClick: refreshNow,
  })
}

async function refreshNow() {
  refreshing.value = true
  try {
    await postJSON('/api/v1/service/actions/reload')
    message.success('托管订阅已更新，并已触发 dae 无损重载')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '刷新订阅失败')
  } finally {
    refreshing.value = false
  }
}

const scheduleSummary = computed(() => {
  const status = reloadSchedule.value
  if (!status) return ''
  if (!status.enabled) return '自动刷新已关闭'
  const option = INTERVAL_OPTIONS.find((item) => item.value === status.intervalMinutes)
  return option ? option.label : `每 ${status.intervalMinutes} 分钟`
})

onMounted(() => void loadSchedule())
const subOverflowOptions = [
  { label: '自动刷新设置', key: 'schedule' },
  { label: '编辑原文', key: 'source' },
]
function onSubOverflow(key: string) {
  if (key === 'schedule') openSchedule()
  if (key === 'source') sourceVisible.value = true
}
</script>

<template>
  <NCard title="订阅" class="panel-card" content-style="padding: 0;" data-testid="subscriptions-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <NTag size="small" :bordered="false">{{ subscriptions.length }} 个</NTag>
        <NButton size="small" secondary :loading="refreshing" :disabled="subscriptions.length === 0" @click="confirmRefreshNow">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>立即刷新
        </NButton>
        <NDropdown trigger="click" :options="subOverflowOptions" @select="onSubOverflow">
          <NButton size="small" quaternary aria-label="更多订阅操作">⋯</NButton>
        </NDropdown>
      </NSpace>
    </template>
    <div class="orchestrate-add" data-testid="subscription-add">
      <NInputGroup>
        <NInput v-model:value="subscriptionTag" placeholder="标签(可选)" class="orchestrate-tag-input" />
        <NInput v-model:value="subscriptionURL" placeholder="https://example.com/subscription" @keyup.enter="addSubscription" />
        <NSelect
          v-model:value="subscriptionUA"
          :options="UA_OPTIONS"
          filterable
          tag
          placeholder="请求 UA"
          class="subscription-ua-select"
        />
        <NButton type="primary" :loading="preparing" @click="addSubscription">
          <template #icon><NIcon><AddOutline /></NIcon></template>添加
        </NButton>
      </NInputGroup>
      <div class="orchestrate-add-hint">
        <NSwitch v-model:value="subscriptionPersist" size="small" :disabled="subscriptionUA !== ''" />
        <NText depth="3">
          {{ subscriptionUA
            ? '设置 UA 后由面板下载、校验并缓存，dae 从本地文件读取；必须填写标签。'
            : '启用离线缓存（写作 https-file://，拉取失败时回退到上次成功的内容）' }}
        </NText>
      </div>
      <NText v-if="scheduleSummary" depth="3" class="schedule-summary">
        订阅刷新：{{ scheduleSummary }}<template v-if="reloadSchedule?.nextRunAt">，下次 {{ formatDateTime(reloadSchedule.nextRunAt) }}</template>
      </NText>
    </div>
    <NDataTable
      v-if="!mobile"
      data-testid="subscription-list"
      :columns="subscriptionColumns"
      :data="subscriptions"
      :row-key="(row: Entry) => row.lineStart"
      :bordered="false"
      :scroll-x="620"
      size="small"
    >
      <template #empty>
        <div class="orchestrate-empty">
          <NText depth="3">还没有订阅。订阅内容由 dae 在重载时拉取。</NText>
        </div>
      </template>
    </NDataTable>
    <template v-else>
      <div v-if="subscriptions.length" class="mobile-record-list" data-testid="mobile-subscription-list">
        <article v-for="entry in subscriptions" :key="entry.lineStart" class="mobile-record">
          <div class="mobile-record-head">
            <div class="mobile-record-title">
              <span>{{ entry.tag || '未命名订阅' }}</span>
              <NTag v-if="parseScheme(entry.value)?.persistent" size="tiny" type="info" :bordered="false">离线缓存</NTag>
              <NTag v-if="managedForEntry(entry)" size="tiny" type="info" :bordered="false">
                UA: {{ managedForEntry(entry)?.userAgent }}
              </NTag>
            </div>
          </div>
          <p class="mobile-record-description mono">{{ displayURL(entry) }}</p>
          <div v-if="!managedForEntry(entry) && supportsPersistence(entry.value)" class="mobile-record-toggle">
            <div>
              <strong>离线缓存</strong>
              <NText depth="3">拉取失败时使用上次成功内容</NText>
            </div>
            <NSwitch
              size="small"
              :value="parseScheme(entry.value)?.persistent === true"
              :disabled="!entry.editable"
              @update:value="(value: boolean) => setPersistence(entry, value)"
            />
          </div>
          <div class="mobile-action-row">
            <NButton secondary :disabled="!entry.editable" @click="openSubscriptionEditor(entry)">
              <template #icon><NIcon><CreateOutline /></NIcon></template>编辑
            </NButton>
            <NButton
              secondary
              type="error"
              :disabled="!entry.editable"
              @click="removeSubscription(entry)"
            >
              <template #icon><NIcon><TrashOutline /></NIcon></template>移除
            </NButton>
          </div>
        </article>
      </div>
      <NEmpty v-else description="还没有订阅。订阅内容由 dae 在重载时拉取。" class="mobile-empty" />
    </template>
  </NCard>

  <NModal :show="editTarget !== null" preset="card" title="编辑订阅" class="orchestrate-modal" @update:show="editTarget = null">
    <NText depth="3">设置请求 UA 后由面板负责下载和校验；留空则恢复为 dae 原生拉取。</NText>
    <NInput v-model:value="editTag" placeholder="标签(可选)" spellcheck="false" />
    <NInput v-model:value="editURL" class="mono" placeholder="https://example.com/subscription" spellcheck="false" @keyup.enter="applySubscriptionEdit" />
    <NSelect
      v-model:value="editUA"
      :options="UA_OPTIONS"
      filterable
      tag
      placeholder="请求 UA（留空由 dae 拉取）"
    />
    <template #footer>
      <NSpace justify="end">
        <NButton @click="editTarget = null">取消</NButton>
        <NButton type="primary" :loading="preparing" @click="applySubscriptionEdit">确定</NButton>
      </NSpace>
    </template>
  </NModal>

  <NModal v-model:show="scheduleVisible" preset="card" title="订阅自动刷新" class="orchestrate-modal">
    <NText depth="3">
      自动刷新会先更新由面板托管的订阅，再执行一次 dae reload；其他订阅仍由 dae 拉取。
      面板有其他控制操作正在执行时会跳过当轮，不会与之交叉。
    </NText>
    <NAlert v-if="scheduleError" type="error" :bordered="false" class="card-alert schedule-alert">
      {{ scheduleError }}
    </NAlert>
    <div class="schedule-row">
      <NSwitch v-model:value="scheduleEnabled" :disabled="scheduleError !== ''" />
      <NText>{{ scheduleEnabled ? '已开启' : '已关闭' }}</NText>
    </div>
    <NSelect v-model:value="scheduleInterval" :options="INTERVAL_OPTIONS" :disabled="!scheduleEnabled || scheduleError !== ''" />
    <dl v-if="reloadSchedule" class="details-list schedule-details">
      <div>
        <dt>上次执行</dt>
        <dd>{{ reloadSchedule.lastRunAt ? formatDateTime(reloadSchedule.lastRunAt) : '尚未执行' }}</dd>
      </div>
      <div v-if="reloadSchedule.nextRunAt">
        <dt>下次执行</dt>
        <dd>{{ formatDateTime(reloadSchedule.nextRunAt) }}</dd>
      </div>
      <div v-if="reloadSchedule.lastError">
        <dt>上次结果</dt>
        <dd>{{ reloadSchedule.lastError }}</dd>
      </div>
    </dl>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="scheduleVisible = false">取消</NButton>
        <NButton type="primary" :loading="scheduleSaving" :disabled="scheduleError !== ''" @click="saveSchedule">保存</NButton>
      </NSpace>
    </template>
  </NModal>

  <SectionEditorModal
    v-model:show="sourceVisible"
    v-model:content="content"
    section="subscription"
    title="编辑订阅原文"
    description="这里只替换 subscription 节内部内容，其他配置与注释保持不变。应用后仍需在页面顶部保存或保存并重载。"
  />
</template>
