<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NInput,
  NSpace,
  NSpin,
  NTag,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui'
import { CheckmarkCircleOutline, CloudUploadOutline, RefreshOutline, SaveOutline } from '@vicons/ionicons5'
import { APIError, getJSON, postJSON, putJSON } from '../api/client'
import type { ConfigDocument, ConfigSaveResult } from '../types/api'
import { formatBytes, formatDateTime, shortHash } from '../utils/format'

const message = useMessage()
const dialog = useDialog()
const loading = ref(true)
const validating = ref(false)
const saving = ref(false)
const content = ref('')
const originalContent = ref('')
const document = ref<ConfigDocument | null>(null)
const validationMessage = ref('')
const validationError = ref('')

const dirty = computed(() => content.value !== originalContent.value)

async function load() {
  loading.value = true
  validationMessage.value = ''
  validationError.value = ''
  try {
    const loaded = await getJSON<ConfigDocument>('/api/v1/config')
    document.value = loaded
    content.value = loaded.content
    originalContent.value = loaded.content
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      document.value = null
      content.value = ''
      originalContent.value = ''
      message.info('入口配置尚不存在，可以在这里创建')
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
    validationMessage.value = '当前内容已通过安装版本的 dae 校验'
    message.success('配置校验通过')
    return true
  } catch (error) {
    validationError.value = error instanceof Error ? error.message : '配置校验失败'
    return false
  } finally {
    validating.value = false
  }
}

async function save(apply: boolean) {
  saving.value = true
  validationMessage.value = ''
  validationError.value = ''
  try {
    const result = await putJSON<ConfigSaveResult>('/api/v1/config', {
      content: content.value,
      expectedHash: document.value?.hash || '',
      apply,
    })
    originalContent.value = content.value
    document.value = {
      path: document.value?.path || '/etc/dae/config.dae',
      content: content.value,
      hash: result.hash,
      size: new Blob([content.value]).size,
      mode: document.value?.mode || '-rw-------',
      modifiedAt: result.savedAt,
    }
    validationMessage.value = apply ? '配置已保存并完成无损重载' : '配置已保存，尚未应用到运行进程'
    message.success(validationMessage.value)
  } catch (error) {
    if (error instanceof APIError && error.status === 409) {
      dialog.warning({
        title: '配置已经变化',
        content: '磁盘配置在你编辑期间被其他操作修改。请重新读取后合并变更，避免覆盖。',
        positiveText: '重新读取',
        negativeText: '保留当前编辑',
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
  if (!dirty.value) {
    message.info('配置没有变化')
    return
  }
  dialog.success({
    title: '保存并无损重载',
    content: '面板将先调用 dae validate，校验通过后备份旧配置、原子替换并执行 dae reload。',
    positiveText: '保存并重载',
    negativeText: '取消',
    onPositiveClick: () => save(true),
  })
}

onBeforeRouteLeave(() => {
  if (!dirty.value) return true
  return window.confirm('当前配置尚未保存，确认离开？')
})

onMounted(() => void load())
</script>

<template>
  <div class="page-stack config-page">
    <div class="page-toolbar">
      <div>
        <h2>入口配置</h2>
        <NText depth="3">磁盘文本是唯一真实来源，所有保存均由当前 dae 二进制校验</NText>
      </div>
      <NSpace>
        <NButton secondary :disabled="loading" @click="load">
          <template #icon><NIcon><RefreshOutline /></NIcon></template>重新读取
        </NButton>
        <NButton :loading="validating" :disabled="loading" @click="validate">
          <template #icon><NIcon><CheckmarkCircleOutline /></NIcon></template>校验
        </NButton>
        <NButton :loading="saving" :disabled="loading || !dirty" @click="save(false)">
          <template #icon><NIcon><SaveOutline /></NIcon></template>仅保存
        </NButton>
        <NButton type="primary" :loading="saving" :disabled="loading || !dirty" @click="confirmReload">
          <template #icon><NIcon><CloudUploadOutline /></NIcon></template>保存并重载
        </NButton>
      </NSpace>
    </div>

    <NAlert v-if="validationMessage" type="success" closable @close="validationMessage = ''">{{ validationMessage }}</NAlert>
    <NAlert v-if="validationError" type="error" closable @close="validationError = ''"><pre>{{ validationError }}</pre></NAlert>

    <NCard class="editor-card" content-style="padding: 0;">
      <div class="editor-meta">
        <div class="editor-path">
          <span class="status-dot" :class="{ changed: dirty }" />
          <span class="mono">{{ document?.path || '/etc/dae/config.dae' }}</span>
          <NTag v-if="dirty" size="small" type="warning" :bordered="false">未保存</NTag>
        </div>
        <NSpace size="small" wrap>
          <NText depth="3">{{ formatBytes(document?.size) }}</NText>
          <NText depth="3">权限 {{ document?.mode || '—' }}</NText>
          <NText depth="3">SHA {{ shortHash(document?.hash) }}</NText>
          <NText depth="3">{{ formatDateTime(document?.modifiedAt) }}</NText>
        </NSpace>
      </div>
      <NSpin :show="loading">
        <NInput
          v-model:value="content"
          type="textarea"
          class="config-editor"
          placeholder="global {&#10;  ...&#10;}&#10;&#10;routing {&#10;  fallback: direct&#10;}"
          :autosize="false"
          :rows="30"
          spellcheck="false"
        />
      </NSpin>
    </NCard>
  </div>
</template>

