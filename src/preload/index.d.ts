import { ElectronAPI } from '@electron-toolkit/preload'

/**
 *  @description ipc handle api
 *
 */
type HandleApi = ServerHandleApi & FirewallHandleApi & FileHandleApi

/**
 * @description 服务器信息 API
 *
 * */
type ServerHandleApi = {
  ping: (url: string) => Promise<string>
  getServerInfo: (url: string) => Promise<ServerData>
  createWsService: (url: string) => Promise<number>
  getServerLog: (
    url: string,
    type: string,
    page: number,
    size?: number
  ) => Promise<{ total: number; data: string[] }>
}

/**
 *  @description 防火墙 API
 *
 */
type FirewallHandleApi = {
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
  delFirewallRules: (params?: unknown) => Promise<CommonResponse> | Promise<string>
}

/**
 *  @description 文件 API
 *
 */
type FileHandleApi = {
  getFileList: (url: string, path: string) => Promise<FileStat[]>
}

/**
 *  @description ipc on api
 *
 */
type OnApi = {
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
    api: HandleApi & OnApi
  }
}
