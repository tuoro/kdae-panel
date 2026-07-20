<script setup lang="ts">
import { NTag, NText } from 'naive-ui'
import type { OutlineElement } from '../types/api'

defineProps<{
  node: OutlineElement
  depth?: number
}>()
</script>

<template>
  <div class="outline-node" :class="{ root: !depth }">
    <div class="outline-heading">
      <code>{{ node.mapping || node.name }}</code>
      <NTag v-if="node.required" size="tiny" type="error" :bordered="false">必填</NTag>
      <NTag v-if="node.isArray" size="tiny" type="info" :bordered="false">可重复</NTag>
      <NTag v-if="node.type" size="tiny" :bordered="false">{{ node.type }}</NTag>
    </div>
    <NText v-if="node.desc" depth="3" class="outline-description">{{ node.desc }}</NText>
    <div v-if="node.defaultValue" class="outline-default">默认值 <code>{{ node.defaultValue }}</code></div>
    <div v-if="node.structure?.length" class="outline-children">
      <OutlineNode v-for="child in node.structure" :key="`${child.mapping}-${child.name}`" :node="child" :depth="(depth || 0) + 1" />
    </div>
  </div>
</template>

