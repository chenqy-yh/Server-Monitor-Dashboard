/*
 * @Date: 2024-03-29 00:05:44
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-29 00:10:39
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\index.ts
 * @Description: True or False
 */
import { createVNode, render } from 'vue'
import ContextMenuComponent from '@renderer/components/context-menu/context-menu-outer.vue'

let container: HTMLElement | null = null

const hiddenAllContextMenu = (menus: ContextMenuItem[]) => {
  console.log('hiddenAllContextMenu', menus)
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
  console.log('handleCreateContextMenu', binding)
  event.preventDefault() // 阻止默认右键菜单
  const allowPropagation = binding.allowPropagation ?? false
  !allowPropagation && event.stopPropagation() // 阻止冒泡
  const menus = binding.menus

  const removeContextMenu = () => {
    if (container) {
      document.body.removeChild(container)
      container = null
    }
    hiddenAllContextMenu(menus)
    document.body.removeEventListener('scroll', removeContextMenu)
    window.removeEventListener('resize', removeContextMenu)
    window.removeEventListener('click', removeContextMenu)
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
  document.body.addEventListener('scroll', removeContextMenu)
  window.addEventListener('resize', removeContextMenu)
  window.addEventListener('click', removeContextMenu)
}

export { useContextMenu }
