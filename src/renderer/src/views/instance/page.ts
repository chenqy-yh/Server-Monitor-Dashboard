/*
 * @Date: 2024-04-06 14:10:50
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 13:38:07
 * @FilePath: \server-monitor\src\renderer\src\views\instance\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'instances',
  path: '/instances',
  meta: {
    icon: 'ri-server-line',
    title: 'menu.instances',
    permission: ['instances'],
    parRoute: 'home'
  },
  component: () => import('./index.vue')
} as IRouterConfig
