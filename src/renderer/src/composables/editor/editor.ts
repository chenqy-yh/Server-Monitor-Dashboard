/*
 * @Date: 2024-03-24 16:37:20
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 00:41:30
 * @FilePath: \server-monitor\src\renderer\src\composables\editor\editor.ts
 * @Description: True or False
 */
import { EditorOptions } from '@renderer/components/editor'
import { RowItem } from '@renderer/components/explorer'
import { checkIsReadable, dirComparer } from '@renderer/utils/file'
import * as monaco from 'monaco-editor'
import { nextTick, onBeforeMount } from 'vue'
import { onMounted, ref } from 'vue'

const setupEditor = () => {
  // ----------------- C O N S T A N T ----------------- //

  const win_id = ref<number>() // 窗口ID

  const winSize = ref<[number, number]>([1024, 768]) // 窗口大小

  const isReady = ref<boolean>(false) // 内容加载状态

  const languages = monaco.languages.getLanguages() // 语言列表

  const editContent = ref<string>('') // 编辑器内容

  const options: EditorOptions = {
    theme: 'vs-dark',
    language: 'plaintext'
  } // 编辑器配置

  const fileTree = ref<RowItem>() // 文件树

  const dirPath = ref<string>('') // 目录路径

  const filePath = ref<string>('') // 文件路径

  const serverUrl = ref<string>('') // 服务器地址

  // ------------------- C I R C L E ------------------- //
  onBeforeMount(async () => {
    await getEditorWinId()
  })

  onMounted(async () => {
    isReady.value = false
    await getFileData()
    await getFileContent()
    initLanguage()
    await getDirInfo()
    isReady.value = true
    addListenerList()
  })

  // ----------------- F U N C T I O N ----------------- //

  /**
   * @description:  添加监听器
   * @return {*}
   */
  const addListenerList = () => {
    addOpenFileListener()
    addSaveFileListener()
  }

  /**
   * @description:  添加打开文件监听器
   * @return {*}
   */
  const addOpenFileListener = () => {
    window.api.onResponse('editor-open-file:renderer', (...args: unknown[]) => {
      const [filePath, fileSize] = args
      openFile(filePath as string, fileSize as number)
    })
  }

  /**
   * @description:  添加保存文件监听器
   * @return {*}
   */
  const addSaveFileListener = () => {
    // 监听ctrl+s
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 's') {
        saveFileContent()
      }
    })
  }

  /**
   * @description:  获取编辑器窗口ID
   * @return {*}
   */
  const getEditorWinId = async () => {
    win_id.value = await window.api.getWinId()
  }

  /**
   * @description:  保存文件内容
   * @return {*}
   */
  const saveFileContent = async () => {
    const res = await window.api.saveFileContent(serverUrl.value, filePath.value, editContent.value)
    if (res === 'success save') {
      console.log('保存成功')
    } else {
      console.log('保存失败')
    }
  }

  /**
   * @description:  打开文件
   * @param {string} path
   * @return {*}
   */
  const openFile = async (path: string, size: number) => {
    if (!checkIsReadable(path, size)) return
    filePath.value = path
    console.log('filep:',filePath.value)
    await getFileContent()
    initLanguage()
  }

  /**
   * @description:  更新文件树
   * @param {RowItem} row
   * @return {*}
   */
  const updateFileTree = (row: RowItem) => {
    fileTree.value = row
  }

  /**
   * @description:  点击目录
   * @param {string} path
   * @return {*}
   */
  const handleClickDir = async (path: string) => {
    const res = (await window.api.getFileList(serverUrl.value, path))
      .sort((a, b) => dirComparer(a, b))
      .map((item) => {
        return {
          name: item.name,
          dir: item.dir,
          children: [],
          open: false,
          vis: false,
          size: item.size
        } as RowItem
      })
    return res
  }

  /**
   * @description:  获取目录信息
   * @return {*}
   */
  const getDirInfo = async () => {
    dirPath.value = filePath.value.slice(0, filePath.value.lastIndexOf('/'))
    fileTree.value = {
      name: getNameFromPath(dirPath.value),
      dir: true,
      vis: false,
      open: true,
      size: 0,
      children: (await window.api.getFileList(serverUrl.value, dirPath.value))
        .sort((a, b) => dirComparer(a, b))
        .map((item) => {
          return {
            name: item.name,
            dir: item.dir,
            children: [],
            vis: false,
            open: false,
            size: item.size
          } as RowItem
        })
    }
    console.log(fileTree.value)
  }

  const getNameFromPath = (path) => {
    return path === '/' ? '/' : path.slice(path.lastIndexOf('/') + 1)
  }

  /**
   *  @description 获取文件相关信息
   *
   */
  const getFileData = async () => {
    const data_str = await window.api.getFilePath()

    const data = JSON.parse(data_str)
    filePath.value = data.path
    serverUrl.value = data.serverUrl
  }

  /**
   *  @description 获取文件内容
   *
   */
  const getFileContent = async () => {
    editContent.value = await window.api.getFileContent(serverUrl.value, filePath.value)
  }

  /**
   *  @description 初始化语言
   *
   */
  const initLanguage = () => {
    options.language = getLanguagesForFile(filePath.value)?.id || 'plaintext'
  }

  /**
   *  @description 获取文件对应的语言
   *
   */
  const getLanguagesForFile = (file) => {
    const ext = '.' + file.split('.').pop()
    return languages.find((lang) => lang.extensions && lang.extensions.includes(ext))
  }

  const register = (registerFn: (win_id: number) => void) => {
    nextTick(() => {
      if (!win_id.value) throw Error('win_id is required')
      registerFn(win_id.value)
    })
  }

  return {
    win_id,
    filePath,
    winSize,
    isReady,
    editContent,
    options,
    fileTree,
    dirPath,
    serverUrl,
    openFile,
    updateFileTree,
    handleClickDir,
    saveFileContent,
    register
  }
}

type UseEditor = ReturnType<typeof setupEditor>

export { setupEditor }
export type { UseEditor }
