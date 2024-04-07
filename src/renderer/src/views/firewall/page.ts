/*
 * @Date: 2024-04-04 21:02:39
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 13:33:27
 * @FilePath: \server-monitor\src\renderer\src\views\firewall\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'firewall',
  path: '/firewall',
  meta: {
    icon: 'ri-shield-cross-fill',
    menuItem: true,
    title: 'menu.firewall',
    menuIndex: 3,
    permission: ['detail'],
    parRoute: 'Detail'
  },
  component: () => import('./index.vue')
} as IRouterConfig
