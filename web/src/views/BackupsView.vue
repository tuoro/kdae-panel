<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { NAlert, NButton, NCard, NCheckbox, NDataTable, NDropdown, NEmpty, NIcon, NInput, NModal, NSpace, NSpin, NTag, NText, useDialog, useMessage, type DataTableColumns, type DataTableRowKey } from 'naive-ui'
import { CloudUploadOutline, CreateOutline, DownloadOutline, GitCompareOutline, PencilOutline, RefreshOutline, ReturnUpBackOutline, TrashOutline } from '@vicons/ionicons5'
import { deleteJSON, getDownload, getJSON, postForm, postJSON, putJSON } from '../api/client'
import type { ConfigBackup, ConfigBackupPreview, ConfigSaveResult } from '../types/api'
import { useMobileViewport } from '../composables/useMobileViewport'
import { formatBytes, formatDateTime, shortHash } from '../utils/format'

const message = useMessage()
const dialog = useDialog()
const mobile = useMobileViewport()
const loading = ref(true)
const restoring = ref('')
const deleting = ref('')
const batchDeleting = ref(false)
const exporting = ref('')
const importing = ref(false)
const importInput = ref<HTMLInputElement | null>(null)
const backups = ref<ConfigBackup[]>([])
const checkedRowKeys = ref<DataTableRowKey[]>([])
const editorVisible = ref(false)
const saving = ref(false)
const editingID = ref('')
const draftName = ref('')
const draftNote = ref('')
const previewVisible = ref(false)
const previewLoading = ref('')
const preview = ref<ConfigBackupPreview | null>(null)
const selectedIDs = computed(() => new Set(checkedRowKeys.value.map(String)))
const selectedCount = computed(() => selectedIDs.value.size)
const allBackupsSelected = computed(() => backups.value.length > 0
  && backups.value.every((backup) => selectedIDs.value.has(backup.id)))
const someBackupsSelected = computed(() => selectedCount.value > 0 && !allBackupsSelected.value)
const interactionBusy = computed(() => Boolean(
  loading.value || saving.value || restoring.value || deleting.value
  || batchDeleting.value || previewLoading.value || exporting.value || importing.value,
))

const columns: DataTableColumns<ConfigBackup> = [
  {
    type: 'selection',
    width: 46,
    fixed: 'left',
    disabled: () => interactionBusy.value,
  },
  {
    title: '名称',
    key: 'name',
    minWidth: 170,
    render: (row) => row.name || h(NText, { depth: 3 }, { default: () => '自动备份' }),
  },
  {
    title: '备注',
    key: 'note',
    minWidth: 220,
    ellipsis: { tooltip: true },
    render: (row) => row.note || h(NText, { depth: 3 }, { default: () => '—' }),
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 180,
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
    title: '区块版本',
    key: 'versions',
    minWidth: 150,
    render: (row) => `DNS ${row.dnsVersions || 0} · 路由 ${row.routingVersions || 0}`,
  },
  {
    title: '操作',
    key: 'actions',
    width: 376,
    fixed: 'right',
    render: (row) => h(
      NSpace,
      { size: 6, align: 'center', wrap: false },
      {
        default: () => [
          h(NButton, {
            size: 'small', secondary: true, title: '与当前配置对比',
            loading: previewLoading.value === row.id,
            disabled: interactionBusy.value,
            onClick: () => void openPreview(row),
          }, {
            icon: () => h(NIcon, null, { default: () => h(GitCompareOutline) }),
            default: () => '对比',
          }),
          h(NDropdown, {
            trigger: 'click',
            options: [
              { label: '完整配置包（.kdae）', key: 'package' },
              { label: '仅 dae 配置（.dae）', key: 'dae' },
            ],
            disabled: interactionBusy.value,
            onSelect: (format: string) => void exportBackup(row, format === 'dae'),
          }, {
            default: () => h(NButton, {
              size: 'small', secondary: true,
              loading: exporting.value === row.id,
              disabled: interactionBusy.value,
            }, {
              icon: () => h(NIcon, null, { default: () => h(DownloadOutline) }),
              default: () => '导出',
            }),
          }),
          h(NButton, {
            size: 'small', secondary: true, type: 'primary',
            loading: restoring.value === row.id,
            disabled: interactionBusy.value,
            onClick: () => void openPreview(row),
          }, {
            icon: () => h(NIcon, null, { default: () => h(ReturnUpBackOutline) }),
            default: () => '恢复',
          }),
          h(NButton, {
            size: 'small', quaternary: true, title: '编辑名称和备注',
            disabled: interactionBusy.value,
            onClick: () => openEditor(row),
          }, {
            icon: () => h(NIcon, null, { default: () => h(PencilOutline) }),
          }),
          h(NButton, {
            size: 'small', quaternary: true, type: 'error', title: '删除配置存档',
            loading: deleting.value === row.id,
            disabled: interactionBusy.value,
            onClick: () => confirmDelete(row),
          }, {
            icon: () => h(NIcon, null, { default: () => h(TrashOutline) }),
          }),
        ],
      },
    ),
  },
]

async function load() {
  loading.value = true
  try {
    const loaded = await getJSON<ConfigBackup[]>('/api/v1/config/backups')
    backups.value = loaded
    const available = new Set(loaded.map((backup) => backup.id))
    checkedRowKeys.value = checkedRowKeys.value.filter((id) => available.has(String(id)))
  } catch (error) {
    message.error(error instanceof Error ? error.message : '读取备份失败')
  } finally {
    loading.value = false
  }
}

async function exportBackup(backup: ConfigBackup, raw = false) {
  exporting.value = backup.id
  try {
    const suffix = raw ? '?format=dae' : ''
    const result = await getDownload(`/api/v1/config/backups/${encodeURIComponent(backup.id)}/export${suffix}`)
    const url = URL.createObjectURL(result.blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = result.filename
    anchor.click()
    URL.revokeObjectURL(url)
    message.success(raw ? 'dae 配置已导出' : '完整配置包已导出')
  } catch (error) {
    message.error(error instanceof Error ? error.message : '导出配置存档失败')
  } finally {
    exporting.value = ''
  }
}

function chooseImport() {
  importInput.value?.click()
}

async function importBackup(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  importing.value = true
  try {
    const payload = new FormData()
    payload.append('file', file)
    payload.append('name', file.name.replace(/\.(?:kdae|dae)$/i, ''))
    await postForm<ConfigBackup>('/api/v1/config/backups/import', payload)
    message.success('配置包已导入存档，确认差异后即可恢复')
    await load()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '导入配置包失败')
  } finally {
    importing.value = false
  }
}

function setBackupSelected(id: string, checked: boolean) {
  const selected = selectedIDs.value
  if (checked) selected.add(id)
  else selected.delete(id)
  checkedRowKeys.value = [...selected]
}

function setAllBackupsSelected(checked: boolean) {
  checkedRowKeys.value = checked ? backups.value.map((backup) => backup.id) : []
}

async function openPreview(backup: ConfigBackup) {
  previewLoading.value = backup.id
  try {
    preview.value = await getJSON<ConfigBackupPreview>(
      `/api/v1/config/backups/${encodeURIComponent(backup.id)}/preview`,
    )
    previewVisible.value = true
  } catch (error) {
    message.error(error instanceof Error ? error.message : '比较配置存档失败')
  } finally {
    previewLoading.value = ''
  }
}

function openEditor(backup?: ConfigBackup) {
  editingID.value = backup?.id || ''
  draftName.value = backup?.name || ''
  draftNote.value = backup?.note || ''
  editorVisible.value = true
}

async function saveMetadata() {
  saving.value = true
  try {
    if (editingID.value) {
      await putJSON<ConfigBackup>(`/api/v1/config/backups/${encodeURIComponent(editingID.value)}`, {
        name: draftName.value,
        note: draftNote.value,
      })
      message.success('配置存档信息已更新')
    } else {
      await postJSON<ConfigBackup>('/api/v1/config/backups', {
        name: draftName.value,
        note: draftNote.value,
      })
      message.success('当前配置已保存为存档')
    }
    editorVisible.value = false
    await load()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '保存配置存档失败')
  } finally {
    saving.value = false
  }
}

function confirmDelete(backup: ConfigBackup) {
  dialog.warning({
    title: '删除配置存档',
    content: `将删除“${backup.name || '自动备份'}”及其配置内容，删除后无法恢复。`,
    positiveText: '删除存档',
    negativeText: '取消',
    onPositiveClick: () => deleteBackup(backup),
  })
}

async function deleteBackup(backup: ConfigBackup) {
  deleting.value = backup.id
  try {
    await deleteJSON<void>(`/api/v1/config/backups/${encodeURIComponent(backup.id)}`, {})
    message.success('配置存档已删除')
    await load()
  } catch (error) {
    message.error(error instanceof Error ? error.message : '删除配置存档失败')
  } finally {
    deleting.value = ''
  }
}

function confirmBatchDelete() {
  const count = selectedCount.value
  if (!count) return
  dialog.warning({
    title: '批量删除配置存档',
    content: `将删除已选择的 ${count} 份配置存档及其配置内容，删除后无法恢复。`,
    positiveText: `删除 ${count} 份`,
    negativeText: '取消',
    onPositiveClick: deleteSelectedBackups,
  })
}

async function deleteSelectedBackups() {
  const ids = [...selectedIDs.value]
  if (!ids.length) return
  batchDeleting.value = true
  const deleted = new Set<string>()
  const failures: string[] = []
  try {
    for (const id of ids) {
      try {
        await deleteJSON<void>(`/api/v1/config/backups/${encodeURIComponent(id)}`, {})
        deleted.add(id)
      } catch (error) {
        failures.push(error instanceof Error ? error.message : `删除 ${id} 失败`)
      }
    }
  } finally {
    batchDeleting.value = false
  }
  backups.value = backups.value.filter((backup) => !deleted.has(backup.id))
  checkedRowKeys.value = ids.filter((id) => !deleted.has(id))

  if (!failures.length) {
    message.success(`已删除 ${deleted.size} 份配置存档`)
    return
  }
  message.error(
    `已删除 ${deleted.size} 份，${failures.length} 份失败；失败项已保留选中。${failures[0]}`,
  )
}

async function restore(preflight: ConfigBackupPreview) {
  const backup = preflight.backup
  restoring.value = backup.id
  try {
    const result = await postJSON<ConfigSaveResult>(`/api/v1/config/backups/${encodeURIComponent(backup.id)}/restore`, {
      expectedHash: preflight.currentHash,
      apply: true,
    })
    previewVisible.value = false
    message.success(result.deferred
      ? '配置已恢复；dae 当前未运行，下次启动时生效'
      : '配置已恢复并完成无损重载')
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
        <NText depth="3">保存当前配置或查看自动历史；恢复操作同样受并发摘要保护</NText>
      </div>
      <input ref="importInput" class="visually-hidden" type="file" accept=".kdae,.dae" @change="importBackup">
      <NSpace class="backup-toolbar-actions" :wrap="false">
        <NButton
          type="error"
          secondary
          :loading="batchDeleting"
          :disabled="!selectedCount || interactionBusy"
          @click="confirmBatchDelete"
        >
          <template #icon><NIcon><TrashOutline /></NIcon></template>
          {{ selectedCount ? `批量删除 (${selectedCount})` : '批量删除' }}
        </NButton>
        <NButton type="primary" secondary :disabled="interactionBusy" @click="openEditor()">
          <template #icon><NIcon><CreateOutline /></NIcon></template>保存当前配置
        </NButton>
        <NButton secondary :loading="importing" :disabled="interactionBusy" @click="chooseImport">
          <template #icon><NIcon><CloudUploadOutline /></NIcon></template>导入
        </NButton>
        <NButton
          class="backup-refresh-action"
          secondary
          title="刷新配置存档"
          aria-label="刷新配置存档"
          :loading="loading"
          :disabled="interactionBusy"
          @click="load"
        >
          <template #icon><NIcon><RefreshOutline /></NIcon></template>
          <span class="backup-refresh-label">刷新</span>
        </NButton>
      </NSpace>
    </div>
    <NCard content-style="padding: 0;">
      <NDataTable
        v-if="!mobile"
        :columns="columns"
        :data="backups"
        :loading="loading"
        :row-key="(row: ConfigBackup) => row.id"
        :checked-row-keys="checkedRowKeys"
        :scroll-x="1120"
        :bordered="false"
        @update:checked-row-keys="checkedRowKeys = $event"
      />
      <NSpin v-else :show="loading">
        <div v-if="backups.length" class="mobile-backup-content">
          <div class="mobile-backup-selection" data-testid="mobile-backup-selection">
            <NCheckbox
              :checked="allBackupsSelected"
              :indeterminate="someBackupsSelected"
              :disabled="interactionBusy"
              @update:checked="setAllBackupsSelected"
            >
              全选
            </NCheckbox>
            <NText depth="3">已选 {{ selectedCount }} / 共 {{ backups.length }} 项</NText>
          </div>
          <div class="mobile-record-list" data-testid="mobile-backup-list">
            <article v-for="backup in backups" :key="backup.id" class="mobile-record">
              <div class="mobile-record-head">
                <NCheckbox
                  :checked="selectedIDs.has(backup.id)"
                  :disabled="interactionBusy"
                  :aria-label="`选择${backup.name || '自动备份'}`"
                  @update:checked="setBackupSelected(backup.id, $event)"
                />
                <div class="mobile-record-title">{{ backup.name || '自动备份' }}</div>
                <NTag size="small" :bordered="false">{{ shortHash(backup.hash) }}</NTag>
              </div>
              <p v-if="backup.note" class="mobile-record-description">{{ backup.note }}</p>
              <div class="mobile-record-meta">
                <span>创建<strong>{{ formatDateTime(backup.createdAt) }}</strong></span>
                <span>大小<strong>{{ formatBytes(backup.size) }}</strong></span>
                <span>区块版本<strong>DNS {{ backup.dnsVersions || 0 }} · 路由 {{ backup.routingVersions || 0 }}</strong></span>
              </div>
              <div class="mobile-action-row backup-mobile-actions">
                <NButton
                  class="backup-action-text"
                  size="small"
                  secondary
                  type="primary"
                  :loading="restoring === backup.id"
                  :disabled="interactionBusy"
                  @click="openPreview(backup)"
                >
                  <template #icon><NIcon><ReturnUpBackOutline /></NIcon></template>恢复
                </NButton>
                <NButton
                  class="backup-action-text"
                  size="small"
                  secondary
                  :loading="previewLoading === backup.id"
                  :disabled="interactionBusy"
                  @click="openPreview(backup)"
                >
                  <template #icon><NIcon><GitCompareOutline /></NIcon></template>对比
                </NButton>
                <NButton
                  class="backup-action-text"
                  size="small"
                  secondary
                  :loading="exporting === backup.id"
                  :disabled="interactionBusy"
                  @click="exportBackup(backup)"
                >
                  <template #icon><NIcon><DownloadOutline /></NIcon></template>导出
                </NButton>
                <NButton
                  class="backup-action-icon"
                  size="small"
                  secondary
                  title="编辑配置存档"
                  :aria-label="`编辑${backup.name || '自动备份'}`"
                  :disabled="interactionBusy"
                  @click="openEditor(backup)"
                >
                  <template #icon><NIcon><PencilOutline /></NIcon></template>
                </NButton>
                <NButton
                  class="backup-action-icon"
                  size="small"
                  secondary
                  type="error"
                  title="删除配置存档"
                  :aria-label="`删除${backup.name || '自动备份'}`"
                  :loading="deleting === backup.id"
                  :disabled="interactionBusy"
                  @click="confirmDelete(backup)"
                >
                  <template #icon><NIcon><TrashOutline /></NIcon></template>
                </NButton>
              </div>
            </article>
          </div>
        </div>
        <NEmpty v-else description="还没有配置存档" class="mobile-empty" />
      </NSpin>
    </NCard>

    <NModal v-model:show="editorVisible" preset="card" :title="editingID ? '编辑配置存档' : '保存当前配置'" class="backup-editor-modal">
      <div class="backup-editor-form">
        <label>
          <NText>名称</NText>
          <NInput v-model:value="draftName" maxlength="80" show-count placeholder="例如：稳定线路" />
        </label>
        <label>
          <NText>备注</NText>
          <NInput v-model:value="draftNote" type="textarea" maxlength="500" show-count :autosize="{ minRows: 3, maxRows: 6 }" placeholder="记录这份配置的用途或适用场景" />
        </label>
      </div>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="editorVisible = false">取消</NButton>
          <NButton type="primary" :loading="saving" :disabled="!draftName.trim()" @click="saveMetadata">
            {{ editingID ? '保存修改' : '保存存档' }}
          </NButton>
        </NSpace>
      </template>
    </NModal>

    <NModal
      v-model:show="previewVisible"
      preset="card"
      :title="`配置差异 · ${preview?.backup.name || '自动备份'}`"
      class="backup-diff-modal"
    >
      <template v-if="preview">
        <NAlert v-if="!preview.valid" type="error" :bordered="false">
          这份存档无法通过当前 dae 的配置校验，不能恢复。
          <pre class="backup-validation-error">{{ preview.validationError }}</pre>
        </NAlert>
        <NAlert v-else-if="preview.same" type="success" :bordered="false">
          这份存档与当前配置及区块版本相同，无需恢复。
        </NAlert>
        <NAlert v-else-if="preview.configSame && !preview.versionsSame" type="info" :bordered="false">
          dae 配置内容相同，但 DNS 或路由版本不同；恢复会同步这份存档绑定的区块版本。
        </NAlert>
        <NAlert v-else-if="preview.diffTruncated" type="warning" :bordered="false">
          配置差异较大，下面只展示有边界的结果；目标配置仍已完整通过 dae 校验。
        </NAlert>
        <div v-if="!preview.configSame" class="backup-diff-legend">
          <span class="backup-diff-remove">− 当前配置删除</span>
          <span class="backup-diff-add">+ 存档配置加入</span>
        </div>
        <div v-if="!preview.configSame" class="backup-diff" role="region" aria-label="当前配置与存档配置差异">
          <div
            v-for="(line, index) in preview.diff"
            :key="`${index}:${line.kind}:${line.oldLine}:${line.newLine}`"
            class="backup-diff-line"
            :class="`backup-diff-${line.kind}`"
          >
            <template v-if="line.kind === 'skip'">
              <span class="backup-diff-skip-copy">{{ line.text }}（{{ line.skipCount }} 行）</span>
            </template>
            <template v-else>
              <span class="backup-diff-number">{{ line.oldLine || '' }}</span>
              <span class="backup-diff-number">{{ line.newLine || '' }}</span>
              <span class="backup-diff-mark">{{ line.kind === 'add' ? '+' : line.kind === 'remove' ? '−' : ' ' }}</span>
              <code>{{ line.text || ' ' }}</code>
            </template>
          </div>
        </div>
      </template>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="previewVisible = false">关闭</NButton>
          <NButton
            type="primary"
            :loading="Boolean(preview && restoring === preview.backup.id)"
            :disabled="!preview?.valid || preview.same"
            @click="preview && restore(preview)"
          >
            <template #icon><NIcon><ReturnUpBackOutline /></NIcon></template>恢复并重载
          </NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>
