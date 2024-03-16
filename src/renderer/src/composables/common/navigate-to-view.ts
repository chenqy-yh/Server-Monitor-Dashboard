import { useRouter } from 'vue-router'

export function navigateTo(viewName: string) {
  const router = useRouter()
  router.push({
    name: 'file'
  })
}
