<script setup lang="ts">
import { h, onMounted, ref } from 'vue'
import { NButton, NCard, NDataTable, NIcon, NTag, NText, useDialog, useMessage, type DataTableColumns } from 'naive-ui'
import { RefreshOutline, ReturnUpBackOutline } from '@vicons/ionicons5'
import { getJSON, postJSON } from '../api/client'
import type { ConfigBackup, ConfigDocument, ConfigSaveResult } from '../types/api'
import { formatBytes, formatDateTime, shortHash } from '../utils/format'

const message = useMessage()
const dialog = useDialog()
const loading = ref(true)
const restoring = ref('')
const backups = ref<ConfigBackup[]>([])

const columns: DataTableColumns<ConfigBackup> = [
  {
    title: '创建时间',
    key: 'createdAt',
    minWidth: 180,
    render: (row) => formatDateTime(row.createdAt),
  },
  {
    title: '内容摘要',
    key: 'hash',
    minWidth: 150,
    render: (row) => h(NTag, { size: 'small', bordered: false }, { default: () => shortHash(row.hash) }),
  },
  {
    title: '大小',
    key: 'size',
    width: 110,
    render: (row) => formatBytes(row.size),
  },
  {
    title: '备份编号',
    key: 'id',
    minWidth: 320,
    ellipsis: { tooltip: true },
  },
  {
    title: '操作',
    key: 'actions',
    width: 110,
    fixed: 'right',
    render: (row) => h(
      NButton,
      {
        size: 'small',
        secondary: true,
        type: 'primary',
        loading: restoring.value === row.id,
        onClick: () => confirmRestore(row),
      },
      {
        icon: () => h(NIcon, null, { default: () => h(ReturnUpBackOutline) }),
        default: () => '恢复',
      },
    ),
  },
]

async function load() {
  loading.value = true
  try {
    backups.value = await getJSON<ConfigBackup[]>('/api/v1/config/backups')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '读取备份失败')
  } finally {
    loading.value = false
  }
}

function confirmRestore(backup: ConfigBackup) {
  dialog.warning({
    title: '恢复配置备份',
    content: `将恢复 ${formatDateTime(backup.createdAt)} 的配置，并执行 dae reload。当前配置也会先生成新备份。`,
    positiveText: '恢复并重载',
    negativeText: '取消',
    onPositiveClick: () => restore(backup),
  })
}

async function restore(backup: ConfigBackup) {
  restoring.value = backup.id
  try {
    const current = await getJSON<ConfigDocument>('/api/v1/config')
    await postJSON<ConfigSaveResult>(`/api/v1/config/backups/${encodeURIComponent(backup.id)}/restore`, {
      expectedHash: current.hash,
      apply: true,
    })
    message.success('配置已恢复并完成无损重载')
    await load()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '恢复配置失败')
  } finally {
    restoring.value = ''
  }
}

onMounted(() => void load())
</script>

<template>
  <div class="page-stack backups-page">
    <div class="page-toolbar">
      <div>
        <h2>配置历史</h2>
        <NText depth="3">每次替换入口配置前自动创建只读历史，恢复操作同样受并发摘要保护</NText>
      </div>
      <NButton secondary :loading="loading" @click="load">
        <template #icon><NIcon><RefreshOutline /></NIcon></template>刷新
      </NButton>
    </div>
    <NCard content-style="padding: 0;">
      <NDataTable
        :columns="columns"
        :data="backups"
        :loading="loading"
        :row-key="(row: ConfigBackup) => row.id"
        :scroll-x="920"
        :bordered="false"
      />
    </NCard>
  </div>
</template>

