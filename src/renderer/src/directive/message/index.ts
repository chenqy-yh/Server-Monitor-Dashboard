import MessageBox from '@renderer/components/message/message-box.vue'
import { Directive, createVNode, render } from 'vue'

let container: HTMLElement | null = null

const appendMessageBoxToBody = (el: HTMLElement) => {
  container = document.createElement('div')
  const vm = createVNode(MessageBox, {}, null)
  render(vm, container)
  document.body.appendChild(container)
}

const removeMessageBox = (el: HTMLElement) => {
  if (container) {
    document.body.removeChild(container)
    container = null
  }
}

const MessageDirective: Directive = {
  mounted(el, binding) {
    appendMessageBoxToBody(el)
  },
  unmounted(el) {
    removeMessageBox(el)
  }
}

export default MessageDirective
