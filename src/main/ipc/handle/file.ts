import { BrowserWindow, ipcMain } from 'electron'
import { getFileContent, getFileList } from '../../utils/api/file'
import { addIpcHandle } from './utils'

addIpcHandle('file:list', async (_e, ...args) => {
  const [url, path] = args
  return await getFileList(url, path)
})

addIpcHandle('file:path', async () => {
  ipcMain.removeAllListeners('get-file-path-ret')
  const fileData = new Promise((res) => {
    ipcMain.on('get-file-path-ret', (data) => {
      res(data)
    })
  })
  const mainWindow = BrowserWindow.getAllWindows().find((win) => win.id === 1)
  mainWindow?.webContents.send('tasks.return')
  return await fileData
})

addIpcHandle('file:content', async (_e, ...args) => {
  const [url, path] = args
  return (await getFileContent(url, path)) as string
})
