<template>
  <div ref="mainLayout" class="resize-layout">
    <div ref="leftLayout" class="left-layout">
      <slot name="left"></slot>
      <div ref="stretchBar" class="stretch-bar"></div>
    </div>
    <div ref="rightLayout" class="right-layout">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// ----------------- C O N S T A N T ----------------- //
const minLeftLayoutWidth = 200
const maxLeftLayoutWidth = ref(0)

const mainLayout = ref<HTMLElement>()
const stretchBar = ref<HTMLElement>()
const leftLayout = ref<HTMLElement>()
const rightLayout = ref<HTMLElement>()

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  console.log(leftLayout.value)
  console.log(rightLayout.value)
  initStretchBar()
})

// ----------------- F U N C T I O N ----------------- //

const mouseMoveHandler = (e: MouseEvent) => {
  if (!leftLayout.value || !rightLayout.value) return
  const leftLayoutWidth = e.clientX - leftLayout.value.getBoundingClientRect().left
  leftLayout.value.style.width = `${Math.min(
    Math.max(leftLayoutWidth, minLeftLayoutWidth),
    maxLeftLayoutWidth.value
  )}px`
  rightLayout.value.style.width = `calc(100% - ${leftLayoutWidth}px)`
  document.body.style.cursor = 'ew-resize'
}

const mouseUpHandler = () => {
  document.removeEventListener('mousemove', mouseMoveHandler)
  document.removeEventListener('mouseup', mouseUpHandler)
  document.body.style.cursor = ''
}

const mouseDownHandler = (e: MouseEvent) => {
  if (!mainLayout.value) return
  e.preventDefault()
  maxLeftLayoutWidth.value = mainLayout.value.getBoundingClientRect().width - minLeftLayoutWidth
  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

const initStretchBar = () => {
  if (!stretchBar.value) return
  stretchBar.value.addEventListener('mousedown', mouseDownHandler)
}
</script>

<style lang="scss" scoped>
.resize-layout {
  border: 1px solid red;
  .left-layout {
    height: 100%;
    width: 200px;
    position: relative;
    &::before:hover {
      background-color: #0078d4;
    }
    .stretch-bar {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 5px;
      height: 100%;
      background-color: transparent;
      cursor: ew-resize;
      transition: all 0.3s;
      &:hover {
        background-color: #0078d4;
        transition-delay: 0.5s;
      }
    }
  }
}
</style>
