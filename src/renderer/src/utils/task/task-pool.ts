/*
 * @Date: 2024-04-19 22:22:01
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 23:39:56
 * @FilePath: \Spirit-client\src\renderer\src\utils\task\task-pool.ts
 * @Description: True or False
 */
import { Task, TaskConfig, TaskPoolStatus } from './type'

const DEFAULT_POOL_SIZE = 1

class TaskPool {
  private tasks: Task[] = []

  private size: number

  private running_cnt = 0

  private status: TaskPoolStatus

  private finished: () => void

  constructor(config: TaskConfig) {
    this.size = config.size || DEFAULT_POOL_SIZE
    this.status = 'running'
    this.finished = config.finished || (() => {})
  }

  private async runTask() {
    const cur_task = this.tasks.shift()
    if (this.status === 'pause') {
      return
    }
    if (this.status === 'stop') {
      this.tasks = []
      return
    }
    if (!cur_task) {
      return this.finished()
    }
    this.running_cnt++
    await cur_task()
    this.running_cnt--
    this.runTask()
  }

  rebegin = () => {
    this.status = 'running'
    this.runTask()
  }

  setStatus = (status: TaskPoolStatus) => {
    this.status = status
  }

  addTasks(...tasks: Task[]) {
    this.tasks.push(...tasks)
    const t: Promise<void>[] = []
    for (let i = 0; i < Math.min(this.size, tasks.length); i++) {
      t.push(this.runTask())
    }
    return Promise.all(t)
  }
}

export { TaskPool }
