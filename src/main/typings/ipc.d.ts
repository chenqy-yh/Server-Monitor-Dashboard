/*
 * @Date: 2023-12-22 22:19:19
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 20:54:07
 * @FilePath: \server-monitor\src\main\typings\ipc.d.ts
 * @Description: True or False
 */
type HandleCallback = (event: IpcMainInvokeEvent, ...args: unknown[]) => Promise<unknown> | unknown

type ServerHandleChannel = 'ping' | 'os:grt' | 'os:info' | 'ws:cws' | 'log:info'

type FirewallHandleChannel =
  | 'tc:ins:list'
  | 'tc:client:info:get'
  | 'tc:firewall:config:get'
  | 'tc:firewall:config:list'
  | 'tc:firewall:config:set'
  | 'tc:firewall:config:del'
  | 'tc:firewall:rules'
  | 'tc:firewall:modify'
  | 'tc:firewall:add'
  | 'tc:firewall:modify:desc'
  | 'tc:firewall:delete'
  | 'tc:firewall:rule:del'

type FileWallHandleChannel =
  | 'file:list'
  | 'file:path'
  | 'file:content'
  | 'file:save'
  | 'file:editor:find'
type CommonHandleChannel = 'open-window' | 'get-win-id'

type HandleChannel =
  | ServerHandleChannel
  | FirewallHandleChannel
  | FileWallHandleChannel
  | CommonHandleChannel

type SendChannel =
  | 'context-menu'
  | 'win-move'
  | 'win-resize'
  | 'app-quit'
  | 'app-full-screen'
  | 'app-min'
  | 'ws-close'
  | 'new-window'
  | 'tencent-credential-update'
  | 'tencent-region-update'
  | 'emit-file-path'
  | 'win-close'
  | 'editor-open-file:main'
