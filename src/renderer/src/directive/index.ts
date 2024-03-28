import { App } from 'vue'
import LoadingDirective from './loading'
import ContextDirective from './context-menu/index'
import { Directive } from 'vue'

const setupDirectives = (app: App) => {
  app.directive('win-loading', LoadingDirective)
  app.directive('context-menu', ContextDirective)
}

export { setupDirectives }
