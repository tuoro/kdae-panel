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
    </section>
    <section class="auth-card">
      <slot />
    </section>
  </main>
</template>
