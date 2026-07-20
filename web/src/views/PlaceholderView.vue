<script setup lang="ts">
import { useRoute } from 'vue-router'
import { NCard, NEmpty } from 'naive-ui'

const route = useRoute()
</script>

<template>
  <NCard>
    <NEmpty :description="`${String(route.meta.title || '')}页面正在接入后端 API`" />
  </NCard>
</template>

