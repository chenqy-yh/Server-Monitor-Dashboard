import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    menuItem?: boolean
    active?: boolean
    keepAlive?: boolean
    menuIndex?: number
  }
}

interface IRouterConfig {
  name: string
  path: string
  component: any
  meta?: RouteMeta
  parent?: string
  redirect?: string
}
