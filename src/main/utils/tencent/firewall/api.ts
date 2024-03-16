import {
  getFirewallConfigList as _getFirewallConfigList,
  deleteFirewallConfig as _deleteFirewallConfig,
  setFirewallConfig as _setFirewallConfig
} from './config'
import { store } from '../../../store'
import * as TC from 'tencentcloud-sdk-nodejs-lighthouse'

const lhclient = TC.lighthouse.v20200324.Client

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
  if (!config) {
    throw new Error('未找到防火墙配置')
  }
  const client = new lhclient({
    credential: {
      secretId: config.secretId,
      secretKey: config.secretKey
    },
    region: config.region,
    profile: {
      httpProfile: {
        endpoint: 'lighthouse.tencentcloudapi.com'
      }
    }
  })
  return client.DescribeFirewallRules({
    InstanceId: instanceId
  })
}

export {
  // config
  deleteFirewallConfig,
  setFirewallConfig,
  getFirewallConfig,
  getFirewallConfigList,
  // rules
  descFirewallRules
}

// /**
//  * 修改防火墙规则
//  *
//  */
// const modifyFirewallRules = (parms) => {
//   return tencent_client.ModifyFirewallRules(parms).catch((err) => {
//     throw new Error(err)
//   })
// }

// /**
//  * 添加防火墙规则
//  *
//  * */
// const addFirewallRules = (parms) => {
//   return tencent_client.CreateFirewallRules(parms).catch((err) => {
//     throw new Error(err)
//   })
// }

// /**
//  * 修改防火墙规则描述
//  *
//  * */
// const modifyFirewallRuleDescription = (parms) => {
//   return tencent_client.ModifyFirewallRuleDescription(parms).catch((err) => {
//     throw new Error(err)
//   })
// }

// /**
//  * 删除防火墙规则
//  *
//  * */
// const deleteFirewallRules = (parms) => {
//   return tencent_client.DeleteFirewallRules(parms).catch((err) => {
//     throw new Error(err)
//   })
// }
