/*
 * @Date: 2024-04-17 22:04:27
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-17 22:05:57
 * @FilePath: \Spirit-client\src\renderer\src\views\test\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'test',
  path: '/test',
  meta: {
    icon: 'ri-shield-cross-fill',
    menuItem: true,
    title: 'menu.test',
    menuIndex: 3,
    permission: ['detail'],
    parRoute: 'Detail'
  },
  component: () => import('./index.vue')
} as IRouterConfig
