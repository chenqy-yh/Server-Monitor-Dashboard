<template>
  <div ref="editContainer" class="code-editor"></div>
</template>

<script lang="ts" setup>
import './init'
import { onMounted, ref, toRaw } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import { EditorOptions } from '.'

// -------------------- P R O P S -------------------- //
const props = defineProps<{ value: string; options: EditorOptions }>()
const emit = defineEmits(['update:value'])

// ----------------- C O N S T A N T ----------------- //
const monacoEditor = ref<monaco.editor.IStandaloneCodeEditor>()

const editContainer = ref<HTMLElement>()

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  init()
  addValueChangeLister()
})

// ----------------- F U N C T I O N ----------------- //
const init = () => {
  monacoEditor.value = monaco.editor.create(editContainer.value, {
    value: props.value,
    readOnly: false,
    language: props.options.language,
    theme: props.options.theme,
    selectOnLineNumbers: true, // 选择行号
    renderSideBySide: false, // 渲染侧边栏
    // 关闭缩略图
    minimap: {
      enabled: false
    }
  })
}

const addValueChangeLister = () => {
  monacoEditor.value.onDidChangeModelContent(() => {
    const value = toRaw(monacoEditor.value).getValue() //给父组件实时返回最新文本
    emit('update:value', value)
  })
}

// ------------ E X P O S E ------------ //
defineExpose({
  editor: monacoEditor
})
</script>
<style scoped>
.code-editor {
  width: 100%;
  height: 100%;
  /* min-height: 200px; */
}
</style>
