/*
 * @Date: 2024-03-23 23:54:08
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-08 11:21:27
 * @FilePath: \Spirit-client\src\renderer\src\utils\file\index.ts
 * @Description: True or False
 */

const READ_FILE_SIZE_LIMIT = 1024 * 20 // 20KB

/**
 *  @description 根据目标文件解析下一个路径
 *
 */
const solveNextPath = (path: string, fileName: string) => {
  return path === '/' ? `/${fileName}` : `${path}/${fileName}`
}

/**
 *  @description 打开文件类型列表
 *
 */
const dirComparer = (a: FileStat, b: FileStat) => {
  if (a.dir && !b.dir) {
    return -1
  } else if (!a.dir && b.dir) {
    return 1
  } else {
    return a.name.localeCompare(b.name)
  }
}

const checkFileSize = (size: number) => {
  return size < READ_FILE_SIZE_LIMIT
}

const checkIsReadable = (_: string, type: string, size?: number) => {
  return checkFileSize(size || 0) && checkIsFile(type)
}

const checkIsFile = (type: string) => {
  return type === 'file'
}

const BlobToBuffer = (blob: Blob) => {
  return new Promise<ArrayBuffer>((resolve) => {
    blob.arrayBuffer().then((buf) => {
      resolve(buf)
    })
  })
}

export { solveNextPath, dirComparer, checkIsReadable, BlobToBuffer }
