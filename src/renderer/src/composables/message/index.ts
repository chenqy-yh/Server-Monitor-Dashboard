/*
 * @Date: 2024-04-01 00:13:19
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 13:47:21
 * @FilePath: \server-monitor\src\renderer\src\composables\message\index.ts
 * @Description: True or False
 */
import { ref } from 'vue'

type MessageItem = {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  is_read?: boolean
}

const useMessage = () => {
  const max_message_count = ref(99)

  const message_list = ref<MessageItem[]>([])

  const addMessage = (message: MessageItem) => {
    message_list.value.push(message)
    checkMessageListLength()
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
    info
  }
}

const messageStore = useMessage()

export { messageStore }
