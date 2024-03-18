import { ipcMain } from 'electron'

const addIpcHandle = (channel: HandleChannel, handle: HandleCallback) => {
  ipcMain.handle(channel, handle)
}

export { addIpcHandle }
