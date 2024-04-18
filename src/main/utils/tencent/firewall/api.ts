/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 00:09:55
 * @FilePath: \Spirit-client\src\main\utils\tencent\firewall\api.ts
 * @Description: True or False
 */
import * as TC from 'tencentcloud-sdk-nodejs-lighthouse'

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

// ----------------- 规 则 相 关 --------------------

/**
 * @description 查询防火墙规则列表
 *
 * */
const descFirewallRules = (params: FirewallConfig) => {
  return createClient(params).DescribeFirewallRules({
    InstanceId: params.instanceId ?? ''
  })
}

/**
 * 添加防火墙规则
 *
 * */
const addFirewallRules = (params) => {
  const { firewallConfig, FirewallRules } = params
  return createClient(firewallConfig)
    .CreateFirewallRules({
      InstanceId: firewallConfig.instanceId,
      FirewallRules
    })
    .catch((err) => {
      throw new Error(err)
    })
}

/**
 * 删除防火墙规则
 *
 * */
const deleteFirewallRules = (params) => {
  const { firewallConfig, FirewallRules } = params
  console.log(firewallConfig, FirewallRules)
  return createClient(firewallConfig)
    .DeleteFirewallRules({
      InstanceId: firewallConfig.instanceId,
      FirewallRules
    })
    .catch((err) => {
      throw new Error(err)
    })
}

/**
 * 修改防火墙规则
 *
 */
const modifyFirewallRules = (params) => {
  const pararms_obj = JSON.parse(params)
  const { firewallConfig, FirewallRules } = pararms_obj
  return createClient(firewallConfig)
    .ModifyFirewallRules({
      InstanceId: firewallConfig.instanceId,
      FirewallRules
    })
    .catch((err) => {
      throw new Error(err)
    })
}

/**
 * 修改防火墙规则描述
 *
 * */
const modifyFirewallRuleDescription = (params) => {
  const { firewallConfig, FirewallRule } = params
  return createClient(firewallConfig)
    .ModifyFirewallRuleDescription({
      InstanceId: firewallConfig.instanceId,
      FirewallRule
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export {
  // rules
  deleteFirewallRules,
  addFirewallRules,
  descFirewallRules,
  modifyFirewallRuleDescription,
  modifyFirewallRules
}
