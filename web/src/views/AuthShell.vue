<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <main class="auth-page">
    <section class="auth-intro">
      <div class="brand-mark large">K</div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="auth-points">
        <span>动态跟随 dae 配置能力</span>
        <span>保存前校验与失败回滚</span>
        <span>固定命令白名单与本地会话</span>
      </div>
    </section>
    <section class="auth-card">
      <slot />
    </section>
  </main>
</template>

