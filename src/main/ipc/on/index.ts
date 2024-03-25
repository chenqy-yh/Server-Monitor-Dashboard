import './file'
import {
  BrowserWindow,
  IpcMainEvent,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  ipcMain,
  screen
} from 'electron'
import { MenuContextMap } from '../../model/menu/index'
import { closeWsService } from '../../utils/api'
import { updateClientCredential, updateClientRegion } from '../../utils/tencent/client'

// 全屏
ipcMain.on(
  'app-full-screen',
  (event: IpcMainEvent, isFullScreen: boolean, width: number, height: number) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    if (!isFullScreen) {
      win.setBounds({
        width: width,
        height: height
      })
      // 窗口居中
      win.center()
    } else {
      win.setBounds({
        x: 0,
        y: 0,
        width: screen.getPrimaryDisplay().workArea.width,
        height: screen.getPrimaryDisplay().workArea.height
      })
    }
  }
)
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

// 关闭窗口
ipcMain.on('win-close', (e) => {
  // 获取当前窗口
  const win = BrowserWindow.fromWebContents(e.sender)
  // 判断是否时主窗口
  if (win?.id === 1) {
    ipcMain.emit('app-quit')
  } else {
    // 关闭当前窗口
    win?.close()
  }
})

// 获得窗口 x y 坐标
ipcMain.on(
  'win-move',
  (
    event: IpcMainEvent,
    move_x: number,
    move_y: number,
    width: number,
    height: number,
    isFullScreen: boolean
  ) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    if (isFullScreen) return
    const [x, y] = win.getPosition()
    win.setBounds({
      x: x + move_x,
      y: y + move_y,
      width: width,
      height: height
    })
  }
)

// 调整窗口大小
ipcMain.on('win-resize', (event: IpcMainEvent, width: number, height: number) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  if (!win) return
  // setBounds
  win.setBounds({
    width: width,
    height: height
  })
  win.center()
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
