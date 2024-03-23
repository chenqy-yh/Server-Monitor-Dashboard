<template>
  <ResizeLayout @resize="onResize">
    <template #left>
      <Explorer
        ref="explorerRef"
        :path="path"
        :tree="fileTree"
        :handle-click-dir="handleDirClick"
        @update:tree="updateFileTree"
      ></Explorer>
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
import Explorer from '../explorer/explorer.vue'
import Editor from './editor.vue'

import { ref, toRaw, watch } from 'vue'
import { EditorOptions } from '.'
import { RowItem } from '../explorer'

// -------------------- P R O P S -------------------- //
const props = defineProps<{
  value: string
  fileTree: RowItem
  path: string
  options: EditorOptions
  handleDirClick: (path: string) => Promise<RowItem[]>
}>()

const emits = defineEmits(['update:value', 'update:fileTree', 'input'])

// ----------------- C O N S T A N T ----------------- //

const explorerRef = ref<HTMLElement>()

const editorRef = ref<HTMLElement>()

const editorValue = ref(props.value)

// ------------------- C I R C L E ------------------- //
watch(
  () => props.value,
  (value) => {
    editorValue.value = value
  }
)

// ----------------- F U N C T I O N ----------------- //

const updateFileTree = (tree: RowItem) => {
  emits('update:fileTree', tree)
}

const onInput = (value) => {
  emits('update:value', value)
  emits('input', value)
}

const onResize = () => {
  toRaw((editorRef.value as any).editor).layout()
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
  overflow-x: hidden;
  .editor-container {
    height: 100%;
  }
}
</style>
