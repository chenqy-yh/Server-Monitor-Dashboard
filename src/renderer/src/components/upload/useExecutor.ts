/*
 * @Date: 2024-04-21 20:33:53
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-22 15:32:00
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\useExecutor.ts
 * @Description: True or False
 */
import { BlobToBuffer } from '@renderer/utils/file'
import type { UploadExecutorOptions, UploadFormData } from './types'
import { messageStore } from '@renderer/composables/message'
import _ from 'lodash'

const _CREATED_ = 'created'
const _UPLOADING_ = 'uploading'
const _PAUSE_ = 'pause'
const _SUCCESS_ = 'success'
const _FAIL_ = 'fail'

const useExecutor = (options: UploadExecutorOptions) => {
  // -------------------- S T O R E -------------------- //

  const { error } = messageStore

  // ----------------- C O N S T A N T ----------------- //

  const POOL_SIZE = 4

  const rawFile = options.rawFile
  const chunkSize = options.chunkSize
  const serverUrl = options.serverUrl
  const uploadPath = options.uploadPath
  let unfinishedChunkList = options.unfinishedChunkList
  const fileHash = options.fileHash
  const fileChunkList = options.fileChunkList
  const totalChunk = options.totalChunk

  const finishTaskEffect = options.finishTaskEffect
  const failEffect = options.failTaskItemEffect

  const finish_cnt = ref(totalChunk - unfinishedChunkList.length)

  const percent = ref(Math.floor((finish_cnt.value / totalChunk) * 100))

  const status = ref(_CREATED_)

  const formDataList: UploadFormData[] = []

  let formData_idx = 0

  // 任务池
  const task_pool: Promise<string>[] = []

  // ----------------- F U N C T I O N ----------------- //

  const beforeUploading = async () => {
    if (status.value === _FAIL_) {
      error('任务失败,无法继续上传!')
      return false
    }
    // 检查任务状态
    const finish_chunk_list = await queryfinishedFile(fileHash, totalChunk, serverUrl, uploadPath)
    const _unfinished_chunk_list = fileChunkList.reduce((acc, _, index) => {
      finish_chunk_list.includes(index) || acc.push(index)
      return acc
    }, [] as number[])
    // 检查_unfinished_chunk_list是否等于yuunfinishedChunkList
    if (!_.isEqual(_unfinished_chunk_list, unfinishedChunkList)) {
      fail()
      error('任务失败,无法继续上传!')
      return false
    }
    return true
  }

  /**
   * @description:  设置任务状态为上传中
   * @return {*}
   */
  const uploading = async () => {
    // 检查任务状态 是否可以继续上传
    if (!beforeUploading()) {
      return
    }
    status.value = _UPLOADING_
    await uploadFile()
  }

  /**
   * @description 查询未完成的文件
   *
   */
  const queryfinishedFile = async (
    file_hash: string,
    total: number,
    serverUrl: string,
    uploadPath: string
  ) => {
    return await window.api.queryFinishedChunk(serverUrl, uploadPath, file_hash, total)
  }

  /**
   * @description:  暂停任务
   * @return {*}
   */
  const pause = () => (status.value = _PAUSE_)

  /**
   * @description:  任务失败
   * @param {function} effect
   * @return {*}
   */
  const fail = () => {
    status.value = _FAIL_
    window.api.delFile(serverUrl, uploadPath + '/' + fileHash)
  }

  /**
   * @description:  任务成功
   * @return {*}
   */
  const success = () => (status.value = _SUCCESS_)

  /**
   * @description:  检查任务状态
   * @return {*}
   */
  const checkStatus = () => {
    switch (status.value) {
      case _PAUSE_:
        return true
      case _FAIL_:
        failEffect && failEffect()
        return true
      default:
        return false
    }
  }

  /**
   * @description:  更新任务进度
   * @param {number} finishChunkIdx
   * @return {*}
   */
  const update = (finishChunkIdx: number) => {
    unfinishedChunkList = unfinishedChunkList.filter((idx) => idx !== finishChunkIdx)
    finish_cnt.value++
    percent.value = Math.ceil((finish_cnt.value / totalChunk) * 100)
  }

  /**
   * @description:  开始上传文件
   * @param {File} file
   * @param {string} file_hash
   * @param {Blob} file_chunk_list
   * @return {*}
   */
  const uploadFile = async () => {
    if (!serverUrl || !uploadPath) {
      throw new Error('serverUrl or uploadPath is empty')
    }

    if (formDataList.length === 0) {
      // init formDataList
      // 根据文件的chunk数量，创建对应数量的formData
      for (let i = 0; i < unfinishedChunkList.length; i++) {
        const tar_idx = unfinishedChunkList[i]
        const chunk = fileChunkList[tar_idx]
        // 将chunk转换成buffer electron 无法直接传递blob
        const buf = await BlobToBuffer(chunk)
        // 创建formData
        const formData: UploadFormData = {
          buf: buf, // chunk buffer
          hash: fileHash, // 文件hash
          filename: rawFile.name, // 文件名
          index: tar_idx, // chunk索引
          chunk_hash: fileHash + '-' + i, // chunk hash
          total: totalChunk // chunk总数
        }
        formDataList.push(formData)
      }
    }

    while (formData_idx < formDataList.length) {
      // check status
      if (checkStatus()) {
        return
      }
      const chunk_idx = formDataList[formData_idx].index
      const task = window.api.uploadFile(serverUrl, uploadPath, formDataList[chunk_idx])
      // 更新任务进度
      task.then(() => {
        update(chunk_idx)
        // 任务完成后，从任务池中移除
        task_pool.splice(task_pool.indexOf(task), 1)
      })
      task_pool.push(task)
      // 控制并发数量
      if (task_pool.length === POOL_SIZE) {
        await Promise.race(task_pool)
      }
      formData_idx += 1
    }
    // 等待所有任务完成
    await Promise.all(task_pool)
    handleChunkMerge()
  }

  /**
   * @description:  上传文件
   * @return {*}
   */
  const handleChunkMerge = async () => {
    if (!serverUrl || !uploadPath) {
      throw new Error('serverUrl or uploadPath is empty')
    }
    const formData = {
      hash: fileHash,
      filename: rawFile.name,
      total: chunkSize,
      chunkSize: chunkSize
    }
    await window.api.mergeChunk(serverUrl, uploadPath, formData)
    success()
    // handle finish task effect
    finishTaskEffect && finishTaskEffect()
  }
  return {
    percent,
    status,
    rawFile,
    uploading,
    pause,
    fail,
    success,
    checkStatus,
    update,
    handleChunkMerge,
    uploadFile
  }
}

export type UploadExecutor = ReturnType<typeof useExecutor>

export default useExecutor
