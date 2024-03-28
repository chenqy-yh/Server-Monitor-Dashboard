/*
 * @Date: 2024-03-18 20:32:56
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-29 00:34:44
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

/**
 * @description:  保存文件内容
 * @param {*} url
 * @param {*} path
 * @param {*} content
 * @return {*}
 */
const saveFileContent = (url, path, content) => {
  return httpService.post(url + '/file/save', {
    path: path,
    content: content
  })
}

/**
 * @description:  删除文件
 * @param {*} url
 * @param {*} path
 * @return {*}
 */
const delFile = (url, path) => {
  return httpService.delete(url + '/file/del', {
    params: {
      path
    }
  })
}

const copyFile = (url, path, newPath) => {
  return httpService.post(url + '/file/copy', {
    src: path,
    dest: newPath
  })
}

export { getFileList, getFileContent, saveFileContent, delFile, copyFile }
