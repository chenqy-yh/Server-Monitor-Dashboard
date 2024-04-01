<!--
 * @Date: 2024-03-19 14:44:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 14:34:26
 * @FilePath: \server-monitor\src\renderer\src\views\editor\components\editor\custom-editor.vue
 * @Description: True or False
-->
<template>
  <ResizeLayout :height="height" @resize="onResize">
    <template #left>
      <Explorer
        ref="explorerRef"
        :path="path"
        :width="explorerWidth"
        :win-id="winId"
        :handle-click-dir="handleDirClick"
        @open-file="openFile"
      ></Explorer>
      <div class="test"></div>
    </template>
    <template #right>
      <Editor
        ref="editorRef"
        v-model:value="editorValue"
        :options="options"
        @update:value="onInput"
      ></Editor>
    </template>
  </ResizeLayout>
</template>

<script lang="ts" setup>
import ResizeLayout from '@renderer/components/resize/resize-layout.vue'
import Editor from './editor.vue'
import Explorer from '../explorer/explorer.vue'

import { onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import { EditorOptions } from '.'
import { RowItem } from '../explorer/index'

// -------------------- P R O P S -------------------- //
const props = defineProps<{
  value: string
  path: string
  options: EditorOptions
  winId: number
  height: string
  handleDirClick: (path: string) => Promise<RowItem[]>
}>()

const emits = defineEmits(['update:value', 'input', 'open-file', 'resize'])

// ----------------- C O N S T A N T ----------------- //

const explorerRef = ref<HTMLElement>()

const editorRef = ref<HTMLElement>()

const editorValue = ref(props.value)

const explorerWidth = ref(200)

// ------------------- C I R C L E ------------------- //
watch(
  () => props.value,
  (value) => {
    editorValue.value = value
  }
)

onMounted(() => {
  addResizeListener()
})

onUnmounted(() => {
  removeResizeListener()
})

// ----------------- F U N C T I O N ----------------- //

const openFile = (path: string) => {
  emits('open-file', path)
}

const onInput = (value) => {
  emits('update:value', value)
  emits('input', value)
}

const onResize = (leftLayoutWidth: number) => {
  toRaw((editorRef.value as any).editor).layout()
  explorerWidth.value = leftLayoutWidth
}

const handleResize = () => {
  toRaw((editorRef.value as any).editor).layout()
}

const addResizeListener = () => {
  window.addEventListener('resize', handleResize)
}

const removeResizeListener = () => {
  window.removeEventListener('resize', handleResize)
}
</script>

<style lang="scss" scoped></style>
