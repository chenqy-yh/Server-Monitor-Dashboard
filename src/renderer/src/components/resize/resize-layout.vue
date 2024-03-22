<template>
  <div ref="mainLayout" class="resize-layout">
    <div ref="leftLayout" class="left-layout">
      <div class="slot-container">
        <slot name="left"></slot>
      </div>
      <div
        ref="stretchBar"
        class="stretch-bar"
        :class="{
          active: onMove
        }"
      ></div>
    </div>
    <div ref="rightLayout" class="right-layout">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// -------------------- P R O P S -------------------- //
const emits = defineEmits(['resize'])

// ----------------- C O N S T A N T ----------------- //
const MIN_WIDTH = 200
const MAX_WIDTH = ref(0)

const mainLayout = ref<HTMLElement>()
const stretchBar = ref<HTMLElement>()
const leftLayout = ref<HTMLElement>()
const rightLayout = ref<HTMLElement>()

const onMove = ref(false)

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  initStretchBar()
})

// ----------------- F U N C T I O N ----------------- //

const mouseMoveHandler = (e: MouseEvent) => {
  if (!leftLayout.value || !rightLayout.value || !mainLayout.value) return

  onMove.value = true
  const leftLayoutWidth = clamp(
    e.clientX - leftLayout.value.getBoundingClientRect().left,
    MIN_WIDTH,
    MAX_WIDTH.value
  )
  const rightLayoutWidth = clamp(
    mainLayout.value.getBoundingClientRect().width - leftLayoutWidth,
    MIN_WIDTH,
    MAX_WIDTH.value
  )

  leftLayout.value.style.width = leftLayoutWidth + 'px'
  rightLayout.value.style.width = `${rightLayoutWidth}px`
  document.body.style.cursor = 'ew-resize'
  emits('resize')
}

const mouseUpHandler = () => {
  document.removeEventListener('mousemove', mouseMoveHandler)
  document.removeEventListener('mouseup', mouseUpHandler)
  document.body.style.cursor = ''
  onMove.value = false
}

const mouseDownHandler = (e: MouseEvent) => {
  if (!mainLayout.value) return
  e.preventDefault()
  MAX_WIDTH.value = mainLayout.value.getBoundingClientRect().width - MIN_WIDTH
  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)
}

const initStretchBar = () => {
  if (!stretchBar.value) return
  stretchBar.value.addEventListener('mousedown', mouseDownHandler)
}

const clamp = (x: number, min: number, max: number) => {
  return Math.min(Math.max(x, min), max)
}
</script>

<style lang="scss" scoped>
.slot-container {
  transform: translate(0);
}

.resize-layout {
  height: 100%;
  display: grid;
  grid-template-columns: max-content 1fr;
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
      &.active {
        background-color: #0078d4;
      }
    }
  }
}
</style>
