class Explorer {
  active_path = ref<string>('')

  setPath(path: string) {
    this.active_path.value = path
  }
}

export { Explorer }
