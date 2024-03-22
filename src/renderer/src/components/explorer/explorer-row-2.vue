<template>
  <div
    class="row-container"
    :class="{
      active: isActive
    }"
  >
    <div
      class="explorer-row"
      :class="{
        active: isActive,
        lastChild: lastChild
      }"
      @click.prevent="() => setActivePath(selfPath)"
    >
      <i
        :class="{
          'ri-arrow-right-s-line ri-lg': row.open,
          'opcaity-0': !row.open
        }"
      ></i>
      <img class="file-type-icon" :src="imgHelper.getImg(fileType)" />
      <span>{{ row.name }}</span>
    </div>
    <div v-if="open" class="children-row">
      <explorer-row-2
        v-for="(item, i) in row.children"
        :key="i"
        :row="item"
        :path="selfPath"
        :set-path="setChildrenActivePath"
        :explorer="explorer"
        :level="level + 1"
        :last-child="row.open && i === row.children.length - 1"
      ></explorer-row-2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imgHelper } from '@renderer/utils/img'
import { computed, ref } from 'vue'
import { RowItem } from '.'
import { Explorer } from './explorer'

const props = defineProps<{
  row: RowItem
  lastChild: boolean
  level: number
  path: string
  explorer: Explorer
  setPath: (path: string) => void
}>()

// -------------------- P R O P S -------------------- //

const open = ref(false)

// ----------------- C O N S T A N T ----------------- //
const selfPath = computed(() => props.path + '/' + props.row.name)

const isActive = computed(() => {
  return props.explorer.path === selfPath.value
})

const fileType = computed(() => {
  return props.row.open ? 'directory' : 'file'
})

// ----------------- F U N C T I O N ----------------- //
const setActivePath = (path: string) => {
  open.value = !open.value
  props.setPath(path)
}

const setChildrenActivePath = (path: string) => {
  props.setPath(path)
}
</script>

<style lang="scss" scoped>
.file-type-icon {
  width: 1rem;
  height: 1rem;
}
.row-container {
  color: var(--font-color);
  background-color: red;
}
</style>
