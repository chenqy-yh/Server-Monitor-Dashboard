import { App } from 'vue'
import Loading from './loading'

const setupDirectives = (app: App) => {
  app.directive('win-loading', Loading)
}

export { setupDirectives }
