import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'setting',
  path: 'setting',
  meta: {
    icon: 'ri-settings-6-fill',
    menuItem: true,
    title: 'menu.setting',
    menuIndex: 5
  },
  parent: 'home',
  component: () => import('./index.vue')
} as IRouterConfig
