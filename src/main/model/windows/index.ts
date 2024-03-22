import { BrowserWindow } from 'electron'
import { join } from 'path'

type WindowKey = 'editor'

const windowMap = new Map<WindowKey, BrowserWindow>()

// const editorWindow =  new BrowserWindow({
//   width: 1024,
//   height: 768,
//   show: false,
//   // titleBarStyle: 'hidden',
//   title: 'Editor',
//   autoHideMenuBar: true,
//   resizable: false,
//   webPreferences: {
//     preload: join(__dirname, '../../../preload/index.js'),
//     sandbox: false
//   }
// })

// windowMap.set('editor', editorWindow)

export { windowMap }
export type { WindowKey }
