<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { NAlert, NButton, NCard, NIcon, NInput, NSkeleton, NSpace, NTag, NText, useMessage } from 'naive-ui'
import { RefreshOutline, SearchOutline } from '@vicons/ionicons5'
import OutlineNode from '../components/OutlineNode.vue'
import { getJSON } from '../api/client'
import type { DaeOutline, OutlineElement } from '../types/api'

const message = useMessage()
const loading = ref(true)
const outline = ref<DaeOutline | null>(null)
const errorMessage = ref('')
const search = ref('')

const sections = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return outline.value?.structure || []
  return (outline.value?.structure || []).map((section) => filterNode(section, query)).filter(Boolean) as OutlineElement[]
})

function filterNode(node: OutlineElement, query: string): OutlineElement | null {
  const ownText = [node.name, node.mapping, node.type, node.desc, node.defaultValue].filter(Boolean).join(' ').toLowerCase()
  const children = (node.structure || []).map((child) => filterNode(child, query)).filter(Boolean) as OutlineElement[]
  if (ownText.includes(query) || children.length > 0) return { ...node, structure: children }
  return null
}

async function load() {
  loading.value = true
  try {
    outline.value = await getJSON<DaeOutline>('/api/v1/dae/outline')
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '读取配置结构失败'
    message.error(errorMessage.value)
  } finally {
    loading.value = false
  }
}

onMounted(() => void load())
</script>

<template>
  <div class="page-stack schema-page">
    <div class="page-toolbar">
      <div>
        <h2>动态配置能力</h2>
        <NText depth="3">内容由当前安装版本执行 dae export outline 生成，不在面板内硬编码</NText>
      </div>
      <NButton secondary :loading="loading" @click="load">
        <template #icon><NIcon><RefreshOutline /></NIcon></template>重新探测
      </NButton>
    </div>

    <NAlert v-if="errorMessage" type="error">{{ errorMessage }}</NAlert>

    <NCard class="schema-summary" size="small">
      <NSpace justify="space-between" align="center" wrap>
        <div>
          <NText depth="3">结构版本</NText>
          <strong>{{ outline?.version || '—' }}</strong>
        </div>
        <NSpace size="small" wrap>
          <NTag v-for="leaf in outline?.leaves || []" :key="leaf" size="small" :bordered="false">{{ leaf }}</NTag>
        </NSpace>
      </NSpace>
    </NCard>

    <NInput v-model:value="search" clearable placeholder="搜索字段、类型、说明或默认值">
      <template #prefix><NIcon><SearchOutline /></NIcon></template>
    </NInput>

    <div v-if="loading" class="schema-loading">
      <NSkeleton v-for="index in 4" :key="index" text :repeat="3" />
    </div>
    <div v-else-if="sections.length" class="schema-sections">
      <OutlineNode v-for="section in sections" :key="`${section.mapping}-${section.name}`" :node="section" />
    </div>
    <NAlert v-else-if="!errorMessage" type="info">没有匹配的配置字段。</NAlert>
  </div>
</template>

