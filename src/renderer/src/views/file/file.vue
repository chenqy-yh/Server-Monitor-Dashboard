<!--
 * @Date: 2024-03-18 18:35:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 14:22:25
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
    <div class="tool-bar">
      <div class="search-bar">
        <el-input
          v-model="file_filter"
          v-enter="search"
          style="width: 240px"
          placeholder="Press Enter to Search Files"
        ></el-input>
        <el-tooltip effect="dark" content="Search File" placement="top">
          <el-button text circle @click="search">
            <i class="ri-corner-down-left-fill ri-lg"></i>
          </el-button>
        </el-tooltip>
      </div>
      <div class="btn-groups">
        <el-tooltip effect="dark" content="Move File" placement="top">
          <el-button text circle @click="moveable = !moveable">
            <i
              class="ri-drag-move-2-fill ri-lg moveable"
              :class="{
                active: moveable
              }"
            ></i>
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="Upload File" placement="top">
          <UploadButton
            :server-url="server_url"
            :upload-path="file_path"
            :upload-file-list="uploadFileList"
            @finished="handleRrefresh"
          ></UploadButton>
        </el-tooltip>
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
import UploadButton from '@renderer/components/upload/upload-button.vue'

// import { setupFile } from '@renderer/composables/file'
import { setupFile } from './index'
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { UploadRawFile } from 'element-plus'
import { ArrayBuffer } from 'spark-md5'

// -------------------- S T O R E -------------------- //
const { win_size_setting, server_url } = storeToRefs(useConfigStore())

// ----------------- C O N S T A N T ----------------- //

const {
  file_filter,
  loading,
  file_path,
  file_stat_list,
  handleClickBreadcrumb,
  handleDbclickFile,
  getFileList
} = setupFile()

// 分页大小
const sizeMpa = {
  small: 8,
  medium: 10,
  large: 12
}

// 文件是否可移动
const moveable = ref(false)

// 单页显示数量
const size = computed(() => {
  return sizeMpa[win_size_setting.value || 'medium']
})

// 当前页
const cur_page = ref(1)

// 总页数
const total = computed(() => Math.ceil((file_stat_list.value?.length ?? 0) / size.value))

// 分页列表
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

const uploadFileList = ref([])

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

const search = async () => {
  await getFileList(file_path.value, file_filter.value)
  cur_page.value = 1
}

const handleRrefresh = async () => {
  await getFileList(file_path.value)
  cur_page.value = 1
}

const handleUploadFile = async (rawFile: UploadRawFile) => {
  const file_chunk_list = createFileChunks(rawFile)
  const file_hash = await calcFileHash(file_chunk_list)
  console.log(file_hash)
}

const calcFileHash = async (fileChunkList: Blob[]) => {
  return new Promise((resolve) => {
    const spark = new ArrayBuffer()
    const identifiers = fileChunkList.map((chunk, index) => {
      if (index === 0 || index === fileChunkList.length - 1) {
        return chunk
      }
      return new Blob([
        chunk.slice(0, 2),
        chunk.slice(chunk.size / 2 - 1, chunk.size / 2 + 1),
        chunk.slice(chunk.size - 2, chunk.size)
      ])
    })
    if (identifiers.length === 0) {
      return resolve('')
    }
    const reader = new FileReader()
    reader.readAsArrayBuffer(new Blob(identifiers))
    reader.onload = (e: Event) => {
      spark.append((e.target as any).result)
      resolve(spark.end())
    }
  })
}

const createFileChunks = (file: UploadRawFile) => {
  const CHUNK_SIZE = 1024 * 1024 * 0.5 // 0.5MB
  const file_chunk_list: Blob[] = []
  let cur = 0
  while (cur < file.size) {
    file_chunk_list.push(file.slice(cur, cur + CHUNK_SIZE))
    cur += CHUNK_SIZE
  }
  return file_chunk_list
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
