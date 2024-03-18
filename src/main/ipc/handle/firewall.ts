import { IpcMainInvokeEvent } from 'electron'
import { addIpcHandle } from './utils'
import {
  descFirewallRules,
  getFirewallConfig,
  setFirewallConfig,
  getFirewallConfigList,
  deleteFirewallConfig,
  addFirewallRules,
  modifyFirewallRules,
  modifyFirewallRuleDescription,
  deleteFirewallRules
} from '../../utils/tencent/firewall'
import { getClientInfo } from '../../utils/tencent/client'

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

addIpcHandle('tc:client:info:get', async (_e: IpcMainInvokeEvent) => {
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
addIpcHandle('tc:firewall:config:list', async (_e: IpcMainInvokeEvent) => {
  return getFirewallConfigList()
})

// 删除
addIpcHandle('tc:firewall:config:del', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return deleteFirewallConfig(params_obj)
})

// example
addIpcHandle('tc:firewall:rule:del', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  const params_obj = JSON.parse(params as string)
  return deleteFirewallRules(params_obj)
})
