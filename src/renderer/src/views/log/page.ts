/*
 * @Date: 2024-04-04 21:01:25
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 19:43:37
 * @FilePath: \Spirit-client\src\renderer\src\views\log\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'
export default {
  name: 'log',
  path: '/log',
  meta: {
    icon: 'ri-file-list-3-fill',
    menuItem: true,
    title: 'menu.log',
    menuIndex: 4,
    parRoute: 'Detail',
    belongToMenu: 'instance-detail'
  },
  component: () => import('./index.vue')
} as IRouterConfig
