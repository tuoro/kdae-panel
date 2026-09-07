<script setup lang="ts">
import { ref } from 'vue'
import { NIcon } from 'naive-ui'
import { ChevronDownOutline } from '@vicons/ionicons5'

// 给"设一次就不动"的配置节用：全局设置与 DNS 默认收成一行摘要，把第一屏
// 让给节点、订阅、分组和路由这些真正常改的东西。展开后才显示卡片头的动作，
// 收起时它们既点不着也不该占位置。
defineProps<{
  title: string
  /** 收起时替代内容的一行摘要，必须说清里面有什么，否则用户不敢不展开。 */
  summary: string
  testid?: string
}>()

const open = ref(false)
</script>

<template>
  <section class="fold-card" :class="{ open }" :data-testid="testid">
    <div class="fold-card-head">
      <button type="button" class="fold-card-toggle" :aria-expanded="open" @click="open = !open">
        <strong>{{ title }}</strong>
        <span v-if="!open" class="fold-card-summary">{{ summary }}</span>
        <NIcon class="fold-card-chevron" :size="15"><ChevronDownOutline /></NIcon>
      </button>
      <div v-if="open" class="fold-card-actions"><slot name="actions" /></div>
    </div>
    <div v-if="open" class="fold-card-body"><slot /></div>
  </section>
</template>
