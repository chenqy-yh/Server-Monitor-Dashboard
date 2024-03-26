/*
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 23:48:27
 * @FilePath: \server-monitor\src\renderer\src\typings\file.d.ts
 * @Description: True or False
 */
type FileType = 'dir' | 'file' | 'link'

type FileStat = {
  dir: boolean
  type: FileType
  name: string
  mode: string
  owner: string
  group: string
  size: number
  mtime: string
}
