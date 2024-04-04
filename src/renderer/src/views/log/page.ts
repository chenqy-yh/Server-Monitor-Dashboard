import { IRouterConfig } from '@renderer/typings/vue-router'

/*
 * @Date: 2024-04-04 21:01:25
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:32:17
 * @FilePath: \server-monitor\src\renderer\src\views\log\page.ts
 * @Description: True or False
 */
export default {
  name: 'log',
  path: 'log',
  meta: {
    icon: 'ri-file-list-3-fill',
    menuItem: true,
    title: 'menu.log',
    menuIndex: 4
  },
  parent: 'home',
  component: () => import('./index.vue')
} as IRouterConfig
