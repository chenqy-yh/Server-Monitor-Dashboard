import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('../views/home/home.vue'),
      redirect: '/index',
      children: [
        {
          name: 'Index',
          path: 'index',
          meta: {
            icon: 'ri-home-6-fill',
            menuItem: true,
            title: 'menu.index'
          },
          component: () => import('../views/index/index.vue')
        },
        {
          name: 'terminal',
          path: 'terminal',
          meta: {
            icon: 'ri-terminal-box-fill',
            menuItem: true,
            title: 'menu.terminal',
            keepAlive: true
          },
          component: () => import('../views/terminal/terminal.vue')
        },
        {
          name: 'log',
          path: 'log',
          meta: {
            icon: 'ri-file-list-3-fill',
            menuItem: true,
            title: 'menu.log'
          },
          component: () => import('../views/log/log.vue')
        },
        {
          name: 'firewall',
          path: 'firewall',
          meta: {
            icon: 'ri-shield-cross-fill',
            menuItem: true,
            title: 'menu.firewall'
          },
          component: () => import('../views/firewall/firewall.vue')
        },
        {
          name: 'setting',
          path: 'setting',
          meta: {
            icon: 'ri-settings-6-fill',
            menuItem: true,
            title: 'menu.setting'
          },
          component: () => import('../views/setting/setting.vue')
        }
        // {
        //   name: 'test',
        //   path: 'test',
        //   meta: {
        //     icon: 'ri-settings-6-fill',
        //     menuItem: true,
        //     // title: i18n.global.t('menu.setting')
        //     title: 'menu.test'
        //   },
        //   component: () => import('../views/test/test.vue')
        // }
      ]
    }
  ]
})

const setupRouter = () => {
  // todo
  return router
}

export { router, setupRouter }
