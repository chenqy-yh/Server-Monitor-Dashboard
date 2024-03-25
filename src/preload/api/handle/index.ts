/*
 * @Date: 2023-12-26 22:24:54
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 22:05:39
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
  getTencentInstanceInfo: { channel: 'tc:client:info:get', params: ['parms'] },
  getFirewallConfigList: { channel: 'tc:firewall:config:list', params: [] },
  setFirewallConfig: { channel: 'tc:firewall:config:set', params: ['config_str'] },
  deleteFirewallConfig: { channel: 'tc:firewall:config:del', params: ['config_str'] },
  delFirewallRules: { channel: 'tc:firewall:rule:del', params: ['params'] }
}

/**
 * @description: 文件方法
 * @return {*}
 */
const FileWallMethodMap: MethodMap<HandleChannel> = {
  getFileList: { channel: 'file:list', params: ['url', 'path'] },
  getFilePath: { channel: 'file:path', params: [] },
  getFileContent: { channel: 'file:content', params: ['url', 'path'] },
  saveFileContent: { channel: 'file:save', params: ['url', 'path', 'content'] },
  findEditorWindow: { channel: 'file:editor:find', params: ['win_id'] },
  getWinId: { channel: 'get-win-id', params: [] }
}

const methodMap: MethodMap<HandleChannel> = {
  ...CommonMethodMap,
  ...ServerMethodMap,
  ...FirewallMethodMap,
  ...FileWallMethodMap
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
