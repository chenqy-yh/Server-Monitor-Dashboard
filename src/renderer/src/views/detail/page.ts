/*
 * @Date: 2024-04-04 20:53:41
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 15:09:17
 * @FilePath: \server-monitor\src\renderer\src\views\detail\page.ts
 * @Description: True or False
 */

import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'Detail',
  path: '/detail',
  meta: {
    icon: 'ri-server-line',
    title: 'menu.instances',
    parRoute: 'home'
  },
  redirect: '/dashboard',
  component: () => import('./index.vue')
} as IRouterConfig
