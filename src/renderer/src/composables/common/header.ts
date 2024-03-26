/*
 * @Date: 2024-03-24 22:33:02
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 23:55:22
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
    drag.setOptions({
      width: winSize[0],
      height: winSize[1],
      isFullScreen: isFullScreen.value
    })
    drag.install(el)
  }

  const fullScreen = async (width: number, height: number) => {
    isFullScreen.value = !isFullScreen.value
    drag.setOptions({
      width,
      height,
      isFullScreen: isFullScreen.value
    })
    window.api.appFullScreen(isFullScreen.value, width, height)
  }

  const exit = () => {
    window.api.winClose()
  }

  const onResize = (width: number, height: number) => {
    drag.setOptions({ width, height })
  }

  return {
    isFullScreen,
    installDrag,
    appMin,
    fullScreen,
    exit,
    onResize
  }
}

export { useHeader }
