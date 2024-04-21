/*
 * @Date: 2024-04-20 00:06:23
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-21 22:51:22
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\index.ts
 * @Description: True or False
 */
import { createUploadExecutor, CreateUploadExecutorOptions } from './executor-factory'
import { UploadExecutor } from './useExecutor'

const _useUpload = () => {
  const executor_list = ref<UploadExecutor[]>([]) // 上传任务列表

  const createUploadTask = async (options: CreateUploadExecutorOptions) => {
    const executor = await createUploadExecutor(options)
    executor.uploading()
    executor_list.value.push(executor as any)
    return executor
  }

  return {
    executor_list,
    createUploadTask
  }
}

export default (() => {
  let instance: ReturnType<typeof _useUpload>
  return () => {
    if (!instance) {
      instance = _useUpload()
    }
    return instance
  }
})()
