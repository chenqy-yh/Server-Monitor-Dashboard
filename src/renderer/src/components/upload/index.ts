/*
 * @Date: 2024-03-29 23:30:20
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 00:33:10
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\index.ts
 * @Description: True or False
 */
import { ArrayBuffer } from 'spark-md5'
import { BlobToBuffer } from '@renderer/utils/file'

const useUpload = (serverUrl: string, uploadPath: string) => {
  // ----------------- C O N S T A N T ----------------- //

  const POOL_SIZE = 6
  const CHUNK_SIZE = 1024 * 1024 * 0.5 // 0.5MB

  const has_upload_chunk_count = ref(0) // 当前上传的chunk索引

  const total_chunk_count = ref(0) // 文件的chunk总数

  const init = () => {
    has_upload_chunk_count.value = 0
    total_chunk_count.value = 0
  }

  /**
   * @description:  处理上传文件
   * @param {File} rawFile
   * @return {*}
   */
  const handleUploadFile = async (rawFile: File) => {
    init()
    // 1. 将文件切分成多个chunk
    const file_chunk_list = createFileChunks(rawFile)

    // 2. 计算文件的hash值
    const file_hash = await calcFileHash(file_chunk_list)

    // 3. 查询文件是否已经上传
    const upload_finished_list = await queryUnfinishedFile(file_hash, file_chunk_list.length)

    // 4. 上传文件
    await uploadFile(rawFile, file_hash, file_chunk_list, upload_finished_list)

    // 5. 合并文件
    await handleChunkMerge(rawFile, file_hash, file_chunk_list.length)
  }

  const queryUnfinishedFile = async (file_hash: string, total: number) => {
    return await window.api.queryFinishedChunk(serverUrl, uploadPath, file_hash, total)
  }

  //TODO
  const handleChunkMerge = async (file: File, file_hash: string, chunkSize: number) => {
    const formData = {
      hash: file_hash,
      filename: file.name,
      total: chunkSize,
      chunkSize: CHUNK_SIZE
    }
    return await window.api.mergeChunk(serverUrl, uploadPath, formData)
  }

  /**
   * @description:  开始上传文件
   * @param {File} file
   * @param {string} file_hash
   * @param {Blob} file_chunk_list
   * @return {*}
   */
  const uploadFile = async (
    file: File,
    file_hash: string,
    file_chunk_list: Blob[],
    upload_finished_list: number[]
  ) => {
    // 根据文件的chunk数量，创建对应数量的formData

    const formDataList: unknown[] = []
    for (let i = 0; i < file_chunk_list.length; i++) {
      if (upload_finished_list.includes(i)) {
        continue
      }
      const chunk = file_chunk_list[i]
      // 将chunk转换成buffer electron 无法直接传递blob
      const buf = await BlobToBuffer(chunk)
      // 创建formData
      const formData = {
        buf: buf, // chunk buffer
        hash: file_hash, // 文件hash
        filename: file.name, // 文件名
        index: i, // chunk索引
        chunk_hash: file_hash + '-' + i, // chunk hash
        total: file_chunk_list.length // chunk总数
      }
      formDataList.push(formData)
    }
    // 任务池
    const task_pool: Promise<string>[] = []
    while (has_upload_chunk_count.value < formDataList.length) {
      const task = window.api.uploadFile(
        serverUrl,
        uploadPath,
        formDataList[has_upload_chunk_count.value]
      )
      task.then(() => {
        // 任务完成后，从任务池中移除
        task_pool.splice(task_pool.indexOf(task), 1)
      })
      task_pool.push(task)
      // 控制并发数量
      if (task_pool.length === POOL_SIZE) {
        await Promise.race(task_pool)
      }
      has_upload_chunk_count.value++
    }
    // 等待所有任务完成
    await Promise.all(task_pool)
  }

  /**
   * @description: 计算文件的hash值
   * @param {Blob[]} fileChunkList
   * @return {*}
   */
  const calcFileHash = async (fileChunkList: Blob[]): Promise<string> => {
    return new Promise((resolve) => {
      // 创建spark实例 用于计算文件hash
      const spark = new ArrayBuffer()
      // 由于文件较大，只取文件的头部和尾部以及中间部分的部分数据进行hash计算
      const identifiers = fileChunkList.map((chunk, index) => {
        if (index === 0 || index === fileChunkList.length - 1) {
          return chunk
        }
        return new Blob([
          chunk.slice(0, 2),
          chunk.slice(chunk.size / 2 - 1, chunk.size / 2 + 1),
          chunk.slice(chunk.size - 2, chunk.size)
        ])
      })
      const reader = new FileReader()
      reader.readAsArrayBuffer(new Blob(identifiers))
      reader.onload = (e: Event) => {
        spark.append((e.target as any).result)
        // 计算文件的hash值
        resolve(spark.end())
      }
    })
  }

  /**
   * @description: 将文件切分成多个chunk
   * @param {File} file
   * @return {*}
   */
  const createFileChunks = (file: File) => {
    const file_chunk_list: Blob[] = []
    let cur = 0
    while (cur < file.size) {
      file_chunk_list.push(file.slice(cur, cur + CHUNK_SIZE))
      cur += CHUNK_SIZE
    }
    total_chunk_count.value = file_chunk_list.length
    return file_chunk_list
  }

  return {
    has_upload_chunk_count,
    total_chunk_count,
    handleUploadFile
  }
}

export { useUpload }
