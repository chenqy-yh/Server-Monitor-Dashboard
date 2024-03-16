import { ipcRenderer } from 'electron'

const methodMap: MethodMap<SendChannel> = {
  appFullScreen: {
    channel: 'app-full-screen',
    params: []
  },
  appMin: {
    channel: 'app-min',
    params: []
  },
  appQuit: {
    channel: 'app-quit',
    params: []
  },
  winMove: {
    channel: 'win-move',
    params: ['move_x', 'move_y']
  },
  winResize: {
    channel: 'win-resize',
    params: ['width', 'height']
  },
  showContextMenu: {
    channel: 'context-menu',
    params: ['menu_key']
  },
  createNewWindow: {
    channel: 'new-window',
    params: ['url', 'winName']
  },
  updateTencentCredential: {
    channel: 'tencent-credential-update',
    params: ['secretId', 'secretKey']
  },
  updateTencentRegion: {
    channel: 'tencent-region-update',
    params: ['region']
  }
}

const setupOnApi = (api: any) => {
  for (const methodName in methodMap) {
    api[methodName] = (...args) => {
      const channel = methodMap[methodName].channel
      const params = methodMap[methodName].params.map((_, index) => args[index])
      ipcRenderer.send(channel, ...params)
    }
  }
}

export { setupOnApi }

// const ipcSend = (channel: SendChannel, ...args: unknown[]) => {
//   return ipcRenderer.send(channel, ...args)
// }

// /**
//  * 窗口全屏
//  *
//  * */
// const appFullScreen = () => {
//   ipcSend('app-full-screen')
// }

// /**
//  * 窗口最小化
//  *
//  * */
// const appMin = () => {
//   ipcSend('app-min')
// }

// /**
//  * 退出应用
//  *
//  * */
// const appQuit = () => {
//   ipcSend('app-quit')
// }

// /**
//  * 移动窗口
//  *
//  * */
// const winMove = (move_x: number, move_y: number) => {
//   ipcSend('win-move', move_x, move_y)
// }

// /**
//  * 调整窗口大小
//  *
//  * */
// const winResize = (width: number, height: number) => {
//   ipcSend('win-resize', width, height)
// }

// /**
//  * 展示右键菜单
//  *
//  * */
// const showContextMenu = async (menu_key?: string) => {
//   ipcSend('context-menu', menu_key ?? 'default')
// }

// /**
//  * 创建新窗口
//  *
//  * */
// const createNewWindow = (url: string, winName: string) => {
//   ipcSend('new-window', url, winName)
// }

// /**
//  * 更新腾讯云凭证
//  *
//  */
// const updateTencentCredential = (secretId: string, secretKey: string) => {
//   ipcSend('tencent-credential-update', secretId, secretKey)
// }

// /**
//  * 更新腾讯云地域
//  *
//  */
// const updateTencentRegion = (region: string) => {
//   ipcSend('tencent-region-update', region)
// }

// /**
//  * 设置 ipc on api
//  *
//  */
// const setupOnApi = (api: any) => {
//   api.showContextMenu = showContextMenu
//   api.winMove = winMove
//   api.winResize = winResize
//   api.appQuit = appQuit
//   api.appFullScreen = appFullScreen
//   api.appMin = appMin
//   api.createNewWindow = createNewWindow
//   api.updateTencentCredential = updateTencentCredential
//   api.updateTencentRegion = updateTencentRegion
// }
