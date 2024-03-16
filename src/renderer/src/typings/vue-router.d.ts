import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    menuItem?: boolean
    active?: boolean
    keepAlive?: boolean
  }
}
