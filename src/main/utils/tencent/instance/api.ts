/*
 * @Date: 2024-04-05 23:35:53
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-05 23:44:08
 * @FilePath: \server-monitor\src\main\utils\tencent\instance\api.ts
 * @Description: True or False
 */
import * as TC from 'tencentcloud-sdk-nodejs-lighthouse'

const lhclient = TC.lighthouse.v20200324.Client

const createClient = (baseConfig: TencentClientInfo) => {
  return new lhclient({
    credential: {
      secretId: baseConfig.secretId,
      secretKey: baseConfig.secretKey
    },
    region: baseConfig.region,
    profile: {
      httpProfile: {
        endpoint: 'lighthouse.tencentcloudapi.com'
      }
    }
  })
}

// ----------------- 配 置 相 关 --------------------
/**
 * @description 查询实例列表
 *
 */
const getInstances = (baseConfig: TencentClientInfo) => {
  const client = createClient(baseConfig)
  return client.DescribeInstances({})
}

export { getInstances }
