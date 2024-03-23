<template>
  <div class="main-content">
    <div class="path-list">
      <el-breadcrumb :separator-icon="ArrowRightIcon">
        <el-breadcrumb-item
          v-for="(item, i) in breadcrumb_list"
          :key="i"
          @click="() => handleClickBreadcrumb(item)"
        >
          <div class="path-item" :class="{ 'last-child': i === breadcrumb_list.length - 1 }">
            {{ item.name }}
          </div>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="file-list-content">
      <FileList
        v-model:file-path="file_path"
        v-loading="loading"
        :file-list="file_stat_list"
        :select-file-map="select_file_list"
        @dbclick-file="handleDbclickFile"
      ></FileList>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileList from './components/file-list.vue'
import ArrowRightIcon from '@renderer/components/icon/arrow-right.vue'

import { useConfigStore } from '@renderer/store'
import { editorWinOptions } from '@renderer/utils/windows'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { solveNextPath, dirComparer } from '@renderer/utils/file'

type BreadcrumbItem = {
  path: string
  name: string
}

// -------------------- S T O R E -------------------- //
const { server_url } = storeToRefs(useConfigStore()) // 服务器地址

const file_stat_list = ref<FileStat[]>() // 文件列表

const file_path = ref<string>('/root') // 文件路径

const loading = ref<boolean>(false) // 加载状态

/**
 *  @description 面包屑列表
 *
 */
const breadcrumb_list = computed(() => {
  let res = [{ name: '/', path: '/' }]
  if (file_path.value != '/') {
    res = file_path.value
      .slice(1)
      .split('/')
      .reduce((acc, cur, i) => {
        return [
          ...acc,
          {
            path: acc[i].path + (i ? '/' : '') + cur,
            name: cur
          }
        ]
      }, res)
  }
  return res
})

const select_file_list = ref<string[]>([]) // 选择的文件列表

const chooseEditFilePath = ref<string>('') // 选择编辑的文件路径
// ------------------- C I R C L E ------------------- //
onMounted(() => {
  getFileList()
  intiFilePathListener()
})

// ----------------- F U N C T I O N ----------------- //

/**
 *  @description 点击面包屑 访问文件
 *
 */
const handleClickBreadcrumb = async (item: BreadcrumbItem) => {
  file_path.value = item.path
  await getFileList()
}

/**
 * @description 初始化文件路径监听
 *
 */
const intiFilePathListener = async () => {
  window.api.onResponse(() => {
    const data = {
      path: chooseEditFilePath.value,
      serverUrl: server_url.value
    }
    console.log('emitFilePath:', data)
    window.api.emitFilePath(JSON.stringify(data))
  })
}

/**
 *  @description 获得文件列表
 *
 */
const getFileList = async () => {
  try {
    loading.value = true
    file_stat_list.value = (await window.api.getFileList(server_url.value, file_path.value)).sort(
      (a, b) => dirComparer(a, b)
    )
  } finally {
    loading.value = false
  }
}

/**
 *  @description 双击文件
 *
 */
const handleDbclickFile = async (row: FileStat) => {
  if (!row.dir) {
    //TODO 根据文件后缀 判断是否是可读文件
    chooseEditFilePath.value = solveNextPath(file_path.value, row.name)
    // 选择文件后打开编辑器
    window.api.openWindow(editorWinOptions, 'editor')
  } else {
    file_path.value = solveNextPath(file_path.value, row.name)
    await getFileList()
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1x);
  .path-list {
    background-color: var(--bg-color);
    padding: var(--space-md);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);

    .path-item {
      cursor: pointer;
      color: #409eff;
      font-size: 1rem;
      &:hover {
        text-decoration: underline;
      }
      &.last-child {
        color: #606266;
      }
    }
  }

  .file-list-content {
    background-color: var(--bg-color);
    padding: var(--space-md);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
  }
}
</style>
