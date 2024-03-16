import { store } from '../../../store'

let firewall_config_list: FirewallConfig[] =
  (store.get('firewall-config') as FirewallConfig[]) || []

const deleteFirewallConfig = (firewallConfig: FirewallConfig) => {
  firewall_config_list = firewall_config_list.filter(
    (item) => item.instanceId !== firewallConfig.instanceId
  )
  store.set('firewall-config', firewall_config_list)
}

const checkSameConfig = (firewallConfig: FirewallConfig) => {
  const sameConfig = firewall_config_list.find(
    (item) =>
      item.instanceId === firewallConfig.instanceId &&
      item.region === firewallConfig.region &&
      item.secretId === firewallConfig.secretId &&
      item.secretKey === firewallConfig.secretKey
  )
  return sameConfig
}

const setFirewallConfig = (firewallConfig: FirewallConfig) => {
  const sameConfig = checkSameConfig(firewallConfig)
  if (sameConfig) {
    return
  }
  firewall_config_list.push(firewallConfig)
  store.set('firewall-config', firewall_config_list)
}

const getFirewallConfigList = () => {
  return firewall_config_list
}

export { getFirewallConfigList, deleteFirewallConfig, setFirewallConfig }
