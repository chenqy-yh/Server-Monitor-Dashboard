/*
 * @Date: 2024-03-23 10:50:37
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 22:05:14
 * @FilePath: \server-monitor\src\main\ipc\handle\common.ts
 * @Description: True or False
 */
import { BrowserWindow, BrowserWindowConstructorOptions, session } from 'electron'
import { is } from '../../index'
import { addIpcHandle } from './utils'
// import { windowMap, WindowKey } from '../../model/windows'
import { join } from 'path'

const CREATE_SUCCESS = 1
const CREATE_FAIL = 0

// 新开窗口
addIpcHandle('open-window', async (_e, ...args) => {
  try {
    const [winOptions, hash] = args
    if (!winOptions || !hash) {
      return CREATE_FAIL
    }
    const newWin = new BrowserWindow({
      ...(winOptions as BrowserWindowConstructorOptions),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      newWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#' + hash)
    } else {
      newWin.loadFile(join(__dirname, '../../renderer/index.html'), {
        hash: hash as string
      })
    }
    newWin.show()
    newWin.center()
    return newWin.id
  } catch (error) {
    console.error(error)
    return CREATE_FAIL
  }
})
