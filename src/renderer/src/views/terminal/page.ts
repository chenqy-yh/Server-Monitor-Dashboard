/*
 * @Date: 2024-04-04 20:59:02
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:21:50
 * @FilePath: \Spirit-client\src\renderer\src\views\terminal\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'
export default {
  name: 'terminal',
  path: '/terminal',
  meta: {
    icon: 'ri-terminal-box-fill',
    menuItem: true,
    title: 'menu.terminal',
    menuIndex: 1,
    parRoute: 'Detail',
    belongToMenu: 'instance-detail'
  },
  component: () => import('./index.vue')
} as IRouterConfig
