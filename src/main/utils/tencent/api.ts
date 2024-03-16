import { tencent_client } from './client'
/**
 * 查询实例列表
 *
 */
const descInsList = (parms) => {
  return tencent_client.DescribeInstances(parms)
}

/**
 * 查询防火墙规则列表
 *
 * */
const descFirewallRules = (parms) => {
  return tencent_client.DescribeFirewallRules(parms)
}

/**
 * 修改防火墙规则
 *
 */
const modifyFirewallRules = (parms) => {
  return tencent_client.ModifyFirewallRules(parms).catch((err) => {
    throw new Error(err)
  })
}

/**
 * 添加防火墙规则
 *
 * */
const addFirewallRules = (parms) => {
  return tencent_client.CreateFirewallRules(parms).catch((err) => {
    throw new Error(err)
  })
}

/**
 * 修改防火墙规则描述
 *
 * */
const modifyFirewallRuleDescription = (parms) => {
  return tencent_client.ModifyFirewallRuleDescription(parms).catch((err) => {
    throw new Error(err)
  })
}

/**
 * 删除防火墙规则
 *
 * */
const deleteFirewallRules = (parms) => {
  return tencent_client.DeleteFirewallRules(parms).catch((err) => {
    throw new Error(err)
  })
}

export {
  descInsList
  // descFirewallRules,
  // modifyFirewallRules,
  // addFirewallRules,
  // modifyFirewallRuleDescription,
  // deleteFirewallRules
}
