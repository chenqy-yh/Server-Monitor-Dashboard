/*
 * @Date: 2024-04-01 14:56:25
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-08 11:19:10
 * @FilePath: \Spirit-client\src\renderer\src\composables\listener\index.ts
 * @Description: True or False
 */

type ListenerTarget = Element | Window | Document

type ListenerRegisterItem = {
  key: string
  el: ListenerTarget
  listener: EventListenerOrEventListenerObject
  options?: boolean | AddEventListenerOptions
  cleaner?: () => void
}

const useListenerRegister = () => {
  const ListenerRegister = new Map<string, ListenerRegisterItem[]>()

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
  const add = (...listenerRegisterList: ListenerRegisterItem[]) => {
    listenerRegisterList.forEach((listenerRegItem) => {
      const target = listenerRegItem.el
      const key = listenerRegItem.key
      const listener = listenerRegItem.listener
      const options = listenerRegItem.options
      target.addEventListener(key, listener, options)
      const cleaner = () => {
        target.removeEventListener(key, listener)
      }
      const item = {
        key,
        el: target,
        listener,
        cleaner
      }
      if (ListenerRegister.has(key)) {
        ListenerRegister.get(key)?.push(item)
      } else {
        ListenerRegister.set(key, [item])
      }
    })
  }

  /**
   * @description: 移除事件监听
   * @param {string} key
   * @return {*}
   */
  const remove = (key: string) => {
    if (ListenerRegister.has(key)) {
      ListenerRegister.get(key)?.forEach((item) => {
        item.cleaner && item.cleaner()
      })
      ListenerRegister.delete(key)
      return true
    }
    return false
  }

  /**
   * @description: 清除所有事件监听
   * @return {*}
   */
  const clear = () => {
    ListenerRegister.forEach((listener_list: ListenerRegisterItem[]) => {
      listener_list.forEach((item) => {
        item.cleaner && item.cleaner()
      })
    })
    ListenerRegister.clear()
  }

  const retrunItems = {
    addListener: add,
    removeListener: remove,
    clearListener: clear
  }

  return retrunItems
}

type UseListenerRegister = ReturnType<typeof useListenerRegister>

export { useListenerRegister }
export type { UseListenerRegister }
