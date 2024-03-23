<template>
  <div class="main-content">
    <Editor
      v-if="isReady"
      v-model:value="editContent"
      :options="options"
      :file-tree="fileTree!"
      :path="dirPath"
      :handle-dir-click="handleClickDir"
      @update:file-tree="updateFileTree"
    ></Editor>
  </div>
</template>

<script setup lang="ts">
import Editor from '@renderer/components/editor/custom-editor.vue'

import { EditorOptions } from '@renderer/components/editor'
import { RowItem } from '@renderer/components/explorer'
import { onMounted, ref } from 'vue'
import * as monaco from 'monaco-editor'
import { dirComparer } from '@renderer/utils/file'

// ----------------- C O N S T A N T ----------------- //

const isReady = ref<boolean>(false) // 内容加载状态

const languages = monaco.languages.getLanguages() // 语言列表

const winHeight = ref<string>(window.innerHeight + 'px') // 窗口高度

const editContent = ref<string>('') // 编辑器内容

const options: EditorOptions = {
  theme: 'vs-dark',
  language: 'plaintext'
} // 编辑器配置

const file: RowItem = {
  name: 'Server-Monitor',
  open: true,
  children: [
    {
      name: 'src',
      open: true,
      children: [
        {
          name: 'main',
          open: true,
          children: [
            {
              name: 'index',
              open: true,
              children: [
                {
                  name: 'index.vue',
                  open: false,
                  children: []
                },
                {
                  name: 'dashboard.vue',
                  open: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: 'renderer',
          open: true,
          children: [
            {
              name: 'index',
              open: true,
              children: [
                {
                  name: 'index.vue',
                  open: false,
                  children: []
                },
                {
                  name: 'dashboard.vue',
                  open: false,
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: 'style.css',
          open: false,
          children: []
        }
      ]
    }
  ]
}

const fileTree = ref<RowItem>() // 文件树

const dirPath = ref<string>('') // 目录路径

const filePath = ref<string>('') // 文件路径

const serverUrl = ref<string>('') // 服务器地址

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  isReady.value = false
  await getFileData()
  await getFileContent()
  initLanguage()
  await getDirInfo()
  isReady.value = true
})

// ----------------- F U N C T I O N ----------------- //

const updateFileTree = (row: RowItem) => {
  fileTree.value = row
}

const handleClickDir = async (path: string) => {
  const res = (await window.api.getFileList(serverUrl.value, path))
    .sort((a, b) => dirComparer(a, b))
    .map((item) => {
      return {
        name: item.name,
        open: item.dir,
        children: [],
        vis: false
      } as RowItem
    })
  return res
}

const getDirInfo = async () => {
  dirPath.value = filePath.value.slice(0, filePath.value.lastIndexOf('/'))
  fileTree.value = {
    name: getNameFromPath(dirPath.value),
    open: true,
    vis: false,
    children: (await window.api.getFileList(serverUrl.value, dirPath.value))
      .sort((a, b) => dirComparer(a, b))
      .map((item) => {
        return {
          name: item.name,
          open: item.dir,
          children: [],
          vis: false
        } as RowItem
      })
  }
}

const getNameFromPath = (path) => {
  return path === '/' ? '/' : path.slice(path.lastIndexOf('/') + 1)
}

/**
 *  @description 获取文件相关信息
 *
 */
const getFileData = async () => {
  const data_str = await window.api.getFilePath()

  const data = JSON.parse(data_str)
  filePath.value = data.path
  serverUrl.value = data.serverUrl
}

/**
 *  @description 获取文件内容
 *
 */
const getFileContent = async () => {
  editContent.value = await window.api.getFileContent(serverUrl.value, filePath.value)
}

/**
 *  @description 初始化语言
 *
 */
const initLanguage = () => {
  options.language = getLanguagesForFile(filePath.value)?.id || 'plaintext'
}

/**
 *  @description 获取文件对应的语言
 *
 */
function getLanguagesForFile(file) {
  const ext = '.' + file.split('.').pop()
  return languages.find((lang) => lang.extensions && lang.extensions.includes(ext))
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.main-content {
  background-color: var(--bg-color);
  height: v-bind(winHeight);
  font-size: 14px;
}
</style>
