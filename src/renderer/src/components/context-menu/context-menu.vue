<!--
 * @Date: 2024-03-27 20:26:20
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 00:20:34
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\context-menu.vue
 * @Description: True or False
-->
<template>
  <Teleport to="body">
    <div v-if="show" ref="contextRef" class="context-menu-content">
      <ContextMenuItem v-for="item in menu" :key="item.label" :menu-item="item"></ContextMenuItem>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import ContextMenuItem from './context-menu-item.vue'

defineProps<{
  menu: ContextMenuItem[]
  show: boolean
  x: string
  y: string
}>()

const emits = defineEmits(['select'])

// ----------------- C O N S T A N T ----------------- //

// ------------------- C I R C L E ------------------- //

// ----------------- F U N C T I O N ----------------- //

const handleClickMenuItem = (contextMenuItem: ContextMenuItem) => {
  console.log('ok:', contextMenuItem.label)
  // contextMenuItem.action && contextMenuItem.action()
  // emits('select', contextMenuItem.label)
}
</script>

<style lang="scss" scoped>
.context-menu-content {
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--font-color);
  position: fixed;
  top: v-bind(y);
  left: v-bind(x);
  min-width: 8rem;
  border-radius: var(--radius-md);
  padding: var(--space-ssm);
}
</style>
