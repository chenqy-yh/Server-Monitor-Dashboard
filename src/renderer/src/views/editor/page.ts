/*
 * @Date: 2024-04-07 23:23:33
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 23:23:48
 * @FilePath: \Spirit-client\src\renderer\src\views\editor\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'editor',
  path: '/editor',
  component: () => import('./index.vue')
} as IRouterConfig
