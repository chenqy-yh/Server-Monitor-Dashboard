/*
 * @Date: 2024-03-18 20:43:56
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 22:39:34
 * @FilePath: \server-monitor\src\main\ipc\handle\file.ts
 * @Description: True or False
 */
import { BrowserWindow, ipcMain } from 'electron'
import {
  getFileContent,
  getFileList,
  saveFileContent,
  copyFile,
  delFile
} from '../../utils/api/file'
import { addIpcHandle } from './utils'
import { handleEditorWindowFind } from '../../utils/file'

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
  mainWindow?.webContents.send('get-file-path')
  return await fileData
})

addIpcHandle('file:content', async (_e, ...args) => {
  const [url, path] = args
  return (await getFileContent(url, path)) as string
})

addIpcHandle('file:save', async (_e, ...args) => {
  const [url, path, content] = args
  return await saveFileContent(url, path, content)
})

addIpcHandle('file:editor:find', async (_e, ...args: unknown[]) => {
  const win_id = args[0] as number
  return handleEditorWindowFind(win_id)
})

addIpcHandle('get-win-id', async (_e, ...args) => {
  const win = BrowserWindow.fromWebContents(_e.sender)
  return win?.id
})

addIpcHandle('file:del', async (_e, ...args) => {
  const [url, path] = args
  return await delFile(url, path)
})

addIpcHandle('file:copy', async (_e, ...args) => {
  const [url, path, targetPath] = args
  return await copyFile(url, path, targetPath)
})
