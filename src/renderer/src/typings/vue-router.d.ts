/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 13:52:25
 * @FilePath: \server-monitor\src\renderer\src\typings\vue-router.d.ts
 * @Description: True or False
 */
import 'vue-router'
import { type Permission } from '@renderer/store'

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    title?: string
    menuItem?: boolean
    active?: boolean
    keepAlive?: boolean
    menuIndex?: number
    permission?: Permission[]
    parMenu?: string
    parRoute?: string
  }
}

interface IRouterConfig {
  name: string
  path: string
  component: any
  meta?: RouteMeta
  redirect?: string
}
