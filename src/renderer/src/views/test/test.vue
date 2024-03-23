<template>
  <div></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted } from 'vue'

const languages = monaco.languages.getLanguages()

onMounted(() => {
  console.log(getLanguagesForFile('test.txt'))
})

function getLanguagesForFile(file) {
  const ext = '.' + file.split('.').pop()
  return languages.find((lang) => lang.extensions && lang.extensions.includes(ext))
}
</script>

<style lang="scss" scoped></style>
