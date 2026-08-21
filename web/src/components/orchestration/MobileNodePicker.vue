<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { NButton, NCheckbox, NDrawer, NDrawerContent, NEmpty, NInput, NSpace, NText } from 'naive-ui'

defineOptions({ inheritAttrs: false })

export interface MobileNodeOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue: string[]
  options: MobileNodeOption[]
  title?: string
  placeholder?: string
  disabled?: boolean
}>(), {
  title: '选择节点',
  placeholder: '选择节点',
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()
const attrs = useAttrs()
const visible = ref(false)
const keyword = ref('')
const selected = computed(() => new Set(props.modelValue))
const filteredOptions = computed(() => {
  const query = keyword.value.trim().toLocaleLowerCase()
  if (query === '') return props.options
  return props.options.filter((option) => `${option.label} ${option.description || ''}`
    .toLocaleLowerCase().includes(query))
})

function toggle(value: string, checked: boolean) {
  const next = new Set(props.modelValue)
  if (checked) next.add(value)
  else next.delete(value)
  emit('update:modelValue', [...next])
}

function selectVisible() {
  const next = new Set(props.modelValue)
  for (const option of filteredOptions.value) {
    if (!option.disabled) next.add(option.value)
  }
  emit('update:modelValue', [...next])
}

function clear() {
  emit('update:modelValue', [])
}
</script>

<template>
  <NButton
    v-bind="attrs"
    block
    secondary
    class="mobile-node-picker-trigger"
    :disabled="disabled"
    @click="visible = true"
  >
    {{ modelValue.length > 0 ? `已选择 ${modelValue.length} 个节点` : placeholder }}
  </NButton>

  <NDrawer v-model:show="visible" placement="bottom" height="86vh" class="mobile-node-picker-drawer">
    <NDrawerContent :title="title" closable :native-scrollbar="false">
      <div class="mobile-node-picker-toolbar">
        <NInput v-model:value="keyword" clearable placeholder="搜索节点名称、协议或地址" />
        <NSpace justify="space-between" align="center" size="small">
          <NText depth="3">{{ filteredOptions.length }} 个结果 · 已选 {{ modelValue.length }} 个</NText>
          <NSpace size="small">
            <NButton size="small" :disabled="filteredOptions.length === 0" @click="selectVisible">全选结果</NButton>
            <NButton size="small" :disabled="modelValue.length === 0" @click="clear">清空</NButton>
          </NSpace>
        </NSpace>
      </div>

      <NEmpty v-if="filteredOptions.length === 0" description="没有匹配的节点" class="mobile-node-picker-empty" />
      <div v-else class="mobile-node-picker-list">
        <label
          v-for="option in filteredOptions"
          :key="option.value"
          class="mobile-node-picker-option"
          :class="{ disabled: option.disabled }"
        >
          <NCheckbox
            :checked="selected.has(option.value)"
            :disabled="option.disabled"
            @update:checked="toggle(option.value, $event)"
          />
          <span class="mobile-node-picker-copy">
            <strong>{{ option.label }}</strong>
            <small v-if="option.description">{{ option.description }}</small>
          </span>
        </label>
      </div>

      <template #footer>
        <NButton type="primary" block @click="visible = false">完成</NButton>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
