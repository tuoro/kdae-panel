<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NCheckbox,
  NEmpty,
  NIcon,
  NInput,
  NSelect,
  NSpace,
  NSpin,
  NTag,
  NText,
  useMessage,
} from 'naive-ui'
import { RefreshOutline, SearchOutline } from '@vicons/ionicons5'
import { getJSON } from '../api/client'
import type { LogEntry } from '../types/api'
import { formatDateTime } from '../utils/format'

const message = useMessage()
const entries = ref<LogEntry[]>([])
const loading = ref(true)
const autoRefresh = ref(true)
const search = ref('')
const level = ref<string | null>(null)
const limit = ref(200)
const errorMessage = ref('')
let timer: number | undefined

const levelOptions = [
  { label: '全部级别', value: '' },
  { label: '错误及更严重', value: 'error' },
  { label: '警告', value: 'warning' },
  { label: '信息', value: 'info' },
  { label: '调试', value: 'debug' },
]

const limitOptions = [100, 200, 300, 500].map((value) => ({ label: `${value} 条`, value }))
const filteredEntries = computed(() => {
  const query = search.value.trim().toLowerCase()
  return entries.value.filter((entry) => {
    const levelMatches = !level.value || (level.value === 'error' ? entry.priority <= 3 : entry.level === level.value)
    const searchMatches = !query || entry.message.toLowerCase().includes(query) || entry.unit?.toLowerCase().includes(query)
    return levelMatches && searchMatches
  })
})

function levelType(entry: LogEntry): 'error' | 'warning' | 'info' | 'default' {
  if (entry.priority <= 3) return 'error'
  if (entry.priority === 4) return 'warning'
  if (entry.priority <= 6) return 'info'
  return 'default'
}

async function load(silent = false) {
  if (!silent) loading.value = true
  try {
    entries.value = await getJSON<LogEntry[]>(`/api/v1/logs?limit=${limit.value}`)
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '读取日志失败'
    if (!silent) message.error(errorMessage.value)
  } finally {
    loading.value = false
  }
}

function schedule() {
  window.clearInterval(timer)
  timer = window.setInterval(() => {
    if (autoRefresh.value && document.visibilityState === 'visible') void load(true)
  }, 5000)
}

onMounted(() => {
  void load()
  schedule()
})
onBeforeUnmount(() => window.clearInterval(timer))
</script>

<template>
  <div class="page-stack logs-page">
    <div class="page-toolbar">
      <div>
        <h2>journald 日志</h2>
        <NText depth="3">读取 dae systemd 单元的近期结构化日志</NText>
      </div>
      <NSpace align="center">
        <NCheckbox v-model:checked="autoRefresh">每 5 秒刷新</NCheckbox>
        <NButton secondary :loading="loading" @click="load()">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>刷新
        </NButton>
      </NSpace>
    </div>

    <NAlert v-if="errorMessage" type="error" closable @close="errorMessage = ''">{{ errorMessage }}</NAlert>

    <NCard class="logs-card" content-style="padding: 0;">
      <div class="filter-bar">
        <NInput v-model:value="search" clearable placeholder="搜索日志内容" class="log-search">
          <template #prefix><NIcon><SearchOutline /></NIcon></template>
        </NInput>
        <NSelect v-model:value="level" clearable :options="levelOptions" placeholder="全部级别" class="log-select" />
        <NSelect v-model:value="limit" :options="limitOptions" class="log-limit" @update:value="load()" />
        <NText depth="3">显示 {{ filteredEntries.length }} / {{ entries.length }}</NText>
      </div>
      <NSpin :show="loading">
        <div v-if="filteredEntries.length" class="log-stream">
          <div v-for="(entry, index) in filteredEntries" :key="`${entry.timestamp}-${index}`" class="log-row">
            <time>{{ formatDateTime(entry.timestamp) }}</time>
            <NTag size="tiny" :type="levelType(entry)" :bordered="false">{{ entry.level }}</NTag>
            <span class="log-source">{{ entry.pid ? `PID ${entry.pid}` : entry.unit || 'dae' }}</span>
            <pre>{{ entry.message }}</pre>
          </div>
        </div>
        <NEmpty v-else description="没有符合条件的日志" class="empty-state" />
      </NSpin>
    </NCard>
  </div>
</template>

