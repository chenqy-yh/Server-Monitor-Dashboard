/*
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 00:06:58
 * @FilePath: \Spirit-client\src\renderer\src\utils\store\index.ts
 * @Description: True or False
 */
// 封装 localStorage

function isUndef(v: any): boolean {
  return v === undefined || v === null || v === ''
}

export function setItem<T>(key: string, value: T) {
  if (isUndef(value)) {
    console.log('del cahce:', key)
    localStorage.removeItem(key)
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key)
  if (value) {
    return JSON.parse(value)
  }
  return null
}
