import { ref } from 'vue'

class Explorer {
  private _active_path = ref<string>('')

  get path() {
    return this._active_path.value
  }

  set path(path: string) {
    this._active_path.value = path
  }
}

export { Explorer }
