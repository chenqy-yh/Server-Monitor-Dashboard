/*
 * @Date: 2024-03-23 23:54:08
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-30 23:44:59
 * @FilePath: \server-monitor\src\renderer\src\utils\file\index.ts
 * @Description: True or False
 */
const openFileTypeList: string[] = [
  'js',
  'ts',
  'html',
  'css',
  'json',
  'md',
  'vue',
  'yaml',
  'yml',
  'xml',
  'sh',
  'less',
  'scss',
  'sass',
  'styl',
  'stylus',
  'php',
  'py',
  'java',
  'go',
  'rb',
  'c',
  'cpp',
  'h',
  'hpp',
  'cs',
  'ts',
  'jsx',
  'tsx',
  'sql',
  'swift',
  'kt',
  'kts'
] as const

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

const checkFileType = (path: string) => {
  const suffix = path.split('.').pop()
  return suffix && openFileTypeList.includes(suffix)
}

const checkFileSize = (size: number) => {
  return size < READ_FILE_SIZE_LIMIT
}

const checkIsReadable = (path: string, type: string, size?: number) => {
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
