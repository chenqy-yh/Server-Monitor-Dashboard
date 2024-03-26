/*
 * @Date: 2024-03-23 12:02:58
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 23:58:56
 * @FilePath: \server-monitor\src\renderer\src\utils\windows\index.ts
 * @Description: True or False
 */
import { BrowserWindowConstructorOptions } from 'electron'

const editorWinOptions: BrowserWindowConstructorOptions = {
  width: 1024,
  height: 768,
  autoHideMenuBar: true,
  resizable: false,
  transparent: true,
  titleBarStyle: 'hidden'
}
export { editorWinOptions }
