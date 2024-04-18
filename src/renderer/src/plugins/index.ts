import { setupI18n } from './i18n'
import { setupPinia } from './pinia'
import { setupStyle } from './style'
import { App } from 'vue'


const setupPlugins = (app: App) => {
  setupI18n(app)
  setupPinia(app)
  setupStyle()
}

export { setupPlugins }
