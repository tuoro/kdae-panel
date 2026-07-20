<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NGrid,
  NGridItem,
  NIcon,
  NPopconfirm,
  NSkeleton,
  NSpace,
  NTag,
  NText,
  useMessage,
} from 'naive-ui'
import {
  PauseOutline,
  PlayOutline,
  RefreshOutline,
  ReloadOutline,
  StopOutline,
} from '@vicons/ionicons5'
import { getJSON, postJSON } from '../api/client'
import type { DaeReport, ServiceStatus } from '../types/api'
import { formatBytes, formatDurationNanoseconds } from '../utils/format'

const message = useMessage()
const loading = ref(true)
const refreshing = ref(false)
const actionLoading = ref('')
const service = ref<ServiceStatus | null>(null)
const dae = ref<DaeReport | null>(null)
const serviceError = ref('')
const daeError = ref('')

const running = computed(() => service.value?.activeState === 'active')
const statusType = computed(() => running.value ? 'success' : service.value?.activeState === 'failed' ? 'error' : 'warning')
const statusLabel = computed(() => running.value ? '运行中' : service.value?.activeState === 'failed' ? '运行失败' : '未运行')
const supportedCommands = computed(() => Object.entries(dae.value?.commands || {}).filter(([, enabled]) => enabled).map(([name]) => name))

async function refresh(silent = false) {
  if (silent) refreshing.value = true
  else loading.value = true
  const [serviceResult, daeResult] = await Promise.allSettled([
    getJSON<ServiceStatus>('/api/v1/service'),
    getJSON<DaeReport>('/api/v1/dae/capabilities'),
  ])
  if (serviceResult.status === 'fulfilled') {
    service.value = serviceResult.value
    serviceError.value = ''
  } else {
    serviceError.value = serviceResult.reason instanceof Error ? serviceResult.reason.message : '无法读取服务状态'
  }
  if (daeResult.status === 'fulfilled') {
    dae.value = daeResult.value
    daeError.value = ''
  } else {
    daeError.value = daeResult.reason instanceof Error ? daeResult.reason.message : '无法探测 dae'
  }
  loading.value = false
  refreshing.value = false
}

async function runAction(action: string) {
  actionLoading.value = action
  try {
    await postJSON(`/api/v1/service/actions/${action}`)
    message.success(`${actionName(action)}已执行`)
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    await refresh(true)
  } catch (error) {
    message.error(error instanceof Error ? error.message : `${actionName(action)}失败`)
  } finally {
    actionLoading.value = ''
  }
}

function actionName(action: string): string {
  return ({ start: '启动', stop: '停止', restart: '重启', reload: '重载', suspend: '暂停' } as Record<string, string>)[action] || action
}

onMounted(() => void refresh())
</script>

<template>
  <div class="page-stack">
    <div class="page-toolbar">
      <div>
        <h2>运行状态</h2>
        <NText depth="3">来自 systemd 与当前安装的 dae 二进制</NText>
      </div>
      <NButton secondary :loading="refreshing" @click="refresh(true)">
        <template #icon><NIcon><RefreshOutline /></NIcon></template>
        刷新
      </NButton>
    </div>

    <NAlert v-if="serviceError" type="error" closable @close="serviceError = ''">{{ serviceError }}</NAlert>
    <NAlert v-if="daeError" type="warning" closable @close="daeError = ''">{{ daeError }}</NAlert>

    <NGrid responsive="screen" cols="1 s:2 l:4" :x-gap="14" :y-gap="14">
      <NGridItem>
        <NCard class="metric-card" size="small">
          <NText depth="3">服务状态</NText>
          <NSkeleton v-if="loading" text style="width: 60%" />
          <div v-else class="metric-value"><NTag :type="statusType" round>{{ statusLabel }}</NTag></div>
          <small>{{ service?.subState || '等待状态数据' }}</small>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard class="metric-card" size="small">
          <NText depth="3">内存占用</NText>
          <NSkeleton v-if="loading" text style="width: 65%" />
          <strong v-else class="metric-value">{{ formatBytes(service?.memoryBytes) }}</strong>
          <small>{{ service?.tasks ?? '—' }} 个任务</small>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard class="metric-card" size="small">
          <NText depth="3">累计 CPU</NText>
          <NSkeleton v-if="loading" text style="width: 65%" />
          <strong v-else class="metric-value">{{ formatDurationNanoseconds(service?.cpuUsageNanoseconds) }}</strong>
          <small>主进程 PID {{ service?.mainPid || '—' }}</small>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard class="metric-card" size="small">
          <NText depth="3">重启次数</NText>
          <NSkeleton v-if="loading" text style="width: 40%" />
          <strong v-else class="metric-value">{{ service?.restarts ?? '—' }}</strong>
          <small>退出状态 {{ service?.execMainStatus ?? '—' }}</small>
        </NCard>
      </NGridItem>
    </NGrid>

    <NGrid responsive="screen" cols="1 l:2" :x-gap="16" :y-gap="16">
      <NGridItem>
        <NCard title="服务控制" class="panel-card">
          <template #header-extra><NTag size="small" :type="statusType">{{ service?.name || 'dae' }}</NTag></template>
          <NSpace wrap>
            <NButton type="success" :disabled="running" :loading="actionLoading === 'start'" @click="runAction('start')">
              <template #icon><NIcon><PlayOutline /></NIcon></template>启动
            </NButton>
            <NButton type="primary" :disabled="!running" :loading="actionLoading === 'reload'" @click="runAction('reload')">
              <template #icon><NIcon><ReloadOutline /></NIcon></template>无损重载
            </NButton>
            <NPopconfirm positive-text="确认重启" negative-text="取消" @positive-click="runAction('restart')">
              <template #trigger>
                <NButton :disabled="!running" :loading="actionLoading === 'restart'">
                  <template #icon><NIcon><RefreshOutline /></NIcon></template>重启
                </NButton>
              </template>
              重启会中断现有连接，确认继续？
            </NPopconfirm>
            <NPopconfirm positive-text="确认暂停" negative-text="取消" @positive-click="runAction('suspend')">
              <template #trigger>
                <NButton :disabled="!running" :loading="actionLoading === 'suspend'">
                  <template #icon><NIcon><PauseOutline /></NIcon></template>暂停
                </NButton>
              </template>
              暂停后可通过无损重载恢复。
            </NPopconfirm>
            <NPopconfirm positive-text="确认停止" negative-text="取消" @positive-click="runAction('stop')">
              <template #trigger>
                <NButton type="error" ghost :disabled="!running" :loading="actionLoading === 'stop'">
                  <template #icon><NIcon><StopOutline /></NIcon></template>停止
                </NButton>
              </template>
              停止 dae 后代理流量将不可用。
            </NPopconfirm>
          </NSpace>
        </NCard>
      </NGridItem>

      <NGridItem>
        <NCard title="dae 能力" class="panel-card">
          <template #header-extra>
            <NTag size="small" :type="dae?.available ? 'success' : 'error'">{{ dae?.available ? '已发现' : '不可用' }}</NTag>
          </template>
          <dl class="details-list">
            <div><dt>版本</dt><dd>{{ dae?.version || '—' }}</dd></div>
            <div><dt>二进制</dt><dd class="mono">{{ dae?.binary || '—' }}</dd></div>
            <div><dt>配置结构</dt><dd>{{ dae?.outlineSupported ? `支持（${dae.outlineVersion || '未知版本'}）` : '不支持' }}</dd></div>
          </dl>
          <NSpace v-if="supportedCommands.length" size="small" wrap>
            <NTag v-for="command in supportedCommands" :key="command" size="small" :bordered="false">{{ command }}</NTag>
          </NSpace>
          <NAlert v-if="dae?.problem" type="warning" :bordered="false" class="inline-alert">{{ dae.problem }}</NAlert>
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>
