<!--
 * @Date: 2024-03-31 19:39:33
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 00:15:34
 * @FilePath: \server-monitor\src\renderer\src\components\message\message-box.vue
 * @Description: True or False
-->
<template>
  <div ref="messageBoxRef" class="message-box" :class="{ active: open_chat_win }">
    <div class="content">
      <div class="chat-win">
        <div class="header">
          <el-button text circle @click="toggleChatWin">
            <i class="ri-subtract-line ri-2x"></i>
          </el-button>
        </div>
      </div>

      <div class="message-btn" @click="toggleChatWin">
        <i class="ri-question-answer-fill ri-lg"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Drag } from '@renderer/composables/common/drag'
import { computed, onMounted, ref } from 'vue'
import { useMessage } from './'

// -------------------- S T O R E -------------------- //
const { addMessage, message_list } = useMessage()

// ----------------- C O N S T A N T ----------------- //

const messageBoxRef = ref<HTMLElement>()

const RESIZE_OFFSET = 80

const ResizeOffsetStyle = computed(() => {
  return `${RESIZE_OFFSET}px`
})

const drag = new Drag()
const startX = ref(0)
const startY = ref(0)

const open_chat_win = ref(false)
const message_box_w = ref('max-content')
const message_box_h = ref('max-content')

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  if (!messageBoxRef.value) return
  // initDrag(messageBoxRef.value)
  // onResize()
})

// ----------------- F U N C T I O N ----------------- //

const toggleChatWin = () => {
  open_chat_win.value = !open_chat_win.value
  if (open_chat_win.value) {
    message_box_w.value = '18rem'
    message_box_h.value = '24rem'
    // const el = messageBoxRef.value!
    // el.style.left = `${parseInt(el.style.left) - remToPx(15)}px`
    // el.style.top = `${parseInt(el.style.top) - remToPx(21)}px`
  } else {
    message_box_w.value = 'max-content'
    message_box_h.value = 'max-content'
    // const el = messageBoxRef.value!
    // el.style.left = `${parseInt(el.style.left) + remToPx(15)}px`
    // el.style.top = `${parseInt(el.style.top) + remToPx(21)}px`
  }
}

const remToPx = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  bottom: v-bind(ResizeOffsetStyle);
  right: v-bind(ResizeOffsetStyle);
  z-index: 99999;
  border: 1px solid var(--border-color);
  border-radius: var(--space-sm);
  // height: v-bind(message_box_h);
  // width: v-bind(message_box_w);
  height: max-content;
  width: max-content;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .content {
    // min-width: var(--message-btn-size);
    // min-height: var(--message-btn-size);
    width: 1.5rem;
    height: 2rem;
    background-color: transparent;
    position: relative;
    transition: var(--transition);
    .chat-win {
      display: none;
      .header {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  &.active {
    overflow: hidden;
    .content {
      width: 18rem;
      height: 24rem;
      background-color: var(--bg-bt-color);
      .chat-win {
        display: block;
      }

      .message-btn {
        z-index: -1;
      }
    }
  }
}

.message-btn {
  z-index: 2;
  position: absolute;
  bottom: 0;
  right: 0;

  min-height: var(--message-btn-size);
  min-width: var(--message-btn-size);
  height: var(--message-btn-size);
  width: var(--message-btn-size);
  border-radius: 50%;
  background-color: var(--bg-bt-color);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color);
  border: 1px solid var(--border-color);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  transition: var(--transition);
  &:hover {
    background-color: var(--message-box-bg-hover-color);
  }
}
</style>
