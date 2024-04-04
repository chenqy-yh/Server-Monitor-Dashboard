/*
 * @Date: 2023-12-26 23:39:10
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 13:27:34
 * @FilePath: \server-monitor\src\main\model\menu\index.ts
 * @Description: True or False
 */
import { MenuItem, MenuItemConstructorOptions } from 'electron'

type MenuTemplate = (MenuItemConstructorOptions | MenuItem)[]

const copySelectedText = new MenuItem({
  label: 'Copy',
  role: 'copy'
})

const terminal_contextmenu: MenuTemplate = [
  {
    label: 'Close',
    // 点击返回hello
    click: function () {
      return 'hello'
    }
  }
]

const default_contextmenu: MenuTemplate = [copySelectedText]

const firewall_contextmenu: MenuTemplate = [copySelectedText]

const file_index_contextmenu: MenuTemplate = [
  {
    label: 'Open',
    click: function () {
      return 'open'
    }
  },
  {
    label: 'Delete',
    click: function () {
      return 'delete'
    }
  },
  {
    label: 'Copy',
    click: function () {
      return 'copy'
    }
  }
]

const MenuContextMap = new Map<MenuContextKey, MenuTemplate>()

MenuContextMap.set('default', default_contextmenu)
MenuContextMap.set('/firewall', firewall_contextmenu)
MenuContextMap.set('/terminal', terminal_contextmenu)
MenuContextMap.set('/file', file_index_contextmenu)

export { MenuContextMap }
