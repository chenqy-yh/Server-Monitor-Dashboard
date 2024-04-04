/*
 * @Date: 2023-12-26 22:25:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 18:59:29
 * @FilePath: \server-monitor\src\preload\api\index.ts
 * @Description: True or False
 */
import { ipcRenderer } from 'electron'
import { setupHandleApi } from './handle'
import { setupOnApi } from './on'

const setupRendererOn = (api) => {
  api.onResponse = (eventKey, fn) => {
    ipcRenderer.removeAllListeners(eventKey)
    ipcRenderer.on(eventKey, (event, ...args) => fn(...args))
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
