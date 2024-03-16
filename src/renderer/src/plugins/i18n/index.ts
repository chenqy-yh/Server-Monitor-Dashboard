import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import template from './index.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: template
})

const setupI18n = (app: App) => {
  app.use(i18n)
}

export { setupI18n, i18n }
