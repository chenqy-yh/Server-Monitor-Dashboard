import { IpcMainInvokeEvent } from 'electron'
import { createWsService, getServerInfo, getServerLog, pingServer } from '../../utils/api'
import { addIpcHandle } from './utils'

// test
addIpcHandle('ping', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [url] = args
  return pingServer(url)
})

// os
addIpcHandle('os:info', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  // from args get baseurl
  const [url] = args
  return getServerInfo(url)
})

// ws
addIpcHandle('ws:cws', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  // from args get baseurl
  const [url] = args
  return createWsService(url)
})

// log
addIpcHandle('log:info', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [url, type, page, size] = args
  return getServerLog(url, type, page, size as unknown as number)
})
