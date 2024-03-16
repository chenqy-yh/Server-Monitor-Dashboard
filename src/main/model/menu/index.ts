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

const MenuContextMap = new Map<MenuContextKey, MenuTemplate>()

MenuContextMap.set('default', default_contextmenu)
MenuContextMap.set('/firewall', firewall_contextmenu)
MenuContextMap.set('/terminal', terminal_contextmenu)

export { MenuContextMap }
