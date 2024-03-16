import { onMounted, onUnmounted } from 'vue'

const useEventListener = (event: string, tar: HTMLElement | Window, listener: any) => {
  onMounted(() => {
    tar.addEventListener(event, listener)
  })
  onUnmounted(() => {
    tar.removeEventListener(event, listener)
  })
}

export { useEventListener }
