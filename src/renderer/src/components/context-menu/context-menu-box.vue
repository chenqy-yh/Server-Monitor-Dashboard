<!--
 * @Date: 2024-03-27 20:26:20
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 00:17:12
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\context-menu-box.vue
 * @Description: True or False
-->
<template>
  <div ref="containerRef" class="container">
    <slot></slot>

    <ContextMenu ref="contextMenuRef" :menu="menu" :x="x" :y="y" :show="show"></ContextMenu>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from './context-menu.vue'

import { onBeforeUnmount, onMounted, ref } from 'vue'

defineProps<{
  menu: ContextMenuItem[]
}>()

const emits = defineEmits(['select'])

// ----------------- C O N S T A N T ----------------- //
const containerRef = ref<HTMLElement>()

const contextMenuRef = ref<HTMLElement>()

const show = ref(false)

const x = ref('')
const y = ref('')

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  // 初始化监听
  initContextMenuListenr()
})

onBeforeUnmount(() => {
  removeContextMenuListener()
})

// ----------------- F U N C T I O N ----------------- //

const initContextMenuListenr = () => {
  // clearListener()
  if (!containerRef.value) return
  containerRef.value.addEventListener('contextmenu', handleShowContextMenu, true)
  // document.documentElement.addEventListener('contextmenu', handleHideContextMenu)
  // document.documentElement.addEventListener('click', handleHideContextMenu)
}

const removeContextMenuListener = () => {
  // 清除监听
  if (!containerRef.value) return
  containerRef.value.removeEventListener('contextmenu', handleShowContextMenu)
  document.documentElement.removeEventListener('contextmenu', handleHideContextMenu)
  document.documentElement.removeEventListener('click', handleHideContextMenu)
}

const handleShowContextMenu = (e: MouseEvent) => {
  if (!contextMenuRef.value) return
  console.log('handleShowContextMenu')
  const mx = e.clientX
  const my = e.clientY
  const menuH = contextMenuRef.value.clientHeight
  const menuW = contextMenuRef.value.clientWidth
  const winH = window.innerHeight
  const winW = window.innerWidth

  x.value = mx + menuW > winW ? mx - menuW + 'px' : mx + 'px'
  y.value = my + menuH > winH ? my - menuH + 'px' : my + 'px'
  show.value = true
  e.preventDefault()
  e.stopPropagation()
}

const handleHideContextMenu = (e: Event) => {
  console.log('handleHideContextMenu')
  show.value = false
}
</script>

<style lang="scss" scoped></style>
