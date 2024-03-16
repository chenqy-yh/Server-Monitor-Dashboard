import { ipcRenderer } from 'electron'

const ipcInvoke = <T = unknown>(channel: HandleChannel, ...args: unknown[]) => {
  return ipcRenderer.invoke(channel, ...args) as T
}

const methodMap: MethodMap<HandleChannel> = {
  ping: { channel: 'ping', params: ['url'] },
  getServerInfo: { channel: 'os:info', params: ['url'] },
  createWsService: { channel: 'ws:cws', params: ['url'] },
  getServerLog: { channel: 'log:info', params: ['url', 'type', 'page', 'size'] },
  descInsList: { channel: 'tc:ins:list', params: ['parms'] },
  descFirewallRules: { channel: 'tc:firewall:rules', params: ['params'] },
  modifyFirewallRules: { channel: 'tc:firewall:modify', params: ['params'] },
  addFirewallRules: { channel: 'tc:firewall:add', params: ['params'] },
  modifyFirewallRuleDescription: { channel: 'tc:firewall:modify:desc', params: ['params'] },
  deleteFirewallRules: { channel: 'tc:firewall:delete', params: ['params'] },
  getTencentInstanceInfo: { channel: 'tc:client:info:get', params: ['parms'] },
  getFirewallConfigList: { channel: 'tc:firewall:config:list', params: [] },
  setFirewallConfig: { channel: 'tc:firewall:config:set', params: ['config_str'] },
  deleteFirewallConfig: { channel: 'tc:firewall:config:del', params: ['config_str'] }
}

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
