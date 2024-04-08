/*
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 23:46:01
 * @FilePath: \Spirit-client\src\renderer\src\utils\img\img.ts
 * @Description: True or False
 */
import path from 'path-browserify'

export const Img = {
  file: '/src/assets/img/file.png',
  doc: '/src/assets/img/doc.png',
  pdf: '/src/assets/img/pdf.png',
  txt: '/src/assets/img/txt.png',
  png: '/src/assets/img/png.png',
  directory: '/src/assets/img/folder.png',
  windows: '/src/assets/svg/windows-server.svg',
  centos: path.join(path.__dirname, '../../assets/svg/CentOS.svg')
}

export type ImgKeys = keyof typeof Img
