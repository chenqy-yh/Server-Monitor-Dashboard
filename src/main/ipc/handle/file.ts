/*
 * @Date: 2024-03-18 20:43:56
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 00:23:58
 * @FilePath: \server-monitor\src\main\ipc\handle\file.ts
 * @Description: True or False
 */
import { BrowserWindow, ipcMain } from 'electron'
import {
  getFileContent,
  getFileList,
  saveFileContent,
  copyFile,
  delFile,
  moveFile,
  mkdir,
  mkfile,
  uploadFile,
  test,
  mergeChunk
} from '../../utils/api/file'
import { addIpcHandle } from './utils'
import { handleEditorWindowFind } from '../../utils/file'

addIpcHandle('file:list', async (_e, ...args) => {
  const [url, path, filter] = args
  return await getFileList(url, path, filter)
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

addIpcHandle('file:move', async (_e, ...args) => {
  const [url, path, targetPath] = args
  return await moveFile(url, path, targetPath)
})

addIpcHandle('file:mkdir', async (_e, ...args) => {
  const [url, path] = args
  return await mkdir(url, path)
})

addIpcHandle('file:mkfile', async (_e, ...args) => {
  const [url, path] = args
  return await mkfile(url, path)
})

// const formData = {
//   buf: buf,
//   hash: new ArrayBuffer(),
//   filename: file.name,
//   index: index,
//   chunk_hash: file_hash + '-' + index,
//   total: file_chunk_list.length
// }

addIpcHandle('file:upload', async (_e, ...args) => {
  const [url, path, formData] = args
  const blob = bufToBlob((formData as any).buf)
  const data = new FormData()
  data.set('file', blob, (formData as any).filename)
  data.set('hash', (formData as any).hash)
  data.set('index', (formData as any).index)
  data.set('chunk_hash', (formData as any).chunk_hash)
  data.set('total', (formData as any).total)
  return await uploadFile(url, path, data)
})

// hash: file_hash,
//       filename: file.name,
//       total: chunkSize
addIpcHandle('file:merge', async (_e, ...args) => {
  const [url, path, formData] = args
  return await mergeChunk(url, path, formData)
})

addIpcHandle('file:test', async (_e, ...args) => {
  return await test()
})

const bufToBlob = (buf: ArrayBuffer) => {
  return new Blob([buf], { type: 'application/octet-stream' })
}
