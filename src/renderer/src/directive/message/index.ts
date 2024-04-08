import MessageBox from '@renderer/components/message/message-box.vue'
import { Directive, createVNode, render } from 'vue'

let container: HTMLElement | null = null

const appendMessageBoxToBody = (_: HTMLElement) => {
  container = document.createElement('div')
  const vm = createVNode(MessageBox, {}, null)
  render(vm, container)
  document.body.appendChild(container)
}

const removeMessageBox = (_: HTMLElement) => {
  if (container) {
    document.body.removeChild(container)
    container = null
  }
}

const MessageDirective: Directive = {
  mounted(el) {
    appendMessageBoxToBody(el)
  },
  unmounted(el) {
    removeMessageBox(el)
  }
}

export default MessageDirective
