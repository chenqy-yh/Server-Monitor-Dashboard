/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 15:08:46
 * @FilePath: \server-monitor\src\renderer\src\components\menu\index.ts
 * @Description: True or False
 */
import { router } from '@renderer/router'
import { RouteRecordRaw } from 'vue-router'
import { usePermissionStore } from '@renderer/store'

class Menu implements IMenu {
  menu_tree: RouteRecordRaw[] = []

  constructor() {
    this._init()
  }

  /**
   * @description:  初始化
   * @return {*}
   */
  _init() {
    // 获取当前用户的权限
    const permissionStore = usePermissionStore()
    const permissions = permissionStore.getCurAllPermissions()
    // 获取所有路由
    const routes = router.getRoutes()
    const node_list: RouteRecordRaw[] = []
    // 过滤出有权限的路由
    for (const route of routes) {
      const havePermission = route.meta.permission?.every((item) => permissions.includes(item))
      if (route.meta.menuItem && havePermission) {
        node_list.push(route)
      }
    }
    this.sortList(node_list)
    // 构建菜单树
    for (const node of node_list) {
      if (node.meta && !node.meta.parMenu) {
        this.buildMenuTree(node, node_list)
        this.menu_tree.push(node)
      }
    }
  }

  /**
   * @description:  构建菜单树
   * @param {RouteRecordRaw} cur_node
   * @param {RouteRecordRaw[]} node_list
   * @return {*}
   */
  buildMenuTree(cur_node: RouteRecordRaw, node_list: RouteRecordRaw[]) {
    if (cur_node.children) {
      cur_node.children = node_list.filter((node) => node.meta?.parMenu === cur_node.name)
      this.sortList(cur_node.children)
      cur_node.children.forEach((node) => {
        this.buildMenuTree(node, node_list)
      })
    }
  }

  /**
   * @description:  排序
   * @param {RouteRecordRaw[]} list
   * @return {*}
   */
  sortList = (list: RouteRecordRaw[]) => {
    return list.sort((a, b) =>
      (a.meta?.menuIndex ?? Infinity) < (b.meta?.menuIndex ?? Infinity) ? -1 : 1
    )
  }

  /**
   * @description:  刷新菜单树
   * @return {*}
   */
  refresh() {
    this.menu_tree = []
    this._init()
  }
}

let menuInstance: Menu | null = null

export default () => {
  if (!menuInstance) {
    menuInstance = new Menu()
  }
  return menuInstance
}
