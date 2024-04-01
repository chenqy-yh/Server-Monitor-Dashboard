/*
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 23:48:37
 * @FilePath: \server-monitor\src\renderer\src\components\explorer\index.d.ts
 * @Description: True or False
 */
type RowItem = {
  name: string
  dir: boolean
  children: RowItem[]
  open: boolean
  size: number
  type: FileType
  vis?: boolean
}

export type { RowItem }
