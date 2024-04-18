<!--
 * @Date: 2024-03-19 14:38:10
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-17 17:26:53
 * @FilePath: \Spirit-client\src\renderer\src\views\editor\components\editor\editor.vue
 * @Description: True or False
-->
<template>
  <div ref="editContainer" class="code-editor"></div>
</template>

<script lang="ts" setup>
import './init'
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

watch(
  () => props.value,
  (value) => {
    const rawEditor = toRaw(monacoEditor.value)
    if (value !== rawEditor.getValue()) {
      monaco.editor.setModelLanguage(rawEditor.getModel(), props.options.language)
      rawEditor.setValue(value)
    }
  }
)

// ----------------- F U N C T I O N ----------------- //
const init = () => {
  monaco.editor.remeasureFonts()
  monacoEditor.value = monaco.editor.create(editContainer.value, {
    value: props.value,
    readOnly: false,
    language: props.options.language,
    theme: props.options.theme,
    selectOnLineNumbers: true, // 选择行号
    renderSideBySide: false, // 渲染侧边栏,
    fontSize: 15, // 只能设置为16,否则光标错位
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
  font-family: 'Consolas', 'Courier New', 'monospace';
}
</style>
