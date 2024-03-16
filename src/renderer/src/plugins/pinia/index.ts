import { createPinia } from 'pinia'
import { App } from 'vue'

const setupPinia = (app: App) => {
  const pinia = createPinia()
  app.use(pinia)
}

export { setupPinia }
