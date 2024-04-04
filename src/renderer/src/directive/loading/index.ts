/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:48:27
 * @FilePath: \server-monitor\src\renderer\src\directive\loading\index.ts
 * @Description: True or False
 */
import { Directive, createApp } from 'vue'
import Loading from '@renderer/components/loading/loading-3.vue'
import { delay } from '@renderer/utils/common'

const animaDuration = 500

const loadingDirective: Directive = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}

function append(el: HTMLElement) {
  const style = window.getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].includes(style.position)) {
    el.style.position = 'relative'
  }
  el.appendChild((el as any).instance.$el)
}

async function remove(el: HTMLElement) {
  el.style.position = ''
  // 为Loading添加class come-out
  await delay(animaDuration).then(() => {
    ;(el as any).instance.$el.classList.add('come-out')
  })
  await delay(animaDuration + 1).then(() => {
    ;(el as any).instance.$el.classList.remove('come-out')
    el.removeChild((el as any).instance.$el)
  })
}

export default loadingDirective
