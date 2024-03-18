import { addIpcHandle } from './utils'
import { getFileList } from '../../utils/api/file'

addIpcHandle('file:list', async (_e, ...args) => {
  const [url, path] = args
  return await getFileList(url, path)
})
