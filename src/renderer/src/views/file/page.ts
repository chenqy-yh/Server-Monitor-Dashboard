/*
 * @Date: 2024-04-04 21:00:26
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:22:01
 * @FilePath: \Spirit-client\src\renderer\src\views\file\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'File',
  path: '/file',
  meta: {
    icon: 'ri-file-copy-fill',
    menuItem: true,
    title: 'menu.file',
    menuIndex: 2,
    parRoute: 'Detail',
    belongToMenu: 'instance-detail'
  },
  component: () => import('./index.vue')
} as IRouterConfig
