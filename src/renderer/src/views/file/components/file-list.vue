<template>
  <div class="file-list-content">
    <div ref="tableRef" class="table-box">
      <el-table
        :data="tableList"
        style="width: 100%"
        class="table"
        @row-contextmenu="openContextMenu"
      >
        <el-table-column width="150" prop="name" label="File Name" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="file-name" @dblclick="() => handleRowDbclick(row)">
              <i
                :class="{
                  'ri-folder-line ri-lg': row.type === 'dir',
                  'ri-file-line ri-lg': row.type === 'file',
                  'ri-link ri-lg': row.type === 'link'
                }"
              ></i>
              <span> {{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="110" prop="mode" label="Permissions" :align="'center'">
          <template #default="{ row }">
            {{ row.mode.slice(1) }}
          </template>
        </el-table-column>
        <el-table-column width="100" prop="owner" label="Owner" :align="'center'"></el-table-column>
        <el-table-column width="100" prop="size" label="Size" :align="'center'"></el-table-column>
        <el-table-column prop="mtime" label="Edit Time" :align="'center'">
          <template #default="{ row }">
            {{ row.mtime }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { i18n } from '@renderer/plugins/i18n'
import { setupFile } from '@renderer/composables/file'
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { useContextMenu } from '@renderer/components/context-menu'

type TableItem = FileStat & { checked: boolean }

// -------------------- P R O P S -------------------- //
const props = defineProps({
  fileList: {
    type: Array as PropType<FileStat[]>,
    default: [] as FileStat[]
  }
})

const emits = defineEmits(['dbclickFile', 'refresh'])

// -------------------- S T O R E -------------------- //
const { server_url } = storeToRefs(useConfigStore())

const { file_path } = setupFile()

// ----------------- C O N S T A N T ----------------- //

const tableRef = ref<HTMLLIElement>()

const tableList = ref<TableItem[]>([])

const preFilePath = ref('')

const targetItem = ref<TableItem>()

const isDeleteDisabled = computed(() => {
  return targetItem.value?.type === 'dir'
})

const contextMenu: ContextMenuItem[] = [
  {
    icon: 'ri-folder-line',
    label: i18n.global.t('context-menu.open'),
    action: () => {
      emits('dbclickFile', targetItem.value)
    }
  },
  {
    icon: 'ri-folder-line',
    label: i18n.global.t('context-menu.download'),
    action: async () => {
      const fullPath = file_path.value + '/' + targetItem.value?.name
      const content = await window.api.getFileContent(server_url.value, fullPath)
      const fileName = targetItem.value?.name || 'file'
      // 将内容转为blob 并下载
      const blob = new Blob([content])
      const a = document.createElement('a')
      a.download = fileName
      a.href = URL.createObjectURL(blob)
      a.click()
    }
  },
  {
    icon: 'ri-folder-line',
    label: i18n.global.t('context-menu.del'),
    action: async () => {
      const fullPath = file_path.value + '/' + targetItem.value?.name
      await window.api.delFile(server_url.value, fullPath)
      emits('refresh')
    }
  },
  {
    icon: 'ri-folder-line',
    label: i18n.global.t('context-menu.copy'),
    action: async () => {
      // 监听 ctrl + v
      preFilePath.value = file_path.value
      window.addEventListener('keydown', handleFileCopy)
    }
  }
]

const contextMenuBinding = reactive({
  menus: contextMenu,
  allowPropagation: true
})

// ------------------- C I R C L E ------------------- //

watch(
  () => props.fileList,
  (val) => {
    tableList.value = val.map((item) => {
      return {
        ...item,
        checked: false
      }
    })
  },
  {
    immediate: true
  }
)

onUnmounted(() => {
  window.removeEventListener('copy', handleFileCopy as any)
})

// ----------------- F U N C T I O N ----------------- //

const handleFileCopy = async (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'v') {
    const preFullPath = preFilePath.value + '/' + targetItem.value?.name
    const fullPath = file_path.value + '/' + targetItem.value?.name
    await window.api.copyFile(server_url.value, preFullPath, fullPath)
    emits('refresh')
  }
  window.removeEventListener('copy', handleFileCopy as any)
}

/**
 *  @description 双击文件
 *
 */
const handleRowDbclick = async (row: FileStat) => {
  emits('dbclickFile', row)
}

const openContextMenu = (row: TableItem, _: unknown, e: MouseEvent) => {
  // 触发菜单事件
  e.stopPropagation()
  targetItem.value = row
  contextMenu.forEach((item) => {
    if (item.label === i18n.global.t('context-menu.del')) {
      item.disabled = row.dir
    }
  })

  contextMenuBinding.menus = contextMenu
  useContextMenu(tableRef.value, contextMenuBinding, e)
}
</script>

<style lang="scss" scoped>
.file-list-content {
  position: relative;
  display: flex;
  flex-direction: column;
}

.table tbody {
  &::-webkit-scrollbar {
    display: none;
  }
}

.table-box {
  border: 1px solid var(--border-color);
  padding: var(--space-1x);
  background-color: var(--bg-color);
  border-radius: var(--radius-sm);

  .file-name {
    cursor: pointer;
    display: flex;
    gap: var(--space-sm);
    align-items: center;
  }
}
</style>
