<template>
  <div>
    <el-table :data="_fileList" style="width: 100%" @row-dblclick="handleRowDbclick">
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
          <i
            :class="{
              'ri-folder-line ri-lg': row.dir,
              'ri-file-line ri-lg': !row.dir
            }"
          ></i>
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column width="110" prop="mode" label="Permissions">
        <template #default="{ row }">
          {{ row.mode.toString(8) }}
        </template>
      </el-table-column>
      <el-table-column width="100" prop="owner" label="Owner"></el-table-column>
      <el-table-column width="100" prop="size" label="Size"></el-table-column>
      <el-table-column width="180" prop="mtime" label="Edit Time">
        <template v-slot="{ row }">
          {{ formatDateString(row.mtime) }}
        </template>
      </el-table-column>
      <el-table-column width="250" label="Ops" fixed="right">
        <template #default="{ row }">
          <div class="btn-box">
            <div v-if="select_file_list.includes(row.name)" class="btn-groups">
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
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import CheckBox from '@renderer/components/checkbox/checkbox-1.vue'

import { formatDateString } from '@renderer/utils/time'
import { PropType, computed, ref, watch } from 'vue'

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

// ----------------- C O N S T A N T ----------------- //

const select_file_list = ref<string[]>([])

const _fileList = ref<_FileStat[]>([])

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
  (value) => {
    resetFileList()
    _fileList.value = value.map((row) => ({ ...row, checked: false }))
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
.btn-box {
  height: 2rem;
}
.btn-groups {
  width: 220px;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
