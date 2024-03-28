/*
 * @Date: 2024-03-28 13:27:58
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 23:58:21
 * @FilePath: \server-monitor\src\renderer\src\directive\context-menu\index.ts
 * @Description: True or False
 */
import { Directive, DirectiveBinding, createVNode, nextTick, render } from 'vue'
import ContextMenuComponent from '@renderer/components/context-menu/context-menu-outer.vue'

const ContextHandlerKey = 'contextmenu-handler'

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

const handleCreateContextMenu = (
  el: HTMLElement,
  binding: DirectiveBinding<any>,
  event: MouseEvent
) => {
  console.log('handleCreateContextMenu', binding)
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

const ContextMenuDirective: Directive = {
  beforeMount(el) {
    // 检查是否已经存在菜单
    if (el[ContextHandlerKey]) {
      el.removeEventListener('contextmenu', el[ContextHandlerKey])
    }
  },
  mounted(el, binding) {
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
