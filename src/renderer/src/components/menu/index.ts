/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:47:26
 * @FilePath: \Spirit-client\src\renderer\src\components\menu\index.ts
 * @Description: True or False
 */
import { router } from '@renderer/router'
import { RouteRecordRaw } from 'vue-router'

class Menu {
  private menu_tree: RouteRecordRaw[] = []

  private menuType: string

  constructor(menuType: string) {
    this.menuType = menuType
    this._init()
  }

  /**
   * @description:  初始化
   * @return {*}
   */
  _init() {
    // 获取所有路由
    const routes = router.getRoutes()
    const node_list: RouteRecordRaw[] = []
    for (const route of routes) {
      const isBelonged = route.meta.belongToMenu === this.menuType
      if (route.meta.menuItem && isBelonged) {
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

  getMenu() {
    return this.menu_tree
  }
}

const menuInstanceMap = new Map<string, Menu>()

export { Menu }

export default (menuType: string) => {
  if (!menuInstanceMap.has(menuType)) {
    menuInstanceMap.set(menuType, new Menu(menuType))
  }
  return menuInstanceMap.get(menuType)!
}
