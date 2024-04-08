/*
 * @Date: 2024-03-28 13:27:58
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-08 11:19:18
 * @FilePath: \Spirit-client\src\renderer\src\directive\context-menu\index.ts
 * @Description: True or False
 */
import ContextMenuComponent from '@renderer/components/context-menu/context-menu-outer.vue'
import { Directive, DirectiveBinding, createVNode, render } from 'vue'

const ContextHandlerKey = 'contextmenu-handler' // 保存右键菜单事件的key

let container: HTMLElement | null = null // 右键菜单容器

/**
 * @description:  隐藏所有右键菜单
 * @param {ContextMenuItem} menus
 * @return {*}
 */
const hiddenAllContextMenu = (menus: ContextMenuItem[]) => {
  menus.forEach((menu) => {
    if (menu.children) {
      hiddenAllContextMenu(menu.children)
    }
    menu.showSubMenu = false
  })
}

/**
 * @description:  创建右键菜单
 * @param {HTMLElement} el
 * @param {DirectiveBinding<any>} binding
 * @param {MouseEvent} event
 * @return {*}
 */
const handleCreateContextMenu = (
  el: HTMLElement,
  binding: DirectiveBinding<any>,
  event: MouseEvent
) => {
  event.preventDefault() // 阻止默认右键菜单
  const allowPropagation = binding.value.allowPropagation ?? false
  !allowPropagation && event.stopPropagation() // 阻止冒泡
  const menus = binding.value.menus

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

/**
 * @description: 右键菜单指令
 * @return {*}
 */
const ContextMenuDirective: Directive = {
  mounted(el, binding) {
    // 检查是否已经存在菜单
    if (el[ContextHandlerKey]) {
      el.removeEventListener('contextmenu', el[ContextHandlerKey])
    }
    el[ContextHandlerKey] = (event: MouseEvent) => handleCreateContextMenu(el, binding, event)
    el.addEventListener('contextmenu', el[ContextHandlerKey], true)
  },
  unmounted(el) {
    if (el && el[ContextHandlerKey]) {
      el.removeEventListener('contextmenu', el[ContextHandlerKey])
      delete el[ContextHandlerKey]
    }
  }
}

export default ContextMenuDirective
