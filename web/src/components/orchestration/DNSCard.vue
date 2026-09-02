<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NIcon,
  NInput,
  NInputNumber,
  NModal,
  NSelect,
  NSpace,
  NSwitch,
  NTabPane,
  NTabs,
  NTag,
  NText,
  useDialog,
  useMessage,
} from 'naive-ui'
import { AddOutline, CreateOutline, OptionsOutline, TrashOutline } from '@vicons/ionicons5'
import { getJSON } from '../../api/client'
import type { DaeOutline } from '../../types/api'
import {
  buildDNSBody,
  cloneDNSDraft,
  configuredUnsupported,
  defaultDNSDraft,
  DNS_FIELD_LABELS,
  newDNSFixedTTL,
  readDNSCapabilities,
  readDNSState,
  type DNSCapabilities,
  type DNSDraft,
  unsupportedDNSRequestMatchers,
} from '../../utils/dns'
import { setSectionBody } from '../../utils/daeconf'
import DNSRulesEditor from './DNSRulesEditor.vue'
import DNSUpstreamEditor from './DNSUpstreamEditor.vue'
import SectionVersionControls from './SectionVersionControls.vue'

const content = defineModel<string>({ required: true })
const message = useMessage()
const dialog = useDialog()
const state = computed(() => readDNSState(content.value))
const capabilities = ref<DNSCapabilities | null>(null)
const capabilityChecked = ref(false)

const editorVisible = ref(false)
const editorTab = ref<'simple' | 'advanced'>('simple')
const editorSnapshot = ref('')
const advancedBody = ref('')
const simpleDraft = ref<DNSDraft>(defaultDNSDraft())

const upstreamCount = computed(() => state.value.draft.upstreams.length)
const requestCount = computed(() => state.value.draft.requestRules.length)
const responseCount = computed(() => state.value.draft.responseRules.length)
const unsupported = computed(() => configuredUnsupported(state.value, capabilities.value))
const unsupportedMatchers = computed(() => capabilityChecked.value
  ? unsupportedDNSRequestMatchers(state.value.draft.requestRules, capabilities.value)
  : [])

function capabilitySupports(key: string): boolean {
  return capabilities.value === null || capabilities.value.supported.has(key)
}

function currentDefault(key: string): string | undefined {
  return capabilities.value?.defaults.get(key)
}

function effectiveOptimisticCache(): boolean {
  if (simpleDraft.value.optimisticCache !== null) return simpleDraft.value.optimisticCache
  return currentDefault('optimistic_cache') !== 'false'
}

function openEditor() {
  const current = state.value
  editorSnapshot.value = content.value
  advancedBody.value = current.body
  simpleDraft.value = cloneDNSDraft(current.present && current.body.trim() !== '' ? current.draft : defaultDNSDraft())
  editorTab.value = current.simpleSafe ? 'simple' : 'advanced'
  editorVisible.value = true
}

function applyVersion(body: string) {
  content.value = setSectionBody(content.value, 'dns', body)
}

function changeEditorTab(value: string) {
  // 两种模式是两份独立草稿。切换只改变当前视图，不解析、生成或写回另一份草稿。
  editorTab.value = value as 'simple' | 'advanced'
}

function resetCacheField(key: 'optimisticCache' | 'optimisticCacheTTL' | 'maxCacheSize') {
  simpleDraft.value[key] = null
}

function draftUnsupportedFields(): string[] {
  if (!capabilities.value) return []
  const draft = simpleDraft.value
  const unsupportedFields: string[] = []
  const scalar: Array<[string, unknown]> = [
    ['ipversion_prefer', draft.ipVersionPrefer],
    ['bind', draft.bind],
    ['optimistic_cache', draft.optimisticCache],
    ['optimistic_cache_ttl', draft.optimisticCacheTTL],
    ['max_cache_size', draft.maxCacheSize],
  ]
  for (const [key, value] of scalar) {
    if (!capabilitySupports(key) && value !== null && value !== '') unsupportedFields.push(key)
  }
  if (!capabilitySupports('fixed_domain_ttl') && draft.fixedTTLs.length > 0) unsupportedFields.push('fixed_domain_ttl')
  if (!capabilitySupports('upstream') && draft.upstreams.length > 0) unsupportedFields.push('upstream')
  if (!capabilitySupports('routing') && (draft.requestRules.length > 0 || draft.responseRules.length > 0)) unsupportedFields.push('routing')
  return [...new Set(unsupportedFields)]
}

function draftUnsupportedMatchers() {
  return capabilityChecked.value
    ? unsupportedDNSRequestMatchers(simpleDraft.value.requestRules, capabilities.value)
    : []
}

function commitEditor(body: string) {
  if (content.value !== editorSnapshot.value) {
    message.error('配置在编辑期间发生了变化，请关闭后重新打开')
    return
  }
  content.value = setSectionBody(content.value, 'dns', body)
  editorVisible.value = false
  message.success('DNS 设置已应用到配置，保存并重载后生效')
}

function applyEditor() {
  if (content.value !== editorSnapshot.value) {
    message.error('配置在编辑期间发生了变化，请关闭后重新打开')
    return
  }
  let body = advancedBody.value
  if (editorTab.value === 'simple') {
    const unsupportedFields = draftUnsupportedFields()
    if (unsupportedFields.length > 0) {
      message.error(`当前 dae ${capabilities.value?.version || '版本'} 不支持：${unsupportedFields.map((key) => DNS_FIELD_LABELS.get(key) || key).join('、')}`)
      return
    }
    const unsupportedRequestMatchers = draftUnsupportedMatchers()
    if (unsupportedRequestMatchers.length > 0) {
      message.error(`当前 dae 未确认支持 DNS 内部选择器：${unsupportedRequestMatchers.map((matcher) => `${matcher}()`).join('、')}`)
      return
    }
    try {
      body = buildDNSBody(simpleDraft.value)
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'DNS 配置格式不正确')
      return
    }
    if (!state.value.simpleSafe) {
      dialog.warning({
        title: '确认改用简单模式',
        content: '当前 DNS 含有简单模式无法表达的原文。继续会重建整个 dns 节，删除未知字段、注释和自定义写法；此操作只有保存配置后才会写入磁盘。',
        positiveText: '重建并应用',
        negativeText: '继续使用进阶模式',
        onPositiveClick: () => commitEditor(body),
        onNegativeClick: () => { editorTab.value = 'advanced' },
      })
      return
    }
  }
  commitEditor(body)
}

async function loadCapabilities() {
  try {
    capabilities.value = readDNSCapabilities(await getJSON<DaeOutline>('/api/v1/dae/outline'))
  } catch {
    capabilities.value = null
  } finally {
    capabilityChecked.value = true
  }
}

function summaryValue(value: string, fallback: string): string {
  return value || fallback
}

onMounted(() => void loadCapabilities())
</script>

<template>
  <NCard title="DNS 设置" class="panel-card dns-card" data-testid="dns-card">
    <template #header-extra>
      <NSpace size="small" align="center">
        <SectionVersionControls kind="dns" :body="state.body" @apply="applyVersion" />
        <NTag v-if="!state.simpleSafe" size="small" type="warning" :bordered="false">进阶配置</NTag>
        <NTag size="small" :bordered="false">{{ upstreamCount }} 个上游</NTag>
        <NTag size="small" :bordered="false">{{ requestCount + responseCount }} 条规则</NTag>
        <NButton size="small" secondary @click="openEditor">
          <template #icon><NIcon><OptionsOutline /></NIcon></template>编辑 DNS
        </NButton>
      </NSpace>
    </template>

    <NAlert v-if="unsupported.length > 0" type="error" :bordered="false" class="dns-card-alert">
      当前配置包含安装版本不支持的 DNS 字段：{{ unsupported.map((key) => DNS_FIELD_LABELS.get(key) || key).join('、') }}。请使用进阶模式保留原文，并在保存前确认当前 dae 版本。
    </NAlert>
    <NAlert v-if="unsupportedMatchers.length > 0" type="error" :bordered="false" class="dns-card-alert">
      当前 dae 未确认支持 DNS 内部选择器：{{ unsupportedMatchers.map((matcher) => `${matcher}()`).join('、') }}。已有原文保持不变；切换 dae 版本前会再次预检并阻止不兼容操作。
    </NAlert>

    <div v-if="!state.present" class="dns-not-configured">
      <div>
        <strong>尚未配置 DNS 节</strong>
        <NText depth="3">可以直接打开编辑器，使用 daed 风格的默认上游和请求分流。</NText>
      </div>
      <NButton size="small" quaternary @click="openEditor">
        <template #icon><NIcon><CreateOutline /></NIcon></template>开始配置
      </NButton>
    </div>
    <div class="dns-summary-grid">
      <div class="dns-summary-item">
        <NText depth="3">IP 偏好</NText>
        <strong>{{ summaryValue(state.draft.ipVersionPrefer, currentDefault('ipversion_prefer') || '跟随请求') }}</strong>
      </div>
      <div class="dns-summary-item">
        <NText depth="3">监听地址</NText>
        <strong class="mono dns-summary-value">{{ summaryValue(state.draft.bind, '未设置') }}</strong>
      </div>
      <div class="dns-summary-item">
        <NText depth="3">乐观缓存</NText>
        <strong>{{ state.draft.optimisticCache === null ? `默认${currentDefault('optimistic_cache') ? ` · ${currentDefault('optimistic_cache')}` : ''}` : state.draft.optimisticCache ? '启用' : '关闭' }}</strong>
      </div>
      <div class="dns-summary-item">
        <NText depth="3">DNS 路由</NText>
        <strong>{{ requestCount }} 请求 · {{ responseCount }} 响应</strong>
      </div>
    </div>

    <NModal v-model:show="editorVisible" preset="card" title="编辑 DNS" class="orchestrate-dns-modal" :mask-closable="false" data-testid="dns-editor-modal">
      <NTabs :value="editorTab" type="segment" @update:value="changeEditorTab">
        <NTabPane name="simple" tab="简单模式">
          <NAlert v-if="!state.simpleSafe" type="warning" :bordered="false" class="dns-template-warning">
            当前 DNS 使用了简单模式无法表达的内容。切换标签不会修改配置；只有点击“应用到配置”并再次确认后，才会重建 dns 节。
            <div class="dns-issue-detail">{{ state.issues.slice(0, 3).join('；') }}{{ state.issues.length > 3 ? '；还有更多内容' : '' }}</div>
          </NAlert>
          <NAlert v-if="!capabilityChecked" type="info" :bordered="false" class="dns-template-warning">
            正在读取当前 dae 的 DNS 字段能力，版本差异会在应用前再次校验。
          </NAlert>
          <NAlert v-if="draftUnsupportedFields().length > 0" type="error" :bordered="false" class="dns-template-warning">
            当前编辑内容包含安装版本不支持的字段，暂时不能应用简单模式。
          </NAlert>
          <NAlert v-if="draftUnsupportedMatchers().length > 0" type="error" :bordered="false" class="dns-template-warning">
            当前 dae 未确认支持 {{ draftUnsupportedMatchers().map((matcher) => `${matcher}()`).join('、') }}，暂时不能应用简单模式；进阶草稿不会受影响。
          </NAlert>

          <div class="dns-settings-grid">
            <label>
              <NText depth="3">IP 版本偏好</NText>
              <NSelect v-model:value="simpleDraft.ipVersionPrefer" :options="[{ label: '跟随请求（默认）', value: '' }, { label: '仅 IPv4', value: '4' }, { label: '仅 IPv6', value: '6' }]" :disabled="!capabilitySupports('ipversion_prefer')" />
            </label>
            <label>
              <NText depth="3">监听地址</NText>
              <NInput v-model:value="simpleDraft.bind" class="mono" placeholder="未设置；例如 tcp+udp://127.0.0.1:5353" :disabled="!capabilitySupports('bind')" />
            </label>
            <div class="dns-setting-toggle">
              <div>
                <strong>乐观缓存</strong>
                <NText depth="3">过期记录在后台刷新期间继续返回，减少等待。</NText>
              </div>
              <NSwitch :value="effectiveOptimisticCache()" :disabled="!capabilitySupports('optimistic_cache')" @update:value="simpleDraft.optimisticCache = $event" />
              <NButton text size="tiny" :disabled="simpleDraft.optimisticCache === null" @click="resetCacheField('optimisticCache')">恢复默认</NButton>
            </div>
            <label>
              <NText depth="3">乐观缓存过期窗口（秒）</NText>
              <NInputNumber v-model:value="simpleDraft.optimisticCacheTTL" :min="0" :placeholder="currentDefault('optimistic_cache_ttl') || '跟随当前版本默认'" :disabled="!capabilitySupports('optimistic_cache_ttl')" />
              <NButton text size="tiny" class="dns-reset-field" :disabled="simpleDraft.optimisticCacheTTL === null" @click="resetCacheField('optimisticCacheTTL')">恢复默认</NButton>
            </label>
            <label>
              <NText depth="3">最大缓存条目</NText>
              <NInputNumber v-model:value="simpleDraft.maxCacheSize" :min="0" :placeholder="currentDefault('max_cache_size') || '跟随当前版本默认；0 为不限制'" :disabled="!capabilitySupports('max_cache_size')" />
              <NButton text size="tiny" class="dns-reset-field" :disabled="simpleDraft.maxCacheSize === null" @click="resetCacheField('maxCacheSize')">恢复默认</NButton>
            </label>
          </div>

          <div class="dns-editor-stack">
            <section class="dns-editor-section" data-testid="dns-fixed-ttl-editor">
              <div class="dns-section-head">
                <div>
                  <strong>固定域名 TTL</strong>
                  <NText depth="3">为指定域名单独设置缓存时间，0 表示不缓存。</NText>
                </div>
                <NButton size="small" secondary :disabled="!capabilitySupports('fixed_domain_ttl')" @click="simpleDraft.fixedTTLs.push(newDNSFixedTTL())">
                  <template #icon><NIcon><AddOutline /></NIcon></template>添加
                </NButton>
              </div>
              <div v-if="simpleDraft.fixedTTLs.length === 0" class="orchestrate-empty dns-empty"><NText depth="3">未设置固定 TTL。</NText></div>
              <div v-else class="dns-fixed-ttl-list">
                <div v-for="(item, index) in simpleDraft.fixedTTLs" :key="item.id" class="dns-fixed-ttl-row">
                  <NInput v-model:value="item.domain" class="mono" placeholder="example.org" aria-label="固定 TTL 域名" />
                  <NInputNumber v-model:value="item.ttl" :min="0" placeholder="秒" aria-label="固定 TTL 秒数" />
                  <NButton quaternary circle type="error" title="删除固定 TTL" aria-label="删除固定 TTL" @click="simpleDraft.fixedTTLs.splice(index, 1)">
                    <template #icon><NIcon><TrashOutline /></NIcon></template>
                  </NButton>
                </div>
              </div>
            </section>
            <DNSUpstreamEditor v-model="simpleDraft.upstreams" />
            <DNSRulesEditor
              kind="request"
              v-model="simpleDraft.requestRules"
              :upstreams="simpleDraft.upstreams"
              :request-matchers="capabilities?.requestMatchers"
              :request-matchers-known="capabilities?.requestMatchersKnown === true"
            />
            <DNSRulesEditor kind="response" v-model="simpleDraft.responseRules" :upstreams="simpleDraft.upstreams" />
          </div>
        </NTabPane>
        <NTabPane name="advanced" tab="进阶模式">
          <NText depth="3">直接编辑 dns 节内部原文；保存时会完整保留自定义字段、写法和注释。</NText>
          <NInput v-model:value="advancedBody" type="textarea" class="mono dns-source-input" :rows="28" spellcheck="false" />
        </NTabPane>
      </NTabs>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="editorVisible = false">取消</NButton>
          <NButton type="primary" @click="applyEditor">应用到配置</NButton>
        </NSpace>
      </template>
    </NModal>
  </NCard>
</template>
