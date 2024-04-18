/*
 * @Date: 2024-04-04 21:03:15
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 15:35:31
 * @FilePath: \server-monitor\src\renderer\src\views\setting\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'
export default {
  name: 'Setting',
  path: 'setting',
  meta: {
    icon: 'ri-settings-6-fill',
    title: 'menu.setting',
    parRoute: 'home'
  },
  component: () => import('./index.vue')
} as IRouterConfig
