/*
 * @Date: 2024-03-25 23:00:52
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 14:51:32
 * @FilePath: \server-monitor\src\renderer\src\views\editor\index.ts
 * @Description: True or False
 */
import { setupEditor, UseEditor } from './editor'
import { editorWinOptions } from './config'

const editorMap = new Map<number, UseEditor>()

const useEditor = (id: number) => {
  if (!editorMap.has(id)) throw new Error('Editor store not found')
  return editorMap.get(id)!
}

const registerEditorStore = (id: number, editorStore: UseEditor) => {
  editorMap.set(id, editorStore)
}

const createEditorWindow = async () => {
  return window.api.openWindow(editorWinOptions, 'editor')
}

export { useEditor, setupEditor, registerEditorStore, createEditorWindow }
export type { UseEditor }
