/*
 * @Date: 2024-03-18 20:32:56
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 12:34:36
 * @FilePath: \server-monitor\src\main\utils\api\file\index.ts
 * @Description: True or False
 */
import { httpService } from '../../http'
import * as fs from 'fs'

/**
 * @description:  获取文件列表
 * @param {*} url
 * @param {*} path
 * @return {*}
 */
const getFileList = (url, path, filter?) => {
  return httpService.get(url + '/file/list', {
    params: {
      path,
      filter
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

/**
 * @description:  复制文件
 * @param {*} url
 * @param {*} path
 * @param {*} newPath
 * @return {*}
 */
const copyFile = (url, path, newPath) => {
  return httpService.post(url + '/file/copy', {
    src: path,
    dest: newPath
  })
}

/**
 * @description:  移动文件
 * @param {*} url
 * @param {*} path
 * @param {*} newPath
 * @return {*}
 */
const moveFile = (url, path, newPath) => {
  return httpService.post(url + '/file/move', {
    src: path,
    dest: newPath
  })
}

/**
 * @description:  创建文件夹
 * @param {*} url
 * @param {*} path
 * @return {*}
 */
const mkdir = (url, path) => {
  return httpService.post(url + '/file/mkdir', {
    path
  })
}

/**
 * @description:  创建文件
 * @param {*} url
 * @param {*} path
 * @return {*}
 */
const mkfile = (url, path) => {
  return httpService.post(url + '/file/mkfile', {
    path
  })
}

const uploadFile = (url, path, formData) => {
  return httpService.post(url + '/file/upload', formData, {
    params: {
      path
    }
  })
}

const mergeChunk = (url, path, formData) => {
  return httpService.post(url + '/file/chunkmerge', formData, {
    params: {
      path
    }
  })
}

/**
 * @description:  查询已上传的chunk
 * @param {*} url
 * @param {*} path
 * @param {*} hash
 * @param {*} total
 * @return {*}
 */
const queryFinishedChunk = (url, path, hash, total) => {
  return httpService.get(url + '/file/chunkcheck', {
    params: {
      path,
      hash,
      total
    }
  })
}

export {
  getFileList,
  getFileContent,
  saveFileContent,
  delFile,
  copyFile,
  moveFile,
  mkdir,
  mkfile,
  uploadFile,
  mergeChunk,
  queryFinishedChunk
}
