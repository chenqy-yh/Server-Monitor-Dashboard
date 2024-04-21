export type CreateUploadExecutorOptions = {
  chunkSize: number
  rawFile: File
  serverUrl: string
  uploadPath: string
  finishTaskEffect?: () => void
  failTaskItemEffect?: () => void
}

export type UploadExecutorOptions = CreateUploadExecutorOptions & {
  unfinishedChunkList: number[]
  fileChunkList: Blob[]
  fileHash: string
  totalChunk: number
}

export type UploadStatus = 'uploading' | 'pause' | 'success' | 'fail' | 'created'

export type TaskProgress = {
  rawFile: File
  now: number
  total: number
  has_upload_chunk_idx: number[]
  serverUrl: string
  uploadPath: string
  percent: number
  status: UploadStatus
  execute_list: ((...args) => Promise<unknown>)[]
}

export type UploadFormData = {
  buf: ArrayBuffer
  hash: string
  filename: string
  index: number
  chunk_hash: string
  total: number
}
