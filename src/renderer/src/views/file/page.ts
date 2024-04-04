/*
 * @Date: 2024-04-04 21:00:26
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:31:02
 * @FilePath: \server-monitor\src\renderer\src\views\file\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'file',
  path: 'file',
  meta: {
    icon: 'ri-file-copy-fill',
    menuItem: true,
    title: 'menu.file',
    menuIndex: 1
  },
  parent: 'home',
  component: () => import('./index.vue')
} as IRouterConfig
