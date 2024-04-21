/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 19:22:03
 * @FilePath: \Spirit-client\src\renderer\src\typings\vue-router.d.ts
 * @Description: True or False
 */
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    menuItem?: boolean
    active?: boolean
    // keepAlive?: boolean
    menuIndex?: number
    parMenu?: string
    parRoute?: string
    belongToMenu?: string
  }
}

interface IRouterConfig {
  name: string
  path: string
  component: any
  meta?: RouteMeta
  redirect?: string
}
