/*
 * @Date: 2024-04-18 11:00:25
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:22:38
 * @FilePath: \Spirit-client\src\renderer\src\views\detail-setting\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'detail-setting',
  path: '/detail-setting',
  meta: {
    icon: 'ri-settings-4-line',
    menuItem: true,
    title: 'menu.setting',
    menuIndex: 10,
    parRoute: 'Detail',
    belongToMenu: 'instance-detail'
  },
  component: () => import('./index.vue')
} as IRouterConfig
