/*
 * @Date: 2024-04-05 22:31:06
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 13:34:17
 * @FilePath: \server-monitor\src\renderer\src\views\login\page.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'
export default {
  path: '/login',
  name: 'Login',
  meta: {
    icon: 'ri-login-box-line',
    title: 'menu.login',
    parRoute: 'home'
  },
  component: () => import('./index.vue')
} as IRouterConfig
