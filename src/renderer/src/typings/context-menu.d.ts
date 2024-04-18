/*
 * @Date: 2024-03-27 23:45:56
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 20:50:46
 * @FilePath: \Spirit-client\src\renderer\src\typings\context-menu.d.ts
 * @Description: True or False
 */
type ContextMenuItem = {
  icon: string
  label: string
  action?: () => void
  expand?: boolean
  children?: ContextMenuItem[]
  showSubMenu?: boolean
  disabled?: boolean
}
