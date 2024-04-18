/*
 * @Date: 2024-04-01 00:13:19
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:51:14
 * @FilePath: \server-monitor\src\renderer\src\composables\message\index.ts
 * @Description: True or False
 */

type MessageType = 'success' | 'error' | 'warning' | 'info' | 'robot' | 'user'

type MessageItem = {
  type: MessageType
  message: string
  is_read?: boolean
}

const useMessage = () => {
  const max_message_count = ref(99) // 最大消息数量

  const message_list = ref<MessageItem[]>([]) // 消息列表

  const is_add_message = ref(false) // 是否正在添加消息

  const message_queue = ref<MessageItem[]>([]) // 消息队列

  /**
   * @description:  添加消息
   * @param {MessageItem} message
   * @return {*}
   */
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
  /**
   * @description:  成功消息
   * @param {string} message
   * @return {*}
   */
  const success = (message: string) => {
    addMessage({ type: 'success', message })
  }

  /**
   * @description:  错误消息
   * @param {string} message
   * @return {*}
   */
  const error = (message: string) => {
    addMessage({ type: 'error', message })
  }

  /**
   * @description:  警告消息
   * @param {string} message
   * @return {*}
   */
  const warning = (message: string) => {
    addMessage({ type: 'warning', message })
  }

  /**
   * @description:  信息消息
   * @param {string} message
   * @return {*}
   */
  const info = (message: string) => {
    addMessage({ type: 'info', message })
  }

  /**
   * @description:  机器人消息
   * @param {string} message
   * @return {*}
   */
  const robot = (message: string) => {
    addMessage({ type: 'robot', message })
  }

  /**
   * @description:  用户消息
   * @param {string} message
   * @return {*}
   */
  const user = (message: string) => {
    addMessage({ type: 'user', message })
  }

  /**
   * @description:  处理消息
   * @param {MessageType} type
   * @param {string} message
   * @return {*}
   */
  const handleMessage = (type: MessageType, message: string) => {
    addMessage({ type, message })
  }

  /**
   * @description:  检查消息列表长度
   * @param {*}
   * @return {*}
   */
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
