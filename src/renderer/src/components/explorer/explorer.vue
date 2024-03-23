<template>
  <div ref="explorerRef" class="explorer">
    <div class="dir-name" @click="toggleOpenFolder">
      <i :class="openFolder ? openIcon : closeIcon"></i>
      <span>{{ tree.name }}</span>
    </div>
    <div v-if="openFolder" class="content">
      <ExplorerRow
        v-for="(file, i) in tree.children"
        :key="file.name"
        :row="file"
        :path="path"
        :set-path="setActivePath"
        :explorer="explorer"
        :level="0"
        :last-child="file.open && i === tree.children.length - 1"
        :mask-width="explorerRef!.clientWidth"
        :handle-click-dir="handleClickDir"
        @update:row="(newRow) => updateRow(newRow, i)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ExplorerRow from './explorer-row.vue'
import { RowItem } from './index'
import { Explorer } from './explorer'
import { reactive, ref } from 'vue'

// -------------------- P R O P S -------------------- //

const props = defineProps<{
  path: string
  tree: RowItem
  handleClickDir: (path: string) => Promise<RowItem[]>
}>()

const emits = defineEmits(['update:tree'])

// ----------------- C O N S T A N T ----------------- //

const explorerRef = ref<HTMLElement>()

const openIcon = 'ri-arrow-down-s-line ri-lg'

const closeIcon = 'ri-arrow-right-s-line ri-lg'

const explorer = new Explorer()

const openFolder = ref(false)

const state = reactive({
  message: 'Hello, Vue 3!'
})

defineExpose({
  state
})

// ----------------- F U N C T I O N ----------------- //

const updateRow = (row: RowItem, index: number) => {
  const newRow = { ...props.tree }
  newRow.children[index] = row
  emits('update:tree', newRow)
}

const toggleOpenFolder = () => {
  openFolder.value = !openFolder.value
}

const setActivePath = (path: string) => {
  explorer.path = path
}
</script>

<style lang="scss" scoped>
.explorer {
  background-color: #181818;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .content {
    padding-left: 1.5rem;
    height: max-content;
    // border: 1px solid red;
  }

  .dir-name {
    height: 1.5rem;
    font-size: 11px;
    display: flex;
    align-items: center;
    font-weight: 800;
    color: var(--editor-font-color);
    position: sticky;
    top: 0;
    background-color: #181818;
    z-index: 10;
  }
}
</style>
