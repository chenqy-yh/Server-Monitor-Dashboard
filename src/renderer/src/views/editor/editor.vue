<!--
 * @Date: 2024-03-23 00:16:02
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 14:37:44
 * @FilePath: \server-monitor\src\renderer\src\views\editor\editor.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <div ref="headerRef" class="header-bar">
      <div class="brand">
        <BrandIcon></BrandIcon>
        <span class="brand-title">{{ i18n.global.t('brand.name') }}</span>
      </div>
      <div class="tool-bar">
        <el-button text circle @click="_appMin">
          <i class="ri-subtract-line ri-2x"></i>
        </el-button>
        <el-button text circle @click="_fullScreen">
          <i class="ri-square-line ri-lg"></i>
        </el-button>
        <el-button text circle @click="_exit">
          <i class="ri-close-line ri-2x"></i>
        </el-button>
      </div>
    </div>
    <div class="editor-box">
      <Editor
        v-if="isReady && win_id"
        v-model:value="editContent"
        :options="options"
        :path="dirPath"
        :win-id="win_id"
        :height="body_height + 'vh'"
        :handle-dir-click="handleClickDir"
        @open-file="openFile"
      ></Editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from './components/editor/custom-editor.vue'
import BrandIcon from '@renderer/components/icon/brand.vue'

import { useHeader } from '@renderer/composables/header/header'
import { setupEditor, registerEditorStore } from './index'
import { i18n } from '@renderer/plugins/i18n'
import { computed, onMounted, ref, watch } from 'vue'

// ----------------- C O N S T A N T ----------------- //

const editorStore = setupEditor()

const {
  win_id,
  dirPath,
  editContent,
  options,
  isReady,
  winSize,
  handleClickDir,
  openFile,
  register
} = editorStore

const { installDrag, appMin, exit, fullScreen } = useHeader([1024, 768])

const headerRef = ref<HTMLElement>()

const body_height = ref(94)

const header_height = computed(() => {
  return 100 - body_height.value + 'vh'
})

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  if (!headerRef.value) return
  installDrag(headerRef.value)
})

const winIdWatcherStop = watch(
  () => win_id.value,
  async () => {
    await initEditorStore()
    winIdWatcherStop()
  }
)

// ----------------- F U N C T I O N ----------------- //

const initEditorStore = async () => {
  register((win_id) => {
    registerEditorStore(win_id, editorStore)
  })
}

/**
 * @description: 全屏
 * @param {*}
 * @return {*}
 */
const _fullScreen = () => {
  fullScreen(...winSize.value)
}

/**
 * @description: 最小化
 * @param {*}
 * @return {*}
 */
const _appMin = () => {
  appMin()
}

/**
 * @description: 退出
 * @param {*}
 * @return {*}
 */
const _exit = () => {
  exit()
}
</script>

<style lang="scss" scoped>
.main-content {
  --color: #181818;
  --border-color: #333;
  --font-color: #ccc;
  border: 1px solid var(--border-color);
  background-color: var(--color);
  height: 100vh;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-radius: var(--space-sm);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  .header-bar {
    background-color: var(--color);
    padding: var(--space-sm);
    font-size: var(--font-size-content);
    border-bottom: 1px solid var(--border-color);
    color: var(--font-color);
    display: flex;
    justify-content: space-between;
    height: v-bind(header_height);
    cursor: move;
    .brand {
      display: flex;
      gap: var(--space-md);
      align-items: center;
      .brand-title {
        font-size: var(--brand-font-size);
        font-weight: bold;
        font-family: 'josefin-sans', sans-serif;
        text-align: center;
      }
    }
    .tool-bar {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
