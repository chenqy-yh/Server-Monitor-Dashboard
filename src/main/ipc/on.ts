import {
  BrowserWindow,
  IpcMainEvent,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  ipcMain,
  screen
} from 'electron'
import { MenuContextMap } from '../model/menu/index'
import { store } from '../store'
import { closeWsService } from '../utils/api'
import { windowSet } from '../windows'
import { updateClientCredential, updateClientRegion } from '../utils/tencent/client'

type WinSize = {
  width: number
  height: number
}

const main_win_size = store.get('win-size') as unknown as WinSize

// 创建新窗口
ipcMain.on('new-window', (_: IpcMainEvent, url: string, win_name: string) => {
  // 创建一个新窗口
  const new_win = windowSet[win_name]()
  new_win.loadURL('http://localhost:5173' + url)
  new_win.on('ready-to-show', () => {
    new_win.show()
  })
})

let is_full_screen = false
// 全屏
ipcMain.on('app-full-screen', (event: IpcMainEvent) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  if (is_full_screen) {
    win.setBounds({
      width: main_win_size.width,
      height: main_win_size.height
    })
  } else {
    win.setBounds({
      width: screen.getPrimaryDisplay().workAreaSize.width,
      height: screen.getPrimaryDisplay().workAreaSize.height
    })
  }
  is_full_screen = !is_full_screen
  win.setFullScreen(is_full_screen)
})
// 关闭ws服务
ipcMain.on('ws-close', (_: IpcMainEvent, url: string, port: number) => {
  closeWsService(url, port)
})

// 最小化
ipcMain.on('app-min', (event: IpcMainEvent) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  win.minimize()
})

// 退出程序
ipcMain.on('app-quit', () => {
  BrowserWindow.getAllWindows().forEach((win) => {
    win.close()
  })
})

// 获得窗口 x y 坐标
ipcMain.on('win-move', (event: IpcMainEvent, move_x: number, move_y: number) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // check isFullScreen
  if (is_full_screen) return
  const [x, y] = win.getPosition()
  win.setBounds({
    x: x + move_x,
    y: y + move_y,
    width: main_win_size.width,
    height: main_win_size.height
  })
  // win.setPosition(x + move_x, y + move_y)
})

// 调整窗口大小
ipcMain.on('win-resize', (event: IpcMainEvent, width: number, height: number) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // update main_win_size
  main_win_size.width = width
  main_win_size.height = height
  // save main_win_size
  store.set('win-size', {
    width: width,
    height: height
  })
  // setBounds
  win.setBounds({
    width: width,
    height: height
  })
})

// 右键菜单
ipcMain.on('context-menu', (event: IpcMainEvent, menu_key: MenuContextKey) => {
  const hasKey = MenuContextMap.has(menu_key)
  const menu_template: (MenuItemConstructorOptions | MenuItem)[] =
    (hasKey ? MenuContextMap.get(menu_key) : MenuContextMap.get('default')) ?? []
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  const contextMenu = Menu.buildFromTemplate(menu_template)
  contextMenu.popup({ window: win })
})

// 更新腾讯云凭证
ipcMain.on('update-credential', (_: IpcMainEvent, secretId: string, secretKey: string) => {
  updateClientCredential(secretId, secretKey)
})

// 更新腾讯云地域
ipcMain.on('update-region', (_: IpcMainEvent, region: string) => {
  updateClientRegion(region)
})
