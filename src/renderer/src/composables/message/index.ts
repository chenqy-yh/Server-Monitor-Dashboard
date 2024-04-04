/*
 * @Date: 2024-04-01 00:13:19
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-02 23:58:02
 * @FilePath: \server-monitor\src\renderer\src\composables\message\index.ts
 * @Description: True or False
 */
import { ref } from 'vue'

type MessageType = 'success' | 'error' | 'warning' | 'info' | 'robot' | 'user'

type MessageItem = {
  type: MessageType
  message: string
  is_read?: boolean
}

const useMessage = () => {
  const max_message_count = ref(99)

  const message_list = ref<MessageItem[]>([])

  const is_add_message = ref(false)

  const message_queue = ref<MessageItem[]>([])

  const addMessage = (message: MessageItem) => {
    if (is_add_message.value) {
      message_queue.value.push(message)
      return
    }
    is_add_message.value = true
    message_list.value.push(message)
    checkMessageListLength()
    is_add_message.value = false
    if (message_queue.value.length > 0) {
      const next_msg = message_queue.value.shift()
      next_msg && addMessage(next_msg)
    }
  }
  const success = (message: string) => {
    addMessage({ type: 'success', message })
  }
  const error = (message: string) => {
    addMessage({ type: 'error', message })
  }
  const warning = (message: string) => {
    addMessage({ type: 'warning', message })
  }
  const info = (message: string) => {
    addMessage({ type: 'info', message })
  }
  const robot = (message: string) => {
    addMessage({ type: 'robot', message })
  }
  const user = (message: string) => {
    addMessage({ type: 'user', message })
  }

  const handleMessage = (type: MessageType, message: string) => {
    addMessage({ type, message })
  }

  const checkMessageListLength = () => {
    if (message_list.value.length > max_message_count.value) {
      message_list.value.shift()
    }
  }

  return {
    message_list,
    addMessage,
    success,
    error,
    warning,
    info,
    robot,
    user,
    handleMessage
  }
}

const messageStore = useMessage()

export { messageStore }
