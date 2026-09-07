<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NDropdown,
  NCollapse,
  NCollapseItem,
  NIcon,
  NInput,
  NInputNumber,
  NModal,
  NSelect,
  NSpace,
  NTag,
  NText,
  NTooltip,
  useMessage,
  type SelectOption,
} from 'naive-ui'
import { CloseCircleOutline, CodeSlashOutline, OptionsOutline } from '@vicons/ionicons5'
import { getJSON } from '../../api/client'
import type { DaeOutline, NetworkInterface } from '../../types/api'
import {
  applyGlobalChanges,
  GLOBAL_FIELD_BY_KEY,
  GLOBAL_FIELD_GROUPS,
  GLOBAL_FIELDS,
  globalValueLabel,
  readGlobalCapabilities,
  readGlobalState,
  resolveInterfaceSelection,
  splitInterfaceValue,
  type GlobalCapabilities,
  type GlobalDraftValue,
  type GlobalField,
} from '../../utils/global'
import SectionEditorModal from './SectionEditorModal.vue'

const content = defineModel<string>({ required: true })
const message = useMessage()
const state = computed(() => readGlobalState(content.value))
const configuredCount = computed(() => state.value.entries.filter((entry) => entry.tag !== null).length)
const unknownKeys = computed(() => [...new Set(state.value.entries
  .map((entry) => entry.tag)
  .filter((key): key is string => key !== null && !GLOBAL_FIELD_BY_KEY.has(key)))])
const capabilities = ref<GlobalCapabilities | null>(null)
const capabilityChecked = ref(false)
const networkInterfaces = ref<NetworkInterface[]>([])
const interfaceLoadFailed = ref(false)

interface InterfaceOption extends SelectOption {
  label: string
  value: string
  addresses?: string[]
}

async function loadCapabilities() {
  try {
    capabilities.value = readGlobalCapabilities(await getJSON<DaeOutline>('/api/v1/dae/outline'))
  } catch {
    capabilities.value = null
  } finally {
    capabilityChecked.value = true
  }
}

async function loadInterfaces() {
  try {
    networkInterfaces.value = await getJSON<NetworkInterface[]>('/api/v1/host/interfaces')
    interfaceLoadFailed.value = false
  } catch {
    networkInterfaces.value = []
    interfaceLoadFailed.value = true
  }
}

function unsupported(field: GlobalField): boolean {
  return capabilities.value !== null && !capabilities.value.supported.has(field.key)
}

function versionedField(field: GlobalField): GlobalField {
  if (!capabilities.value) return field
  return {
    ...field,
    defaultValue: capabilities.value.defaults.get(field.key),
  }
}

const configuredUnsupported = computed(() => capabilities.value
  ? GLOBAL_FIELDS.filter((field) => unsupported(field) && state.value.values[field.key] !== null)
  : [])

const summaryKeys = [
  'log_level',
  'wan_interface',
  'dial_mode',
  'tproxy_port',
  'tls_implementation',
  'check_interval',
]
const summaries = computed(() => summaryKeys.map((key) => {
  const field = GLOBAL_FIELD_BY_KEY.get(key)!
  const locked = state.value.duplicateKeys.has(key) || state.value.invalidKeys.has(key)
  return {
    key,
    label: field.label,
    value: locked ? '需原文处理' : globalValueLabel(state.value.values[key], versionedField(field)),
    explicit: state.value.values[key] !== null,
    unsupported: unsupported(field),
  }
}))

const editorVisible = ref(false)
const sourceVisible = ref(false)
const draft = ref<Record<string, GlobalDraftValue>>({})
const original = ref<Record<string, GlobalDraftValue>>({})
const lockedKeys = ref(new Set<string>())
const editorSnapshot = ref('')

function openEditor() {
  const current = readGlobalState(content.value)
  editorSnapshot.value = content.value
  draft.value = { ...current.values }
  original.value = { ...current.values }
  lockedKeys.value = new Set([...current.duplicateKeys, ...current.invalidKeys])
  editorVisible.value = true
}

function sameValue(left: GlobalDraftValue, right: GlobalDraftValue): boolean {
  return left === right || (left === '' && right === null) || (left === null && right === '')
}

const dirty = computed(() => GLOBAL_FIELDS.some((field) =>
  !lockedKeys.value.has(field.key) && !sameValue(draft.value[field.key] ?? null, original.value[field.key] ?? null),
))

function defaultHint(field: GlobalField): string {
  const current = versionedField(field)
  return current.defaultValue === undefined ? '未设置时不写入配置' : `未设置 · 当前版本默认 ${current.defaultValue}`
}

function stringValue(field: GlobalField): string {
  const value = draft.value[field.key]
  return typeof value === 'string' ? value : ''
}

function selectValue(field: GlobalField): string | null {
  const value = draft.value[field.key]
  return typeof value === 'string' && value !== '' ? value : null
}

function numberValue(field: GlobalField): number | null {
  const value = draft.value[field.key]
  return typeof value === 'number' ? value : null
}

const detectedInterfaceOptions = computed<InterfaceOption[]>(() => networkInterfaces.value.map((item) => ({
  label: item.name,
  value: item.name,
  addresses: item.addresses || [],
})))

function renderInterfaceOption(label: string, addresses: string[]) {
  return h('div', { class: 'interface-option' }, [
    h('strong', label),
    addresses.length > 0
      ? h('span', { class: 'interface-option-addresses' }, addresses.join(' · '))
      : null,
  ])
}

function renderInterfaceLabel(option: SelectOption) {
  const label = typeof option.label === 'string' ? option.label : String(option.value || '')
  const addresses = Array.isArray(option.addresses)
    ? option.addresses.filter((address): address is string => typeof address === 'string')
    : []
  return renderInterfaceOption(label, addresses)
}

function interfaceOptions(field: GlobalField): InterfaceOption[] {
  if (field.key !== 'wan_interface') return detectedInterfaceOptions.value
  return [
    {
      label: '自动识别',
      value: 'auto',
      addresses: ['由 dae 自动选择默认广域网接口'],
    },
    ...detectedInterfaceOptions.value.filter((option) => option.value !== 'auto'),
  ]
}

function setInterfaceValue(key: string, values: Array<string | number> | null) {
  draft.value[key] = resolveInterfaceSelection(key, draft.value[key] ?? null, values)
}

function setStringValue(key: string, value: string) {
  draft.value[key] = value === '' ? null : value
}

function clearField(key: string) {
  draft.value[key] = null
}

function applyEditor() {
  const incompatible = GLOBAL_FIELDS.find((field) => unsupported(field)
    && !sameValue(draft.value[field.key] ?? null, original.value[field.key] ?? null)
    && draft.value[field.key] !== null)
  if (incompatible) {
    message.error(`${incompatible.key} 不受当前 dae ${capabilities.value?.version || '版本'} 支持`)
    return
  }
  if (content.value !== editorSnapshot.value) {
    message.error('配置在编辑期间发生了变化，请关闭后重新打开')
    return
  }
  const changes = GLOBAL_FIELDS
    .filter((field) => !lockedKeys.value.has(field.key)
      && !sameValue(draft.value[field.key] ?? null, original.value[field.key] ?? null))
    .map((field) => ({ key: field.key, value: draft.value[field.key] ?? null }))
  try {
    content.value = applyGlobalChanges(content.value, changes)
    editorVisible.value = false
    message.success('全局设置已应用到配置，保存并重载后生效')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '全局设置格式不正确')
  }
}

// 收起时这行字要说清里面有什么，否则用户不敢不展开
const foldSummary = computed(() => {
  const shown = summaries.value.filter((item) => item.explicit).slice(0, 3)
    .map((item) => `${item.label} ${item.value}`)
  return shown.length ? shown.join(' · ') : `${configuredCount.value} 项已配置`
})
const overflowOptions = [{ label: '编辑原文', key: 'source' }]
function onOverflow(key: string) {
  if (key === 'source') sourceVisible.value = true
}

onMounted(() => {
  void loadCapabilities()
  void loadInterfaces()
})
import FoldableCard from './FoldableCard.vue'
</script>

<template>
  <FoldableCard title="全局设置" :summary="foldSummary" testid="global-card">
    <template #actions>
      <NButton size="small" secondary @click="openEditor">
        <template #icon><NIcon><OptionsOutline /></NIcon></template>编辑
      </NButton>
      <NDropdown trigger="click" :options="overflowOptions" @select="onOverflow">
        <NButton size="small" quaternary aria-label="更多全局设置操作">⋯</NButton>
      </NDropdown>
    </template>

    <div class="global-summary-grid">
      <div v-for="item in summaries" :key="item.key" class="global-summary-item">
        <NText depth="3">{{ item.label }}</NText>
        <strong :class="{ implicit: !item.explicit, unsupported: item.unsupported }">{{ item.value }}</strong>
      </div>
    </div>
    <NAlert v-if="configuredUnsupported.length > 0" type="error" :bordered="false" class="global-card-alert">
      当前 dae {{ capabilities?.version }} 不支持已配置字段：{{ configuredUnsupported.map((field) => field.key).join('、') }}。
      保存会被当前二进制拒绝，请升级 dae 或移除这些声明。
    </NAlert>
    <NAlert
      v-if="state.unparsedLines > 0 || state.duplicateKeys.size > 0 || state.invalidKeys.size > 0"
      type="warning"
      :bordered="false"
      class="global-card-alert"
    >
      有复杂、重复或无法识别的全局声明，结构化表单会锁定相关字段；可使用“编辑原文”处理。
    </NAlert>
  </FoldableCard>

  <NModal
    v-model:show="editorVisible"
    preset="card"
    title="编辑全局设置"
    class="orchestrate-global-modal"
    :mask-closable="false"
    data-testid="global-editor-modal"
  >
    <NAlert v-if="unknownKeys.length > 0" type="info" :bordered="false" class="global-editor-alert">
      未知扩展字段 {{ unknownKeys.join('、') }} 不会被结构化表单改写，可在全局原文中管理。
    </NAlert>
    <NAlert v-if="lockedKeys.size > 0" type="warning" :bordered="false" class="global-editor-alert">
      {{ [...lockedKeys].join('、') }} 采用重复、跨行或非标准写法，已锁定以防误改。
    </NAlert>
    <NAlert v-if="capabilityChecked && !capabilities" type="info" :bordered="false" class="global-editor-alert">
      当前 dae 无法导出完整字段能力，兼容性将在应用前由 dae validate 最终确认。
    </NAlert>
    <NAlert v-if="interfaceLoadFailed" type="info" :bordered="false" class="global-editor-alert">
      未能读取本机网络接口；局域网与广域网接口仍可直接输入。
    </NAlert>

    <NCollapse :default-expanded-names="GLOBAL_FIELD_GROUPS.map((group) => group.key)" display-directive="show">
      <NCollapseItem v-for="group in GLOBAL_FIELD_GROUPS" :key="group.key" :name="group.key" :title="group.label">
        <div class="global-field-grid">
          <label
            v-for="field in group.fields"
            :key="field.key"
            class="global-field"
            :class="{ locked: lockedKeys.has(field.key) }"
          >
            <span class="global-field-head">
              <span>
                <strong>{{ field.label }}</strong>
                <NTag v-if="field.deprecated" size="tiny" type="warning" :bordered="false">已废弃</NTag>
                <NTag v-if="unsupported(field)" size="tiny" type="error" :bordered="false">当前版本不支持</NTag>
              </span>
              <NTooltip v-if="draft[field.key] !== null && !lockedKeys.has(field.key)">
                <template #trigger>
                  <NButton
                    size="tiny"
                    quaternary
                    circle
                    title="移除显式设置"
                    @click.prevent="clearField(field.key)"
                  >
                    <template #icon><NIcon><CloseCircleOutline /></NIcon></template>
                  </NButton>
                </template>
                移除该声明并恢复 dae 默认值
              </NTooltip>
            </span>
            <NText depth="3" class="global-field-description">{{ field.description }}</NText>

            <NInputNumber
              v-if="field.kind === 'number'"
              :value="numberValue(field)"
              :min="field.min"
              :max="field.max"
              :placeholder="defaultHint(field)"
              :disabled="lockedKeys.has(field.key) || unsupported(field)"
              clearable
              :data-testid="`global-field-${field.key}`"
              @update:value="(value) => draft[field.key] = value"
            />
            <NSelect
              v-else-if="field.kind === 'interface'"
              :value="splitInterfaceValue(draft[field.key] ?? null)"
              :options="interfaceOptions(field)"
              :render-label="renderInterfaceLabel"
              :placeholder="defaultHint(field)"
              :disabled="lockedKeys.has(field.key) || unsupported(field)"
              multiple
              filterable
              tag
              clearable
              max-tag-count="responsive"
              :virtual-scroll="false"
              :consistent-menu-width="false"
              :data-testid="`global-field-${field.key}`"
              @update:value="(value) => setInterfaceValue(field.key, value)"
            />
            <NSelect
              v-else-if="field.kind === 'boolean' || field.kind === 'select'"
              :value="selectValue(field)"
              :options="field.options"
              :placeholder="defaultHint(field)"
              :disabled="lockedKeys.has(field.key) || unsupported(field)"
              clearable
              :data-testid="`global-field-${field.key}`"
              @update:value="(value) => draft[field.key] = value"
            />
            <NInput
              v-else
              :value="stringValue(field)"
              :placeholder="defaultHint(field)"
              :disabled="lockedKeys.has(field.key) || unsupported(field)"
              clearable
              spellcheck="false"
              :data-testid="`global-field-${field.key}`"
              @update:value="(value) => setStringValue(field.key, value)"
            />
            <code>{{ field.key }}</code>
          </label>
        </div>
      </NCollapseItem>
    </NCollapse>

    <template #footer>
      <NSpace justify="end">
        <NButton @click="editorVisible = false">取消</NButton>
        <NButton type="primary" :disabled="!dirty" @click="applyEditor">应用到配置</NButton>
      </NSpace>
    </template>
  </NModal>

  <SectionEditorModal
    v-model:show="sourceVisible"
    v-model:content="content"
    section="global"
    title="编辑全局原文"
    description="这里只替换 global 节内部内容，适合处理未来版本新增、跨行或重复声明。其他配置保持不变。"
  />
</template>
