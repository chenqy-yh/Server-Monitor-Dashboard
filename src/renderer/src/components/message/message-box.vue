<!--
 * @Date: 2024-03-31 19:39:33
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 14:19:57
 * @FilePath: \server-monitor\src\renderer\src\components\message\message-box.vue
 * @Description: True or False
-->
<template>
  <div ref="messageBoxRef" class="message-box" :class="{ active: open_chat_win }">
    <div v-show="open_chat_win" class="mask" @click="toggleChatWin"></div>
    <div class="content">
      <div class="chat-win">
        <!-- <div class="header">
          <el-button text circle @click="toggleChatWin">
            <i class="ri-subtract-line ri-lg"></i>
          </el-button>
        </div> -->
        <div class="message-list">
          <div v-for="(msg_item, i) in message_list" :key="i" class="message-item">
            <i :class="icon_map[msg_item.type]"></i>
            <Bubble>
              {{ msg_item.message }}
            </Bubble>
          </div>
        </div>
      </div>

      <div class="message-btn" @click="toggleChatWin">
        <i class="ri-question-answer-fill ri-lg"></i>
        <div v-if="unread_msg_cnt" class="tip">You have {{ unread_msg_cnt }} unread messages</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { messageStore } from '@renderer/composables/message'
import Bubble from './bubble.vue'

// -------------------- S T O R E -------------------- //
const { addMessage, message_list } = messageStore

// ----------------- C O N S T A N T ----------------- //

const icon_map = {
  info: 'ri-information-line ri-lg info',
  success: 'ri-checkbox-circle-line ri-lg success',
  warning: 'ri-error-warning-line ri-lg warning',
  error: 'ri-error-warning-line ri-lg error'
}

const messageBoxRef = ref<HTMLElement>()

const RESIZE_OFFSET = 80

const ResizeOffsetStyle = computed(() => {
  return `${RESIZE_OFFSET}px`
})

const open_chat_win = ref(false)
const message_box_w = ref('max-content')
const message_box_h = ref('max-content')

const unread_msg_cnt = computed(() => {
  return message_list.value.reduce((acc, cur) => {
    return cur.is_read ? acc : acc + 1
  }, 0)
})

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  addMessage({
    type: 'info',
    message: 'This is a info message'
  })
  addMessage({
    type: 'success',
    message: 'This is a success message'
  })
  addMessage({
    type: 'warning',
    message: 'This is a warning message'
  })

  addMessage({
    type: 'error',
    message: 'This is a error message'
  })
  addMessage({
    type: 'info',
    message: 'This is a info message'
  })
  addMessage({
    type: 'success',
    message: 'This is a success message'
  })
  addMessage({
    type: 'warning',
    message: 'This is a warning message'
  })

  addMessage({
    type: 'error',
    message: 'This is a error message'
  })
  addMessage({
    type: 'info',
    message: 'This is a info message'
  })
  addMessage({
    type: 'success',
    message: 'This is a success message'
  })
  addMessage({
    type: 'warning',
    message: 'This is a warning message'
  })

  addMessage({
    type: 'error',
    message: 'This is a error message'
  })
  addMessage({
    type: 'info',
    message: 'This is a info message'
  })
  addMessage({
    type: 'success',
    message: 'This is a success message'
  })
  addMessage({
    type: 'warning',
    message: 'This is a warning message'
  })

  addMessage({
    type: 'error',
    message: 'This is a error message'
  })
  addMessage({
    type: 'info',
    message: 'This is a info message'
  })
  addMessage({
    type: 'success',
    message: 'This is a success message'
  })
  addMessage({
    type: 'warning',
    message: 'This is a warning message'
  })

  addMessage({
    type: 'error',
    message: 'This is a error message'
  })
})

// ----------------- F U N C T I O N ----------------- //

const toggleChatWin = () => {
  open_chat_win.value = !open_chat_win.value
  if (open_chat_win.value) {
    message_box_w.value = '18rem'
    message_box_h.value = '24rem'
    message_list.value.forEach((item) => {
      item.is_read = true
    })
  } else {
    message_box_w.value = 'max-content'
    message_box_h.value = 'max-content'
  }
}
</script>

<style lang="scss" scoped>
.info {
  color: #888;
}
.success {
  color: #67c23a;
}
.warning {
  color: #e6a23c;
}
.error {
  color: #f56c6c;
}

.message-box {
  position: fixed;
  bottom: v-bind(ResizeOffsetStyle);
  right: v-bind(ResizeOffsetStyle);
  z-index: 99999;
  height: max-content;
  width: max-content;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content {
    border-radius: var(--space-sm);
    width: 1.5rem;
    height: 2rem;
    background-color: transparent;
    position: relative;
    transition: all 0.5s;
    border: 1px solid transparent;

    .chat-win {
      transition: none;
      transition-delay: 0;
      opacity: 0;
      height: 100%;
      overflow: hidden;
      padding: var(--space-sm);
      // .header {
      //   display: flex;
      //   justify-content: flex-end;
      //   align-items: center;
      //   height: 1.5rem;
      // }
      .message-list {
        height: 100%;
        overflow-y: scroll;
        .message-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm);
        }
      }
    }
  }

  &.active {
    overflow: hidden;
    .content {
      width: 18rem;
      height: 24rem;
      background-color: var(--bg-bt-color);
      border-color: var(--border-color);
      .chat-win {
        opacity: 1;
        transition: all 0.5s;
        transition-delay: 0.5s;
      }

      .message-btn {
        display: none;
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
    .tip {
      opacity: 1;
      transition:
        padding 0s,
        max-width 0s,
        opacity 0.5s;
      max-width: max-content;
      padding: var(--space-1x);
    }
  }
  .tip {
    position: absolute;
    border: 1px solid var(--border-color);
    top: 50%;
    right: 130%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    background-color: var(--message-box-bg-color);
    border-radius: 9999px;
    padding: 0;
    max-width: 0;
    opacity: 0;
    // 不允许换行
    white-space: nowrap;
  }
}
</style>
../../composables/common/message
