<template>
  <div class="row-container">
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
      <explorer-row
        v-for="(item, i) in row.children"
        :key="i"
        :row="item"
        :path="selfPath"
        :set-path="setChildrenActivePath"
        :explorer="explorer"
        :level="level + 1"
        :last-child="row.open && i === row.children.length - 1"
      ></explorer-row>
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
@keyframes border-gradient {
  0% {
    border-color: #36363600;
  }
  100% {
    border-color: #363636ff;
  }
}
.row-container {
  width: 100%;
  height: 100%;
  border-left: 1px solid #363636;
}
.explorer-row {
  color: var(--font-color);
  font-size: 13px;
  display: flex;
  align-items: center;
  height: 1.5rem;
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  &::before {
    position: absolute;
    content: '';
    top: 0;
    right: 0;
    width: 199px;
    height: 100%;
    border: 1px solid transparent;
    z-index: 3;
  }

  &:hover {
    &::before {
      background-color: #5959594c;
    }
  }

  i {
    margin-left: -0.5rem;
    background-color: #181818;
    width: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.1rem;
    z-index: 2;
    &.opcaity-0 {
      opacity: 0;
    }
  }
  .file-type-icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.3rem;
  }
  span {
    line-height: 1.5rem;
    height: 1.5rem;
  }
  &.active {
    &::before {
      position: absolute;
      content: '';
      top: 0;
      right: 0;
      width: 199px;
      height: 100%;
      background-color: #0078d44c;
      border: 1px solid #0078d4;
      z-index: 3;
    }
  }
}
.children-row {
  padding-left: 1rem;
}
</style>
