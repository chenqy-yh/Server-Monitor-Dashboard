/*
 * @Date: 2024-03-24 22:33:02
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-05 22:13:12
 * @FilePath: \server-monitor\src\renderer\src\composables\header\header.ts
 * @Description: True or False
 */
import { Drag } from '@renderer/composables/drag/drag'
import { usePersonalSettingStore } from '@renderer/store'

const useHeader = () => {
  // -------------------- S T O R E -------------------- //

  const personalStore = usePersonalSettingStore()

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
      const win_size = personalStore.getWinSizeVal()
      window.api.winMove(dx, dy, win_size[0], win_size[1], isFullScreen.value)
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
