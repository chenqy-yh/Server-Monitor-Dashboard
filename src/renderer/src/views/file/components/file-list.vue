<template>
  <div class="main-content">
    <Transition name="fade">
      <div v-if="select_file_list.length > 0" class="btn-groups">
        <el-button text circle>
          <i class="ri-cursor-fill"></i>
        </el-button>
        <el-button text circle>
          <i class="ri-clipboard-line"></i>
        </el-button>
        <el-button text circle>
          <i class="ri-scissors-cut-line"></i>
        </el-button>
        <el-button text circle>
          <i class="ri-font-family"></i>
        </el-button>
        <el-button text circle>
          <i class="ri-tools-line"></i>
        </el-button>
        <el-button text circle>
          <i class="ri-delete-bin-line"></i>
        </el-button>
      </div>
    </Transition>

    <div class="table-box">
      <el-table :data="_fileList" style="width: 100%" class="table">
        <el-table-column width="50">
          <template #header>
            <CheckBox v-model:checked="select_all"></CheckBox>
          </template>
          <template #default="{ row }">
            <CheckBox
              v-model:checked="row.checked"
              @update:checked="(e) => onSelectOne(e, row)"
            ></CheckBox>
          </template>
        </el-table-column>
        <el-table-column width="150" prop="name" label="File Name" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="file-name" @dblclick="() => handleRowDbclick(row)">
              <i
                :class="{
                  'ri-folder-line ri-lg': row.dir,
                  'ri-file-line ri-lg': !row.dir
                }"
              ></i>
              <span> {{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="110" prop="mode" label="Permissions">
          <template #default="{ row }">
            {{ row.mode.toString(8) }}
          </template>
        </el-table-column>
        <el-table-column width="100" prop="owner" label="Owner"></el-table-column>
        <el-table-column width="100" prop="size" label="Size"></el-table-column>
        <el-table-column prop="mtime" label="Edit Time">
          <template #default="{ row }">
            {{ formatDateString(row.mtime) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <Pagination
        ref="pagination_ref"
        v-model="cur_page"
        :btn-num="Math.min(total, 4)"
        :min-num="1"
        :max-num="total"
      ></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckBox from '@renderer/components/checkbox/checkbox-1.vue'
import Pagination from '@renderer/components/pagination/pagination-1.vue'

import { useConfigStore } from '@renderer/store'
import { formatDateString } from '@renderer/utils/time'
import { storeToRefs } from 'pinia'
import { PropType, computed, nextTick, ref, watch } from 'vue'

type _FileStat = FileStat & { checked: boolean }

// -------------------- P R O P S -------------------- //
const props = defineProps({
  filePath: {
    type: String,
    required: true
  },
  fileList: {
    type: Array as PropType<FileStat[]>,
    default: [] as FileStat[]
  },
  fileListCallBack: {
    type: Function as PropType<(row: FileStat) => void>,
    default: () => {}
  },
  selectMap: {
    type: Object as PropType<FileStat[]>,
    default: [] as FileStat[]
  }
})

const emits = defineEmits(['update:filePath', 'dbclickFile'])

// -------------------- S T O R E -------------------- //
const { win_size_setting } = storeToRefs(useConfigStore())

// ----------------- C O N S T A N T ----------------- //

const pagination_ref = ref<HTMLElement>()

const select_file_list = ref<string[]>([])

// const _fileList = ref<_FileStat[]>([])

const page_size_map = {
  small: 8,
  middle: 10,
  large: 12
}
const page_size = computed(() => page_size_map[win_size_setting.value ?? 'small']) // 每页显示条数
const cur_page = ref<number>(1) // 当前页码

const total = computed(() => Math.ceil(props.fileList.length / page_size.value)) // 总页数

const _fileList = computed(() => {
  const start = (cur_page.value - 1) * page_size.value
  const end = cur_page.value * page_size.value
  return props.fileList.map((row) => ({ ...row, checked: false })).slice(start, end)
})

const select_all = computed({
  get: () => {
    return _fileList.value.length > 0 && _fileList.value.every((row) => row.checked)
  },
  set: (checked) => {
    _fileList.value.forEach((row: _FileStat) => {
      row.checked = checked
      if (checked) {
        select_file_list.value.push(row.name)
      }
    })
    select_file_list.value = checked
      ? Array.from(new Set(_fileList.value)).map((row) => row.name)
      : []
  }
})

// ------------------- C I R C L E ------------------- //
watch(
  () => props.fileList,
  () => {
    console.log('fileList change')
    resetFileList()
    cur_page.value = 1
    // cur_page改变 重新渲染 total ，pagination在下一个tick中重新渲染
    nextTick(() => {
      ;(pagination_ref.value as any).change()
    })
  }
)

// ----------------- F U N C T I O N ----------------- //

const resetFileList = () => {
  select_file_list.value = []
}

/**
 *  @description 双击文件
 *
 */
const handleRowDbclick = async (row: FileStat) => {
  emits('dbclickFile', row)
}

/**
 *  @description 选择一个文件
 *
 */
const onSelectOne = (e: boolean, row: FileStat) => {
  if (e) {
    select_file_list.value.push(row.name)
  } else {
    select_file_list.value = select_file_list.value.filter((name) => name !== row.name)
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  position: relative;
  display: flex;
  flex-direction: column;
}

.table tbody {
  &::-webkit-scrollbar {
    display: none;
  }
}
.btn-groups {
  z-index: 99999;
  position: fixed;
  right: 5vw;
  top: 50%;
  transform: translateY(-50%);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  border-radius: var(--radius-md);
  padding: var(--space-ssm);
  &::-webkit-scrollbar {
    display: none;
  }
}

.table-box {
  border: 1px solid var(--border-color);
  padding: var(--space-1x);
  background-color: var(--bg-color);
  border-radius: var(--radius-sm);

  .file-name {
    cursor: pointer;
    display: flex;
    gap: var(--space-sm);
    align-items: center;
  }
}
.footer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
