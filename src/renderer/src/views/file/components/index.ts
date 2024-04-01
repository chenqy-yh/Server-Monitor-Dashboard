import { useContextMenu } from '@renderer/components/context-menu'
import { setupFile } from '../index'
import { messageStore } from '@renderer/composables/message'
import { i18n } from '@renderer/plugins/i18n'
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

type TableItem = FileStat & { checked: boolean }

type MkType = 'mkdir' | 'mkfile'

const useFileList = ({ emits }) => {
  // -------------------- S T O R E -------------------- //
  const { server_url } = storeToRefs(useConfigStore())

  const { file_path } = setupFile()

  const { success, error } = messageStore

  // ----------------- C O N S T A N T ----------------- //

  const tableRef = ref<HTMLLIElement>() // 表格dom

  const tableList = ref<TableItem[]>([]) // 表格数据

  const preFilePath = ref('') // 复制文件路径

  const targetItem = ref<TableItem>() // 右键目标文件

  const dragStartItem = ref<TableItem>() // 拖拽开始文件

  const mkdirOrFileDialogVis = ref(false) // 创建文件夹弹窗

  const mkType = ref<MkType>() // 创建文件夹还是文件

  const newFolderOrFileName = ref('') // 输入框

  // 右键菜单模板
  const contextMenu: ContextMenuItem[] = [
    {
      icon: 'ri-cursor-line',
      label: i18n.global.t('context-menu.open'),
      action: () => {
        emits('dbclickFile', targetItem.value)
      }
    },
    {
      icon: 'ri-download-2-fill',
      label: i18n.global.t('context-menu.download'),
      action: async () => {
        const fullPath = file_path.value + '/' + targetItem.value?.name
        const content = await window.api.getFileContent(server_url.value, fullPath)
        const fileName = targetItem.value?.name || 'file'
        // 将内容转为blob 并下载
        const blob = new Blob([content])
        const a = document.createElement('a')
        a.download = fileName
        a.href = URL.createObjectURL(blob)
        a.click()
      }
    },
    {
      icon: 'ri-delete-bin-line',
      label: i18n.global.t('context-menu.del'),
      action: async () => {
        const fullPath = file_path.value + '/' + targetItem.value?.name
        window.api
          .delFile(server_url.value, fullPath)
          .then(() => {
            success(`Del ${targetItem.value?.name} success`)
            emits('refresh')
          })
          .catch(() => {
            error(`Del ${targetItem.value?.name} failed`)
          })
      }
    },
    {
      icon: 'ri-file-copy-line',
      label: i18n.global.t('context-menu.copy'),
      action: async () => {
        // 监听 ctrl + v
        preFilePath.value = file_path.value
        window.addEventListener('keydown', handleFileCopy)
      }
    },
    {
      icon: 'ri-folder-line',
      label: i18n.global.t('context-menu.mkdir'),
      action: async () => {
        mkType.value = 'mkdir'
        mkdirOrFileDialogVis.value = true
      }
    },
    {
      icon: 'ri-file-line',
      label: i18n.global.t('context-menu.mkfile'),
      action: async () => {
        mkType.value = 'mkfile'
        mkdirOrFileDialogVis.value = true
      }
    }
  ]

  // 指令绑定
  const contextMenuBinding = reactive({
    menus: contextMenu,
    allowPropagation: true
  })

  // 保存删除事件的方法
  const dragHandlerMap = new Map<number, () => void>()

  // ----------------- F U N C T I O N ----------------- //

  /**
   * @description:  创建文件夹或文件
   * @param {*}
   * @return {*}
   */
  const mkdirOrFile = async () => {
    if (newFolderOrFileName.value === undefined || newFolderOrFileName.value === '') return
    if (mkType.value === 'mkdir') {
      await window.api
        .mkdir(server_url.value, file_path.value + '/' + newFolderOrFileName.value)
        .then(() => {
          success(`Create ${newFolderOrFileName.value} success`)
        })
        .catch(() => {
          error(`Create ${newFolderOrFileName.value} failed`)
        })
    } else if (mkType.value === 'mkfile') {
      await window.api
        .mkfile(server_url.value, file_path.value + '/' + newFolderOrFileName.value)
        .then(() => {
          success(`Create ${newFolderOrFileName.value} success`)
        })
        .catch(() => {
          error(`Create ${newFolderOrFileName.value} failed`)
        })
    }
    newFolderOrFileName.value = ''
    mkdirOrFileDialogVis.value = false
    emits('refresh')
  }

  /**
   * @description:   使文件可移动
   * @param {*}
   * @return {*}
   */
  function makeFileMoveable() {
    const rowDomList = tableRef.value?.querySelectorAll(
      '.el-table__row'
    ) as unknown as HTMLElement[]
    // add draggable
    rowDomList?.forEach((rowDom, index) => {
      rowDom.setAttribute('draggable', 'true')
      const _dragStartHandler = handleDragMoveStart(index)
      const _dragOverHandler = handleDragOver
      const _dragDropHandler = handleDragDrop(index)
      const removeDragHandler = () => {
        rowDom.removeEventListener('dragstart', _dragStartHandler)
        rowDom.removeEventListener('dragover', _dragOverHandler)
        rowDom.removeEventListener('drop', _dragDropHandler)
      }
      dragHandlerMap.set(index, removeDragHandler)
      rowDom.addEventListener('dragstart', _dragStartHandler)
      rowDom.addEventListener('dragover', _dragOverHandler)
      rowDom.addEventListener('drop', _dragDropHandler)
    })
  }

  /**
   * @description:  移除文件移动
   * @param {*}
   * @return {*}
   */
  function removeFileMoveable() {
    const rowDomList = tableRef.value?.querySelectorAll(
      '.el-table__row'
    ) as unknown as HTMLElement[]
    rowDomList?.forEach((rowDom, index) => {
      rowDom.removeAttribute('draggable')
      const removeHandler = dragHandlerMap.get(index)
      if (removeHandler) {
        removeHandler()
      }
    })
    dragHandlerMap.clear()
    emits('update:moveable', false)
  }

  /**
   * @description:  处理拖拽开始
   * @param {*} index
   * @return {*}
   */
  const handleDragMoveStart = (index: number) => {
    return () => {
      dragStartItem.value = tableList.value.find((_, i) => i === index)
    }
  }

  /**
   * @description:  处理拖拽移动
   * @param {*} e
   * @return {*}
   */
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  /**
   * @description:  处理拖拽放置
   * @param {*} index
   * @return {*}
   */
  const handleDragDrop = (index: number) => {
    return async () => {
      const targetDragItem = tableList.value.find((_, i) => i === index)
      if (!dragStartItem.value || dragStartItem.value.dir) return
      // 如果没有拖拽目标或者拖拽目标不是文件夹则返回
      if (!targetDragItem || !targetDragItem.dir) return
      const src_path = file_path.value + '/' + dragStartItem.value?.name
      const dest_path =
        file_path.value + '/' + targetDragItem?.name + '/' + dragStartItem.value?.name
      await window.api.moveFile(server_url.value, src_path, dest_path)
      emits('refresh')
    }
  }

  /**
   * @description:  处理文件复制
   * @param {*} event
   * @return {*}
   */
  const handleFileCopy = async (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'v') {
      const preFullPath = preFilePath.value + '/' + targetItem.value?.name
      const fullPath = file_path.value + '/' + targetItem.value?.name
      window.api
        .copyFile(server_url.value, preFullPath, fullPath)
        .then(() => {
          success(`Copy ${targetItem.value?.name} success`)
          emits('refresh')
        })
        .catch(() => {
          error(`Copy ${targetItem.value?.name} failed`)
        })
    }
    window.removeEventListener('keydown', handleFileCopy)
  }

  /**
   *  @description 双击文件
   *
   */
  const handleRowDbclick = async (row: FileStat) => {
    emits('dbclickFile', row)
  }

  /**
   * @description:  打开右键菜单
   * @param {*} row
   * @param {*} _
   * @param {*} e
   * @return {*}
   */
  const openContextMenu = (row: TableItem, _: unknown, e: MouseEvent) => {
    // 触发菜单事件
    e.stopPropagation()
    targetItem.value = row
    contextMenu.forEach((item) => {
      if (item.label === i18n.global.t('context-menu.del')) {
        item.disabled = row.dir
      }
    })

    contextMenuBinding.menus = contextMenu
    useContextMenu(tableRef.value, contextMenuBinding, e)
  }
  return {
    mkType,
    tableRef,
    tableList,
    mkdirOrFileDialogVis,
    newFolderOrFileName,
    mkdirOrFile,
    handleRowDbclick,
    openContextMenu,
    removeFileMoveable,
    makeFileMoveable,
    handleFileCopy
  }
}

export { useFileList }
