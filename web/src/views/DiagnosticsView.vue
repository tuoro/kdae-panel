<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NAlert, NButton, NIcon, NSpin, NText, useMessage } from 'naive-ui'
import { ChevronDownOutline, DownloadOutline, ReaderOutline, RefreshOutline } from '@vicons/ionicons5'
import { getDownload, getJSON } from '../api/client'
import type { DiagnosticItem, DiagnosticLevel, DiagnosticReport } from '../types/api'
import { formatDateTime } from '../utils/format'

// 超过这个条数的明细默认折叠。网络接口一项就能列出十几个 veth/br-，
// 全展开会把整页最大的一块让给排障时基本不看的内容。
const DETAIL_PREVIEW = 6

const message = useMessage()
const router = useRouter()
const loading = ref(true)
const exporting = ref(false)
const errorText = ref('')
const report = ref<DiagnosticReport | null>(null)
const levelFilter = ref<DiagnosticLevel | null>(null)
const showHealthy = ref(false)
const expandedDetails = ref(new Set<string>())

const levelMeta: Record<DiagnosticLevel, { label: string; type: 'success' | 'warning' | 'error' | 'default' }> = {
  ok: { label: '正常', type: 'success' },
  warning: { label: '注意', type: 'warning' },
  error: { label: '故障', type: 'error' },
  unknown: { label: '未知', type: 'default' },
}

// 排障看的是"什么坏了"，不是"它属于哪一类"。按严重度排，分类降级成标签。
const LEVEL_ORDER: DiagnosticLevel[] = ['error', 'warning', 'unknown', 'ok']

const overallCopy = computed(() => {
  if (!report.value) return ''
  switch (report.value.overall) {
    case 'error': return '发现需要先处理的故障'
    case 'warning': return '基础检查通过，但有需要确认的项目'
    case 'unknown': return '部分信息无法读取，结果不完整'
    default: return '公开接口基础检查全部通过'
  }
})

const sorted = computed(() => [...(report.value?.items ?? [])].sort(
  (left, right) => LEVEL_ORDER.indexOf(left.level) - LEVEL_ORDER.indexOf(right.level),
))

const attention = computed(() => sorted.value.filter((item) => item.level !== 'ok'))
const healthy = computed(() => sorted.value.filter((item) => item.level === 'ok'))

// 选中某个级别时只看该级别；正常项在筛选状态下也按同一条规则展示。
const filtered = computed(() =>
  levelFilter.value === null ? [] : sorted.value.filter((item) => item.level === levelFilter.value))

function toggleFilter(level: DiagnosticLevel) {
  if (!report.value?.counts[level]) return
  levelFilter.value = levelFilter.value === level ? null : level
}

function toggleDetails(id: string) {
  const next = new Set(expandedDetails.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedDetails.value = next
}

function visibleDetails(item: DiagnosticItem): string[] {
  const details = item.details ?? []
  if (details.length <= DETAIL_PREVIEW || expandedDetails.value.has(item.id)) return details
  return details.slice(0, DETAIL_PREVIEW)
}

function hiddenCount(item: DiagnosticItem): number {
  const total = item.details?.length ?? 0
  return expandedDetails.value.has(item.id) ? 0 : Math.max(0, total - DETAIL_PREVIEW)
}

async function load() {
  loading.value = true
  try {
    report.value = await getJSON<DiagnosticReport>('/api/v1/diagnostics/report')
    errorText.value = ''
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : '生成故障诊断报告失败'
  } finally {
    loading.value = false
  }
}

async function exportSysdump() {
  exporting.value = true
  try {
    const response = await getDownload('/api/v1/diagnostics/sysdump')
    const url = URL.createObjectURL(response.blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = response.filename
    anchor.click()
    URL.revokeObjectURL(url)
    message.success('诊断归档已生成')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '生成诊断归档失败')
  } finally {
    exporting.value = false
  }
}

onMounted(() => void load())
</script>

<template>
  <div class="page-stack diagnostics-page">
    <div class="page-toolbar">
      <div>
        <h2>故障诊断</h2>
        <NText depth="3">基于 systemd、dae 公开命令、配置、Geo、journald 与 Linux 标准接口检查</NText>
      </div>
      <div class="diagnostics-actions">
        <!-- 这一页的主操作就是再跑一遍检查，它该承载强调色。
             此前两个按钮都是次要样式，整页找不到一处青色——那不是克制，
             是这一页没有指出"下一步该点哪"。 -->
        <NButton type="primary" :loading="loading" @click="load">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>重新检查
        </NButton>
        <NButton secondary :loading="exporting" @click="exportSysdump">
          <template #icon><NIcon><DownloadOutline /></NIcon></template>导出 sysdump
        </NButton>
      </div>
    </div>

    <NAlert v-if="errorText" type="error" :bordered="false">{{ errorText }}</NAlert>

    <NSpin :show="loading">
      <template v-if="report">
        <div class="diagnostics-summary" :class="`diagnostics-summary-${report.overall}`">
          <div>
            <span class="diagnostic-level" :class="`level-${report.overall}`">{{ levelMeta[report.overall].label }}</span>
            <strong>{{ overallCopy }}</strong>
            <NText depth="3">检查于 {{ formatDateTime(report.generatedAt) }}</NText>
          </div>
          <!-- 四个计数是筛选器而不是摆设：点一下只看该级别 -->
          <dl>
            <button
              v-for="level in LEVEL_ORDER"
              :key="level"
              type="button"
              class="diagnostics-count"
              :class="{ active: levelFilter === level, empty: !report.counts[level] }"
              :aria-pressed="levelFilter === level"
              :disabled="!report.counts[level]"
              @click="toggleFilter(level)"
            >
              <dt>{{ levelMeta[level].label }}</dt>
              <dd>{{ report.counts[level] }}</dd>
            </button>
          </dl>
        </div>

        <!-- 筛选状态：只列被选中的级别 -->
        <template v-if="levelFilter">
          <div class="diagnostics-filter-note">
            <NText depth="3">只显示「{{ levelMeta[levelFilter].label }}」{{ filtered.length }} 项</NText>
            <NButton text type="primary" size="small" @click="levelFilter = null">显示全部</NButton>
          </div>
          <article v-for="item in filtered" :key="item.id" class="diagnostic-item" :class="`level-${item.level}`">
            <header>
              <strong>{{ item.title }}</strong>
              <span class="diagnostic-level" :class="`level-${item.level}`">{{ levelMeta[item.level].label }}</span>
              <span class="diagnostic-category">· {{ item.category }}</span>
            </header>
            <p class="diagnostic-summary-text">{{ item.summary }}</p>
            <ul v-if="item.details?.length" class="diagnostic-details">
              <li v-for="(detail, index) in visibleDetails(item)" :key="index">{{ detail }}</li>
            </ul>
            <NButton v-if="hiddenCount(item)" text size="small" class="diagnostic-more"
                     @click="toggleDetails(item.id)">
              展开全部 {{ item.details?.length }} 条
            </NButton>
            <NButton v-else-if="(item.details?.length ?? 0) > DETAIL_PREVIEW" text size="small"
                     class="diagnostic-more" @click="toggleDetails(item.id)">收起</NButton>
            <p v-if="item.suggestion" class="diagnostic-suggestion">
              <span>建议</span>{{ item.suggestion }}
            </p>
          </article>
        </template>

        <template v-else>
          <!-- 需要处理的排在最前并完整展开 -->
          <article v-for="item in attention" :key="item.id" class="diagnostic-item" :class="`level-${item.level}`">
            <header>
              <strong>{{ item.title }}</strong>
              <span class="diagnostic-level" :class="`level-${item.level}`">{{ levelMeta[item.level].label }}</span>
              <span class="diagnostic-category">· {{ item.category }}</span>
            </header>
            <p class="diagnostic-summary-text">{{ item.summary }}</p>
            <ul v-if="item.details?.length" class="diagnostic-details">
              <li v-for="(detail, index) in visibleDetails(item)" :key="index">{{ detail }}</li>
            </ul>
            <NButton v-if="hiddenCount(item)" text size="small" class="diagnostic-more"
                     @click="toggleDetails(item.id)">
              展开全部 {{ item.details?.length }} 条
            </NButton>
            <NButton v-else-if="(item.details?.length ?? 0) > DETAIL_PREVIEW" text size="small"
                     class="diagnostic-more" @click="toggleDetails(item.id)">收起</NButton>
            <p v-if="item.suggestion" class="diagnostic-suggestion">
              <span>建议</span>{{ item.suggestion }}
            </p>
          </article>

          <!-- 正常项收成一行：都正常时本来就不需要逐张看 -->
          <section v-if="healthy.length" class="diagnostics-healthy">
            <button type="button" class="diagnostics-healthy-toggle" :aria-expanded="showHealthy"
                    @click="showHealthy = !showHealthy">
              <span class="diagnostics-healthy-dot" />
              <strong>{{ healthy.length }} 项检查正常</strong>
              <span class="diagnostics-healthy-hint">{{ showHealthy ? '收起' : '展开查看' }}</span>
            </button>
            <!-- 两列：八项各占半宽，四行就排完，不用把一列拉成八行。
                 通过的检查不显示摘要——"dae 服务 / 服务运行正常"是同义反复，
                 占着一行宽度却没给信息；分类同理，对已经通过的项没有用。
                 明细是排障参考资料，仍然逐项可展开，展开时占满整行。 -->
            <ul v-if="showHealthy" class="diagnostics-healthy-list">
              <li
                v-for="item in healthy"
                :key="item.id"
                :class="{ expanded: expandedDetails.has(item.id) }"
              >
                <button
                  type="button"
                  class="diagnostics-healthy-row"
                  :class="{ expandable: item.details?.length }"
                  :aria-expanded="expandedDetails.has(item.id)"
                  :disabled="!item.details?.length"
                  @click="toggleDetails(item.id)"
                >
                  <span class="diagnostics-healthy-dot" />
                  <strong>{{ item.title }}</strong>
                  <!-- 只用一个箭头表示"这行能展开"。原来右边挂一个裸数字，
                       "dae 服务 … 4" 读不出 4 是什么，反而比不写更含糊。 -->
                  <NIcon v-if="item.details?.length" class="diagnostics-healthy-chevron" :size="15">
                    <ChevronDownOutline />
                  </NIcon>
                </button>
                <ul v-if="expandedDetails.has(item.id) && item.details?.length" class="diagnostic-details">
                  <li v-for="(detail, index) in item.details" :key="index">{{ detail }}</li>
                </ul>
              </li>
            </ul>
          </section>
        </template>

        <div class="diagnostics-footer-action">
          <NButton secondary @click="router.push({ name: 'logs' })">
            <template #icon><NIcon><ReaderOutline /></NIcon></template>查看完整运行日志
          </NButton>
        </div>
      </template>
    </NSpin>
  </div>
</template>
