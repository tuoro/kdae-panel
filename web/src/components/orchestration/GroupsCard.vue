<script setup lang="ts">
import { computed, h, onMounted, ref, watch } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NInput,
  NInputGroup,
  NModal,
  NPopconfirm,
  NSelect,
  NSpace,
  NSwitch,
  NTag,
  NText,
  NTooltip,
  useMessage,
  type SelectOption,
} from 'naive-ui'
import { AddOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import { getJSON } from '../../api/client'
import { useMobileViewport } from '../../composables/useMobileViewport'
import type { SubscriptionNodeSource } from '../../types/api'
import {
  addGroup,
  isQuotable,
  isValidTag,
  parseGroups,
  readSection,
  removeGroup,
  setGroupFilter,
  setGroupPolicy,
  type Group,
} from '../../utils/daeconf'
import {
  createGroupFilter,
  describeGroupFilter,
  parseGroupFilter,
  resolveFixedCandidates,
  serializeGroupFilter,
  type FixedCandidate,
  type FixedCandidateResult,
  type GroupFilterDraft,
  type GroupFilterKind,
} from '../../utils/group'
import { parseNodeLink } from '../../utils/nodelink'
import { hasReadableCache } from '../../utils/subscription'
import MobileNodePicker from './MobileNodePicker.vue'
import SectionEditorModal from './SectionEditorModal.vue'

const content = defineModel<string>({ required: true })
const message = useMessage()
const mobile = useMobileViewport()

const groups = computed<Group[]>(() => parseGroups(content.value))
const groupNames = computed(() => new Set(groups.value.map((group) => group.name)))
const sourceVisible = ref(false)

const POLICY_OPTIONS = [
  { label: 'min_moving_avg · 移动平均延迟最小', value: 'min_moving_avg' },
  { label: 'min_avg10 · 最近 10 次平均延迟最小', value: 'min_avg10' },
  { label: 'min · 最近一次延迟最小', value: 'min' },
  { label: 'random · 每次连接随机', value: 'random' },
  { label: '固定节点 · 始终使用选中的节点', value: 'fixed' },
]
const CREATE_POLICY_OPTIONS = POLICY_OPTIONS.filter((option) => option.value !== 'fixed')

function parsePolicy(value?: string): { name: string; index: number } {
  const fixed = /^fixed\((\d+)\)$/.exec(value || '')
  if (fixed) return { name: 'fixed', index: Number(fixed[1]) }
  return { name: value || 'min_moving_avg', index: 0 }
}

function policyOptionsFor(group: Group) {
  const current = parsePolicy(group.policy?.value).name
  if (POLICY_OPTIONS.some((option) => option.value === current)) return POLICY_OPTIONS
  return [...POLICY_OPTIONS, { label: current, value: current }]
}

const newGroupName = ref('')
const newGroupPolicy = ref('min_moving_avg')

function createGroup() {
  const name = newGroupName.value.trim()
  if (!isValidTag(name)) {
    message.error('分组名只能使用字母、数字、下划线、点或横线，且以字母或下划线开头')
    return
  }
  if (groupNames.value.has(name)) {
    message.error(`分组 ${name} 已存在`)
    return
  }
  content.value = addGroup(content.value, name, newGroupPolicy.value)
  newGroupName.value = ''
}

function changePolicy(group: Group, name: string) {
  if (name === 'fixed') {
    const index = groups.value.findIndex((candidate) => candidate.section.nameStart === group.section.nameStart)
    if (index >= 0) openGroupEditor(index, 'fixed')
    return
  }
  content.value = setGroupPolicy(content.value, group, name)
}

const FILTER_KIND_OPTIONS = [
  { label: '指定本地节点', value: 'nodes' },
  { label: '指定订阅节点', value: 'subscriptionNodes' },
  { label: '指定整份订阅', value: 'subscriptions' },
  { label: '节点名称关键词', value: 'nameKeyword' },
  { label: '节点名称正则', value: 'nameRegex' },
  { label: '高级表达式', value: 'raw' },
]

interface ResourceOption extends SelectOption {
  label: string
  value: string
  description?: string
}

const subscriptionOptions = computed<ResourceOption[]>(() => readSection(content.value, 'subscription').entries
  .filter((entry) => entry.tag)
  .map((entry) => ({ label: entry.tag!, value: entry.tag!, description: entry.value })))

const nodeOptions = computed<ResourceOption[]>(() => {
  const options: ResourceOption[] = []
  const seen = new Set<string>()
  for (const entry of readSection(content.value, 'node').entries) {
    const info = parseNodeLink(entry.value)
    const value = entry.tag?.trim() || ''
    if (value === '' || seen.has(value)) continue
    seen.add(value)
    const details = [
      entry.tag && info?.name && info.name !== entry.tag ? info.name : '',
      info?.protocol,
      info?.host,
    ].filter(Boolean).join(' · ')
    options.push({ label: value, value, description: details || undefined })
  }
  return options
})

const subscriptionNodeSources = ref<SubscriptionNodeSource[]>([])
const subscriptionNodesLoading = ref(false)
const subscriptionNodesLoaded = ref(false)
const subscriptionNodesError = ref('')
const cachedSubscriptionTags = computed(() => new Set(
  readSection(content.value, 'subscription').entries
    .filter((entry) => entry.tag && hasReadableCache(entry.value))
    .map((entry) => entry.tag!),
))
const subscriptionNodeSourceMap = computed(() => new Map(
  subscriptionNodeSources.value
    .filter((source) => cachedSubscriptionTags.value.has(source.tag))
    .map((source) => [source.tag, source]),
))
const fixedSources = computed(() => [...subscriptionNodeSourceMap.value.values()])

function fixedCandidatesForGroup(group: Group): FixedCandidateResult {
  return resolveFixedCandidates(
    content.value,
    group.filters.map((filter) => parseGroupFilter(filter.value)),
    fixedSources.value,
    subscriptionNodesLoaded.value,
  )
}

function describeFixedCandidate(node: FixedCandidate): string {
  return [node.protocol, node.host].filter(Boolean).join(' · ')
}

function fixedNodeOptions(result: FixedCandidateResult): ResourceOption[] {
  if (!result.resolvable) return []
  return result.nodes.map((node) => ({
    label: node.name,
    value: node.name,
    description: describeFixedCandidate(node) || undefined,
  }))
}

function fixedNodeValue(group: Group): string | null {
  const policy = parsePolicy(group.policy?.value)
  if (policy.name !== 'fixed') return null
  const candidates = fixedCandidatesForGroup(group)
  return candidates.resolvable ? candidates.nodes[policy.index]?.name || null : null
}

function fixedCandidateReason(group: Group): string {
  const candidates = fixedCandidatesForGroup(group)
  return candidates.resolvable ? '' : candidates.reason
}

function changeFixedNode(group: Group, name: string | null) {
  if (!name) return
  const candidates = fixedCandidatesForGroup(group)
  if (!candidates.resolvable) {
    message.warning(candidates.reason)
    return
  }
  const index = candidates.nodes.findIndex((node) => node.name === name)
  if (index < 0) {
    message.error('所选节点已不在当前分组候选中，请重新读取后再试')
    return
  }
  content.value = setGroupPolicy(content.value, group, `fixed(${index})`)
}

async function loadSubscriptionNodes() {
  if (subscriptionNodesLoading.value) return
  subscriptionNodesLoading.value = true
  try {
    const response = await getJSON<{ sources: SubscriptionNodeSource[] }>('/api/v1/subscriptions/nodes')
    subscriptionNodeSources.value = response.sources
    subscriptionNodesError.value = ''
  } catch (error) {
    subscriptionNodeSources.value = []
    subscriptionNodesError.value = error instanceof Error ? error.message : '读取订阅节点缓存失败'
  } finally {
    subscriptionNodesLoaded.value = true
    subscriptionNodesLoading.value = false
  }
}

onMounted(() => void loadSubscriptionNodes())

function subscriptionNodeOptions(tag: string): ResourceOption[] {
  const source = subscriptionNodeSourceMap.value.get(tag)
  if (!source || source.problem) return []
  return source.nodes.map((node) => ({
    label: node.name,
    value: node.name,
    description: [node.protocol, node.host, node.matches > 1 ? `${node.matches} 个同名节点` : ''].filter(Boolean).join(' · '),
    disabled: !isQuotable(node.name),
  }))
}

function subscriptionNodeStatus(tag: string): string {
  if (subscriptionNodesLoading.value) return '正在读取 dae 订阅缓存…'
  if (subscriptionNodesError.value) return subscriptionNodesError.value
  if (tag === '') return '先选择节点来源'
  const source = subscriptionNodeSourceMap.value.get(tag)
  if (!source) return '该订阅暂无缓存；请开启离线缓存并成功刷新一次'
  if (source.problem) return source.problem
  if (source.nodes.length === 0) return '缓存中没有带稳定名称的节点'
  const suffix = source.skipped ? `；另有 ${source.skipped} 个无名称节点未列出` : ''
  return `${source.nodes.length} 个可选名称${suffix}`
}

function changeSubscriptionNodeSource(filter: GroupFilterDraft, source: string) {
  filter.source = source
  filter.values = []
}

function renderResourceLabel(option: SelectOption) {
  const label = typeof option.label === 'string' ? option.label : String(option.value || '')
  const description = typeof option.description === 'string' ? option.description : ''
  return h('div', { class: 'group-resource-option' }, [
    h('strong', label),
    description ? h('span', { class: 'group-resource-option-meta' }, description) : null,
  ])
}

const groupEditVisible = ref(false)
const groupTarget = ref<{ index: number; snapshot: string } | null>(null)
const groupPolicy = ref('min_moving_avg')
const groupFixedIndex = ref(0)
const groupFilters = ref<GroupFilterDraft[]>([])
const groupFixedCandidates = computed<FixedCandidateResult | null>(() => {
  if (groupPolicy.value !== 'fixed') return null
  return resolveFixedCandidates(
    content.value,
    groupFilters.value,
    fixedSources.value,
    subscriptionNodesLoaded.value,
  )
})
const groupFixedNodeOptions = computed(() => fixedNodeOptions(
  groupFixedCandidates.value || { resolvable: false, reason: '' },
))
const groupFixedNode = ref<string | null>(null)
const groupFixedNodeNeedsSync = ref(false)
watch(groupFixedCandidates, (candidates) => {
  if (!candidates?.resolvable) return
  if (groupFixedNodeNeedsSync.value) {
    groupFixedNode.value = candidates.nodes[groupFixedIndex.value]?.name || null
    groupFixedNodeNeedsSync.value = false
    return
  }
  if (groupFixedNode.value && !candidates.nodes.some((node) => node.name === groupFixedNode.value)) {
    // 过滤条件改变后原节点已不在候选中，不能静默改选另一个节点。
    groupFixedNode.value = null
  }
})
const unknownNodeNames = computed(() => {
  const explicit = new Set(nodeOptions.value.map((option) => option.value))
  return [...new Set(groupFilters.value
    .filter((filter) => filter.kind === 'nodes')
    .flatMap((filter) => filter.values)
    .filter((value) => !explicit.has(value)))]
})
const unknownSubscriptionNodes = computed(() => {
  if (!subscriptionNodesLoaded.value || subscriptionNodesError.value) return []
  const unknown: string[] = []
  for (const filter of groupFilters.value.filter((candidate) => candidate.kind === 'subscriptionNodes')) {
    const known = new Set(subscriptionNodeOptions(filter.source).map((option) => option.value))
    for (const name of filter.values) {
      if (!known.has(name)) unknown.push(`${filter.source || '未知订阅'} / ${name}`)
    }
  }
  return [...new Set(unknown)]
})

function openGroupEditor(groupIndex: number, requestedPolicy?: string) {
  const group = groups.value[groupIndex]
  if (!group) return
  if ((group.policy && !group.policy.editable) || group.filters.some((filter) => !filter.editable)) {
    message.warning('该分组含跨行或重复声明，请使用卡片右上角的原文编辑')
    return
  }
  const policy = parsePolicy(group.policy?.value)
  groupTarget.value = {
    index: groupIndex,
    snapshot: content.value.slice(group.section.nameStart, group.section.bodyEnd + 1),
  }
  groupPolicy.value = requestedPolicy || policy.name
  groupFixedIndex.value = policy.index
  groupFixedNode.value = null
  groupFixedNodeNeedsSync.value = policy.name === 'fixed' && requestedPolicy === undefined
  groupFilters.value = group.filters.map((filter) => parseGroupFilter(filter.value))
  groupEditVisible.value = true
  void loadSubscriptionNodes()
}

function addFilter(kind: GroupFilterKind) {
  groupFilters.value.push(createGroupFilter(kind))
}

function applyGroupEdit() {
  const target = groupTarget.value
  if (!target) return
  const current = groups.value[target.index]
  if (!current || content.value.slice(current.section.nameStart, current.section.bodyEnd + 1) !== target.snapshot) {
    message.error('配置在编辑期间发生了变化，请关闭后重新打开')
    return
  }
  const serialized = groupFilters.value.map(serializeGroupFilter)
  if (serialized.some((value) => value === null)) {
    message.error('过滤条件不能为空；请选择节点或订阅，名称也不能同时含单双引号')
    return
  }
  if (groupPolicy.value === 'fixed') {
    const candidates = groupFixedCandidates.value
    if (!candidates?.resolvable) {
      message.error(candidates?.reason || '当前配置无法安全展开为节点列表')
      return
    }
    const selectedIndex = candidates.nodes.findIndex((node) => node.name === groupFixedNode.value)
    if (selectedIndex < 0) {
      message.error('请选择一个固定节点')
      return
    }
    groupFixedIndex.value = selectedIndex
  }

  let next = content.value
  for (let index = current.filters.length - 1; index >= 0; index -= 1) {
    next = setGroupFilter(next, current, index, serialized[index] || '')
  }
  for (let index = current.filters.length; index < serialized.length; index += 1) {
    const latest = parseGroups(next)[target.index]
    if (!latest) return
    next = setGroupFilter(next, latest, latest.filters.length, serialized[index]!)
  }
  const latest = parseGroups(next)[target.index]
  if (!latest) return
  const policy = groupPolicy.value === 'fixed' ? `fixed(${groupFixedIndex.value})` : groupPolicy.value
  content.value = setGroupPolicy(next, latest, policy)
  groupEditVisible.value = false
  groupTarget.value = null
}
</script>

<template>
  <NCard title="分组" class="panel-card" data-testid="groups-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <NTag size="small" :bordered="false">{{ groups.length }} 个</NTag>
        <NButton size="small" quaternary @click="sourceVisible = true">
          <template #icon><NIcon><CreateOutline /></NIcon></template>编辑原文
        </NButton>
      </NSpace>
    </template>
    <div class="orchestrate-add inset" data-testid="group-add">
      <NInputGroup>
        <NInput v-model:value="newGroupName" placeholder="新分组名，如 proxy" @keyup.enter="createGroup" />
        <NSelect v-model:value="newGroupPolicy" :options="CREATE_POLICY_OPTIONS" class="group-policy-select" />
        <NButton type="primary" ghost @click="createGroup">
          <template #icon><NIcon><AddOutline /></NIcon></template>新建
        </NButton>
      </NInputGroup>
    </div>
    <div v-if="groups.length === 0" class="orchestrate-empty" data-testid="group-list">
      <NText depth="3">还没有分组。分组是路由规则的出站目标，按策略从命中的节点中选择。</NText>
    </div>
    <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="group-item" data-testid="group-list">
      <div class="group-head">
        <code>{{ group.name }}</code>
        <NSpace size="small">
          <NButton size="tiny" secondary @click="openGroupEditor(groupIndex)">
            <template #icon><NIcon><CreateOutline /></NIcon></template>编辑
          </NButton>
          <NPopconfirm positive-text="删除" negative-text="取消" @positive-click="content = removeGroup(content, group)">
            <template #trigger>
              <NButton size="tiny" quaternary type="error" title="删除分组">
                <template #icon><NIcon><TrashOutline /></NIcon></template>
              </NButton>
            </template>
            删除分组后，引用它的路由规则会校验失败，确认删除？
          </NPopconfirm>
        </NSpace>
      </div>
      <div class="group-row">
        <NText depth="3">策略</NText>
        <NSelect
          size="small"
          :value="parsePolicy(group.policy?.value).name"
          :options="policyOptionsFor(group)"
          :disabled="group.policy !== null && !group.policy.editable"
          @update:value="(value: string) => changePolicy(group, value)"
        />
        <template v-if="parsePolicy(group.policy?.value).name === 'fixed'">
          <NSelect
            v-if="fixedCandidatesForGroup(group).resolvable"
            class="group-fixed-node-select"
            size="small"
            :value="fixedNodeValue(group)"
            :options="fixedNodeOptions(fixedCandidatesForGroup(group))"
            filterable
            placeholder="选择节点"
            @update:value="(value: string | null) => changeFixedNode(group, value)"
          />
          <NText
            v-else
            depth="3"
            class="group-fixed-node-unavailable"
            :title="fixedCandidateReason(group)"
          >无法确定节点</NText>
        </template>
      </div>
      <div class="group-row filters">
        <NText depth="3">过滤</NText>
        <NSpace size="small" wrap>
          <NTooltip v-for="(filter, index) in group.filters" :key="index" :disabled="filter.editable">
            <template #trigger>
              <NTag
                size="small"
                class="filter-tag mono"
                :class="{ locked: !filter.editable }"
                :closable="filter.editable"
                @close="content = setGroupFilter(content, group, index, '')"
              >
                <span class="filter-value" :title="filter.value" @click="filter.editable && openGroupEditor(groupIndex)">
                  {{ describeGroupFilter(filter.value) }}
                </span>
              </NTag>
            </template>
            该条件跨行或结构复杂，请使用卡片右上角的原文编辑。
          </NTooltip>
          <NButton size="tiny" dashed @click="openGroupEditor(groupIndex)">
            <template #icon><NIcon><AddOutline /></NIcon></template>
            {{ group.filters.length === 0 ? '全部节点，选择成员' : '编辑成员' }}
          </NButton>
        </NSpace>
      </div>
    </div>
  </NCard>

  <NModal v-model:show="groupEditVisible" preset="card" title="编辑分组" class="orchestrate-group-modal" :mask-closable="false" data-testid="group-editor-modal">
    <NSpace vertical size="small">
      <NAlert type="info" :bordered="false">
        可选择本地节点、订阅中的指定节点或整份订阅；多条过滤之间是“或”关系。
        订阅节点来自 dae 的离线缓存，不会复制进 node 节。
      </NAlert>
      <NAlert v-if="unknownNodeNames.length" type="warning" :bordered="false">
        {{ unknownNodeNames.join('、') }} 不对应显式本地标签，可能是订阅节点名称或旧配置名称；面板会原样保留，但无法保证它与 dae 实际解析出的名称一致。
      </NAlert>
      <NAlert v-if="unknownSubscriptionNodes.length" type="warning" :bordered="false">
        {{ unknownSubscriptionNodes.join('、') }} 当前不在订阅缓存中；过滤原文会保留，但可能已经失效。
      </NAlert>
    </NSpace>
    <div class="group-editor-policy">
      <NText depth="3">策略</NText>
      <NSelect v-model:value="groupPolicy" :options="POLICY_OPTIONS" data-testid="group-policy-picker" />
      <div v-if="groupPolicy === 'fixed'" class="group-fixed-node-control">
        <NSelect
          v-model:value="groupFixedNode"
          class="group-fixed-node-select"
          :options="groupFixedNodeOptions"
          :loading="subscriptionNodesLoading"
          :disabled="!groupFixedCandidates?.resolvable"
          placeholder="选择固定节点"
          filterable
          :render-label="renderResourceLabel"
          data-testid="group-fixed-node-picker"
        />
        <NText
          v-if="groupFixedCandidates && !groupFixedCandidates.resolvable"
          depth="3"
          class="group-fixed-node-hint"
        >
          {{ groupFixedCandidates.reason }}
        </NText>
      </div>
    </div>
    <div class="group-filter-editor">
      <div class="group-filter-editor-head">
        <div>
          <strong>分组成员</strong>
          <NText depth="3" class="group-resource-hint">
            本地节点使用显式标签；订阅节点先选择来源，再按 dae 缓存中的节点名称选择。
          </NText>
        </div>
        <NSpace size="small" class="group-filter-actions">
          <NButton size="small" dashed :disabled="nodeOptions.length === 0" @click="addFilter('nodes')">
            <template #icon><NIcon><AddOutline /></NIcon></template>选择节点
          </NButton>
          <NButton size="small" dashed :disabled="subscriptionOptions.length === 0" @click="addFilter('subscriptionNodes')">
            <template #icon><NIcon><AddOutline /></NIcon></template>订阅节点
          </NButton>
          <NButton size="small" dashed :disabled="subscriptionOptions.length === 0" @click="addFilter('subscriptions')">
            <template #icon><NIcon><AddOutline /></NIcon></template>整份订阅
          </NButton>
          <NButton size="small" quaternary @click="addFilter('nameKeyword')">
            <template #icon><NIcon><AddOutline /></NIcon></template>高级条件
          </NButton>
        </NSpace>
      </div>
      <NText v-if="groupFilters.length === 0" depth="3">不设置过滤时，该分组包含全部节点。</NText>
      <div v-for="(filter, index) in groupFilters" :key="index" class="group-filter-editor-row">
        <NSelect v-model:value="filter.kind" :options="FILTER_KIND_OPTIONS" />
        <MobileNodePicker
          v-if="filter.kind === 'nodes' && mobile"
          v-model="filter.values"
          :options="nodeOptions"
          title="选择本地节点"
          placeholder="选择本地节点"
          data-testid="group-node-picker-mobile"
        />
        <NSelect
          v-else-if="filter.kind === 'nodes'"
          v-model:value="filter.values"
          :options="nodeOptions"
          :render-label="renderResourceLabel"
          multiple
          filterable
          clearable
          :max-tag-count="3"
          :virtual-scroll="false"
          :consistent-menu-width="false"
          placeholder="选择本地节点"
          data-testid="group-node-picker"
        />
        <div v-else-if="filter.kind === 'subscriptionNodes'" class="group-subscription-node-picker">
          <NSelect
            :value="filter.source"
            :options="subscriptionOptions"
            :loading="subscriptionNodesLoading"
            filterable
            clearable
            placeholder="节点来源"
            data-testid="group-subscription-node-source"
            @update:value="(value: string | null) => changeSubscriptionNodeSource(filter, value || '')"
          />
          <MobileNodePicker
            v-if="mobile"
            v-model="filter.values"
            :options="subscriptionNodeOptions(filter.source)"
            :disabled="filter.source === '' || subscriptionNodeOptions(filter.source).length === 0"
            :title="filter.source ? `选择 ${filter.source} 中的节点` : '选择订阅节点'"
            placeholder="选择该订阅中的节点"
            data-testid="group-subscription-node-picker-mobile"
          />
          <NSelect
            v-else
            v-model:value="filter.values"
            :options="subscriptionNodeOptions(filter.source)"
            :render-label="renderResourceLabel"
            :disabled="filter.source === '' || subscriptionNodeOptions(filter.source).length === 0"
            multiple
            filterable
            clearable
            :max-tag-count="3"
            :virtual-scroll="false"
            :consistent-menu-width="false"
            placeholder="选择该订阅中的节点"
            data-testid="group-subscription-node-picker"
          />
          <NText depth="3" class="group-subscription-node-status">
            {{ subscriptionNodeStatus(filter.source) }}
          </NText>
        </div>
        <NSelect
          v-else-if="filter.kind === 'subscriptions'"
          v-model:value="filter.values"
          :options="subscriptionOptions"
          :render-label="renderResourceLabel"
          multiple
          filterable
          tag
          clearable
          :max-tag-count="3"
          :virtual-scroll="false"
          :consistent-menu-width="false"
          placeholder="选择订阅"
          data-testid="group-subscription-picker"
        />
        <NInput
          v-else
          v-model:value="filter.value"
          class="mono"
          :placeholder="filter.kind === 'raw' ? 'subtag(my_sub) && !name(keyword: 过期)' : '匹配内容'"
          spellcheck="false"
        />
        <label v-if="filter.kind !== 'raw' && filter.kind !== 'subscriptionNodes'" class="filter-exclude">
          <NSwitch v-model:value="filter.exclude" size="small" />
          <span>排除</span>
        </label>
        <span v-else class="filter-exclude-placeholder"></span>
        <NButton quaternary circle type="error" title="删除条件" @click="groupFilters.splice(index, 1)">
          <template #icon><NIcon><TrashOutline /></NIcon></template>
        </NButton>
      </div>
    </div>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="groupEditVisible = false">取消</NButton>
        <NButton type="primary" @click="applyGroupEdit">应用到编排</NButton>
      </NSpace>
    </template>
  </NModal>

  <SectionEditorModal
    v-model:show="sourceVisible"
    v-model:content="content"
    section="group"
    title="编辑分组原文"
    description="这里只替换 group 节内部内容，适合处理跨行条件或分组级高级参数。其他配置保持不变。"
  />
</template>
