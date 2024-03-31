/*
 * @Date: 2024-03-24 22:33:02
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 22:14:44
 * @FilePath: \server-monitor\src\renderer\src\composables\common\header.ts
 * @Description: True or False
 */
import { Drag } from '@renderer/composables/common/drag'
import { ref } from 'vue'

const useHeader = (winSize: [number, number]) => {
  //----------------- C O N S T A N T ----------------- //
  const isFullScreen = ref(false) // 全屏状态

  const drag = new Drag() // 拖拽对象

  // ----------------- F U N C T I O N ----------------- //

  const appMin = () => {
    window.api.appMin()
  }

  const installDrag = (el: HTMLElement) => {
    if (!el) return
    drag.install(el, (dx, dy) => {
      window.api.winMove(dx, dy, winSize[0], winSize[1], isFullScreen.value)
    })
  }

  const fullScreen = async (width: number, height: number) => {
    isFullScreen.value = !isFullScreen.value
    window.api.appFullScreen(isFullScreen.value, width, height)
  }

  const exit = () => {
    window.api.winClose()
  }

  return {
    isFullScreen,
    installDrag,
    appMin,
    fullScreen,
    exit
  }
}

export { useHeader }
