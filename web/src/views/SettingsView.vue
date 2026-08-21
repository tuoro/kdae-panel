<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
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
  NSelect,
  NSpace,
  NSwitch,
  NTag,
  NText,
  useDialog,
  useMessage,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { DownloadOutline, KeyOutline, LogoGithub, RefreshOutline, TrashOutline } from '@vicons/ionicons5'
import { deleteJSON, getDownload, getJSON, postJSON, putJSON } from '../api/client'
import type { GitHubCredentialStatus, PanelUpdatePayload, PanelUpdateStatus } from '../types/api'
import PanelUpdateAction from '../components/PanelUpdateAction.vue'
import { useAuthStore } from '../stores/auth'
import { formatDateTime } from '../utils/format'

const auth = useAuthStore()
const message = useMessage()
const dialog = useDialog()
const form = ref<FormInst | null>(null)
const passwordLoading = ref(false)
const dumpLoading = ref(false)
const updateLoading = ref(true)
const updateChecking = ref(false)
const updateSaving = ref(false)
const updateChannelVisible = ref(false)
let updateChannelClicks = 0
let updateChannelClickTimer: ReturnType<typeof setTimeout> | undefined
const panelUpdate = ref<PanelUpdatePayload | null>(null)
const updateError = ref('')
const githubStatus = ref<GitHubCredentialStatus | null>(null)
const githubToken = ref('')
const githubLoading = ref(true)
const githubSaving = ref(false)
const githubError = ref('')
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
    const result = await getDownload('/api/v1/diagnostics/sysdump')
    const url = URL.createObjectURL(result.blob)
    const link = document.createElement('a')
    link.href = url
    link.download = result.filename
    link.click()
    URL.revokeObjectURL(url)
    message.success('诊断归档已生成')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '生成诊断文件失败')
  } finally {
    dumpLoading.value = false
  }
}

async function loadPanelUpdate() {
  try {
    panelUpdate.value = await getJSON<PanelUpdatePayload>('/api/v1/panel/update')
    updateError.value = ''
  } catch (error) {
    updateError.value = error instanceof Error ? error.message : '读取面板更新设置失败'
  } finally {
    updateLoading.value = false
  }
}

async function checkPanelUpdate() {
  updateChecking.value = true
  try {
    panelUpdate.value = await postJSON<PanelUpdatePayload>('/api/v1/panel/update/check')
    updateError.value = ''
    const check = panelUpdate.value.check
    if (check.error) {
      message.warning(`检查失败：${check.error}`)
    } else if (check.updateAvailable) {
      message.success(`发现新版本 ${check.latest}`)
    } else {
      message.success('当前已经是最新版本')
    }
  } catch (error) {
    updateError.value = error instanceof Error ? error.message : '检查面板更新失败'
  } finally {
    updateChecking.value = false
  }
}

async function setSelfUpdate(enabled: boolean) {
  const previous = panelUpdate.value?.status?.enabled
  if (panelUpdate.value?.status) panelUpdate.value.status.enabled = enabled
  updateSaving.value = true
  try {
    const payload = await putJSON<{ status: PanelUpdateStatus }>('/api/v1/panel/update/preference', { enabled })
    if (panelUpdate.value) panelUpdate.value.status = payload.status
    window.dispatchEvent(new CustomEvent('kdae-panel:self-update-changed', { detail: payload.status }))
    message.success(enabled ? '已开启面板一键升级' : '已关闭面板一键升级')
  } catch (error) {
    if (panelUpdate.value?.status && previous !== undefined) panelUpdate.value.status.enabled = previous
    message.error(error instanceof Error ? error.message : '保存面板更新设置失败')
  } finally {
    updateSaving.value = false
  }
}

function revealUpdateChannel() {
  if (updateChannelVisible.value) return
  updateChannelClicks++
  clearTimeout(updateChannelClickTimer)
  updateChannelClickTimer = setTimeout(() => { updateChannelClicks = 0 }, 3000)
  if (updateChannelClicks < 5) return
  updateChannelVisible.value = true
  updateChannelClicks = 0
  message.info('已显示测试更新通道')
}

async function setUpdateChannel(channel: 'stable' | 'preview') {
  if (!panelUpdate.value?.status || panelUpdate.value.status.channel === channel) return
  const previous = panelUpdate.value.status.channel
  panelUpdate.value.status.channel = channel
  updateSaving.value = true
  try {
    const payload = await putJSON<{ status: PanelUpdateStatus }>('/api/v1/panel/update/preference', { channel })
    panelUpdate.value.status = payload.status
    window.dispatchEvent(new CustomEvent('kdae-panel:self-update-changed', { detail: payload.status }))
    message.success(channel === 'preview' ? '已切换到预发布通道' : '已切换到稳定通道')
    await checkPanelUpdate()
  } catch (error) {
    if (panelUpdate.value?.status) panelUpdate.value.status.channel = previous
    message.error(error instanceof Error ? error.message : '保存面板更新通道失败')
  } finally {
    updateSaving.value = false
  }
}

function applyPanelUpdateStatus(status: PanelUpdateStatus) {
  if (panelUpdate.value) panelUpdate.value.status = status
}

async function loadGitHubStatus() {
  try {
    const payload = await getJSON<{ status: GitHubCredentialStatus }>('/api/v1/settings/github')
    githubStatus.value = payload.status
    githubError.value = ''
  } catch (error) {
    githubError.value = error instanceof Error ? error.message : '读取 GitHub API 设置失败'
  } finally {
    githubLoading.value = false
  }
}

async function saveGitHubToken() {
  if (!githubToken.value.trim()) {
    message.warning('请填写 GitHub Token')
    return
  }
  githubSaving.value = true
  try {
    const payload = await putJSON<{ status: GitHubCredentialStatus }>('/api/v1/settings/github', {
      token: githubToken.value,
    })
    githubStatus.value = payload.status
    githubToken.value = ''
    githubError.value = ''
    message.success('GitHub Token 已保存并立即生效')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存 GitHub Token 失败')
  } finally {
    githubSaving.value = false
  }
}

function confirmClearGitHubToken() {
  dialog.warning({
    title: '清除 GitHub Token',
    content: '清除后将恢复匿名 API 额度；版本列表、首次安装和 kdae 构建解析可能再次受每小时 60 次限制。',
    positiveText: '清除',
    negativeText: '取消',
    onPositiveClick: clearGitHubToken,
  })
}

async function clearGitHubToken() {
  githubSaving.value = true
  try {
    const payload = await deleteJSON<{ status: GitHubCredentialStatus }>('/api/v1/settings/github', {})
    githubStatus.value = payload.status
    githubToken.value = ''
    message.success('GitHub Token 已清除')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '清除 GitHub Token 失败')
  } finally {
    githubSaving.value = false
  }
}

onMounted(() => {
  void loadPanelUpdate()
  void loadGitHubStatus()
})
</script>

<template>
  <div class="page-stack settings-page">
    <div class="page-toolbar">
      <div>
        <h2>面板设置</h2>
        <NText depth="3">管理管理员凭据、面板更新与系统诊断</NText>
      </div>
    </div>

    <NGrid class="equal-height-grid" responsive="screen" cols="1 l:2" :x-gap="16" :y-gap="16">
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

      <NGridItem class="settings-column">
        <NCard title="账户信息" class="panel-card">
          <dl class="details-list">
            <div><dt>用户名</dt><dd>{{ auth.user?.username || '—' }}</dd></div>
            <div><dt>账户创建时间</dt><dd>{{ formatDateTime(auth.user?.createdAt) }}</dd></div>
            <div><dt>当前会话到期</dt><dd>{{ formatDateTime(auth.expiresAt) }}</dd></div>
          </dl>
        </NCard>
        <NCard title="系统诊断" class="panel-card settings-dump">
          <p class="panel-description">调用当前 dae 的 sysdump 命令生成 gzip 诊断归档。文件可能包含接口、路由和系统环境信息，请谨慎分享。</p>
          <NButton secondary :loading="dumpLoading" @click="downloadSysdump">
            <template #icon><NIcon><DownloadOutline /></NIcon></template>导出 sysdump
          </NButton>
        </NCard>
      </NGridItem>
    </NGrid>

    <NCard title="GitHub API" class="panel-card settings-github">
      <template #header-extra><NIcon size="20"><LogoGithub /></NIcon></template>
      <NAlert v-if="githubError" type="error" :bordered="false" class="card-alert">{{ githubError }}</NAlert>
      <template v-else>
        <div class="settings-github-heading">
          <div>
            <strong>版本发现与安装凭据</strong>
            <NText depth="3">
              匿名调用每个出口 IP 每小时仅 60 次；配置只读 Token 后通常提升到每用户每小时 5000 次。
            </NText>
          </div>
          <NTag :type="githubStatus?.configured ? 'success' : 'warning'" size="small" :bordered="false">
            {{ githubLoading ? '读取中' : githubStatus?.configured ? '已配置' : '匿名访问' }}
          </NTag>
        </div>

        <NAlert
          v-if="githubStatus?.source === 'environment'"
          type="info"
          :bordered="false"
          class="settings-github-note"
        >
          当前 Token 由 KDAE_PANEL_GITHUB_TOKEN 环境变量管理，请在部署配置中修改。
        </NAlert>
        <template v-else>
          <NText depth="3" class="settings-github-note">
            Token 以 0600 权限保存在服务器，保存后立即生效；面板不会读取后回显，也不会发送给下载站或 dae 子进程。
          </NText>
          <NSpace class="settings-github-actions" :wrap="true">
            <NInput
              v-model:value="githubToken"
              type="password"
              show-password-on="click"
              autocomplete="off"
              placeholder="github_pat_..."
              :disabled="githubLoading || githubSaving"
              @keyup.enter="saveGitHubToken"
            />
            <NButton type="primary" :loading="githubSaving" :disabled="githubLoading" @click="saveGitHubToken">
              保存 Token
            </NButton>
            <NButton
              v-if="githubStatus?.configured"
              type="error"
              secondary
              :disabled="githubSaving"
              @click="confirmClearGitHubToken"
            >
              <template #icon><NIcon><TrashOutline /></NIcon></template>清除
            </NButton>
          </NSpace>
        </template>
      </template>
    </NCard>

    <NCard title="面板更新" class="panel-card settings-update">
      <NAlert v-if="updateError" type="error" :bordered="false" class="card-alert">{{ updateError }}</NAlert>
      <template v-else>
        <div class="settings-toggle-row">
          <div>
            <strong>允许一键升级</strong>
            <NText depth="3">有新版本时可直接在当前页面或顶部提示中完成校验、备份、替换和重启。</NText>
          </div>
          <NSwitch
            :value="panelUpdate?.status?.enabled || false"
            :loading="updateLoading || updateSaving"
            :disabled="updateLoading || updateSaving || !panelUpdate?.status"
            aria-label="允许面板一键升级"
            @update:value="setSelfUpdate"
          />
        </div>

        <div
          v-if="updateChannelVisible || panelUpdate?.status?.channel === 'preview'"
          class="settings-toggle-row settings-update-channel"
        >
          <div>
            <strong>更新通道</strong>
            <NText depth="3">预发布通道用于测试候选版本，可能包含尚未验证完成的功能。</NText>
          </div>
          <NSelect
            :value="panelUpdate?.status?.channel || 'stable'"
            :options="[
              { label: '稳定版', value: 'stable' },
              { label: '预发布版（测试）', value: 'preview' },
            ]"
            :loading="updateSaving"
            :disabled="updateLoading || updateSaving || !panelUpdate?.status"
            aria-label="面板更新通道"
            @update:value="setUpdateChannel"
          />
        </div>

        <div class="settings-update-actions">
          <div class="settings-update-action-copy">
            <strong v-if="updateLoading">正在读取版本信息</strong>
            <strong v-else-if="panelUpdate?.check.updateAvailable">发现新版本 {{ panelUpdate.check.latest }}</strong>
            <strong v-else-if="panelUpdate?.check.latest">当前已是最新版本</strong>
            <strong v-else>尚未取得发布版本</strong>
            <NText depth="3">手动检查不会改变当前版本；升级会先校验并备份，再重启面板自身。</NText>
          </div>
          <div class="settings-update-buttons">
            <NButton
              size="small"
              secondary
              :loading="updateChecking"
              :disabled="updateLoading || updateChecking"
              @click="checkPanelUpdate"
            >
              <template #icon><NIcon><RefreshOutline /></NIcon></template>立即检查
            </NButton>
            <PanelUpdateAction
              v-if="panelUpdate?.check.updateAvailable"
              :payload="panelUpdate"
              :disabled="updateLoading || updateChecking"
              @status-change="applyPanelUpdateStatus"
            />
          </div>
        </div>

        <dl v-if="panelUpdate" class="details-list settings-update-details">
          <div><dt>当前版本</dt><dd class="mono" @click="revealUpdateChannel">{{ panelUpdate.check.current }}</dd></div>
          <div><dt>最新版本</dt><dd class="mono">{{ panelUpdate.check.latest || '暂未取得' }}</dd></div>
          <div><dt>运行平台</dt><dd class="mono">{{ panelUpdate.status?.platform || '—' }}</dd></div>
          <div><dt>上一版副本</dt><dd class="mono">{{ panelUpdate.status?.previousPath || '尚未生成' }}</dd></div>
        </dl>
        <NAlert
          v-if="panelUpdate?.status?.enabled && !panelUpdate.status.updatable && panelUpdate.status.problem"
          type="warning"
          :bordered="false"
          class="card-alert"
        >
          {{ panelUpdate.status.problem }}
        </NAlert>
      </template>
    </NCard>
  </div>
</template>
