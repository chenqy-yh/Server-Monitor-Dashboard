import { ref } from 'vue'
import { useEventListener } from './event-listener'

const useMouse = () => {
  const x = ref(0)
  const y = ref(0)
  const update = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  useEventListener('mousemove', window, update)
  return { x, y }
}

export { useMouse }
