/*
 * @Date: 2024-04-04 20:59:02
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:31:25
 * @FilePath: \server-monitor\src\renderer\src\views\terminal\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'terminal',
  path: 'terminal',
  meta: {
    icon: 'ri-terminal-box-fill',
    menuItem: true,
    title: 'menu.terminal',
    menuIndex: 2
  },
  parent: 'home',
  component: () => import('./index.vue')
} as IRouterConfig
