/*
 * @Date: 2024-03-29 15:27:03
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-29 15:37:28
 * @FilePath: \server-monitor\src\renderer\src\directive\enter.ts
 * @Description: True or False
 */
import { Directive } from 'vue'

const enterDirective: Directive = {
  mounted(el, binding) {
    const handler = binding.value
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        //判断处于激活状态的元素是否是当前元素或者当前元素的子元素
        if (document.activeElement === el || el.contains(document.activeElement)) handler()
      }
    })
  },
  unmounted(el, binding) {
    const handler = binding.value
    window.removeEventListener('keydown', handler)
  }
}

export default enterDirective
