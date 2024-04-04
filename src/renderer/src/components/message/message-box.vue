<!--
 * @Date: 2024-03-31 19:39:33
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 00:19:03
 * @FilePath: \server-monitor\src\renderer\src\components\message\message-box.vue
 * @Description: True or False
-->
<template>
  <div ref="messageBoxRef" class="message-box" :class="{ active: open_chat_win }">
    <div v-show="open_chat_win" class="mask" @click="toggleChatWin"></div>
    <div class="content">
      <div class="chat-win">
        <div :ref="getMessageListRef" class="message-list">
          <div v-for="(msg_item, i) in message_list" :key="i" class="message-item">
            <template v-if="msg_item.type !== 'user'">
              <div class="left-msg">
                <i :class="icon_map[msg_item.type]"></i>
                <Bubble :content="msg_item.message" />
              </div>
            </template>
            <template v-else>
              <div class="right-msg">
                <Bubble :content="msg_item.message" />
                <i :class="icon_map[msg_item.type]"></i>
              </div>
            </template>
          </div>
          <div v-show="robot_msg" class="message-item">
            <div class="left-msg robot-msg">
              <i :class="icon_map.robot"></i>
              <Bubble :content="robot_msg" />
            </div>
          </div>
        </div>
        <div class="input-field">
          <el-input
            v-model="user_msg"
            v-enter="submitMsg"
            placeholder="Message ChatGPT"
            :suffix-icon="SubmitIcon"
          ></el-input>
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
import SubmitIcon from '@renderer/components/icon/submit-icon.vue'
import Bubble from './bubble.vue'

import { useMessageBox } from './message-box'
import { onMounted, onUnmounted } from 'vue'

// -------------------- S T O R E -------------------- //

const {
  unread_msg_cnt,
  robot_msg,
  icon_map,
  open_chat_win,
  message_list,
  user_msg,
  ResizeOffsetStyle,
  initListener,
  clearListener,
  getMessageListRef,
  toggleChatWin,
  submitMsg
} = useMessageBox()

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  initListener()
})

onUnmounted(() => {
  clearListener()
})
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
      display: grid;
      grid-template-rows: 1fr max-content;
      .message-list {
        overflow-y: auto;
        padding: var(--space-sm);
        &::-webkit-scrollbar {
          width: 0.2rem;
        }
        .message-item {
          padding-block: var(--space-sm);
          width: 100%;
          .left-msg {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: var(--space-sm);
          }
          .right-msg {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: var(--space-sm);
          }
        }
      }
      .input-field {
        width: 100%;
        padding: var(--space-sm);
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
        opacity 1s;
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
