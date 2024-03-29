import { useConfigStore } from '@renderer/store'
import { editorWinOptions } from '@renderer/utils/windows'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { solveNextPath, dirComparer } from '@renderer/utils/file'
import { checkIsReadable } from '@renderer/utils/file'

type BreadcrumbItem = {
  path: string
  name: string
}

const useFile = () => {
  // -------------------- S T O R E -------------------- //
  const { server_url } = storeToRefs(useConfigStore()) // 服务器地址

  const file_stat_list = ref<FileStat[]>() // 文件列表

  // const file_path = ref<string>('/root/test1/node_modules/.pnpm/node_modules') // 文件路径
  const file_path = ref<string>('/root/test1') // 文件路径

  const loading = ref<boolean>(false) // 加载状态

  // 面包屑列表
  const breadcrumb_list = computed(() => {
    let res = [{ name: '/', path: '/' }]
    if (file_path.value != '/') {
      res = file_path.value
        .slice(1)
        .split('/')
        .reduce((acc, cur, i) => {
          return [
            ...acc,
            {
              path: acc[i].path + (i ? '/' : '') + cur,
              name: cur
            }
          ]
        }, res)
    }
    return res
  })

  const select_file_list = ref<string[]>([]) // 选择的文件列表

  const choose_edit_file_path = ref<string>('') // 选择编辑的文件路径

  const open_dir_path_list: Map<string, number> = new Map() // 打开的文件路径列表

  // ------------------- C I R C L E ------------------- //
  onMounted(() => {
    getFileList(file_path.value)
    intiFilePathListener()
  })

  // ----------------- F U N C T I O N ----------------- //

  /**
   *  @description 点击面包屑 访问文件
   *
   */
  const handleClickBreadcrumb = async (item: BreadcrumbItem) => {
    const res = await getFileList(item.path)
    res && (file_path.value = item.path)
  }

  /**
   * @description 初始化文件路径监听
   *
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
   *  @description 获得文件列表
   *
   */
  const getFileList = async (path: string) => {
    try {
      loading.value = true
      file_stat_list.value = (await window.api.getFileList(server_url.value, path)).sort((a, b) =>
        dirComparer(a, b)
      )
      console.log(file_stat_list.value)
      return true
    } catch (err) {
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   *  @description 打开编辑器
   *
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
    const win_id = await window.api.openWindow(editorWinOptions, 'editor')
    if (win_id !== -1) {
      // 记录打开的编辑器dir路径
      open_dir_path_list.set(file_path.value, win_id)
    }
  }

  /**
   *  @description 双击文件
   *
   */
  const handleDbclickFile = async (row: FileStat) => {
    if (row.type === 'file') {
      if (!checkIsReadable(row.name, row.type, row.size)) return
      openFileEditor(row)
    } else if (row.type === 'dir') {
      openDir(row)
    }
  }

  const openDir = async (row: FileStat) => {
    const nextPath = solveNextPath(file_path.value, row.name)
    const res = await getFileList(nextPath)
    res && (file_path.value = nextPath)
    console.log('open Dir:', res)
  }

  const checkEditorHasOpened = (path: string) => {
    return !!open_dir_path_list.get(path)
  }

  const openEditorById = async (id: number) => {
    const res = await window.api.findEditorWindow(id)
    return res
  }

  return {
    file_stat_list,
    file_path,
    loading,
    breadcrumb_list,
    select_file_list,
    choose_edit_file_path,
    handleClickBreadcrumb,
    handleDbclickFile
  }
}

type UseFile = ReturnType<typeof useFile>

let fileComposables: UseFile | undefined = undefined

const setupFile = () => {
  if (!fileComposables) fileComposables = useFile()
  return fileComposables
}

export { setupFile }
