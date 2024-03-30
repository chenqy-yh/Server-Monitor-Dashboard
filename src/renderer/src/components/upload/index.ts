/*
 * @Date: 2024-03-29 23:30:20
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 00:13:06
 * @FilePath: \server-monitor\src\renderer\src\components\upload\index.ts
 * @Description: True or False
 */
import { ArrayBuffer } from 'spark-md5'
import { BlobToBuffer } from '@renderer/utils/file'

const useUpload = (serverUrl: string, uploadPath: string) => {
  // ----------------- C O N S T A N T ----------------- //

  const POOL_SIZE = 6

  const handleUploadFile = async (rawFile: File) => {
    const file_chunk_list = createFileChunks(rawFile)
    console.log(file_chunk_list)
    const file_hash = await calcFileHash(file_chunk_list)

    await uploadFile(rawFile, file_hash, file_chunk_list)
    await handleChunkMerge(rawFile, file_hash, file_chunk_list.length)
  }

  //TODO
  const handleChunkMerge = async (file: File, file_hash: string, chunkSize: number) => {
    const formData = {
      hash: file_hash,
      filename: file.name,
      total: chunkSize
    }
    return await window.api.mergeChunk(serverUrl, uploadPath, formData)
  }

  const uploadFile = async (file: File, file_hash: string, file_chunk_list: Blob[]) => {
    const formDataList_promise: Promise<any>[] = file_chunk_list.map(async (chunk, index) => {
      // const data = new FormData()
      const buf = await BlobToBuffer(chunk)

      const formData = {
        buf: buf,
        hash: file_hash,
        filename: file.name,
        index: index,
        chunk_hash: file_hash + '-' + index,
        total: file_chunk_list.length
      }

      return formData
    })
    const formDataList = await Promise.all(formDataList_promise)

    const task_pool: Promise<string>[] = []
    let index = 0
    while (index < formDataList.length) {
      const task = window.api.uploadFile(serverUrl, uploadPath, formDataList[index])
      task.then(() => {
        task_pool.splice(task_pool.indexOf(task), 1)
      })
      task_pool.push(task)
      if (task_pool.length === POOL_SIZE) {
        await Promise.race(task_pool)
      }
      index++
    }

    await Promise.all(task_pool)
  }

  const calcFileHash = async (fileChunkList: Blob[]): Promise<string> => {
    return new Promise((resolve) => {
      const spark = new ArrayBuffer()
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
      if (identifiers.length === 0) {
        return resolve('')
      }
      const reader = new FileReader()
      reader.readAsArrayBuffer(new Blob(identifiers))
      reader.onload = (e: Event) => {
        spark.append((e.target as any).result)
        resolve(spark.end())
      }
    })
  }

  const createFileChunks = (file: File) => {
    const CHUNK_SIZE = 1024 * 1024 * 0.5 // 0.5MB
    const file_chunk_list: Blob[] = []
    let cur = 0
    while (cur < file.size) {
      file_chunk_list.push(file.slice(cur, cur + CHUNK_SIZE))
      cur += CHUNK_SIZE
    }
    return file_chunk_list
  }

  return {
    handleUploadFile
  }
}

export { useUpload }
