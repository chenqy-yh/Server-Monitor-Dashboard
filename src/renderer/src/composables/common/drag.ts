/*
 * @Date: 2024-03-10 14:42:36
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 22:32:38
 * @FilePath: \server-monitor\src\renderer\src\composables\common\drag.ts
 * @Description: True or False
 */
// import { ref } from 'vue'

// class Drag {
//   private move_flag = ref(false)
//   private move_position = ref({ x: 0, y: 0 })
//   private win_width = ref(0)
//   private win_height = ref(0)
//   private isFullScreen = ref(false)

//   private down_handler
//   private move_handler
//   private up_handler

//   setOptions(options: { width?: number; height?: number; isFullScreen?: boolean }) {
//     options.width && (this.win_width.value = options.width)
//     options.height && (this.win_height.value = options.height)
//     this.isFullScreen.value = options.isFullScreen || false
//   }

//   install(el: HTMLElement) {
//     this.down_handler = (e) => {
//       this.move_flag.value = true
//       this.move_position.value = {
//         x: e.clientX,
//         y: e.clientY
//       }
//       document.documentElement.style.cursor = 'move'
//     }
//     this.move_handler = (e) => {
//       if (this.move_flag.value) {
//         const move_x = e.clientX - this.move_position.value.x
//         const move_y = e.clientY - this.move_position.value.y
//         window.api.winMove(
//           move_x,
//           move_y,
//           this.win_width.value,
//           this.win_height.value,
//           this.isFullScreen.value
//         )
//       }
//     }
//     this.up_handler = () => {
//       this.move_flag.value = false
//       document.documentElement.style.cursor = 'default'
//     }

//     el.addEventListener('mousedown', this.down_handler)
//     document.addEventListener('mousemove', this.move_handler)
//     document.addEventListener('mouseup', this.up_handler)
//   }

//   uninstall(el: HTMLElement) {
//     el.removeEventListener('mousedown', this.down_handler)
//     document.removeEventListener('mousemove', this.move_handler)
//     document.removeEventListener('mouseup', this.up_handler)
//   }
// }

// export { Drag }

import { ref } from 'vue'

class Drag {
  private move_flag = ref(false)
  private move_position = ref({ x: 0, y: 0 })

  private down_handler
  private move_handler
  private up_handler

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

    el.addEventListener('mousedown', this.down_handler)
    document.addEventListener('mousemove', this.move_handler)
    document.addEventListener('mouseup', this.up_handler)
  }

  uninstall(el: HTMLElement) {
    el.removeEventListener('mousedown', this.down_handler)
    document.removeEventListener('mousemove', this.move_handler)
    document.removeEventListener('mouseup', this.up_handler)
  }
}

export { Drag }
