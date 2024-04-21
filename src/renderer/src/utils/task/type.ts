/*
 * @Date: 2024-04-19 22:22:50
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 23:20:10
 * @FilePath: \Spirit-client\src\renderer\src\utils\task\type.ts
 * @Description: True or False
 */
export type Task = () => Promise<unknown>

export type TaskConfig = {
  size?: number
  finished?: () => void
}

export type TaskPoolStatus = 'running' | 'pause' | 'stop'
