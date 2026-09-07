<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NInput,
  NModal,
  NSelect,
  NSpace,
  NTag,
  NSwitch,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui'
import {
  AddOutline,
  CloudDownloadOutline,
  CreateOutline,
  LinkOutline,
  ReturnUpBackOutline,
  TimerOutline,
  TrashOutline,
} from '@vicons/ionicons5'
import { APIError, deleteJSON, getJSON, postJSON, putJSON } from '../../api/client'
import type {
  CustomGeoSource,
  CustomGeoSourceInput,
  GeoResidual,
  GeoSource,
  GeoStatus,
  InstallJob,
  ScheduleStatus,
} from '../../types/api'
import { formatBytes, formatDateTime } from '../../utils/format'
import { useJobPolling } from '../../composables/useJobPolling'

// Geo 数据管理与 dae 版本管理相互独立。这张卡片自己加载状态、轮询任务并管理
// 定时设置；生产构造器始终启用它，禁用态只用于依赖不完整的定制构建。
const message = useMessage()
const dialog = useDialog()

const geoStatus = ref<GeoStatus | null>(null)
const geoJob = ref<InstallJob | null>(null)
const geoDisabled = ref(false)
const geoError = ref('')
const geoSource = ref<GeoSource | null>(null)
const geoBusy = computed(() => geoJob.value?.phase === 'downloading' || geoJob.value?.phase === 'applying')
const residualBusy = ref(false)
const safeResidualCount = computed(() =>
  (geoStatus.value?.residuals || []).filter((item) => item.deletable).length,
)
const activeGeoSource = computed(
  () => geoStatus.value?.sources.find((item) => item.source === geoSource.value) || null,
)
const geoSourceOptions = computed(() => (geoStatus.value?.sources || []).map((item) => ({
  label: item.custom ? `${item.label}（自定义）` : item.label,
  value: item.source,
})))
const geoTargetSummary = computed(() => {
  const files = geoStatus.value?.files || []
  const directories = [...new Set(files.map((file) => file.targetPath.replace(/[\\/][^\\/]+$/, '')))]
  if (directories.length === 1) return directories[0]
  return files.map((file) => `${file.name} 写入 ${file.targetPath}`).join('；')
})

const geoPolling = useJobPolling({
  refresh: () => loadGeo(),
  phase: () => geoJob.value?.phase,
  onSettled: (phase) => {
    if (phase === 'done') {
      message.success(geoStatus.value?.serviceState === 'inactive'
        ? 'geo 数据已更新，dae 启动后生效'
        : 'geo 数据已更新')
    }
    else if (phase === 'failed') message.error(geoJob.value?.error || 'geo 更新失败')
  },
})

async function loadGeo() {
  try {
    const payload = await getJSON<{ status: GeoStatus; job: InstallJob }>('/api/v1/dae/geo')
    geoStatus.value = payload.status
    geoJob.value = payload.job
    // 只在首次加载时采用后端的预选值。此后以用户的选择为准——轮询期间把它
    // 重置回去，会让人刚点开 v2fly 就被弹回 Loyalsoldier。
    if (geoSource.value === null) geoSource.value = payload.status.defaultSource
    geoError.value = ''
    geoDisabled.value = false
  } catch (error) {
    if (error instanceof APIError && error.code === 'geo_update_disabled') {
      geoDisabled.value = true
      geoError.value = error.message
      return
    }
    geoError.value = error instanceof Error ? error.message : '读取 geo 数据状态失败'
  }
}

function confirmUpdateGeo() {
  const chosen = activeGeoSource.value
  const repositories = chosen?.repositories.join('、') || '上游'
  // 换来源才是需要重点提醒的：它会改变 geosite: 规则的含义。
  // 沿用同一个来源只是把数据往前推，把警告一并甩出去反而稀释了真正的风险。
  const previous = geoStatus.value?.managed?.source
  const switching = previous !== undefined && previous !== geoSource.value
  const serviceState = geoStatus.value?.serviceState
  const activation = serviceState === 'inactive'
    ? '当前 dae 未运行，因此不会执行 reload；文件会在 dae 下次启动时读取。面板此时无法检查配置引用的 Geo 分类是否存在，若新数据仍缺少分类，dae 下次启动仍会失败。'
    : serviceState === 'active'
      ? '随后会使用 systemd MainPID 执行 dae reload 让它立即生效。'
      : '面板暂时无法确认 dae 是否运行，将尝试使用 dae 默认 PID 文件执行 reload。'
  dialog.warning({
    title: `更新 geo 数据（${chosen?.label || geoSource.value}）`,
    content: `面板会从 ${repositories} 下载 geoip.dat 与 geosite.dat，逐个比对 sha256，`
      + `写入 ${geoTargetSummary.value}。${activation}`
      + (switching
        ? '⚠ 这次会切换到另一套规则集：geosite: 开头的路由规则所匹配的域名集合会随之改变，'
          + (serviceState === 'inactive'
            ? '同名分类内容变化时 dae 不会报错；请确认你的路由规则在新规则集下仍然成立。'
            : '同名分类内容变化时 dae 不会报错；若新来源完全没有配置引用的分类，reload 会失败，'
              + '面板会还原旧数据并指出缺失分类。请确认你的路由规则在新规则集下仍然成立。')
        : '')
      + (serviceState === 'active'
        ? 'reload 不会中断新连接，但进行中的长连接（大文件下载、SSH、串流）最多约 10 秒后可能被断开；'
        : '')
      + (serviceState === 'inactive'
        ? ''
        : '若 dae 不接受新数据，面板会自动还原成原来的 geo 并重新加载。'),
    positiveText: '下载并更新',
    negativeText: '取消',
    onPositiveClick: updateGeo,
  })
}

async function updateGeo() {
  try {
    const payload = await postJSON<{ job: InstallJob }>('/api/v1/dae/geo', { source: geoSource.value })
    geoJob.value = payload.job
    message.info('已开始更新 geo 数据')
    geoPolling.start()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '启动 geo 更新失败')
    if (error instanceof APIError && error.status === 409) {
      await loadGeo()
      if (geoBusy.value) geoPolling.start()
    }
  }
}

function confirmCleanupResiduals() {
  dialog.warning({
    title: '清理 Geo 事务残留',
    content: `将删除 ${safeResidualCount.value} 个不再承载唯一旧数据的文件。正式文件缺失时的回滚点会保留，不会被清理。`,
    positiveText: '确认清理',
    negativeText: '取消',
    onPositiveClick: cleanupResiduals,
  })
}

async function cleanupResiduals() {
  residualBusy.value = true
  try {
    const payload = await postJSON<{ status: GeoStatus }>('/api/v1/dae/geo/residuals/cleanup')
    geoStatus.value = payload.status
    message.success('Geo 事务残留已清理')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '清理 Geo 事务残留失败')
    await loadGeo()
  } finally {
    residualBusy.value = false
  }
}

function confirmRestoreResidual(residual: GeoResidual) {
  dialog.warning({
    title: '恢复旧 Geo 文件',
    content: `正式文件 ${residual.targetPath} 当前缺失。面板会把保留的旧数据恢复到原位；dae 正在运行时会随后 reload。`,
    positiveText: '恢复旧文件',
    negativeText: '取消',
    onPositiveClick: () => restoreResidual(residual),
  })
}

async function restoreResidual(residual: GeoResidual) {
  residualBusy.value = true
  try {
    const payload = await postJSON<{ status: GeoStatus }>('/api/v1/dae/geo/residuals/restore', {
      path: residual.path,
    })
    geoStatus.value = payload.status
    message.success('旧 Geo 文件已恢复')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '恢复旧 Geo 文件失败')
    await loadGeo()
  } finally {
    residualBusy.value = false
  }
}

// ---- 自定义来源：四条链接作为一个整体持久化，避免定时更新只拿到半套数据 ----
const customSources = ref<CustomGeoSource[]>([])
const sourceManagerVisible = ref(false)
const sourceEditorVisible = ref(false)
const sourceLoading = ref(false)
const sourceSaving = ref(false)
const sourceEditingID = ref('')
const sourceError = ref('')

function emptySource(): CustomGeoSourceInput {
  return {
    label: '',
    geoipUrl: '',
    geoipSha256Url: '',
    geositeUrl: '',
    geositeSha256Url: '',
  }
}

const sourceDraft = ref<CustomGeoSourceInput>(emptySource())

async function loadCustomSources() {
  sourceLoading.value = true
  try {
    const payload = await getJSON<{ sources: CustomGeoSource[] }>('/api/v1/dae/geo/sources')
    customSources.value = payload.sources
    sourceError.value = ''
  } catch (error) {
    sourceError.value = error instanceof Error ? error.message : '读取自定义来源失败'
  } finally {
    sourceLoading.value = false
  }
}

async function openSourceManager() {
  sourceManagerVisible.value = true
  await loadCustomSources()
}

function createSource() {
  sourceEditingID.value = ''
  sourceDraft.value = emptySource()
  sourceEditorVisible.value = true
}

function editSource(source: CustomGeoSource) {
  sourceEditingID.value = source.id
  sourceDraft.value = {
    label: source.label,
    geoipUrl: source.geoipUrl,
    geoipSha256Url: source.geoipSha256Url,
    geositeUrl: source.geositeUrl,
    geositeSha256Url: source.geositeSha256Url,
  }
  sourceEditorVisible.value = true
}

const sourceDraftComplete = computed(() => Object.values(sourceDraft.value).every((value) => value.trim() !== ''))

async function saveSource() {
  sourceSaving.value = true
  try {
    const saved = sourceEditingID.value
      ? await putJSON<CustomGeoSource>(`/api/v1/dae/geo/sources/${sourceEditingID.value}`, sourceDraft.value)
      : await postJSON<CustomGeoSource>('/api/v1/dae/geo/sources', sourceDraft.value)
    sourceEditorVisible.value = false
    await Promise.all([loadCustomSources(), loadGeo()])
    geoSource.value = saved.source
    message.success(sourceEditingID.value ? '自定义来源已更新' : '自定义来源已添加')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存自定义来源失败')
  } finally {
    sourceSaving.value = false
  }
}

function sourceInUse(source: CustomGeoSource): boolean {
  return geoStatus.value?.managed?.source === source.source
}

function confirmDeleteSource(source: CustomGeoSource) {
  dialog.warning({
    title: `删除来源 ${source.label}`,
    content: '只删除面板保存的链接，不删除已经落盘的 geoip.dat 或 geosite.dat。',
    positiveText: '删除来源',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await deleteJSON<void>(`/api/v1/dae/geo/sources/${source.id}`, {})
        await Promise.all([loadCustomSources(), loadGeo()])
        message.success('自定义来源已删除')
      } catch (error) {
        message.error(error instanceof Error ? error.message : '删除自定义来源失败')
      }
    },
  })
}

function sourceHost(target: string): string {
  try {
    return new URL(target).hostname
  } catch {
    return target
  }
}

// ---- 定时自动更新：实现与订阅自动刷新平行，但节奏以天计 ----
const schedule = ref<ScheduleStatus | null>(null)
const scheduleVisible = ref(false)
const scheduleSaving = ref(false)
const scheduleEnabled = ref(false)
const scheduleInterval = ref(10080)
const scheduleError = ref('')

const GEO_INTERVAL_OPTIONS = [
  { label: '每天', value: 1440 },
  { label: '每 3 天', value: 4320 },
  { label: '每周', value: 10080 },
  { label: '每 2 周', value: 20160 },
  { label: '每 30 天', value: 43200 },
]

async function loadSchedule() {
  try {
    const status = await getJSON<ScheduleStatus>('/api/v1/schedule/geo')
    schedule.value = status
    scheduleEnabled.value = status.enabled
    scheduleInterval.value = status.intervalMinutes
    scheduleError.value = ''
  } catch (error) {
    // 读不到就不允许保存，否则会用表单默认值覆盖服务端的真实设置
    schedule.value = null
    scheduleError.value = error instanceof Error ? error.message : '读取自动更新设置失败'
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
    schedule.value = await putJSON<ScheduleStatus>('/api/v1/schedule/geo', {
      enabled: scheduleEnabled.value,
      intervalMinutes: scheduleInterval.value,
    })
    scheduleVisible.value = false
    message.success(scheduleEnabled.value ? '已开启 geo 自动更新' : '已关闭 geo 自动更新')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存自动更新设置失败')
  } finally {
    scheduleSaving.value = false
  }
}

const scheduleSummary = computed(() => {
  const status = schedule.value
  if (!status) return ''
  if (!status.enabled) return '自动更新已关闭'
  const option = GEO_INTERVAL_OPTIONS.find((item) => item.value === status.intervalMinutes)
  return option ? option.label : `每 ${status.intervalMinutes} 分钟`
})

onMounted(async () => {
  await loadGeo()
  if (geoDisabled.value) return
  // 任务可能在本卡片打开之前就已在跑（含定时轮次），这时也要接上轮询
  if (geoBusy.value) geoPolling.start()
  await loadSchedule()
})
</script>

<template>
  <NCard v-if="geoDisabled" title="Geo 数据管理" class="panel-card">
    <NAlert type="warning" :bordered="false">{{ geoError }}</NAlert>
  </NCard>
  <NCard v-else title="文件状态与更新" class="panel-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <NButton size="small" quaternary :disabled="geoBusy" @click="openSourceManager">
          <template #icon><NIcon><LinkOutline /></NIcon></template>
          来源管理
        </NButton>
        <NButton size="small" quaternary :disabled="!geoStatus?.updatable" @click="openSchedule">
          <template #icon><NIcon><TimerOutline /></NIcon></template>
          自动更新
        </NButton>
        <NButton
          size="small"
          secondary
          type="primary"
          :loading="geoBusy"
          :disabled="geoBusy || !geoStatus?.updatable || !activeGeoSource"
          @click="confirmUpdateGeo"
        >
          <template #icon><NIcon><CloudDownloadOutline /></NIcon></template>
          一键更新
        </NButton>
      </NSpace>
    </template>

    <NAlert v-if="geoError" type="error" :bordered="false" class="card-alert">{{ geoError }}</NAlert>
    <NAlert v-if="geoJob?.phase === 'downloading'" type="info" :bordered="false" class="card-alert">
      正在下载并校验 geo 数据…
    </NAlert>
    <NAlert v-else-if="geoJob?.phase === 'applying'" type="warning" :bordered="false" class="card-alert">
      {{ geoStatus?.serviceState === 'inactive' ? '正在写入 Geo 文件…' : '正在写入并重新加载 dae…' }}
    </NAlert>
    <NAlert v-else-if="geoJob?.phase === 'failed'" type="error" :bordered="false" class="card-alert">
      上次更新失败：{{ geoJob.error }}
    </NAlert>
    <NAlert v-if="geoStatus?.problem" type="warning" :bordered="false" class="card-alert">
      {{ geoStatus.problem }}
    </NAlert>
    <NAlert
      v-for="warning in geoStatus?.warnings || []"
      :key="warning"
      type="warning"
      :bordered="false"
      class="card-alert"
    >
      {{ warning }}
    </NAlert>
    <NAlert
      v-if="geoStatus?.residuals?.length"
      :type="geoStatus.residuals.some((item) => item.kind === 'rollback') ? 'error' : 'warning'"
      :bordered="false"
      class="card-alert"
    >
      <div class="geo-residual-head">
        <div>
          <strong>发现未完成的 Geo 文件事务</strong>
          <div class="geo-residual-copy">请先恢复唯一旧数据，或确认当前正式文件正常后清理残留。</div>
        </div>
        <NButton
          v-if="safeResidualCount > 0"
          size="small"
          secondary
          :loading="residualBusy"
          :disabled="geoBusy"
          @click="confirmCleanupResiduals"
        >
          <template #icon><NIcon><TrashOutline /></NIcon></template>
          清理安全残留
        </NButton>
      </div>
      <div class="geo-residual-list">
        <div v-for="residual in geoStatus.residuals" :key="residual.path" class="geo-residual-row">
          <div class="geo-residual-info">
            <div>
              <NTag size="small" :type="residual.kind === 'rollback' ? 'error' : 'warning'" :bordered="false">
                {{ residual.kind === 'rollback' ? '回滚点' : '暂存文件' }}
              </NTag>
              <span>{{ formatBytes(residual.size) }} · {{ formatDateTime(residual.modTime) }}</span>
            </div>
            <div class="mono geo-path">{{ residual.path }}</div>
          </div>
          <NButton
            v-if="residual.restorable"
            size="small"
            secondary
            :loading="residualBusy"
            :disabled="geoBusy"
            @click="confirmRestoreResidual(residual)"
          >
            <template #icon><NIcon><ReturnUpBackOutline /></NIcon></template>
            恢复缺失文件
          </NButton>
          <NText v-else-if="!residual.deletable" depth="3">需要在主机上人工检查</NText>
        </div>
      </div>
    </NAlert>

    <dl v-if="geoStatus" class="details-list">
      <div v-for="file in geoStatus.files" :key="file.name">
        <dt>{{ file.name }}</dt>
        <dd>
          <template v-if="file.present">
            {{ formatBytes(file.size) }}
            <NText depth="3">（{{ formatDateTime(file.modTime) }}）</NText>
            <div class="mono geo-path">{{ file.path }}</div>
          </template>
          <NText v-else depth="3">未安装</NText>
          <div v-if="file.targetPath !== file.path" class="geo-target-path">
            下次写入：<span class="mono">{{ file.targetPath }}</span>
          </div>
        </dd>
      </div>
      <div>
        <dt>面板记录</dt>
        <dd>
          <template v-if="geoStatus.managed">
            {{ geoStatus.sources.find((item) => item.source === geoStatus!.managed!.source)?.label
              || geoStatus.managed.source }}
            · <span class="mono">{{ geoStatus.managed.tag }}</span>
            <NText depth="3">（{{ formatDateTime(geoStatus.managed.updatedAt) }} 更新）</NText>
          </template>
          <NText v-else depth="3">面板尚未更新过 geo 数据</NText>
        </dd>
      </div>
      <div v-if="scheduleSummary">
        <dt>自动更新</dt>
        <dd>
          {{ scheduleSummary }}<template v-if="schedule?.enabled && schedule?.nextRunAt">，下次 {{ formatDateTime(schedule.nextRunAt) }}</template>
          <NText v-if="schedule?.lastError" depth="3">（上轮：{{ schedule.lastError }}）</NText>
        </dd>
      </div>
    </dl>

    <div v-if="geoStatus" class="geo-sources">
      <div class="geo-source-picker">
        <NText depth="3">更新来源</NText>
        <NSelect
          v-model:value="geoSource"
          :options="geoSourceOptions"
          :disabled="geoBusy"
          placeholder="选择 Geo 数据来源"
        />
      </div>
      <NText v-if="activeGeoSource" depth="3" class="geo-hint">
        <span class="mono">{{ activeGeoSource.repositories.join('、') }}</span> —— {{ activeGeoSource.note }}
      </NText>
      <NAlert v-else-if="geoSource" type="warning" :bordered="false" class="schedule-alert">
        上次使用的来源 {{ geoSource }} 已不存在。请选择一个现有来源并手动更新，自动更新不会擅自切换规则集。
      </NAlert>
    </div>

    <!-- 这里原有一段解释"更新之后会发生什么"的说明墙：reload 行为、长连接
         中断、切换来源的后果、失败回滚。它与 confirmUpdateGeo 的确认对话框
         内容完全重合，而对话框是按 dae 是否运行、是否换来源动态生成的，更准；
         页面底部那份是静态的，且出现在用户不会读它的时候。 -->

    <NModal v-model:show="scheduleVisible" preset="card" title="geo 数据自动更新" class="orchestrate-modal">
      <NText depth="3">
        到点后面板会重新下载校验；dae 运行时只 reload 不重启，未运行时留待下次启动读取。来源沿用当前面板记录的那一个，
        绝不会自动切换规则集；若有其他控制操作正在执行，本轮跳过并在几分钟后重试。
      </NText>
      <NAlert v-if="scheduleError" type="error" :bordered="false" class="card-alert schedule-alert">
        {{ scheduleError }}
      </NAlert>
      <div class="schedule-row">
        <NSwitch v-model:value="scheduleEnabled" :disabled="scheduleError !== ''" />
        <NText>{{ scheduleEnabled ? '已开启' : '已关闭' }}</NText>
      </div>
      <NSelect v-model:value="scheduleInterval" :options="GEO_INTERVAL_OPTIONS" :disabled="!scheduleEnabled || scheduleError !== ''" />
      <dl v-if="schedule" class="details-list schedule-details">
        <div>
          <dt>上次执行</dt>
          <dd>{{ schedule.lastRunAt ? formatDateTime(schedule.lastRunAt) : '尚未执行' }}</dd>
        </div>
        <div v-if="schedule.nextRunAt">
          <dt>下次执行</dt>
          <dd>{{ formatDateTime(schedule.nextRunAt) }}</dd>
        </div>
        <div v-if="schedule.lastError">
          <dt>上次结果</dt>
          <dd>{{ schedule.lastError }}</dd>
        </div>
      </dl>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="scheduleVisible = false">取消</NButton>
          <NButton type="primary" :loading="scheduleSaving" :disabled="scheduleError !== ''" @click="saveSchedule">保存</NButton>
        </NSpace>
      </template>
    </NModal>

    <NModal v-model:show="sourceManagerVisible" preset="card" title="Geo 数据来源" class="geo-source-modal">
      <div class="geo-source-manager-head">
        <NText depth="3">
          内置来源由面板维护；自定义来源只接受公网 HTTPS，并且两个数据文件都必须提供 SHA-256 校验文件。
        </NText>
        <NButton type="primary" secondary @click="createSource">
          <template #icon><NIcon><AddOutline /></NIcon></template>
          添加来源
        </NButton>
      </div>
      <NAlert v-if="sourceError" type="error" :bordered="false" class="card-alert">{{ sourceError }}</NAlert>
      <div v-if="sourceLoading" class="orchestrate-empty"><NText depth="3">正在读取…</NText></div>
      <div v-else-if="customSources.length === 0" class="orchestrate-empty">
        <NText depth="3">尚未添加自定义来源</NText>
      </div>
      <div v-else class="geo-custom-source-list">
        <div v-for="item in customSources" :key="item.id" class="geo-custom-source-row">
          <div class="geo-custom-source-copy">
            <div class="geo-custom-source-title">
              <strong>{{ item.label }}</strong>
              <NTag v-if="sourceInUse(item)" size="small" type="success" :bordered="false">当前来源</NTag>
            </div>
            <NText depth="3">
              {{ sourceHost(item.geoipUrl) }} · {{ sourceHost(item.geositeUrl) }}
            </NText>
          </div>
          <NSpace :wrap="false">
            <NButton quaternary circle title="编辑来源" @click="editSource(item)">
              <template #icon><NIcon><CreateOutline /></NIcon></template>
            </NButton>
            <NButton
              quaternary
              circle
              type="error"
              title="删除来源"
              :disabled="sourceInUse(item)"
              @click="confirmDeleteSource(item)"
            >
              <template #icon><NIcon><TrashOutline /></NIcon></template>
            </NButton>
          </NSpace>
        </div>
      </div>
    </NModal>

    <NModal
      v-model:show="sourceEditorVisible"
      preset="card"
      :title="sourceEditingID ? '编辑自定义来源' : '添加自定义来源'"
      class="geo-source-editor-modal"
    >
      <div class="geo-source-form">
        <label>
          <NText>来源名称</NText>
          <NInput v-model:value="sourceDraft.label" maxlength="80" placeholder="例如：自建规则集" />
        </label>
        <label>
          <NText>geoip.dat 链接</NText>
          <NInput v-model:value="sourceDraft.geoipUrl" placeholder="https://…/geoip.dat" />
        </label>
        <label>
          <NText>geoip.dat SHA-256 链接</NText>
          <NInput v-model:value="sourceDraft.geoipSha256Url" placeholder="https://…/geoip.dat.sha256sum" />
        </label>
        <label>
          <NText>geosite.dat 链接</NText>
          <NInput v-model:value="sourceDraft.geositeUrl" placeholder="https://…/geosite.dat" />
        </label>
        <label>
          <NText>geosite.dat SHA-256 链接</NText>
          <NInput v-model:value="sourceDraft.geositeSha256Url" placeholder="https://…/geosite.dat.sha256sum" />
        </label>
      </div>
      <NAlert type="info" :bordered="false" class="schedule-alert">
        保存时检查链接格式；真正下载时还会重新解析每次跳转并拒绝内网地址。自定义下载不会携带 GitHub Token。
      </NAlert>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="sourceEditorVisible = false">取消</NButton>
          <NButton type="primary" :loading="sourceSaving" :disabled="!sourceDraftComplete" @click="saveSource">保存来源</NButton>
        </NSpace>
      </template>
    </NModal>
  </NCard>
</template>
