/*
 * @Date: 2023-12-21 23:40:23
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-08 18:55:47
 * @FilePath: \Spirit-client\src\renderer\src\main.ts
 * @Description: True or False
 */
import { setupPlugins } from '@renderer/plugins'
import App from './App.vue'
import { setupRouter } from './router'
import { setupDirectives } from '@renderer/directive'

const bootStrap = async () => {
  const app = createApp(App)
  const router = setupRouter()
  app.use(router)
  await router.isReady()
  setupPlugins(app)
  setupDirectives(app)
  app.mount('#app')
}

bootStrap()
