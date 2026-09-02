<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  NButton,
  NDropdown,
  NIcon,
  NInput,
  NModal,
  NSelect,
  NSpace,
  NTag,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui'
import { AddOutline, EllipsisHorizontalOutline } from '@vicons/ionicons5'
import { deleteJSON, getJSON, postJSON, putJSON } from '../../api/client'
import type {
  ConfigSectionKind,
  ConfigSectionVersion,
  ConfigSectionVersions,
} from '../../types/api'

const props = defineProps<{
  kind: ConfigSectionKind
  body: string
}>()
const emit = defineEmits<{
  apply: [body: string]
}>()

const dialog = useDialog()
const message = useMessage()
const loading = ref(false)
const saving = ref(false)
const versions = ref<ConfigSectionVersion[]>([])
const baseVersionID = ref<string | null>(null)
const editorVisible = ref(false)
const editorMode = ref<'create' | 'update'>('create')
const draftName = ref('')

const options = computed(() => versions.value.map((version) => ({
  label: version.name,
  value: version.id,
})))
const baseVersion = computed(() => versions.value.find((version) => version.id === baseVersionID.value) || null)
const modified = computed(() => Boolean(baseVersion.value && baseVersion.value.content !== props.body))
const kindLabel = computed(() => props.kind === 'dns' ? 'DNS' : '路由')

watch(() => props.body, (body) => {
  const exact = versions.value.find((version) => version.content === body)
  if (exact) baseVersionID.value = exact.id
})

async function loadVersions() {
  loading.value = true
  try {
    const loaded = await getJSON<ConfigSectionVersions>('/api/v1/config/section-versions')
    versions.value = loaded.versions.filter((version) => version.kind === props.kind)
    const exact = versions.value.find((version) => version.content === props.body)
    baseVersionID.value = exact?.id || null
  } catch (error) {
    message.error(error instanceof Error ? error.message : `读取 ${kindLabel.value} 版本失败`)
  } finally {
    loading.value = false
  }
}

function selectVersion(id: string) {
  const target = versions.value.find((version) => version.id === id)
  if (!target) return
  if (target.content === props.body) {
    baseVersionID.value = target.id
    return
  }
  dialog.warning({
    title: `切换 ${kindLabel.value} 版本`,
    content: `将用“${target.name}”替换当前草稿中的完整 ${kindLabel.value} 区块，其他配置保持不变。保存并重载前不会影响 dae。`,
    positiveText: '载入版本',
    negativeText: '取消',
    onPositiveClick: () => {
      baseVersionID.value = target.id
      emit('apply', target.content)
      message.success(`${kindLabel.value} 版本已载入配置草稿`)
    },
  })
}

function openCreate() {
  editorMode.value = 'create'
  draftName.value = ''
  editorVisible.value = true
}

function openUpdate() {
  if (!baseVersion.value) return
  editorMode.value = 'update'
  draftName.value = baseVersion.value.name
  editorVisible.value = true
}

async function saveVersion() {
  saving.value = true
  try {
    let saved: ConfigSectionVersion
    if (editorMode.value === 'create') {
      saved = await postJSON<ConfigSectionVersion>('/api/v1/config/section-versions', {
        kind: props.kind,
        name: draftName.value,
        content: props.body,
      })
      versions.value.push(saved)
      message.success(`${kindLabel.value} 版本已保存`)
    } else {
      saved = await putJSON<ConfigSectionVersion>(
        `/api/v1/config/section-versions/${encodeURIComponent(baseVersionID.value || '')}`,
        { name: draftName.value, content: props.body },
      )
      versions.value = versions.value.map((version) => version.id === saved.id ? saved : version)
      message.success(`${kindLabel.value} 版本已更新`)
    }
    baseVersionID.value = saved.id
    editorVisible.value = false
  } catch (error) {
    message.error(error instanceof Error ? error.message : `保存 ${kindLabel.value} 版本失败`)
  } finally {
    saving.value = false
  }
}

function confirmDelete() {
  const version = baseVersion.value
  if (!version) return
  dialog.warning({
    title: `删除 ${kindLabel.value} 版本`,
    content: `只会删除版本“${version.name}”，当前配置草稿和正在运行的 dae 不受影响。`,
    positiveText: '删除版本',
    negativeText: '取消',
    onPositiveClick: () => deleteVersion(version),
  })
}

async function deleteVersion(version: ConfigSectionVersion) {
  try {
    await deleteJSON<void>(`/api/v1/config/section-versions/${encodeURIComponent(version.id)}`, {})
    versions.value = versions.value.filter((candidate) => candidate.id !== version.id)
    baseVersionID.value = null
    message.success(`${kindLabel.value} 版本已删除`)
  } catch (error) {
    message.error(error instanceof Error ? error.message : `删除 ${kindLabel.value} 版本失败`)
  }
}

function handleMenu(key: string) {
  if (key === 'update') openUpdate()
  if (key === 'delete') confirmDelete()
}

onMounted(() => void loadVersions())
</script>

<template>
  <NSpace size="small" align="center" :wrap="false" class="section-version-controls">
    <NSelect
      class="section-version-select"
      size="small"
      :value="baseVersionID"
      :options="options"
      :loading="loading"
      :placeholder="`${kindLabel} 版本`"
      @update:value="selectVersion"
    />
    <NTag v-if="modified" size="small" type="warning" :bordered="false">已修改</NTag>
    <NButton size="small" secondary title="将当前区块另存为版本" @click="openCreate">
      <template #icon><NIcon><AddOutline /></NIcon></template>另存为
    </NButton>
    <NDropdown
      trigger="click"
      :disabled="!baseVersion"
      :options="[
        { label: modified ? '更新当前版本' : '重命名当前版本', key: 'update' },
        { label: '删除当前版本', key: 'delete' },
      ]"
      @select="handleMenu"
    >
      <NButton size="small" quaternary circle title="版本管理" :disabled="!baseVersion">
        <template #icon><NIcon><EllipsisHorizontalOutline /></NIcon></template>
      </NButton>
    </NDropdown>
  </NSpace>

  <NModal
    v-model:show="editorVisible"
    preset="card"
    :title="editorMode === 'create' ? `保存 ${kindLabel} 版本` : `更新 ${kindLabel} 版本`"
    class="section-version-modal"
    :mask-closable="false"
  >
    <NSpace vertical>
      <NText depth="3">版本只保存当前 {{ kindLabel }} 区块，并随配置备份一起导出和恢复。</NText>
      <NInput v-model:value="draftName" maxlength="80" show-count placeholder="例如：家庭网络" @keyup.enter="saveVersion" />
    </NSpace>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="editorVisible = false">取消</NButton>
        <NButton type="primary" :loading="saving" :disabled="!draftName.trim()" @click="saveVersion">
          {{ editorMode === 'create' ? '保存版本' : '更新版本' }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>
