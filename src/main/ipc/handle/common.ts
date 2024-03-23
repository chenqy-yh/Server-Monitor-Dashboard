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
    const parentWin = BrowserWindow.fromWebContents(_e.sender)
    const [winOptions, hash] = args
    if (!winOptions || !hash) {
      return CREATE_FAIL
    }
    const newWin = new BrowserWindow({
      ...(winOptions as BrowserWindowConstructorOptions),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      },
      parent: parentWin ?? undefined
    })
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      newWin.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#' + hash)
    } else {
      newWin.loadFile(join(__dirname, '../../renderer/index.html'), {
        hash: hash as string
      })
    }
    newWin.show()
    return winOptions
  } catch (error) {
    console.error(error)
    return CREATE_FAIL
  }
})

addIpcHandle('get-data', async (_e, ...args) => {
  const queryWin = BrowserWindow.fromWebContents(_e.sender)
  // const [x] = args
  // 获取现在所有窗口

  // return JSON.stringify(allWins)
})

addIpcHandle('request-data-from-child', async (_e, ...args) => {
  const requestWin = BrowserWindow.fromWebContents(_e.sender)
  if (!requestWin) {
    return
  }
  const parentWin = requestWin.getParentWindow()
  // x
})
