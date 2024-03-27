<!--
 * @Date: 2024-03-27 23:45:10
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 00:25:40
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\context-menu-item.vue
 * @Description: True or False
-->
<template>
  <div class="context-menu-item" @click="test">
    <div>
      <i :class="menuItem.icon"></i>
    </div>
    <div>
      <span>{{ menuItem.label }}</span>
    </div>
    <div v-if="menuItem.expand">
      <i class="ri-arrow-right-s-line"></i>
    </div>
    <div v-if="showExpand">test</div>
    <!-- <ContextMenu :menu="menuItem.children"></ContextMenu> -->
    <!-- <div v-if="menuItem.children">
      <ContextMenu :menu="menuItem.children"></ContextMenu>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContextMenu from './context-menu.vue'

// -------------------- P R O P S -------------------- //

const props = defineProps<{
  menuItem: ContextMenuItem
}>()

const emits = defineEmits(['click'])

const showExpand = ref(false)

const test = () => {
  console.log('test')
}

const handleClickMenuItem = () => {
  console.log('click')
  if (!props.menuItem.expand) emits('click')
  else {
    console.log('expand')
  }
}

const showExpandMenu = () => {
  console.log('showExpandMenu')
  showExpand.value = true
}
</script>

<style lang="scss" scoped>
.context-menu-item {
  cursor: pointer;
  padding: var(--space-sm);
  padding-right: 0;
  border-radius: var(--radius-md);
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;

  &:hover {
    background-color: var(--bg-color-hover);
  }
}
</style>
