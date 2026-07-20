<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  NAlert,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NIcon,
  NInput,
  NText,
  useMessage,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { DownloadOutline, KeyOutline } from '@vicons/ionicons5'
import { getJSON } from '../api/client'
import { useAuthStore } from '../stores/auth'
import { formatDateTime } from '../utils/format'

const auth = useAuthStore()
const message = useMessage()
const form = ref<FormInst | null>(null)
const passwordLoading = ref(false)
const dumpLoading = ref(false)
const model = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' })
const rules: FormRules = {
  currentPassword: { required: true, message: '请输入当前密码', trigger: ['input', 'blur'] },
  newPassword: [
    { required: true, message: '请输入新密码', trigger: ['input', 'blur'] },
    { min: 12, message: '新密码至少需要 12 个字符', trigger: ['input', 'blur'] },
  ],
  confirmPassword: {
    validator: (_rule, value: string) => value === model.newPassword,
    message: '两次输入的新密码不一致',
    trigger: ['input', 'blur'],
  },
}

async function changePassword() {
  await form.value?.validate()
  passwordLoading.value = true
  try {
    await auth.changePassword(model.currentPassword, model.newPassword)
    model.currentPassword = ''
    model.newPassword = ''
    model.confirmPassword = ''
    message.success('密码已修改，其他登录会话均已注销')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '修改密码失败')
  } finally {
    passwordLoading.value = false
  }
}

async function downloadSysdump() {
  dumpLoading.value = true
  try {
    const result = await getJSON<{ content: string }>('/api/v1/diagnostics/sysdump')
    const blob = new Blob([result.content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `dae-sysdump-${new Date().toISOString().replaceAll(':', '-')}.txt`
    link.click()
    URL.revokeObjectURL(url)
    message.success('诊断文件已生成')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '生成诊断文件失败')
  } finally {
    dumpLoading.value = false
  }
}
</script>

<template>
  <div class="page-stack settings-page">
    <div class="page-toolbar">
      <div>
        <h2>账户与诊断</h2>
        <NText depth="3">管理当前管理员凭据并导出 dae 系统诊断</NText>
      </div>
    </div>

    <NGrid responsive="screen" cols="1 l:2" :x-gap="16" :y-gap="16">
      <NGridItem>
        <NCard title="修改管理员密码" class="panel-card">
          <template #header-extra><NIcon size="20"><KeyOutline /></NIcon></template>
          <NAlert type="info" :bordered="false" class="settings-alert">
            修改成功后会注销该账户的所有旧会话，并为当前浏览器签发新会话。
          </NAlert>
          <NForm ref="form" :model="model" :rules="rules" label-placement="top" @submit.prevent="changePassword">
            <NFormItem label="当前密码" path="currentPassword">
              <NInput v-model:value="model.currentPassword" type="password" show-password-on="click" autocomplete="current-password" />
            </NFormItem>
            <NFormItem label="新密码" path="newPassword">
              <NInput v-model:value="model.newPassword" type="password" show-password-on="click" autocomplete="new-password" placeholder="至少 12 个字符" />
            </NFormItem>
            <NFormItem label="确认新密码" path="confirmPassword">
              <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" autocomplete="new-password" />
            </NFormItem>
            <NButton type="primary" attr-type="submit" :loading="passwordLoading">修改密码</NButton>
          </NForm>
        </NCard>
      </NGridItem>

      <NGridItem>
        <NCard title="账户信息" class="panel-card">
          <dl class="details-list">
            <div><dt>用户名</dt><dd>{{ auth.user?.username || '—' }}</dd></div>
            <div><dt>账户创建时间</dt><dd>{{ formatDateTime(auth.user?.createdAt) }}</dd></div>
            <div><dt>当前会话到期</dt><dd>{{ formatDateTime(auth.expiresAt) }}</dd></div>
          </dl>
        </NCard>
        <NCard title="系统诊断" class="panel-card settings-dump">
          <p class="panel-description">调用当前 dae 的 sysdump 命令生成诊断文本。文件可能包含接口、路由和系统环境信息，请谨慎分享。</p>
          <NButton secondary :loading="dumpLoading" @click="downloadSysdump">
            <template #icon><NIcon><DownloadOutline /></NIcon></template>导出 sysdump
          </NButton>
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>

