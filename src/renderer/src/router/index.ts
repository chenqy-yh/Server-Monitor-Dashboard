import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // 特别注意：electron 环境下请使用 createWebHashHistory
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
          component: () => import('../views/index/dashbard.vue')
        },
        {
          name: 'terminal',
          path: 'terminal',
          meta: {
            icon: 'ri-terminal-box-fill',
            menuItem: true,
            title: 'menu.terminal'
          },
          component: () => import('../views/terminal/terminal.vue')
        },
        {
          name: 'file',
          path: 'file',
          meta: {
            icon: 'ri-file-copy-fill',
            menuItem: true,
            title: 'menu.file'
          },
          component: () => import('../views/file/file.vue')
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
        },
        {
          name: 'test',
          path: 'test',
          meta: {
            icon: 'ri-flask-line',
            menuItem: true,
            title: 'menu.test'
          },
          component: () => import('../views/test/test.vue')
        },
        {
          name: 'processor',
          path: 'processor',
          meta: {
            icon: 'ri-flask-line',
            title: 'menu.test'
          },
          component: () => import('../views/index/processor.vue')
        }
      ]
    }
  ]
})

const setupRouter = () => {
  // todo
  return router
}

export { router, setupRouter }
