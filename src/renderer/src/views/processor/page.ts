/*
 * @Date: 2024-04-04 21:03:51
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-06 22:13:30
 * @FilePath: \server-monitor\src\renderer\src\views\processor\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'processor',
  path: 'processor',
  meta: {
    icon: 'ri-flask-line',
    title: 'menu.test',
    parRoute: 'Detail'
  },
  parent: 'home',
  component: () => import('./index.vue')
} as IRouterConfig
