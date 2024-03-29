import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'
import { setupApi } from './api'

// Custom APIs for renderer
const api = setupApi()

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  console.log('contextIsolated')
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  console.log('not contextIsolated')
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
