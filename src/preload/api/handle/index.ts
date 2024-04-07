/*
 * @Date: 2023-12-26 22:24:54
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 19:53:17
 * @FilePath: \server-monitor\src\preload\api\handle\index.ts
 * @Description: True or False
 */
import { ipcRenderer } from 'electron'

const ipcInvoke = <T = unknown>(channel: HandleChannel, ...args: unknown[]) => {
  return ipcRenderer.invoke(channel, ...args) as T
}

/**
 * @description: 通用方法
 * @return {*}
 */
const CommonMethodMap: MethodMap<HandleChannel> = {
  openWindow: { channel: 'open-window', params: ['url', 'hash'] }
}

/**
 * @description: 服务器方法
 * @return {*}
 */
const ServerMethodMap: MethodMap<HandleChannel> = {
  ping: { channel: 'ping', params: ['url'] },
  getServerInfo: { channel: 'os:info', params: ['url'] },
  createWsService: { channel: 'ws:cws', params: ['url'] },
  getServerLog: { channel: 'log:info', params: ['url', 'type', 'page', 'size'] }
}

/**
 * @description: 防火墙方法
 * @return {*}
 */
const FirewallMethodMap: MethodMap<HandleChannel> = {
  descInsList: { channel: 'tc:ins:list', params: ['parms'] },
  descFirewallRules: { channel: 'tc:firewall:rules', params: ['params'] },
  modifyFirewallRules: { channel: 'tc:firewall:modify', params: ['params'] },
  addFirewallRules: { channel: 'tc:firewall:add', params: ['params'] },
  modifyFirewallRuleDescription: { channel: 'tc:firewall:modify:desc', params: ['params'] },
  deleteFirewallRules: { channel: 'tc:firewall:delete', params: ['params'] },
  delFirewallRules: { channel: 'tc:firewall:rule:del', params: ['params'] }
}

/**
 * @description: 文件方法
 * @return {*}
 */
const FileWallMethodMap: MethodMap<HandleChannel> = {
  getFileList: { channel: 'file:list', params: ['url', 'path', 'filter'] },
  getFilePath: { channel: 'file:path', params: [] },
  getFileContent: { channel: 'file:content', params: ['url', 'path'] },
  saveFileContent: { channel: 'file:save', params: ['url', 'path', 'content'] },
  findEditorWindow: { channel: 'file:editor:find', params: ['win_id'] },
  getWinId: { channel: 'get-win-id', params: [] },
  delFile: { channel: 'file:del', params: ['url', 'path'] },
  copyFile: { channel: 'file:copy', params: ['url', 'src', 'dest'] },
  moveFile: { channel: 'file:move', params: ['url', 'src', 'dest'] },
  mkdir: { channel: 'file:mkdir', params: ['url', 'path'] },
  mkfile: { channel: 'file:mkfile', params: ['url', 'path'] },
  uploadFile: { channel: 'file:upload', params: ['url', 'path', 'formData'] },
  test: { channel: 'file:test', params: [] },
  mergeChunk: { channel: 'file:merge', params: ['url', 'path', 'formData'] },
  queryFinishedChunk: {
    channel: 'file:query-finished-chunk',
    params: ['url', 'path', 'hash', 'total']
  }
}

/**
 *  @description:  腾讯轻量云实例方法
 *
 */
const TLHInstanceMethodMap: MethodMap<HandleChannel> = {
  getTLHInstanceList: { channel: 'tlh:instance:list', params: ['apiid', 'apikey', 'region'] }
}

const methodMap: MethodMap<HandleChannel> = {
  ...CommonMethodMap,
  ...ServerMethodMap,
  ...FirewallMethodMap,
  ...FileWallMethodMap,
  ...TLHInstanceMethodMap
}

/**
 * @description:  设置api
 * @param {any} api
 * @return {*}
 */
const setupHandleApi = (api: any) => {
  for (const methodName in methodMap) {
    api[methodName] = (...args) => {
      const channel = methodMap[methodName].channel
      const params = methodMap[methodName].params.map((_, index) => args[index])
      return ipcInvoke(channel, ...params)
    }
  }
}

export { setupHandleApi }
