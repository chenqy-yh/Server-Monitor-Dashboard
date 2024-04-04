/*
 * @Date: 2024-03-25 20:18:30
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 22:35:12
 * @FilePath: \server-monitor\src\main\utils\file\index.ts
 * @Description: True or False
 */
import { BrowserWindow } from 'electron'

/**
 * @description:  查找编辑窗口并激活
 * @param {number} winId
 * @return {*}
 */
const handleEditorWindowFind = (winId: number) => {
  const win = getWindowById(winId)
  if (!win) {
    return false
  }
  focusEditorWindow(win)
  return true
}

/**
 * @description: 通过ID获取窗口
 * @param {number} id
 * @return {*}
 */
const getWindowById = (id: number) => {
  return BrowserWindow.getAllWindows().find((win) => win.id === id)
}

/**
 * @description: 焦点编辑窗口
 * @param {BrowserWindow} win
 * @return {*}
 */
const focusEditorWindow = (win: BrowserWindow) => {
  if (win.isMinimized()) {
    win.restore()
  }
  win.focus()
}

export { handleEditorWindowFind, getWindowById }
