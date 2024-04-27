/*
 * @Date: 2024-04-19 20:42:35
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-22 15:32:06
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\executor-factory.ts
 * @Description: True or False
 */
import { ArrayBuffer } from 'spark-md5'
import { CreateUploadExecutorOptions, UploadExecutorOptions } from './types'
import useExecutor, { UploadExecutor } from './useExecutor'

class UploadExectorFacotry {
  buildExecutor = async (options: CreateUploadExecutorOptions): Promise<UploadExecutor> => {
    // 1. 将文件切分成多个chunk
    const file_chunk_list = this.createFileChunks(options.rawFile, options.chunkSize)

    // 2. 计算文件的hash值
    const file_hash = await this.calcFileHash(file_chunk_list)

    // 3. 查询文件是否已经上传
    const upload_finished_list = await this.queryfinishedFile(
      file_hash,
      file_chunk_list.length,
      options.serverUrl,
      options.uploadPath
    )

    const unfinish_chunk_list = file_chunk_list.reduce((acc, _, index) => {
      upload_finished_list.includes(index) || acc.push(index)
      return acc
    }, [] as number[])

    const executor = useExecutor({
      ...options,
      fileChunkList: file_chunk_list,
      unfinishedChunkList: unfinish_chunk_list,
      fileHash: file_hash,
      totalChunk: file_chunk_list.length
    } as UploadExecutorOptions)

    return executor as any
  }

  /**
   * @description: 创建文件块
   * @param {File} file
   * @return {*}
   */
  createFileChunks = (file: File, chunkSize: number) => {
    const file_chunk_list: Blob[] = []
    let cur = 0
    while (cur < file.size) {
      file_chunk_list.push(file.slice(cur, cur + chunkSize))
      cur += chunkSize
    }

    return file_chunk_list
  }

  /**
   * @description: 计算文件的hash值
   * @param {Blob[]} fileChunkList
   * @return {*}
   */
  calcFileHash = async (fileChunkList: Blob[]): Promise<string> => {
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

  queryfinishedFile = async (
    file_hash: string,
    total: number,
    serverUrl: string,
    uploadPath: string
  ) => {
    return await window.api.queryFinishedChunk(serverUrl, uploadPath, file_hash, total)
  }
}

const uploadExectorFacotry = new UploadExectorFacotry()

export const createUploadExecutor = uploadExectorFacotry.buildExecutor
export type { CreateUploadExecutorOptions }
