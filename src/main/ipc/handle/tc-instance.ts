/*
 * @Date: 2024-04-05 23:44:49
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-06 00:09:59
 * @FilePath: \server-monitor\src\main\ipc\handle\tc-instance.ts
 * @Description: True or False
 */
import { addIpcHandle } from './utils'
import { getInstances } from '../../utils/tencent/instance/api'

addIpcHandle('tlh:instance:list', (_e, ...args) => {
  const [apiid, apikey, region] = args
  return getInstances({ secretId: apiid, secretKey: apikey, region: region })
})
