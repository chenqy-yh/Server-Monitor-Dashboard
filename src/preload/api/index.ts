import { ipcRenderer } from 'electron'
import { setupHandleApi } from './handle'
import { setupOnApi } from './on'

const setupRendererOn = (api) => {
  api.onResponse = (fn) => {
    ipcRenderer.removeAllListeners('tasks.return')
    ipcRenderer.on('tasks.return', (event, ...args) => fn(...args))
  }
}

const setupApi = () => {
  const api = {}
  setupRendererOn(api)
  setupHandleApi(api)
  setupOnApi(api)
  return api
}

export { setupApi }
