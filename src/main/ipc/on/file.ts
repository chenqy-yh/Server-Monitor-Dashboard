import { IpcMainEvent, ipcMain } from 'electron'
import { getWindowById } from '../../utils/file'

// 获得主窗口返回的文件路径信息
ipcMain.on('emit-file-path', (_: IpcMainEvent, ...args: unknown[]) => {
  ipcMain.emit('get-file-path-ret', args[0])
})

ipcMain.on('editor-open-file:main', (_: IpcMainEvent, ...args: unknown[]) => {
  // 0 为editor window id
  // 1 为文件路径
  // 2 为文件大小
  // 3 为文件类型
  const win = getWindowById(parseInt(args[0] as string))
  win?.webContents.send('editor-open-file:renderer', ...args.slice(1))
})
