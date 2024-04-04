/*
 * @Date: 2024-04-04 20:25:00
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:30:27
 * @FilePath: \server-monitor\src\renderer\src\views\dashboard\page.ts
 * @Description: True or False
 */

import { IRouterConfig } from '@renderer/typings/vue-router'

const config: IRouterConfig = {
  name: 'Dashboard',
  path: 'dashboard',
  meta: {
    icon: 'ri-home-6-fill',
    menuItem: true,
    title: 'menu.dashboard',
    menuIndex: 0
  },
  parent: 'home',
  component: () => import('./index.vue')
}

export default config
