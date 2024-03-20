<template>
  <div class="main-content">
    <Explorer ref="explorerRef" :path="''" :tree="fileTree"></Explorer>
    <div class="editor-container">
      <Editor v-model:value="editorValue" :options="options" @update:value="onInput"></Editor>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Explorer from '../explorer/explorer.vue'
import Editor from './editor.vue'

import { ref } from 'vue'
import { RowItem } from '../explorer'
import { EditorOptions } from '.'

// -------------------- P R O P S -------------------- //
defineProps<{ value: string; fileTree: RowItem; path: string; options: EditorOptions }>()

const emits = defineEmits(['update:value', 'input'])

// ----------------- C O N S T A N T ----------------- //

const explorerRef = ref<HTMLElement>()

const editorValue = ref('//hello world !')

// ----------------- F U N C T I O N ----------------- //
const onInput = (value) => {
  emits('update:value', value)
  emits('input', value)
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
