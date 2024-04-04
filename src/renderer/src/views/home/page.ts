/*
 * @Date: 2024-04-04 20:53:41
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 20:54:31
 * @FilePath: \server-monitor\src\renderer\src\views\home\page.ts
 * @Description: True or False
 */
import { RouteRecordRaw } from 'vue-router'

const config: RouteRecordRaw = {
  name: 'home',
  path: '/',
  component: () => import('./index.vue'),
  redirect: '/dashboard'
}

export default config
