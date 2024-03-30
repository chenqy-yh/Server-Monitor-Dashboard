/*
 * @Date: 2024-03-27 22:25:27
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-30 23:40:56
 * @FilePath: \server-monitor\1.js
 * @Description: True or False
 */
const toBuffer = require('blob-to-buffer')

const blob = new Blob([`import { foo } from './2.js'; foo();`], { type: 'application/javascript' })

toBuffer(blob, (err, buf) => {
  console.log(buf.toString())
})
