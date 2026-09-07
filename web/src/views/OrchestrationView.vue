<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import {
  NAlert,
  NButton,
  NDropdown,
  NGrid,
  NGridItem,
  NIcon,
  NSpace,
  NSpin,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui'
import {
  CheckmarkCircleOutline,
  CloudUploadOutline,
  RefreshOutline,
  SaveOutline,
} from '@vicons/ionicons5'
import { APIError, getJSON, postJSON, putJSON } from '../api/client'
import type {
  ConfigDocument,
  ConfigSaveResult,
  ManagedSubscription,
  ManagedSubscriptionDefinition,
  ManagedSubscriptionsResponse,
} from '../types/api'
import { readSection } from '../utils/daeconf'
import { defaultConfiguration, withDefaultDNS } from '../utils/dns'
import GlobalCard from '../components/orchestration/GlobalCard.vue'
import DNSCard from '../components/orchestration/DNSCard.vue'
import NodesCard from '../components/orchestration/NodesCard.vue'
import SubscriptionsCard from '../components/orchestration/SubscriptionsCard.vue'
import GroupsCard from '../components/orchestration/GroupsCard.vue'
import RoutingCard from '../components/orchestration/RoutingCard.vue'

// 本页只负责配置文档的生命周期：读取、校验、保存、重载。
// 各节的结构化配置在 components/orchestration/ 的卡片里完成，
// 它们通过 v-model 共享同一份本地缓冲 content。
const message = useMessage()
const dialog = useDialog()
const loading = ref(true)
const validating = ref(false)
const saving = ref(false)
const document = ref<ConfigDocument | null>(null)
const content = ref('')
const originalContent = ref('')
const managedSubscriptions = ref<ManagedSubscription[]>([])
const originalManaged = ref('[]')
const validationMessage = ref('')
const validationError = ref('')
const dnsDraftAdded = ref(false)

function managedDefinitions(items: ManagedSubscription[]): ManagedSubscriptionDefinition[] {
  return items
    .map(({ tag, url, userAgent }) => ({ tag, url, userAgent }))
    .sort((left, right) => left.tag.localeCompare(right.tag))
}

function managedSnapshot(items: ManagedSubscription[]): string {
  return JSON.stringify(managedDefinitions(items))
}

function managedForContent(text: string, items: ManagedSubscription[]): ManagedSubscription[] {
  const entries = readSection(text, 'subscription').entries
  return items.filter((item) => entries.some((entry) => entry.tag === item.tag && entry.value === item.localUrl))
}

const saveOverflowOptions = computed(() => [
  { label: '校验配置', key: 'validate', disabled: loading.value },
  { label: '仅保存，不重载', key: 'save', disabled: loading.value || !dirty.value },
])
function onSaveOverflow(key: string) {
  if (key === 'validate') void validate()
  if (key === 'save') void save(false)
}

const dirty = computed(() => content.value !== originalContent.value
  || managedSnapshot(managedSubscriptions.value) !== originalManaged.value)
const unparsedLines = computed(
  () => readSection(content.value, 'global').unparsedLines
    + readSection(content.value, 'node').unparsedLines
    + readSection(content.value, 'subscription').unparsedLines,
)

// ---- 文档加载与保存(与配置管理页相同的事务语义) ----
async function load() {
  loading.value = true
  validationMessage.value = ''
  validationError.value = ''
  dnsDraftAdded.value = false
  try {
    const managed = await getJSON<ManagedSubscriptionsResponse>('/api/v1/subscriptions/managed')
    const loaded = await getJSON<ConfigDocument>('/api/v1/config')
    document.value = loaded
    content.value = withDefaultDNS(loaded.content)
    originalContent.value = loaded.content
    managedSubscriptions.value = managedForContent(loaded.content, managed.subscriptions)
    originalManaged.value = managedSnapshot(managedSubscriptions.value)
    dnsDraftAdded.value = content.value !== loaded.content
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      document.value = null
      content.value = defaultConfiguration()
      originalContent.value = ''
      managedSubscriptions.value = []
      originalManaged.value = '[]'
      dnsDraftAdded.value = true
    } else {
      message.error(error instanceof Error ? error.message : '读取配置失败')
    }
  } finally {
    loading.value = false
  }
}

async function validate() {
  validating.value = true
  validationMessage.value = ''
  validationError.value = ''
  try {
    await postJSON('/api/v1/config/validate', { content: content.value })
    validationMessage.value = '当前配置已通过安装版本的 dae 校验'
    message.success('配置校验通过')
  } catch (error) {
    validationError.value = error instanceof Error ? error.message : '配置校验失败'
  } finally {
    validating.value = false
  }
}

async function save(apply: boolean) {
  saving.value = true
  validationMessage.value = ''
  validationError.value = ''
  // 提交的是点击那一刻的快照。请求在途时用户可能继续编辑，
  // 因此成功后只把快照记为已保存，dirty 会如实保留其后的新改动。
  const submitted = content.value
  const submittedItems = managedForContent(submitted, managedSubscriptions.value)
  const submittedManaged = managedDefinitions(submittedItems)
  try {
    const result = await putJSON<ConfigSaveResult>('/api/v1/config', {
      content: submitted,
      expectedHash: document.value?.hash || '',
      apply,
      managedSubscriptions: submittedManaged,
    })
    originalContent.value = submitted
    managedSubscriptions.value = submittedItems
    originalManaged.value = JSON.stringify(submittedManaged)
    dnsDraftAdded.value = false
    document.value = {
      path: document.value?.path || '/etc/dae/config.dae',
      content: submitted,
      hash: result.hash,
      size: new Blob([submitted]).size,
      mode: document.value?.mode || '-rw-------',
      modifiedAt: result.savedAt,
    }
    validationMessage.value = !apply
      ? '配置已保存，尚未应用到运行进程'
      : result.deferred
        ? '配置已保存；dae 当前未运行，下次启动时生效'
        : '配置已保存并完成无损重载'
    message.success(validationMessage.value)
  } catch (error) {
    if (error instanceof APIError && error.status === 409) {
      dialog.warning({
        title: '配置已经变化',
        content: '磁盘配置在你编辑期间被其他操作修改。请重新读取后再修改，避免覆盖。',
        positiveText: '重新读取',
        negativeText: '保留当前修改',
        onPositiveClick: () => load(),
      })
    } else {
      validationError.value = error instanceof Error ? error.message : '保存配置失败'
      if (error instanceof APIError && error.code === 'configuration_apply_failed') {
        await load()
      }
    }
  } finally {
    saving.value = false
  }
}

function confirmReload() {
  dialog.success({
    title: '保存并无损重载',
    content: '面板将先调用 dae validate，校验通过后备份旧配置、原子替换并执行 dae reload。订阅链接也会随重载重新拉取。',
    positiveText: '保存并重载',
    negativeText: '取消',
    onPositiveClick: () => save(true),
  })
}

// ---- 生命周期 ----
onBeforeRouteLeave(() => {
  if (!dirty.value) return true
  return window.confirm('当前配置尚未保存，确认离开？')
})

onMounted(() => void load())
</script>

<template>
  <div class="page-stack orchestrate-page">
    <div class="page-toolbar">
      <div>
        <h2>代理配置</h2>
        <NText depth="3">可视化编辑全局设置、DNS、节点、订阅、分组与路由，未涉及的配置和注释保持原样</NText>
      </div>
      <NSpace class="orchestration-toolbar-actions">
        <NButton secondary :disabled="loading" @click="load">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>重新读取
        </NButton>
        <!-- 一页只留一个主操作。"校验"和"仅保存"是它的变体，收进溢出菜单；
             四个并排的按钮里有两个是"保存"，用户得先分辨再选。 -->
        <NDropdown trigger="click" :options="saveOverflowOptions" @select="onSaveOverflow">
          <NButton class="desktop-only" quaternary aria-label="更多保存操作">⋯</NButton>
        </NDropdown>
        <NButton class="desktop-only" type="primary" :loading="saving" :disabled="loading || !dirty" @click="confirmReload">
          <template #icon><NIcon><CloudUploadOutline /></NIcon></template>保存并重载
        </NButton>
      </NSpace>
    </div>

    <NAlert v-if="validationMessage" type="success" closable @close="validationMessage = ''">{{ validationMessage }}</NAlert>
    <NAlert v-if="validationError" type="error" closable @close="validationError = ''"><pre class="error-detail">{{ validationError }}</pre></NAlert>
    <NAlert v-if="dnsDraftAdded" type="info" :bordered="false">
      检测到入口配置缺少 dns 节，已把默认 DNS 加入当前配置草稿；尚未写入磁盘，保存后才会生效。
    </NAlert>
    <NAlert v-if="!loading && !document && !dirty" type="info" :bordered="false">
      入口配置尚不存在。在这里导入节点或添加订阅即可从零生成，保存时会自动创建配置文件。
    </NAlert>
    <NAlert v-if="dirty" type="warning" :bordered="false">
      有未保存的配置修改，保存并重载后才会应用到 dae。
    </NAlert>
    <NAlert v-if="unparsedLines > 0" type="info" :bordered="false">
      配置中有 {{ unparsedLines }} 行采用了跨行或多条目写法，未在下方列出。
      它们仍然生效，可使用对应卡片右上角的原文编辑处理。
    </NAlert>

    <NSpin :show="loading">
      <div class="page-stack">
        <GlobalCard v-model="content" />
        <DNSCard v-model="content" />
        <NodesCard v-model="content" />

        <!-- 不再强制等高：订阅通常只有一两行，被右侧分组撑高后下半是空的 -->
        <NGrid responsive="screen" cols="1 l:2" :x-gap="16" :y-gap="16">
          <NGridItem>
            <SubscriptionsCard v-model="content" v-model:managed="managedSubscriptions" :dirty="dirty" />
          </NGridItem>
          <NGridItem>
            <GroupsCard v-model="content" />
          </NGridItem>
        </NGrid>

        <RoutingCard v-model="content" />
      </div>
    </NSpin>

    <div class="mobile-save-bar" aria-label="配置保存操作">
      <NButton :loading="saving" :disabled="loading || !dirty" @click="save(false)">
        <template #icon><NIcon><SaveOutline /></NIcon></template>仅保存
      </NButton>
      <NButton type="primary" :loading="saving" :disabled="loading || !dirty" @click="confirmReload">
        <template #icon><NIcon><CloudUploadOutline /></NIcon></template>保存并重载
      </NButton>
    </div>
  </div>
</template>
