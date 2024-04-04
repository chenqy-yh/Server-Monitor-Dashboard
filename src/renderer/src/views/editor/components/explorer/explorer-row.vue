<template>
  <div class="row-container">
    <div
      class="explorer-row"
      :class="{
        active: isActive,
        lastChild: lastChild
      }"
      @click.prevent="() => setActivePath(selfPath, row.size, row.type)"
    >
      <div class="row-content">
        <div class="row-icon">
          <Transition name="fade">
            <LoadingIcon v-if="loading" />
            <i
              v-else
              :class="{
                'ri-arrow-right-s-line ri-lg': !row.open,
                'ri-arrow-down-s-line ri-lg': row.open,
                'opcaity-0': !row.dir
              }"
            ></i>
          </Transition>
        </div>

        <img class="file-type-icon" :src="imgHelper.getImg(fileType)" />
        <span>{{ row.name }}</span>
      </div>
    </div>
    <div v-if="row.open" class="children-row">
      <explorer-row
        v-for="(item, i) in row.children"
        :key="i"
        :loading="loading"
        :row="item"
        :path="selfPath"
        :level="level + 1"
        :last-child="row.dir && i === row.children.length - 1"
        :mask-width="maskWidth"
        :win-id="winId"
        :handle-click-dir="handleClickDir"
        @update:row="(newRow) => updateRow(newRow, i)"
        @open-file="openFile"
      ></explorer-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@renderer/components/loading/loading-icon.vue'

import { imgHelper } from '@renderer/utils/img'
import { computed, ref } from 'vue'
import { RowItem } from '.'
import { useEditor } from '../../index'

const props = defineProps<{
  row: RowItem
  lastChild: boolean
  level: number
  path: string
  maskWidth: number
  winId: number
  handleClickDir: (path: string) => Promise<RowItem[]>
}>()

// -------------------- P R O P S -------------------- //

const emits = defineEmits(['update:row', 'open-file'])

// ----------------- C O N S T A N T ----------------- //

const { filePath, openFile: _openFile } = useEditor(props.winId)

const loading = ref(false) // 是否正在加载

// 遮罩宽度
const _maskWidth = computed(() => props.maskWidth - 2 + 'px')

// 当前节点的路径
const selfPath = computed(() => props.path + '/' + props.row.name)

// 当前节点是否激活
const isActive = computed(() => {
  return filePath.value === selfPath.value
})

// 文件类型
const fileType = computed(() => {
  return props.row.dir ? 'directory' : 'file'
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  更新当前目录树节点信息
 * @param {*} row
 * @param {*} index
 * @return {*}
 */
const updateRow = (row: RowItem, index: number) => {
  const newRow = { ...props.row }
  newRow.children[index] = row
  emits('update:row', newRow)
}

/**
 * @description: 设置当前激活的路径
 * @param {*} path
 * @return {*}
 */
const setActivePath = async (path: string, size: number, type: string) => {
  if (props.row.dir) {
    openDir(path)
  } else {
    openFile(path, size, type)
  }
  const newRow = { ...props.row }
  newRow.open = !newRow.open
  emits('update:row', newRow)
}

/**
 * @description: 点击文件
 * @return {*}
 */
const openFile = (path: string, size: number, type: string) => {
  filePath.value = path
  _openFile(path, size, type)
}

/**
 * @description: 点击目录
 * @param {*} path
 * @return {*}
 */
const openDir = async (path: string) => {
  loading.value = true
  filePath.value = path
  if (!props.row.vis) {
    const res = await props.handleClickDir(path).catch((err) => {
      console.error(err)
      return [-1]
    })
    const newRow = { ...props.row, children: res }
    if (res[0] === -1) {
      newRow.open = false
      newRow.vis = false
    } else {
      newRow.vis = true
      emits('update:row', newRow)
    }
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.file-type-icon {
  width: 1rem;
  height: 1rem;
}
.row-container {
  color: var(--editor-font-color);
  border-left: 1px solid var(--editor-border-color);
  padding-left: 1rem;
}

.explorer-row {
  // border: 1px solid red;
  margin-left: -1.5rem;
  background-color: #181818;
  position: relative;
  height: 1.5rem;
  line-height: 1.5rem;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 1.5rem;
    width: v-bind(_maskWidth);
    background-color: transparent;
    border: 1px solid transparent;
    z-index: 99;
  }
  &:hover::before {
    background-color: #51515148;
  }
  &.active {
    &::before {
      background-color: #0078d44c;
      border: 1px solid #0078d4;
    }
  }
  .row-icon {
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .row-content {
    display: flex;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    gap: 0.3rem;
    i {
      max-width: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &.opcaity-0 {
        display: none;
      }
    }
    span {
      font-size: 14px;
      // 只显示一行 多余的显示...
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
