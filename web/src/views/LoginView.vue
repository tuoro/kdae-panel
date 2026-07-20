<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NButton, NForm, NFormItem, NInput, NText, useMessage, type FormInst, type FormRules } from 'naive-ui'
import AuthShell from './AuthShell.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const message = useMessage()
const form = ref<FormInst | null>(null)
const loading = ref(false)
const model = reactive({ username: '', password: '' })
const rules: FormRules = {
  username: { required: true, message: '请输入用户名', trigger: ['input', 'blur'] },
  password: { required: true, message: '请输入密码', trigger: ['input', 'blur'] },
}

async function submit() {
  await form.value?.validate()
  loading.value = true
  try {
    await auth.login(model)
    message.success('登录成功')
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.replace(redirect)
  } catch (error) {
    message.error(error instanceof Error ? error.message : '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthShell eyebrow="WELCOME BACK" title="登录管理面板" description="使用本机 SQLite 中的管理员账户进入 kdae-panel。">
    <div class="auth-form-heading">
      <h2>管理员登录</h2>
      <NText depth="3">会话令牌只保存在 HttpOnly Cookie 中。</NText>
    </div>
    <NForm ref="form" :model="model" :rules="rules" size="large" @submit.prevent="submit">
      <NFormItem label="用户名" path="username">
        <NInput v-model:value="model.username" autocomplete="username" placeholder="admin" />
      </NFormItem>
      <NFormItem label="密码" path="password">
        <NInput v-model:value="model.password" type="password" show-password-on="click" autocomplete="current-password" placeholder="输入管理员密码" @keyup.enter="submit" />
      </NFormItem>
      <NButton type="primary" block attr-type="submit" :loading="loading">登录</NButton>
    </NForm>
  </AuthShell>
</template>

