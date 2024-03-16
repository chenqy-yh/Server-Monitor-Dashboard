type FirewallConfig = {
  instanceId: string
  region: string
  secretId: string
  secretKey: string
}

interface CosInstance {
  InstanceId: string
  InstanceName: string
  PublicAddresses: string[]
  Platform: string
}

interface FirewallRule {
  Action?: 'ACCEPT' | 'DROP'
  CidrBlock?: string
  FirewallRuleDescription?: string
  Port?: string
  Protocol?: 'TCP' | 'UDP' | 'ICMP'
}

interface FirewallRuleInfo {
  Action?: 'ACCEPT' | 'DROP'
  CidrBlock?: string
  FirewallRuleDescription?: string
  Port?: string
  Protocol?: 'TCP' | 'UDP' | 'ICMP'
  AppType?:
    | '自定义'
    | 'HTTP(80)'
    | 'HTTPS(443)'
    | 'Linux登录(22)'
    | 'Windows登录(3389)'
    | 'MySQL(3306)'
    | 'SQL Server(1433)'
    | '全部TCP'
    | '全部UDP'
    | 'Ping-ICMP'
    | 'ALL'
}

// ------------------- R E S P O N S E ------------------- //

interface CommonResponse {
  RequestId: string
}

interface QueryFirewallrulesResponse {
  FirewallRuleSet: FirewallRuleInfo[]
  FirewallVersion: number
  RequestId: string
  TotalCount: number
}
