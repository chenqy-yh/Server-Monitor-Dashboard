/*
 * @Date: 2024-03-29 15:27:03
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 20:45:50
 * @FilePath: \Spirit-client\src\renderer\src\directive\enter\index.ts
 * @Description: True or False
 */
import { Directive } from 'vue'

const enterDirective: Directive = {
  mounted(el, binding) {
    const handler = binding.value
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        //判断处于激活状态的元素是否是当前元素或者当前元素的子元素
        if (document.activeElement === el || el.contains(document.activeElement)) handler()
      }
    })
  },
  unmounted(el, binding) {
    const handler = binding.value
    el.removeEventListener('keydown', handler)
  }
}

export default enterDirective
