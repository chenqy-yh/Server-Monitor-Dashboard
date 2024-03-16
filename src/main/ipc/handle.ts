import { IpcMainInvokeEvent, ipcMain } from 'electron'
import { getServerInfo, pingServer, createWsService, getServerLog } from '../utils/api'
import {
  descInsList,
  // descFirewallRules,
  modifyFirewallRules,
  addFirewallRules,
  modifyFirewallRuleDescription
} from '../utils/tencent/api'

import { getClientInfo } from '../utils/tencent/client'
import {
  descFirewallRules,
  getFirewallConfig,
  setFirewallConfig,
  getFirewallConfigList,
  deleteFirewallConfig
} from '../utils/tencent/firewall'

const addIpcHandle = (channel: HandleChannel, handle: HandleCallback) => {
  ipcMain.handle(channel, handle)
}
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

// COS

// ins
addIpcHandle('tc:ins:list', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [parms] = args
  return descInsList(parms)
})

// firewall
addIpcHandle('tc:firewall:rules', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return descFirewallRules(params_obj)
})

addIpcHandle('tc:firewall:modify', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return modifyFirewallRules(params_obj)
})

addIpcHandle('tc:firewall:add', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return addFirewallRules(params_obj)
})

addIpcHandle('tc:firewall:modify:desc', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return modifyFirewallRuleDescription(params_obj)
})

addIpcHandle('tc:firewall:delete', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return modifyFirewallRuleDescription(params_obj)
})

addIpcHandle('tc:client:info:get', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  return getClientInfo()
})
// 防火墙配置相关
// 根据insid 获取防火墙配置
addIpcHandle('tc:firewall:config:get', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return getFirewallConfig(params_obj)
})

// 设置防火墙配置
addIpcHandle('tc:firewall:config:set', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return setFirewallConfig(params_obj)
})

// 获取防火墙配置列表
addIpcHandle('tc:firewall:config:list', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  return getFirewallConfigList()
})

// 删除
addIpcHandle('tc:firewall:config:del', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return deleteFirewallConfig(params_obj)
})

// example
