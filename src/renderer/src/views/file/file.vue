<template>
  <div class="main-content">
    <FileList
      v-model:file-path="file_path"
      :file-list="file_stat_list"
      :select-file-map="select_file_list"
      @dbclick-file="handleDbclickFile"
      @select-one="handleSelectOne"
      @select-all="handleSelectAll"
    ></FileList>
  </div>
</template>

<script setup lang="ts">
import FileList from './components/file-list.vue'

import { onMounted, ref } from 'vue'
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'

// -------------------- S T O R E -------------------- //
const { server_url } = storeToRefs(useConfigStore())

const file_stat_list = ref<FileStat[]>()

const file_path = ref<string>('/root/test1')

// const select_file_map = ref<Map<string, FileStat>>(new Map())
const select_file_list = ref<string[]>([])

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  getFileList()
})

// ----------------- F U N C T I O N ----------------- //
const getFileList = async () => {
  file_stat_list.value = (await window.api.getFileList(server_url.value, '/root/test1')).sort(
    (a, b) => {
      if (a.dir && !b.dir) {
        return -1
      } else if (!a.dir && b.dir) {
        return 1
      } else {
        return a.name.localeCompare(b.name)
      }
    }
  )
}

const handleDbclickFile = async (row: FileStat) => {
  if (!row.dir) {
    console.log('This is not a directory')
  } else {
    file_path.value = file_path.value + '/' + row.name
    file_stat_list.value = await window.api.getFileList(server_url.value, file_path.value)
  }
}

const handleSelectOne = (e: boolean, row: FileStat) => {
  if (e) {
    select_file_list.value.push(row.name)
  } else {
    select_file_list.value = select_file_list.value.filter((name) => name !== row.name)
  }
  // console.log(select_file_map.value)
}

const handleSelectAll = (e: boolean) => {
  if (file_stat_list.value) {
    if (e) {
      file_stat_list.value.forEach((row) => {
        select_file_list.value.push(row.name)
      })
    } else {
      select_file_list.value = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
