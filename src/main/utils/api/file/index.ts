import { httpService } from '../../http'

const getFileList = (url, path) => {
  return httpService.get(url + '/file/list', {
    params: {
      path
    }
  })
}

const getFileContent = (url, path) => {
  return httpService.get(url + '/file/content', {
    params: {
      path
    },
    responseType: 'text'
  })
}

export { getFileList, getFileContent }
