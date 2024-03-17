import { App } from 'vue'
import { setupI18n } from './i18n'
import { setupPinia } from './pinia'
import { setupStyle } from './style'

const setupPlugins = (app: App) => {
  setupI18n(app)
  setupPinia(app)
  setupStyle()
}

export { setupPlugins }
