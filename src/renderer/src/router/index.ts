/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:39:51
 * @FilePath: \server-monitor\src\renderer\src\router\index.ts
 * @Description: True or False
 */
import { IRouterConfig } from '@renderer/typings/vue-router'
import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

/**
 * @description:  查找根路由
 * @param {IRouterConfig} routeConfigList
 * @return {*}
 */
const findRootRoute = (routeConfigList: IRouterConfig[]) => {
  return routeConfigList.filter((route) => !route.parent)
}

/**
 * @description:  根据配置构造路由
 * @param {IRouterConfig} routeConfig
 * @return {*}
 */
const buildRouteFromConfig = (routeConfig: IRouterConfig) => {
  return {
    name: routeConfig.name,
    path: routeConfig.path,
    component: routeConfig.component,
    meta: routeConfig.meta
  }
}

/**
 * @description:  构造子路由
 * @param {IRouterConfig} par
 * @param {IRouterConfig} list
 * @return {*}
 */
const buildRouteChildren = (par: IRouterConfig, list: IRouterConfig[]) => {
  // 构造子路由 并 按照 menuIndex 排序
  const children = list
    .filter((route) => route.parent === par.name)
    .sort((a, b) => a.meta.menuIndex - b.meta.menuIndex)
  children.length && console.log(children)
  if (children.length) {
    return children.map((child) => {
      const childRoute = buildRouteFromConfig(child)
      const childrenProp = { children: buildRouteChildren(child, list) }
      const redirectProp = child.redirect ? { redirect: child.redirect } : {}
      return Object.assign(childRoute, childrenProp, redirectProp)
    })
  }
  return []
}

/**
 * @description:  根据模块动态生成路由
 * @param {*}
 * @return {*}
 */
const createRoutesByModules = () => {
  const pages: Record<string, IRouterConfig> = import.meta.glob('../views/**/page.ts', {
    eager: true,
    import: 'default'
  })
  const routes: RouteRecordRaw[] = []
  const roots = findRootRoute(Object.values(pages))
  roots.forEach((root) => {
    const route = buildRouteFromConfig(root)
    const childrenProp = { children: buildRouteChildren(root, Object.values(pages)) }
    const redirectProp = root.redirect ? { redirect: root.redirect } : {}
    const fullRoute = Object.assign(route, childrenProp, redirectProp)
    routes.push(fullRoute)
  })
  return routes
}

const router = createRouter({
  history: createWebHashHistory(), // 特别注意：electron 环境下请使用
  routes: createRoutesByModules()
})

const setupRouter = () => {
  return router
}

export { router, setupRouter }
