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
  },
  emitFilePath: {
    channel: 'emit-file-path',
    params: ['path']
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
