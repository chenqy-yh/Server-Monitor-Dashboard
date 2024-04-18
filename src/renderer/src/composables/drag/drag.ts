/*
 * @Date: 2024-04-01 14:56:25
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 20:45:26
 * @FilePath: \server-monitor\src\renderer\src\composables\drag\drag.ts
 * @Description: True or False
 */
import { useListenerRegister } from '@renderer/composables/listener'

class Drag {
  private move_flag = ref(false)
  private move_position = ref({ x: 0, y: 0 })

  private down_handler
  private move_handler
  private up_handler

  private listenerRegister = useListenerRegister()
  install(el: HTMLElement, onMove: (dx: number, dy: number) => void, onEnd?: () => void) {
    this.down_handler = (e) => {
      this.move_flag.value = true
      this.move_position.value = {
        x: e.clientX,
        y: e.clientY
      }
      document.documentElement.style.cursor = 'move'
    }
    this.move_handler = (e) => {
      if (this.move_flag.value) {
        const move_x = e.clientX - this.move_position.value.x
        const move_y = e.clientY - this.move_position.value.y
        onMove(move_x, move_y)
      }
    }
    this.up_handler = () => {
      this.move_flag.value = false
      document.documentElement.style.cursor = 'default'
      onEnd && onEnd()
    }

    this.listenerRegister.addListener(
      {
        key: 'mousemove',
        el: document,
        listener: this.move_handler
      },
      {
        key: 'mouseup',
        el: document,
        listener: this.up_handler
      },
      {
        key: 'mousedown',
        el: el,
        listener: this.down_handler
      }
    )
  }

  uninstall() {
    this.listenerRegister.clearListener()
  }
}

export { Drag }
