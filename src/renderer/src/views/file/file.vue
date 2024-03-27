<!--
 * @Date: 2024-03-18 18:35:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-27 16:06:17
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
        :select-file-map="select_file_list"
        @dbclick-file="handleDbclickFile"
      ></FileList>
      <div class="footer">
        <Pagination
          ref="pagination_ref"
          v-model="cur_page"
          :btn-num="Math.min(total, 4)"
          :min-num="1"
          :max-num="total"
        ></Pagination>
        <!-- <Transition name="fade">
          <div v-if="select_file_list.length > 0" class="btn-groups">
            <el-button text circle>
              <i class="ri-cursor-fill"></i>
            </el-button>
            <el-button text circle>
              <i class="ri-clipboard-line"></i>
            </el-button>
            <el-button text circle>
              <i class="ri-scissors-cut-line"></i>
            </el-button>
            <el-button text circle>
              <i class="ri-font-family"></i>
            </el-button>
            <el-button text circle>
              <i class="ri-tools-line"></i>
            </el-button>
            <el-button text circle>
              <i class="ri-delete-bin-line"></i>
            </el-button>
          </div>
        </Transition> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@renderer/components/icon/arrow-right.vue'
import Pagination from '@renderer/components/pagination/pagination-1.vue'
import FileList from './components/file-list.vue'

import { setupFile } from '@renderer/composables/file'
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
// ----------------- C O N S T A N T ----------------- //

const { win_size_setting } = storeToRefs(useConfigStore())

const {
  loading,
  file_stat_list,
  file_path,
  select_file_list,
  handleClickBreadcrumb,
  handleDbclickFile
} = setupFile()

const sizeMpa = {
  small: 8,
  medium: 10,
  large: 12
}

const size = computed(() => {
  return sizeMpa[win_size_setting.value || 'medium']
})

const cur_page = ref(1)

const total = computed(() => Math.ceil((file_stat_list.value?.length ?? 0) / size.value))

const paginationList = computed(() => {
  const start = (cur_page.value - 1) * size.value
  const end = cur_page.value * size.value
  return file_stat_list.value?.slice(start, end)
})

// 面包屑列表
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
