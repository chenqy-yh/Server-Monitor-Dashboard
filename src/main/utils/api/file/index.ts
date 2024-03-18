import { httpService } from '../../http'

const getFileList = (url, path) => {
  return httpService.get(url + '/file/list', {
    params: {
      path
    }
  })
}

export { getFileList }
