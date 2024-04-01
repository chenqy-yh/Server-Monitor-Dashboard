import { onUnmounted, ref } from 'vue'

type ListenerTarget = Element | Window

type ListenerRegisterItem = {
  key: string
  el: ListenerTarget
  listener: EventListenerOrEventListenerObject
}

const useListenerRegister = () => {
  const ListenerRegister = ref<ListenerRegisterItem[]>([])

  onUnmounted(() => {
    clear()
  })

  /**
   * @description:  添加事件监听
   * @param {string} key
   * @param {ListenerTarget} target
   * @param {EventListenerOrEventListenerObject} listener
   * @return {*}
   */
  const add = (
    key: string,
    target: ListenerTarget,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => {
    target.addEventListener(key, listener, options)
    ListenerRegister.value.push({ key, el: target, listener })
  }

  /**
   * @description: 移除事件监听
   * @param {string} key
   * @return {*}
   */
  const remove = (key: string) => {
    ListenerRegister.value = ListenerRegister.value.filter((item) => {
      if (item.key === key) {
        item.el.removeEventListener(item.key, item.listener)
        return false
      }
      return true
    })
  }

  /**
   * @description: 清除所有事件监听
   * @return {*}
   */
  const clear = () => {
    ListenerRegister.value.forEach((item) => {
      item.el.removeEventListener(item.key, item.listener)
    })
    ListenerRegister.value = []
  }

  const retrunItems = {
    addListener: add,
    removeListener: remove,
    clearListener: clear
  }

  return retrunItems
}

export { useListenerRegister }
