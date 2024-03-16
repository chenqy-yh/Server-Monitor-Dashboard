import { ElectronAPI } from '@electron-toolkit/preload'

type handle_api = {
  ping: (url: string) => Promise<string>
  getServerInfo: (url: string) => Promise<ServerData>
  createWsService: (url: string) => Promise<number>
  getServerLog: (
    url: string,
    type: string,
    page: number,
    size?: number
  ) => Promise<{ total: number; data: string[] }>
  descInsList: (parms?: unknown) => Promise<{ InstanceSet: CosInstance[] }>
  descFirewallRules: (params: string) => Promise<QueryFirewallrulesResponse>
  modifyFirewallRules: (params?: unknown) => Promise<CommonResponse> | Promise<string>
  addFirewallRules: (params?: unknown) => Promise<CommonResponse> | Promise<string>
  modifyFirewallRuleDescription: (params?: unknown) => Promise<CommonResponse> | Promise<string>
  deleteFirewallRules: (params?: unknown) => Promise<CommonResponse> | Promise<string>
  getTencentInstanceInfo: (parms?: unknown) => Promise<>
  getFirewallConfigList: () => Promise<FirewallConfig[]>
  setFirewallConfig: (config_str: string) => Promise<unknown>
  deleteFirewallConfig: (config_str: string) => Promise<unknown>
}

type on_api = {
  showContextMenu: (menu_key?: string) => void
  winMove: (move_x: number, move_y: number) => void
  winResize: (width: number, height: number) => void
  appQuit: () => void
  appFullScreen: () => void
  appMin: () => void
  closeWebSocket: (url: string, port: number) => void
  createNewWindow: (url: string, winName: string) => void
  updateTencentCredential: (secretId: string, secretKey: string) => void
  updateTencentRegion: (region: string) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: handle_api & on_api
  }
}
