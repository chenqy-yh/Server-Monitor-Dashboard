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
