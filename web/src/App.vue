<script setup lang="ts">
import { NCard, NConfigProvider, NLayout, NLayoutContent, NText, darkTheme } from 'naive-ui'
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NLayout class="page">
      <NLayoutContent content-style="min-height: 100vh; display: grid; place-items: center; padding: 24px;">
        <NCard class="welcome" title="kdae-panel" bordered>
          <NText depth="2">
            工程基线已经启动。后续里程碑将接入 dae 能力探测、配置事务、服务管理和完整管理界面。
          </NText>
        </NCard>
      </NLayoutContent>
    </NLayout>
  </NConfigProvider>
</template>

