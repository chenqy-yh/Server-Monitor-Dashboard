import hljs from 'highlight.js'; // 导入 highlight.js
import 'highlight.js/styles/vs2015.css'; // 选择适合您的代码高亮样式
import { App } from 'vue'

hljs.initHighlightingOnLoad()

function highlightCodeAndShowLineNumbers(el, binding) {
  // 获取代码块元素
  const blocks = el.querySelectorAll('pre code')

  // 循环处理每个代码块
  blocks.forEach((block) => {
    // 高亮代码块
    hljs.highlightElement(block)

    // 检查是否需要显示行号
    if (binding.value && binding.value.showLineNumbers) {
      // 获取代码块内容
      const code = block.innerText

      // 将代码块内容分割成行
      const lines = code.split('\n')

      // 创建包含行号的伪元素
      const lineNumberContainer = document.createElement('span')
      lineNumberContainer.className = 'number-container'

      // 循环创建并添加行号
      lines.forEach((_, index) => {
        const lineNumber = index + 1
        const lineNumberElement = document.createElement('span')
        lineNumberElement.className = 'line-number'
        lineNumberElement.textContent = lineNumber
        lineNumberContainer.appendChild(lineNumberElement)
      })

      // 将伪元素插入代码块前面
      block.parentNode.insertBefore(lineNumberContainer, block)
    } else {
      // 如果不需要显示行号，移除之前添加的行号伪元素
      const lineNumberContainer = block.previousElementSibling
      if (lineNumberContainer && lineNumberContainer.className === 'number-container') {
        lineNumberContainer.remove()
      }
    }
  })
}

export const setupCodeLineDirective = (app: App) => {
  app.directive('highlight', {
    mounted(el, binding) {
      // 初始化时调用
      highlightCodeAndShowLineNumbers(el, binding)
    },
    updated(el, binding) {
      // 更新时调用
      highlightCodeAndShowLineNumbers(el, binding)
    }
  })
}
