/*
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 12:01:55
 * @FilePath: \Spirit-client\src\renderer\src\utils\store\index.ts
 * @Description: True or False
 */
// 封装 localStorage

function isUndef(v: unknown): boolean {
  return v === undefined || v === null || v === ''
}

export function setItem<T>(key: string, value: T) {
  ;(isUndef(value) && localStorage.removeItem(key)) ||
    localStorage.setItem(key, JSON.stringify(value))
}

export function getItem<T>(key: string): T | null {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}
