import { BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

const windowSet = {}

// main
windowSet['mainWindow'] = () =>
  new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

// add firewall window
windowSet['addFirewallWin'] = () =>
  new BrowserWindow({
    width: 1280,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

export { windowSet }
