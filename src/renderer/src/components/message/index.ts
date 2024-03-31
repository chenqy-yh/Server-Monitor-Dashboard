/*
 * @Date: 2024-04-01 00:13:19
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 00:14:30
 * @FilePath: \server-monitor\src\renderer\src\components\message\index.ts
 * @Description: True or False
 */
import { ref } from 'vue'

const useMessage = () => {
  const message_list = ref<string[]>([])

  const addMessage = (message: string) => {
    message_list.value.push(message)
  }

  return {
    message_list,
    addMessage
  }
}

export { useMessage }
