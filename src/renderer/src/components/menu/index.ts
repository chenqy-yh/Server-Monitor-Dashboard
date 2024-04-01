import { router } from '@renderer/router'
import { RouteRecordRaw } from 'vue-router'

class Menu implements IMenu {
  menu_tree: RouteRecordRaw[] = []
  constructor() {
    this._init()
  }

  _init() {
    const routes = router.getRoutes()
    for (const route of routes) {
      if (route.meta.menuItem) {
        this.menu_tree.push(route)
      }
    }
  }
}

let menu_ins

export default () => {
  if (!menu_ins) {
    menu_ins = new Menu()
  }
  return menu_ins
}
