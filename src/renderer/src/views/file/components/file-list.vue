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
    <el-dialog
      v-model="mkdirOrFileDialogVis"
      width="500"
      :show-close="false"
      top="40vh"
      @before-close="() => (newFolderOrFileName = '')"
    >
      <div v-enter="mkdirOrFile" class="mkdir-content">
        <el-input
          v-model="newFolderOrFileName"
          :placeholder="i18n.global.t('placeholder.' + mkType)"
        ></el-input>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useFileList } from './index'
import { i18n } from '@renderer/plugins/i18n'

const props = defineProps<{ fileList: FileStat[]; moveable: boolean }>()

const emits = defineEmits(['update:moveable', 'dbclickFile', 'refresh'])

// -------------------- S T O R E -------------------- //

const {
  tableRef,
  tableList,
  mkdirOrFileDialogVis,
  mkType,
  newFolderOrFileName,
  mkdirOrFile,
  handleRowDbclick,
  openContextMenu,
  removeFileMoveable,
  makeFileMoveable,
  handleFileCopy
} = useFileList({ emits })

// ------------------- C I R C L E ------------------- //

watch(
  () => props.fileList,
  (val) => {
    if (!val) return
    removeFileMoveable()
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

watch(
  () => props.moveable,
  (val) => {
    if (val) {
      makeFileMoveable()
    } else {
      removeFileMoveable()
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('keydown', handleFileCopy)
})
</script>

<style lang="scss" scoped>
.mkdir-content {
  padding: var(--space-1x);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

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
