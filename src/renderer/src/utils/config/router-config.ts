/*
 * @Date: 2024-04-06 14:13:36
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-06 22:05:20
 * @FilePath: \server-monitor\src\renderer\src\utils\config\router-config.ts
 * @Description: True or False
 */

// 菜单排序
const menuIndexMap = ['instances', 'dashboard', 'terminal', 'file', 'log', 'firewall', 'setting']

const getMenuIndex = (key: string) => {
  const index = menuIndexMap.indexOf(key)
  return index === -1 ? Infinity : index
}

export { getMenuIndex }
