<template>
  <div class="main-content">
    <div class="tool-bar">
      <el-button
        text
        class="btn status-btn"
        :data-status="is_online ? 'on-line' : 'off-line'"
        :style="{
          '--status-color': is_online ? '#1abc9c' : '#e74c3c'
        }"
      >
        <i
          class="ri-terminal-box-line ri-lg"
          :class="{
            online: is_online,
            close: !is_online
          }"
        ></i>
      </el-button>
      <el-button text class="btn" @click="close_connect">
        <i class="ri-close-circle-line ri-lg close"></i>
      </el-button>
    </div>
    <div ref="term_ref" class="terminal"></div>
  </div>
</template>

<script setup lang="ts">
import { useCommonSettingStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

// -------------------- S T O R E -------------------- //
const { server_url } = storeToRefs(useCommonSettingStore())

// ----------------- C O N S T A N T ----------------- //
const term_ref = ref<HTMLElement>() // 终端容器
const terminal = ref<Terminal>() // 终端实例
const socket = ref<WebSocket>() // websocket 实例
const attach_addon = ref<AttachAddon>() // attach 插件实例
const ws_port = ref<number>() // websocket 端口
const is_online = ref(false) // 是否在线
// -------------------- P R O P S -------------------- //
const emits = defineEmits(['closeSocket', 'finish-create'])

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  createTerminial()
})

// ----------------- F U N C T I O N ----------------- //

/**
 *  @description 关闭连接
 *
 */
const close_connect = () => {
  if (socket.value) socket.value.close()
  if (attach_addon.value) attach_addon.value.dispose()
  if (terminal.value) terminal.value.clear()
  emits('closeSocket')
}

/**
 *  @description 创建终端
 *
 */
const createTerminial = async () => {
  terminal.value = new Terminal({
    cursorBlink: true, //光标闪烁,
    cols: 60,
    rows: 20
  })
  ws_port.value = await window.api.createWsService(server_url.value)
  socket.value = new WebSocket(`ws://${import.meta.env.RE_Host}:${ws_port.value}`)
  socket.value.onopen = () => {
    is_online.value = true
  }
  socket.value.onclose = () => {
    is_online.value = false
  }
  attach_addon.value = new AttachAddon(socket.value)
  const fit_addon = new FitAddon()
  if (!terminal.value || !attach_addon.value || !term_ref.value) return
  fit_addon.activate(terminal.value)
  attach_addon.value.activate(terminal.value)
  terminal.value.open(term_ref.value)
  fit_addon.fit()
  terminal.value.focus()
  emits('finish-create')
}
</script>

<style lang="scss" scoped>
:deep(.xterm-viewport) {
  overflow: hidden !important;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .tool-bar {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    padding: var(--space-sm);
    // display: none;
    .btn {
      padding: 0;
      margin: 0;
      height: max-content;
      .online {
        color: #1abc9c;
      }
      .close {
        color: #e74c3c;
      }
    }
    .status-btn {
      position: relative;
      &::before {
        content: attr(data-status);
        position: absolute;
        width: 4rem;
        top: 50%;
        left: calc(-4rem - var(--space-sm));
        transform: translateY(-50%);
        opacity: 0;
        color: var(--status-color);
        font-size: var(--font-size-content);
        text-align: center;
        padding: 3px;
        transition: var(--transition);
      }
      &:hover::before {
        opacity: 1;
      }
    }
  }
  .terminal {
    width: 100%;
    background-color: var(--bg-color);
    padding: var(--space-md);
  }
}
</style>
