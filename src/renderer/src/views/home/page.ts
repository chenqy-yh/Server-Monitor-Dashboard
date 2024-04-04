/*
 * @Date: 2024-04-04 20:53:41
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:41:01
 * @FilePath: \server-monitor\src\renderer\src\views\home\page.ts
 * @Description: True or False
 */

import { IRouterConfig } from '@renderer/typings/vue-router'

const config: IRouterConfig = {
  name: 'home',
  path: '/',
  redirect: '/dashboard',
  component: () => import('./index.vue')
}

export default config
