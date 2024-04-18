<!--
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 20:38:45
 * @FilePath: \Spirit-client\src\renderer\src\views\editor\components\explorer\explorer.vue
 * @Description: True or False
-->

<template>
  <div v-if="fileTree" ref="explorerRef" class="explorer">
    <div class="dir-name" @click="toggleOpenFolder">
      <i :class="fileTree.open ? openIcon : closeIcon"></i>
      <span>{{ fileTree.name }}</span>
    </div>
    <div v-if="fileTree.open" class="content">
      <ExplorerRow
        v-for="(file, i) in fileTree.children"
        :key="file.name"
        :loading="explorer_loading"
        :row="file"
        :path="path"
        :level="0"
        :last-child="file.dir && i === fileTree.children.length - 1"
        :mask-width="200"
        :win-id="winId"
        :handle-click-dir="handleClickDir"
        @update:row="(newRow) => updateRow(newRow, i)"
        @open-file="openFile"
        @upadte:loading="updateLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExplorerRow from './explorer-row.vue'

import { RowItem } from './index'
import { useEditor } from '../../index'

// -------------------- P R O P S -------------------- //

const props = defineProps<{
  path: string
  width: number
  winId: number
  handleClickDir: (path: string) => Promise<RowItem[]>
}>()

const emits = defineEmits(['open-file'])

// ----------------- C O N S T A N T ----------------- //

const { fileTree } = useEditor(props.winId)

const explorerRef = ref<HTMLElement>()

const openIcon = 'ri-arrow-down-s-line ri-lg'

const closeIcon = 'ri-arrow-right-s-line ri-lg'

const explorer_loading = ref(false)

// ----------------- F U N C T I O N ----------------- //

const updateLoading = (loading: boolean) => {
  explorer_loading.value = loading
}

const updateRow = (row: RowItem, index: number) => {
  fileTree.value && (fileTree.value.children[index] = row)
}

const toggleOpenFolder = () => {
  fileTree.value && (fileTree.value.open = !fileTree.value.open)
}

const openFile = (path: string) => {
  emits('open-file', path)
}
</script>

<style lang="scss" scoped>
.explorer {
  background-color: #181818;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: #333;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  .content {
    padding-left: 1.5rem;
    height: max-content;
  }

  .dir-name {
    height: 1.5rem;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-weight: 800;
    color: var(--editor-font-color);
    position: sticky;
    top: 0;
    background-color: #181818;
    z-index: 10;
    border-bottom: 1px solid #232323;
    padding-left: var(--space-sm);
  }
}
</style>
