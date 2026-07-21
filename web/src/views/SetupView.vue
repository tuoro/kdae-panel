<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NAlert, NButton, NForm, NFormItem, NInput, NText, useMessage, type FormInst, type FormRules } from 'naive-ui'
import AuthShell from './AuthShell.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const message = useMessage()
const form = ref<FormInst | null>(null)
const loading = ref(false)
const model = reactive({ username: 'admin', password: '', confirmPassword: '', bootstrapToken: '' })
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['input', 'blur'] },
    { pattern: /^[A-Za-z0-9_-]{3,32}$/, message: '只能使用 3–32 位字母、数字、下划线和连字符', trigger: ['input', 'blur'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['input', 'blur'] },
    { min: 12, message: '密码至少需要 12 个字符', trigger: ['input', 'blur'] },
  ],
  confirmPassword: {
    validator: (_rule, value: string) => value === model.password,
    message: '两次输入的密码不一致',
    trigger: ['input', 'blur'],
  },
  bootstrapToken: {
    validator: (_rule, value: string) => !auth.bootstrapRequired || Boolean(value),
    message: '请输入服务日志中的 bootstrap token',
    trigger: ['input', 'blur'],
  },
}

async function submit() {
  await form.value?.validate()
  loading.value = true
  try {
    await auth.setup({ username: model.username, password: model.password, bootstrapToken: model.bootstrapToken })
    message.success('管理员账户创建成功')
    await router.replace({ name: 'dashboard' })
  } catch (error) {
    message.error(error instanceof Error ? error.message : '初始化失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthShell eyebrow="FIRST RUN" title="初始化 kdae-panel" description="创建唯一的本地管理员账户。完成后，初始化接口将永久关闭。">
    <div class="auth-form-heading">
      <h2>创建管理员</h2>
      <NText depth="3">密码使用 Argon2id 摘要保存，不会记录明文。</NText>
    </div>
    <NAlert type="warning" :bordered="false" class="setup-warning">
      首次初始化建议在本机完成；公开到网络前请先配置 HTTPS 与安全 Cookie。
    </NAlert>
    <NForm ref="form" :model="model" :rules="rules" size="large" @submit.prevent="submit">
      <NFormItem v-if="auth.bootstrapRequired" label="Bootstrap Token" path="bootstrapToken">
        <NInput v-model:value="model.bootstrapToken" type="password" autocomplete="off" placeholder="查看 kdae-panel 服务日志" />
      </NFormItem>
      <NFormItem label="管理员用户名" path="username">
        <NInput v-model:value="model.username" autocomplete="username" />
      </NFormItem>
      <NFormItem label="密码" path="password">
        <NInput v-model:value="model.password" type="password" show-password-on="click" autocomplete="new-password" placeholder="至少 12 个字符" />
      </NFormItem>
      <NFormItem label="确认密码" path="confirmPassword">
        <NInput v-model:value="model.confirmPassword" type="password" show-password-on="click" autocomplete="new-password" @keyup.enter="submit" />
      </NFormItem>
      <NButton type="primary" block attr-type="submit" :loading="loading">完成初始化</NButton>
    </NForm>
  </AuthShell>
</template>
