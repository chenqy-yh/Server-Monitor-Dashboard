/*
 * @Date: 2023-12-26 22:24:59
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 22:18:54
 * @FilePath: \server-monitor\src\preload\api\on\index.ts
 * @Description: True or False
 */
import { ipcRenderer } from 'electron'

const methodMap: MethodMap<SendChannel> = {
  appFullScreen: {
    channel: 'app-full-screen',
    params: ['isFullScreen', 'width', 'height']
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
    params: ['move_x', 'move_y', 'width', 'height', 'isFullScreen']
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
  },
  winClose: {
    channel: 'win-close',
    params: []
  },
  editorOpenFile: {
    channel: 'editor-open-file:main',
    params: ['winId', 'filePath', 'fileSize']
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
