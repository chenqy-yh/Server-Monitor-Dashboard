import { ref } from 'vue'

class Drag {
  private move_flag = ref(false)
  private move_position = ref({ x: 0, y: 0 })

  private down_handler
  private move_handler
  private up_handler
  private leave_handler

  install(el: HTMLElement) {
    this.down_handler = (e) => {
      this.move_flag.value = true
      this.move_position.value = {
        x: e.clientX,
        y: e.clientY
      }
    }
    this.move_handler = (e) => {
      if (this.move_flag.value) {
        const move_x = e.clientX - this.move_position.value.x
        const move_y = e.clientY - this.move_position.value.y
        window.api.winMove(move_x, move_y)
      }
    }
    this.up_handler = () => {
      this.move_flag.value = false
    }
    this.leave_handler = () => {
      this.move_flag.value = false
    }
    el.addEventListener('mousedown', this.down_handler)
    el.addEventListener('mousemove', this.move_handler)
    el.addEventListener('mouseup', this.up_handler)
    el.addEventListener('mouseleave', this.leave_handler)
  }

  uninstall(el: HTMLElement) {
    el.removeEventListener('mousedown', this.down_handler)
    el.removeEventListener('mousemove', this.move_handler)
    el.removeEventListener('mouseup', this.up_handler)
    el.removeEventListener('mouseleave', this.leave_handler)
  }
}

export { Drag }
