/*
 * @Date: 2024-03-18 20:32:56
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 12:08:59
 * @FilePath: \server-monitor\src\main\utils\api\file\index.ts
 * @Description: True or False
 */
import { httpService } from '../../http'

/**
 * @description:  获取文件列表
 * @param {*} url
 * @param {*} path
 * @return {*}
 */
const getFileList = (url, path) => {
  return httpService.get(url + '/file/list', {
    params: {
      path
    }
  })
}

/**
 * @description:  获取文件内容
 * @param {*} url
 * @param {*} path
 * @return {*}
 */
const getFileContent = (url, path) => {
  return httpService.get(url + '/file/content', {
    params: {
      path
    },
    responseType: 'text'
  })
}

const saveFileContent = (url, path, content) => {
  return httpService.post(url + '/file/save', {
    path: path,
    content: content
  })
}

export { getFileList, getFileContent, saveFileContent }
