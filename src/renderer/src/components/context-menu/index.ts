/*
 * @Date: 2024-03-29 00:05:44
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 21:05:58
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\index.ts
 * @Description: True or False
 */
import { createVNode, render } from 'vue'
import ContextMenuComponent from '@renderer/components/context-menu/context-menu-outer.vue'
import { useListenerRegister } from '@renderer/composables/listener'

let container: HTMLElement | null = null

const hiddenAllContextMenu = (menus: ContextMenuItem[]) => {
  menus.forEach((menu) => {
    if (menu.children) {
      hiddenAllContextMenu(menu.children)
    }
    menu.showSubMenu = false
  })
}

const useContextMenu = (
  el: any,
  binding: { menus: ContextMenuItem[]; allowPropagation: boolean },
  event: MouseEvent
) => {
  event.preventDefault() // 阻止默认右键菜单
  const allowPropagation = binding.allowPropagation ?? false
  !allowPropagation && event.stopPropagation() // 阻止冒泡
  const menus = binding.menus
  const { addListener, clearListener } = useListenerRegister()

  const removeContextMenu = () => {
    if (container) {
      document.body.removeChild(container)
      container = null
    }
    hiddenAllContextMenu(menus)
    clearListener()
  }
  // 移除已有菜单
  removeContextMenu()
  const options = {
    show: true,
    pos: { x: event.clientX, y: event.clientY },
    el,
    menus,
    removeContextMenu
  }
  container = document.createElement('div')
  const vm = createVNode(ContextMenuComponent, options, null)
  render(vm, container)
  document.body.appendChild(container)
  // 页面变换时移除菜单
  addListener(
    {
      key: 'scroll',
      el: document.body,
      listener: removeContextMenu
    },
    {
      key: 'resize',
      el: window,
      listener: removeContextMenu
    },
    {
      key: 'click',
      el: window,
      listener: removeContextMenu
    }
  )
}

export { useContextMenu }
