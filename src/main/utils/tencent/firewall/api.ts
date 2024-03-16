import * as TC from 'tencentcloud-sdk-nodejs-lighthouse'
import {
  deleteFirewallConfig as _deleteFirewallConfig,
  getFirewallConfigList as _getFirewallConfigList,
  setFirewallConfig as _setFirewallConfig
} from './config'

const lhclient = TC.lighthouse.v20200324.Client

const createClient = (firewallConfig: FirewallConfig) => {
  return new lhclient({
    credential: {
      secretId: firewallConfig.secretId,
      secretKey: firewallConfig.secretKey
    },
    region: firewallConfig.region,
    profile: {
      httpProfile: {
        endpoint: 'lighthouse.tencentcloudapi.com'
      }
    }
  })
}

// ----------------- 配 置 相 关 --------------------
/**
 * @description 删除防火墙配置
 *
 */
const deleteFirewallConfig = (firewallConfig: FirewallConfig) => {
  _deleteFirewallConfig(firewallConfig)
}

/**
 *  @description 设置防火墙配置
 *
 */
const setFirewallConfig = (firewallConfig: FirewallConfig) => {
  _setFirewallConfig(firewallConfig)
  return 'ok'
}

/**
 *  @description 根据instanceId 获取防火墙配置
 *
 */
const getFirewallConfig = (params: FirewallConfig) => {
  const { instanceId } = params
  return _getFirewallConfigList().find((item) => item.instanceId === instanceId)
}

/**
 * @description 获取防火墙配置列表
 *
 */
const getFirewallConfigList = () => {
  return _getFirewallConfigList()
}

// ----------------- 规 则 相 关 --------------------

/**
 * @description 查询防火墙规则列表
 *
 * */
const descFirewallRules = (params: FirewallConfig) => {
  const { instanceId } = params
  const config = getFirewallConfig(params)
  if (!config || !instanceId) {
    throw new Error('未找到防火墙配置')
  }
  return createClient(config).DescribeFirewallRules({
    InstanceId: instanceId
  })
}

/**
 * 添加防火墙规则
 *
 * */
const addFirewallRules = (parms) => {
  const { InstanceId } = parms
  const config = getFirewallConfig({
    instanceId: InstanceId
  })
  if (!config) {
    throw new Error('未找到防火墙配置')
  }
  return createClient(config)
    .CreateFirewallRules(parms)
    .catch((err) => {
      throw new Error(err)
    })
}

/**
 * 删除防火墙规则
 *
 * */
// const params = {
//   InstanceId: props.firewallConfig.instanceId,
//   FirewallRules: [row]
// }
const deleteFirewallRules = (parms) => {
  const { InstanceId } = parms
  const config = getFirewallConfig({
    instanceId: InstanceId
  })
  if (!config) {
    throw new Error('未找到防火墙配置')
  }
  return createClient(config)
    .DeleteFirewallRules(parms)
    .catch((err) => {
      throw new Error(err)
    })
}

/**
 * 修改防火墙规则
 *
 */
const modifyFirewallRules = (parms) => {
  const { InstanceId } = parms
  const config = getFirewallConfig({
    instanceId: InstanceId
  })
  if (!config) {
    throw new Error('未找到防火墙配置')
  }
  return createClient(config)
    .ModifyFirewallRules(parms)
    .catch((err) => {
      throw new Error(err)
    })
}

/**
 * 修改防火墙规则描述
 *
 * */
const modifyFirewallRuleDescription = (parms) => {
  const { InstanceId } = parms
  const config = getFirewallConfig({
    instanceId: InstanceId
  })
  if (!config) {
    throw new Error('未找到防火墙配置')
  }
  return createClient(config)
    .ModifyFirewallRuleDescription(parms)
    .catch((err) => {
      throw new Error(err)
    })
}

export {
  // config
  deleteFirewallConfig,
  getFirewallConfig,
  getFirewallConfigList,
  setFirewallConfig,
  // rules
  deleteFirewallRules,
  addFirewallRules,
  descFirewallRules,
  modifyFirewallRuleDescription,
  modifyFirewallRules
}
