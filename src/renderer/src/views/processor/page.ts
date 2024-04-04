import { IRouterConfig } from '@renderer/typings/vue-router'

export default {
  name: 'processor',
  path: 'processor',
  meta: {
    icon: 'ri-flask-line',
    title: 'menu.test'
  },
  parent: 'home',
  component: () => import('./index.vue')
} as IRouterConfig
