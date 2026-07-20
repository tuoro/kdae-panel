<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  NAvatar,
  NButton,
  NIcon,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider,
  NMenu,
  NText,
  useMessage,
  type MenuOption,
} from 'naive-ui'
import {
  ArchiveOutline,
  CodeSlashOutline,
  DocumentTextOutline,
  GridOutline,
  LogOutOutline,
  ReaderOutline,
  SettingsOutline,
} from '@vicons/ionicons5'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const message = useMessage()
const collapsed = ref(window.innerWidth < 900)

function menuLink(label: string, name: string, icon: typeof GridOutline): MenuOption {
  return {
    label: () => h(RouterLink, { to: { name } }, { default: () => label }),
    key: name,
    icon: () => h(NIcon, null, { default: () => h(icon) }),
  }
}

const menuOptions: MenuOption[] = [
  menuLink('运行概览', 'dashboard', GridOutline),
  menuLink('配置管理', 'config', DocumentTextOutline),
  menuLink('配置能力', 'schema', CodeSlashOutline),
  menuLink('运行日志', 'logs', ReaderOutline),
  menuLink('配置备份', 'backups', ArchiveOutline),
  menuLink('安全设置', 'settings', SettingsOutline),
]

const selectedKey = computed(() => String(route.name || 'dashboard'))
const title = computed(() => String(route.meta.title || 'kdae-panel'))

async function logout() {
  try {
    await auth.logout()
    await router.replace({ name: 'login' })
  } catch (error) {
    message.error(error instanceof Error ? error.message : '退出登录失败')
  }
}

function handleExpired() {
  auth.clearSession()
  void router.replace({ name: 'login' })
  message.warning('登录会话已过期，请重新登录')
}

function handleResize() {
  if (window.innerWidth < 900) collapsed.value = true
}

onMounted(() => {
  window.addEventListener('kdae-panel:auth-expired', handleExpired)
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('kdae-panel:auth-expired', handleExpired)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <NLayout has-sider class="app-shell">
    <NLayoutSider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="236"
      :collapsed="collapsed"
      show-trigger="bar"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="brand" :class="{ compact: collapsed }">
        <div class="brand-mark">K</div>
        <div v-if="!collapsed" class="brand-copy">
          <strong>kdae-panel</strong>
          <span>零侵入管理面板</span>
        </div>
      </div>
      <NMenu :value="selectedKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
    </NLayoutSider>

    <NLayout>
      <NLayoutHeader bordered class="app-header">
        <div>
          <NText depth="3" class="eyebrow">KDAE CONTROL PLANE</NText>
          <h1>{{ title }}</h1>
        </div>
        <div class="account">
          <NAvatar round size="small">{{ auth.user?.username?.slice(0, 1).toUpperCase() }}</NAvatar>
          <div class="account-copy">
            <strong>{{ auth.user?.username }}</strong>
            <span>管理员</span>
          </div>
          <NButton quaternary circle title="退出登录" @click="logout">
            <template #icon><NIcon><LogOutOutline /></NIcon></template>
          </NButton>
        </div>
      </NLayoutHeader>
      <NLayoutContent class="app-content" content-style="padding: 28px;">
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
