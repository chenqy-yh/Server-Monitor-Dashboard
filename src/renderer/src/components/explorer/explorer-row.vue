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
      <div class="row-content">
        <i
          :class="{
            'ri-arrow-right-s-line ri-lg': !open,
            'ri-arrow-down-s-line ri-lg': open,
            'opcaity-0': !row.open
          }"
        ></i>
        <img class="file-type-icon" :src="imgHelper.getImg(fileType)" />
        <span>{{ row.name }}</span>
      </div>
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
        :mask-width="maskWidth"
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
  maskWidth: number
}>()

// -------------------- P R O P S -------------------- //

const open = ref(false)
const _maskWidth = computed(() => props.maskWidth - 1 + 'px')

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
  border-left: 1px solid var(--border-color);
  padding-left: 1rem;
}

.explorer-row {
  // border: 1px solid red;
  margin-left: -1.5rem;
  background-color: #181818;
  position: relative;
  height: 1.5rem;
  line-height: 1.5rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 1.5rem;
    width: v-bind(_maskWidth);
    background-color: transparent;
    border: 1px solid transparent;
    z-index: 99;
  }
  &:hover::before {
    background-color: #51515148;
  }
  &.active {
    &::before {
      background-color: #0078d44c;
      border: 1px solid #0078d4;
    }
  }
  .row-content {
    display: flex;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    gap: 0.3rem;
    i {
      max-width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &.opcaity-0 {
        display: none;
      }
    }
    span {
      font-size: 14px;
    }
  }
}
</style>
