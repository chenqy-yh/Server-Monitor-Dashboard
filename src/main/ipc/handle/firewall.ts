/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 19:09:05
 * @FilePath: \server-monitor\src\main\ipc\handle\firewall.ts
 * @Description: True or False
 */
import { IpcMainInvokeEvent } from 'electron'
import { addIpcHandle } from './utils'
import {
  descFirewallRules,
  addFirewallRules,
  modifyFirewallRules,
  modifyFirewallRuleDescription,
  deleteFirewallRules
} from '../../utils/tencent/firewall'

// firewall
addIpcHandle('tc:firewall:rules', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  return descFirewallRules(params as any)
})

addIpcHandle('tc:firewall:modify', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  return modifyFirewallRules(params)
})

addIpcHandle('tc:firewall:add', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  return addFirewallRules(params)
})

addIpcHandle('tc:firewall:modify:desc', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  return modifyFirewallRuleDescription(params)
})

addIpcHandle('tc:firewall:rule:del', async (_e: IpcMainInvokeEvent, ...args: unknown[]) => {
  const [params] = args
  return deleteFirewallRules(params)
})
