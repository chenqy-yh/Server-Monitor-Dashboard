import { setupPlugins } from '@renderer/plugins'
import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'

const bootStrap = async () => {
  const app = createApp(App)
  const router = setupRouter()
  app.use(router)
  await router.isReady()
  setupPlugins(app)
  app.mount('#app')
}

bootStrap()
