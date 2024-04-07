/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-05 23:39:42
 * @FilePath: \server-monitor\src\main\utils\tencent\typings.d.ts
 * @Description: True or False
 */
type TencentCredential = {
  secretId: string
  secretKey: string
}

type TencentClientInfo = {
  region: string
} & TCCredential
