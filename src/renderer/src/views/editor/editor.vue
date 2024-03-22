<template>
  <div class="main-content">
    <Editor v-model:value="editContent" :options="options" :file-tree="file" :path="''"></Editor>
  </div>
</template>

<script setup lang="ts">
import { EditorOptions } from '@renderer/components/editor'
import Editor from '@renderer/components/editor/custom-editor.vue'
import { RowItem } from '@renderer/components/explorer'
import { ref } from 'vue'

// ----------------- C O N S T A N T ----------------- //

const editContent = ref<string>('')

const options: EditorOptions = {
  language: 'javascript',
  theme: 'vs-dark'
}

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
</script>

<style lang="scss" scoped>
.main-content {
  background-color: var(--bg-color);
}
</style>
<!-- <template>
  <div>
    <Kid ref="kid"></Kid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Kid from './kid.vue'

const kid = ref(null)

onMounted(() => {
  console.log((kid.value as any).state)
})
</script>

<style lang="scss" scoped></style> -->
