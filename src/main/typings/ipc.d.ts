type HandleCallback = (event: IpcMainInvokeEvent, ...args: unknown[]) => Promise<unknown> | unknown

type HandleChannel =
  | 'ping'
  | 'os:grt'
  | 'os:info'
  | 'ws:cws'
  | 'log:info'
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