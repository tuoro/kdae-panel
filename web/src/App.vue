<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NGlobalStyle, NMessageProvider, NNotificationProvider, darkTheme, zhCN, dateZhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
</script>

<template>
  <NConfigProvider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
    <NGlobalStyle />
    <NMessageProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <RouterView />
        </NNotificationProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

