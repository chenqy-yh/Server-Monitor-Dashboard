<!--
 * @Date: 2024-03-18 18:35:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 22:47:33
 * @FilePath: \server-monitor\src\renderer\src\views\file\file.vue
 * @Description: True or False
-->
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
        v-win-loading="loading"
        :file-list="paginationList"
        @dbclick-file="handleDbclickFile"
        @refresh="handleRrefresh"
      ></FileList>
      <div class="footer">
        <Pagination
          ref="pagination_ref"
          v-model="cur_page"
          :btn-num="Math.min(total, 4)"
          :min-num="1"
          :max-num="total"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@renderer/components/icon/arrow-right.vue'
import Pagination from '@renderer/components/pagination/pagination-1.vue'
import FileList from './components/file-list.vue'

import { setupFile } from '@renderer/composables/file'
import { watch } from 'vue'
// ----------------- C O N S T A N T ----------------- //

const {
  cur_page,
  total,
  breadcrumb_list,
  paginationList,
  loading,
  file_path,
  handleClickBreadcrumb,
  handleDbclickFile,
  getFileList
} = setupFile()

// ------------------- C I R C L E ------------------- //

watch(
  () => file_path.value,
  () => {
    setTimeout(() => {
      cur_page.value = 1
    }, 0)
  }
)

// ----------------- F U N C T I O N ----------------- //

const handleRrefresh = async () => {
  await getFileList(file_path.value)
  cur_page.value = 1
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1x);
  height: 100%;
  .path-list {
    background-color: var(--bg-color);
    padding: var(--space-md);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    overflow-x: auto;
    &::-webkit-scrollbar-track {
      border-color: transparent;
    }
    &::-webkit-scrollbar-corner {
      border-color: transparent;
    }
    .path-item {
      cursor: pointer;
      color: #409eff;
      font-size: 1rem;
      // 不允许换行
      white-space: nowrap;
      &:hover {
        text-decoration: underline;
      }
      &.last-child {
        color: #606266;
      }
    }
  }

  .file-list-content {
    flex-grow: 1;
    // align-items: center;
    display: flex;
    flex-direction: column;
    .footer {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
