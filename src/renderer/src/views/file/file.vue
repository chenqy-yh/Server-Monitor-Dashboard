<!--
 * @Date: 2024-03-18 18:35:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 23:35:05
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
        :file-list="file_stat_list"
        :select-file-map="select_file_list"
        @dbclick-file="handleDbclickFile"
      ></FileList>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@renderer/components/icon/arrow-right.vue'
import FileList from './components/file-list.vue'

import { setupFile } from '@renderer/composables/file'

const {
  file_stat_list,
  file_path,
  loading,
  breadcrumb_list,
  select_file_list,
  handleClickBreadcrumb,
  handleDbclickFile
} = setupFile()
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
  }
}
</style>
