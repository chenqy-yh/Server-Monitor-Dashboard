import { useServerInfoStore } from '@renderer/store'
import { checkIsReadable, dirComparer, solveNextPath } from '@renderer/utils/file'
import { createEditorWindow } from '@renderer/views/editor'

type BreadcrumbItem = {
  path: string
  name: string
}

const _useFile = () => {
  // -------------------- S T O R E -------------------- //

  const { server_url } = storeToRefs(useServerInfoStore()) // 服务器地址

  // ----------------- C O N S T A N T ----------------- //

  const file_stat_list = ref<FileStat[]>() // 文件列表

  const file_path = ref<string>('/root/test1') // 文件路径

  const loading = ref<boolean>(false) // 加载状态

  const choose_edit_file_path = ref<string>('') // 选择编辑的文件路径

  const open_dir_path_list: Map<string, number> = new Map() // 打开的文件路径列表

  const file_filter = ref<string>('') // 文件过滤

  // ------------------- C I R C L E ------------------- //
  onMounted(() => {
    getFileList(file_path.value)
    intiFilePathListener()
  })

  // ----------------- F U N C T I O N ----------------- //

  /**
   * @description:  点击面包屑
   * @param {BreadcrumbItem} item
   * @return {*}
   */
  const handleClickBreadcrumb = async (item: BreadcrumbItem) => {
    const res = await getFileList(item.path)
    if (res) {
      file_path.value = item.path
    }
  }

  /**
   * @description: 初始化文件路径监听
   * @return {*}
   */
  const intiFilePathListener = async () => {
    window.api.onResponse('get-file-path', () => {
      const data = {
        path: choose_edit_file_path.value,
        serverUrl: server_url.value
      }
      window.api.emitFilePath(JSON.stringify(data))
    })
  }

  /**
   * @description: 获取文件列表
   * @param {string} path
   * @param {string} filter
   * @return {*}
   */
  const getFileList = async (path: string, filter = '') => {
    try {
      loading.value = true
      file_stat_list.value = (await window.api.getFileList(server_url.value, path, filter)).sort(
        (a, b) => dirComparer(a, b)
      )
      return true
    } catch (err) {
      console.error(err)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * @description: 打开文件编辑器
   * @param {FileStat} file
   * @return {*}
   */
  const openFileEditor = async (file: FileStat) => {
    // 构建选择编辑的文件路径
    choose_edit_file_path.value = solveNextPath(file_path.value, file.name)

    // 查询是否已经打开编辑器
    const hasOpened = checkEditorHasOpened(file_path.value)
    const oldEditorId = open_dir_path_list.get(file_path.value)
    const isOpenOldEditor = hasOpened && (await openEditorById(oldEditorId as number))

    // 如果已经打开编辑器 直接返回
    if (isOpenOldEditor) {
      oldEditorId &&
        window.api.editorOpenFile(oldEditorId, choose_edit_file_path.value, file.size, file.type)
      return
    }

    // 如果存在打开编辑器记录 但是编辑器已经关闭 则删除记录
    if (hasOpened) {
      open_dir_path_list.delete(choose_edit_file_path.value)
    }

    // 选择文件后打开编辑器
    const win_id = await createEditorWindow()
    if (win_id !== -1) {
      // 记录打开的编辑器dir路径
      open_dir_path_list.set(file_path.value, win_id)
    }
  }

  /**
   * @description: 双击文件
   * @param {FileStat} row
   * @return {*}
   */
  const handleDbclickFile = async (row: FileStat) => {
    if (row.type === 'file') {
      if (!checkIsReadable(row.name, row.type, row.size)) return
      openFileEditor(row)
    } else if (row.type === 'dir') {
      openDir(row)
    }
  }

  /**
   * @description:  打开文件夹
   * @param {FileStat} row
   * @return {*}
   */
  const openDir = async (row: FileStat) => {
    const nextPath = solveNextPath(file_path.value, row.name)
    const res = await getFileList(nextPath)
    res && (file_path.value = nextPath)
  }

  /**
   * @description: 检查编辑器是否已经打开
   * @param {string} path
   * @return {*}
   */
  const checkEditorHasOpened = (path: string) => {
    return !!open_dir_path_list.get(path)
  }

  /**
   * @description: 通过id打开编辑器
   * @param {number} id
   * @return {*}
   */
  const openEditorById = async (id: number) => {
    const res = await window.api.findEditorWindow(id)
    return res
  }

  /**
   * @description: 搜索
   * @param {() => void} cb
   * @return {*}
   */
  const search = async (cb: () => void) => {
    await getFileList(file_path.value, file_filter.value)
    // cur_page.value = 1
    cb()
  }

  /**
   * @description: 刷新
   * @param {() => void} cb
   * @return {*}
   */
  const handleRrefresh = async (cb: () => void) => {
    await getFileList(file_path.value)
    // cur_page.value = 1
    cb()
  }

  return {
    file_filter,
    file_stat_list,
    file_path,
    loading,
    choose_edit_file_path,
    open_dir_path_list,
    handleClickBreadcrumb,
    handleDbclickFile,
    getFileList,
    search,
    handleRrefresh
  }
}

type UseFile = ReturnType<typeof _useFile>

let fileComposables: UseFile | undefined = undefined

const useFile = () => {
  if (!fileComposables) fileComposables = _useFile()
  return fileComposables
}

export { useFile }
