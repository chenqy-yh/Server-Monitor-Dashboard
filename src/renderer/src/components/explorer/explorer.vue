<template>
  <div class="explorer">
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

defineProps<{ path: string; tree: RowItem }>()

// ----------------- C O N S T A N T ----------------- //

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

const toggleOpenFolder = () => {
  openFolder.value = !openFolder.value
}

const setActivePath = (path: string) => {
  explorer.path = path
  console.log('setActivePath:', path)
}
</script>

<style lang="scss" scoped>
.explorer {
  background-color: #181818;
  height: 100%;
  width: 200px;
  padding-left: 1rem;
  overflow-y: auto;
  transition: all 1s;

  &::-webkit-scrollbar {
    // behavior: smooth;
    scroll-behavior: unset;
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 0;

    transition: background-color 2s ease;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #363636;
    }
  }

  .dir-name {
    height: 1.5rem;
    margin-left: -1rem;
    font-size: 11px;
    display: flex;
    align-items: center;
    font-weight: 800;
    color: var(--font-color);
    position: sticky;
    top: 0;
    background-color: #181818;
    z-index: 10;
  }
}
</style>
