<template>
  <div ref="editContainer" class="code-editor"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRaw } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { EditorOptions } from '.'

// @ts-ignore: worker
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (['css', 'scss', 'less'].includes(label)) {
      return new cssWorker()
    }
    if (['html', 'handlebars', 'razor'].includes(label)) {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  }
}

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
    language: 'javascript',
    theme: props.options.theme,
    selectOnLineNumbers: true, // 选择行号
    renderSideBySide: false // 渲染侧边栏
  })
}

const addValueChangeLister = () => {
  monacoEditor.value.onDidChangeModelContent(() => {
    const value = toRaw(monacoEditor.value).getValue() //给父组件实时返回最新文本
    emit('update:value', value)
  })
}
</script>
<style scoped>
.code-editor {
  width: 100%;
  height: 100%;
  /* min-height: 200px; */
}
</style>
