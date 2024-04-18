<!--
 * @Date: 2024-03-18 18:35:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 08:46:59
 * @FilePath: \Spirit-client\src\renderer\src\views\file\index.vue
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
    <div class="tool-bar">
      <div class="search-bar">
        <el-input
          v-model="file_filter"
          v-enter="() => search(gotoFirstPage)"
          style="width: 240px"
          :placeholder="i18n.global.t('file.placeholder.search-file')"
        ></el-input>
        <el-tooltip effect="dark" content="Search File" placement="top">
          <el-button text circle @click="() => search(gotoFirstPage)">
            <i class="ri-corner-down-left-fill ri-lg"></i>
          </el-button>
        </el-tooltip>
      </div>
      <div class="btn-groups">
        <el-tooltip effect="dark" :content="i18n.global.t('file.move-file')" placement="top">
          <el-button text circle @click="moveable = !moveable">
            <i
              class="ri-drag-move-2-fill ri-lg moveable"
              :class="{
                active: moveable
              }"
            ></i>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="i18n.global.t('file.upload-file')" placement="top">
          <UploadButton
            :server-url="server_url"
            :upload-path="file_path"
            @finished="() => handleRrefresh(gotoFirstPage)"
          ></UploadButton>
        </el-tooltip>
        <el-button @click="toggleUploadDrawer">btn</el-button>
      </div>
    </div>
    <div class="file-list-content">
      <FileList
        v-model:file-path="file_path"
        v-model:moveable="moveable"
        v-win-loading="loading"
        :file-list="paginationList ?? []"
        @dbclick-file="handleDbclickFile"
        @refresh="handleRrefresh"
      ></FileList>
      <div class="footer">
        <Pagination
          v-model:current-page="cur_page"
          :total="file_stat_list?.length ?? 0"
        ></Pagination>
      </div>
    </div>
    <UploadDrawer
      v-model:show="show_drawer"
      :server-url="server_url"
      :file-path="file_path"
      direction="rtl"
    ></UploadDrawer>
  </div>
</template>

<script setup lang="ts">
import ArrowRightIcon from '@renderer/components/icon/arrow-right.vue'
import Pagination from '@renderer/components/pagination/pagination-1.vue'
import UploadButton from '@renderer/components/upload/upload-button.vue'
import FileList from './components/file-list.vue'
import UploadDrawer from '@renderer/components/upload/upload-drawer.vue'

import { useServerInfoStore, usePersonalSettingStore } from '@renderer/store'
import { useFile } from './index'
import { i18n } from '@renderer/plugins/i18n'

// -------------------- S T O R E -------------------- //
const { server_url } = storeToRefs(useServerInfoStore())
const { win_size_setting } = storeToRefs(usePersonalSettingStore())

// ----------------- C O N S T A N T ----------------- //

const {
  file_filter,
  loading,
  file_path,
  file_stat_list,
  handleClickBreadcrumb,
  handleDbclickFile,
  search,
  handleRrefresh
} = useFile()

// 分页大小
const sizeMap = {
  small: 8,
  medium: 10,
  large: 12
}

// 文件是否可移动
const moveable = ref(false)

// 单页显示数量
const size = computed(() => {
  return sizeMap[win_size_setting.value || 'medium']
})

// 当前页
const cur_page = ref(0)

// 分页列表
const paginationList = computed(() => {
  return calcPagination(file_stat_list.value ?? [], cur_page.value, size.value)
})

// 面包屑列表
const breadcrumb_list = computed(() => calcBreadcrumbList(file_path.value))

const show_drawer = ref(false)

// ------------------- C I R C L E ------------------- //

watch(
  () => file_path.value,
  () => {
    gotoFirstPage()
  }
)

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  跳转到第一页
 * @param {*}
 * @return {*}
 */
const gotoFirstPage = () => {
  cur_page.value = 0
}

/**
 * @description:  计算分页列表
 * @param {*} fileList
 * @param {*} curPage
 * @return {*}
 */
const calcPagination = (fileList: FileStat[], curPage: number, size: number) => {
  const start = curPage * size
  const end = (curPage + 1) * size
  return fileList.slice(start, end)
}

/**
 * @description:  计算面包屑列表
 * @param {*} filePath
 * @return {*}
 */
const calcBreadcrumbList = (filePath) => {
  let res = [{ name: '/', path: '/' }]
  if (filePath != '/') {
    res = filePath
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
}

const toggleUploadDrawer = () => {
  show_drawer.value = !show_drawer.value
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

  .tool-bar {
    display: flex;
    justify-content: space-between;
    color: var(--font-color);
    padding: var(--space-sm);
    background-color: var(--bg-color);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-color);
    .btn-groups {
      display: flex;
      .moveable {
        &.active {
          color: #409eff;
        }
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
