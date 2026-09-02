<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NInput,
  NModal,
  NPopconfirm,
  NRadio,
  NRadioGroup,
  NSelect,
  NSpace,
  NSwitch,
  NTabPane,
  NTabs,
  NTag,
  NText,
  NTooltip,
  useMessage,
} from 'naive-ui'
import { AddOutline, ArrowForwardOutline, CreateOutline, TrashOutline } from '@vicons/ionicons5'
import {
  addRoutingRule,
  parseGroups,
  parseRoutingRules,
  readSectionBody,
  removeRoutingRule,
  setRoutingRule,
  setSectionBody,
  type RoutingRule,
} from '../../utils/daeconf'
import {
  buildSimpleRouting,
  detectSimpleRouting,
  MAC_ADDRESS_REGEX,
  SIMPLE_ROUTING_MODES,
  splitRoutingMatch,
  type MacAction,
  type RoutingMatchKind,
  type SimpleRoutingMode,
} from '../../utils/routing'
import SectionVersionControls from './SectionVersionControls.vue'

const content = defineModel<string>({ required: true })
const message = useMessage()

const routingRules = computed(() => parseRoutingRules(content.value))
const routingBody = computed(() => readSectionBody(content.value, 'routing'))
const groups = computed(() => parseGroups(content.value))
const groupNames = computed(() => new Set(groups.value.map((group) => group.name)))
const builtinOutbounds = new Set(['direct', 'block', 'must_direct', 'must_proxy'])
const outboundOptions = computed(() => [
  { label: 'direct · 直连', value: 'direct' },
  { label: 'block · 阻断', value: 'block' },
  { label: 'must_direct · 强制直连', value: 'must_direct' },
  { label: 'must_proxy · 强制代理', value: 'must_proxy' },
  ...groups.value.map((group) => ({ label: `${group.name} · 分组`, value: group.name })),
])

type RuleKind = RoutingMatchKind | 'raw' | 'fallback'

const RULE_KIND_OPTIONS: Array<{ label: string; value: RuleKind }> = [
  { label: '目标域名 domain', value: 'domain' },
  { label: '目标 IP dip', value: 'dip' },
  { label: '目标端口 dport', value: 'dport' },
  { label: '来源 IP sip', value: 'sip' },
  { label: '来源端口 sport', value: 'sport' },
  { label: '进程名 pname', value: 'pname' },
  { label: '设备 MAC', value: 'mac' },
  { label: '传输协议 l4proto', value: 'l4proto' },
  { label: 'IP 版本 ipversion', value: 'ipversion' },
  { label: '高级匹配表达式', value: 'raw' },
  { label: '默认出站 fallback', value: 'fallback' },
]

const ruleVisible = ref(false)
const ruleTarget = ref<{ rule: RoutingRule; snapshot: string } | null>(null)
const ruleKind = ref<RuleKind>('domain')
const ruleValue = ref('')
const ruleOutbound = ref('direct')

function openRuleEditor(rule?: RoutingRule) {
  if (rule && !rule.editable) {
    message.warning('该规则跨行书写，请使用“编辑路由”中的高级模式')
    return
  }
  ruleTarget.value = rule
    ? { rule, snapshot: content.value.slice(rule.lineStart, rule.lineEnd) }
    : null
  if (rule?.isFallback) {
    ruleKind.value = 'fallback'
    ruleValue.value = ''
  } else if (rule) {
    const parsed = splitRoutingMatch(rule.match)
    ruleKind.value = parsed.kind
    ruleValue.value = parsed.value
  } else {
    ruleKind.value = 'domain'
    ruleValue.value = 'geosite:gfw'
  }
  ruleOutbound.value = rule?.outbound || groups.value[0]?.name || 'direct'
  ruleVisible.value = true
}

function applyRule() {
  const outbound = ruleOutbound.value.trim()
  if (!builtinOutbounds.has(outbound) && !groupNames.value.has(outbound)) {
    message.error('出站目标必须是内置动作或现有分组')
    return
  }
  const isFallback = ruleKind.value === 'fallback'
  const value = ruleValue.value.trim()
  if (!isFallback && (value === '' || /[\r\n]/.test(value))) {
    message.error('匹配条件不能为空或跨行')
    return
  }
  const match = ruleKind.value === 'raw' ? value : isFallback ? 'fallback' : `${ruleKind.value}(${value})`
  const target = ruleTarget.value
  if (isFallback && routingRules.value.some((rule) => rule.isFallback && rule.lineStart !== target?.rule.lineStart)) {
    message.error('已经存在 fallback，请直接编辑现有规则')
    return
  }
  if (target) {
    if (content.value.slice(target.rule.lineStart, target.rule.lineEnd) !== target.snapshot) {
      message.error('配置在编辑期间发生了变化，请关闭后重新打开')
      return
    }
    content.value = setRoutingRule(content.value, target.rule, match, outbound, isFallback)
  } else {
    content.value = addRoutingRule(content.value, match, outbound, isFallback)
  }
  ruleVisible.value = false
  ruleTarget.value = null
}

const routingEditorVisible = ref(false)
const routingEditorTab = ref<'simple' | 'advanced'>('simple')
const simpleMode = ref<SimpleRoutingMode>('gfw')
const proxyGroup = ref('')
const macEnabled = ref(false)
const macAction = ref<MacAction>('proxy')
const macText = ref('')
const advancedBody = ref('')

watch(simpleMode, (mode) => {
  if (mode === 'macOnly') {
    macEnabled.value = true
    macAction.value = 'proxy'
  }
})

function macValues(): string[] {
  return macText.value.split(/[\r\n,]+/).map((value) => value.trim()).filter(Boolean)
}

function openRoutingEditor() {
  const body = readSectionBody(content.value, 'routing')
  advancedBody.value = body
  const detected = detectSimpleRouting(body, groups.value.map((group) => group.name))
  if (detected) {
    simpleMode.value = detected.mode
    proxyGroup.value = detected.group || groups.value[0]?.name || ''
    macEnabled.value = detected.macs.length > 0
    macText.value = detected.macs.join('\n')
    macAction.value = detected.action
    routingEditorTab.value = 'simple'
  } else {
    proxyGroup.value = groups.value[0]?.name || ''
    macEnabled.value = false
    macText.value = ''
    macAction.value = 'proxy'
    routingEditorTab.value = 'advanced'
  }
  routingEditorVisible.value = true
}

function applyVersion(body: string) {
  content.value = setSectionBody(content.value, 'routing', body)
}

function changeRoutingEditorTab(value: string) {
  // 两种模式各自保留一份草稿。切换标签只是查看另一份草稿，
  // 不能因为用户想看一眼高级模式就把简单模式模板写进去。
  routingEditorTab.value = value as 'simple' | 'advanced'
}

function applyRoutingEditor() {
  let body = advancedBody.value
  if (routingEditorTab.value === 'simple') {
    const needsProxy = simpleMode.value !== 'direct' || (macEnabled.value && macAction.value === 'proxy')
    if (needsProxy && !groupNames.value.has(proxyGroup.value)) {
      message.error('请先创建并选择一个代理分组')
      return
    }
    const invalidMac = macValues().find((value) => !MAC_ADDRESS_REGEX.test(value))
    if ((macEnabled.value || simpleMode.value === 'macOnly') && (macValues().length === 0 || invalidMac)) {
      message.error(invalidMac ? `MAC 地址格式不正确：${invalidMac}` : '请至少填写一个 MAC 地址')
      return
    }
    body = buildSimpleRouting(simpleMode.value, proxyGroup.value, macEnabled.value ? macValues() : [], macAction.value)
  }
  content.value = setSectionBody(content.value, 'routing', body)
  routingEditorVisible.value = false
}

function outboundType(outbound: string): 'success' | 'error' | 'info' | 'default' {
  if (outbound === 'direct' || outbound === 'must_direct') return 'success'
  if (outbound === 'block') return 'error'
  if (groupNames.value.has(outbound) || outbound === 'must_proxy') return 'info'
  return 'default'
}
</script>

<template>
  <NCard title="路由规则" class="panel-card routing-card" data-testid="routing-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <SectionVersionControls kind="routing" :body="routingBody" @apply="applyVersion" />
        <NTag size="small" :bordered="false">{{ routingRules.length }} 条</NTag>
        <NButton size="small" secondary @click="openRuleEditor()">
          <template #icon><NIcon><AddOutline /></NIcon></template>添加规则
        </NButton>
        <NButton size="small" quaternary @click="openRoutingEditor">
          <template #icon><NIcon><CreateOutline /></NIcon></template>编辑路由
        </NButton>
      </NSpace>
    </template>
    <div v-if="routingRules.length === 0" class="orchestrate-empty">
      <NText depth="3">还没有路由规则。可以逐条添加，也可以用“编辑路由”选择常用模板。</NText>
    </div>
    <ol v-else class="routing-list">
      <li v-for="(rule, index) in routingRules" :key="rule.lineStart" class="routing-rule" :class="{ fallback: rule.isFallback }">
        <span class="routing-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <code class="routing-match">{{ rule.isFallback ? 'fallback（以上都未命中）' : rule.match }}</code>
        <NIcon class="routing-arrow"><ArrowForwardOutline /></NIcon>
        <NTag size="small" :type="outboundType(rule.outbound)" :bordered="false">{{ rule.outbound }}</NTag>
        <span class="routing-spacer"></span>
        <NTooltip :disabled="rule.editable">
          <template #trigger>
            <NSpace size="small" :wrap="false">
              <NButton size="tiny" secondary :disabled="!rule.editable" @click="openRuleEditor(rule)">
                <template #icon><NIcon><CreateOutline /></NIcon></template>编辑
              </NButton>
              <NPopconfirm positive-text="删除" negative-text="取消" @positive-click="content = removeRoutingRule(content, rule)">
                <template #trigger>
                  <NButton size="tiny" quaternary circle type="error" title="删除规则" :disabled="!rule.editable">
                    <template #icon><NIcon><TrashOutline /></NIcon></template>
                  </NButton>
                </template>
                路由按顺序匹配，删除后后续规则会提前生效，确认删除？
              </NPopconfirm>
            </NSpace>
          </template>
          该规则跨行书写，请使用“编辑路由”中的高级模式。
        </NTooltip>
      </li>
    </ol>
  </NCard>

  <NModal v-model:show="ruleVisible" preset="card" :title="ruleTarget ? '编辑路由规则' : '添加路由规则'" class="orchestrate-modal" :mask-closable="false" data-testid="routing-rule-modal">
    <div class="routing-rule-form">
      <label>
        <NText depth="3">匹配类型</NText>
        <NSelect v-model:value="ruleKind" :options="RULE_KIND_OPTIONS" />
      </label>
      <label v-if="ruleKind !== 'fallback'">
        <NText depth="3">匹配内容</NText>
        <NInput
          v-model:value="ruleValue"
          class="mono"
          :placeholder="ruleKind === 'raw' ? 'domain(geosite:gfw) && dport(443)' : 'geosite:gfw'"
          spellcheck="false"
          @keyup.enter="applyRule"
        />
      </label>
      <label>
        <NText depth="3">出站目标</NText>
        <NSelect v-model:value="ruleOutbound" :options="outboundOptions" filterable />
      </label>
      <NText depth="3">规则按页面顺序自上而下匹配；新增普通规则会自动放在 fallback 之前。</NText>
    </div>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="ruleVisible = false">取消</NButton>
        <NButton type="primary" @click="applyRule">应用到配置</NButton>
      </NSpace>
    </template>
  </NModal>

  <NModal v-model:show="routingEditorVisible" preset="card" title="编辑路由" class="orchestrate-routing-modal" :mask-closable="false" data-testid="routing-editor-modal">
    <NTabs :value="routingEditorTab" type="segment" @update:value="changeRoutingEditorTab">
      <NTabPane name="simple" tab="简单模式">
        <NAlert type="warning" :bordered="false" class="routing-template-warning">
          应用简单模式会用所选模板替换整个 routing 节；复杂或自定义规则请使用高级模式。
        </NAlert>
        <div class="routing-mode-layout">
          <NRadioGroup v-model:value="simpleMode" class="routing-mode-grid">
            <NRadio v-for="mode in SIMPLE_ROUTING_MODES" :key="mode.value" :value="mode.value" class="routing-mode-option">
              <strong>{{ mode.label }}</strong>
              <NText depth="3">{{ mode.description }}</NText>
            </NRadio>
          </NRadioGroup>
          <div class="routing-simple-settings">
            <label v-if="simpleMode !== 'direct'">
              <NText depth="3">代理分组</NText>
              <NSelect
                v-model:value="proxyGroup"
                :options="groups.map((group) => ({ label: group.name, value: group.name }))"
                placeholder="请先创建分组"
              />
            </label>
            <div class="routing-mac-toggle">
              <div>
                <strong>MAC 访问控制</strong>
                <NText depth="3">为指定局域网设备覆盖默认选路。</NText>
              </div>
              <NSwitch v-model:value="macEnabled" :disabled="simpleMode === 'macOnly'" />
            </div>
            <template v-if="macEnabled">
              <NRadioGroup v-model:value="macAction" name="mac-action" :disabled="simpleMode === 'macOnly'">
                <NSpace>
                  <NRadio value="proxy">走代理分组</NRadio>
                  <NRadio value="direct">直连</NRadio>
                </NSpace>
              </NRadioGroup>
              <NInput
                v-model:value="macText"
                type="textarea"
                class="mono"
                :rows="5"
                placeholder="AA:BB:CC:DD:EE:FF&#10;11:22:33:44:55:66"
                spellcheck="false"
              />
            </template>
          </div>
        </div>
      </NTabPane>
      <NTabPane name="advanced" tab="高级模式">
        <NText depth="3">直接编辑 routing 节内部内容。切回简单模式不会自动解析自定义规则。</NText>
        <NInput v-model:value="advancedBody" type="textarea" class="mono routing-source-input" :rows="20" spellcheck="false" />
      </NTabPane>
    </NTabs>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="routingEditorVisible = false">取消</NButton>
        <NButton type="primary" @click="applyRoutingEditor">应用到配置</NButton>
      </NSpace>
    </template>
  </NModal>
</template>
