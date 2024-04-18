/*
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 20:47:08
 * @FilePath: \Spirit-client\src\renderer\src\plugins\i18n\index.ts
 * @Description: True or False
 */
import { createI18n } from 'vue-i18n'
import template from './index.json'
import { App } from 'vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: template
})

const setupI18n = (app: App) => {
  app.use(i18n)
}

export { setupI18n, i18n }
