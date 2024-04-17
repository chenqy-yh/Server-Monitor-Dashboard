/*
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-17 12:40:14
 * @FilePath: \Spirit-client\src\renderer\src\plugins\pinia\index.ts
 * @Description: True or False
 */
import { createPinia } from 'pinia'
import { App } from 'vue'

const setupPinia = (app: App) => {
  const pinia = createPinia()
  app.use(pinia)
}

export { setupPinia }
