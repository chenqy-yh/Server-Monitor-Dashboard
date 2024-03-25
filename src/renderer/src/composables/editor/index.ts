/*
 * @Date: 2024-03-25 23:00:52
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 23:47:22
 * @FilePath: \server-monitor\src\renderer\src\composables\editor\index.ts
 * @Description: True or False
 */
import { setupEditor, UseEditor } from './editor'

const editorMap = new Map<number, UseEditor>()

const useEditor = (id: number) => {
  if (!editorMap.has(id)) {
    throw new Error('Editor store not found')
  }
  return editorMap.get(id)!
}

const registerEditorStore = (id: number, editorStore: UseEditor) => {
  editorMap.set(id, editorStore)
}

export { useEditor, setupEditor, registerEditorStore }
export type { UseEditor }
