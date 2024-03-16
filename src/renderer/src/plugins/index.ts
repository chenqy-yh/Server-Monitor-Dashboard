import { App } from 'vue'
import { setupPinia } from './pinia'
import { setupTerminal } from './terminal'
import { setupStyle } from './style'
import { setupI18n } from './i18n'


const setupPlugins = (app: App) => {
  setupI18n(app)
  setupPinia(app)
  setupTerminal(app)
  setupStyle()
}

export { setupPlugins }
