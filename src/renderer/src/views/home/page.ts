/*
 * @Date: 2024-04-07 14:08:32
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 14:08:59
 * @FilePath: \server-monitor\src\renderer\src\views\home\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

const config: IRouterConfig = {
  name: 'home',
  path: '/',
  redirect: '/login',
  component: () => import('./index.vue')
}

export default config
