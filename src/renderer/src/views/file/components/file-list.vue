<template>
  <div class="file-list-content">
    <div class="table-box">
      <el-table :data="tableList" style="width: 100%" class="table">
        <!-- <el-table-column width="50">
          <template #header>
            <CheckBox v-model:checked="selectAll"></CheckBox>
          </template>
          <template #default="{ row }">
            <CheckBox
              v-model:checked="row.checked"
              @update:checked="(e) => onSelectOne(e, row)"
            ></CheckBox>
          </template>
        </el-table-column> -->
        <el-table-column width="150" prop="name" label="File Name" show-overflow-tooltip>
          <template #default="{ row }">
            <div class="file-name" @dblclick="() => handleRowDbclick(row)">
              <i
                :class="{
                  'ri-folder-line ri-lg': row.type === 'dir',
                  'ri-file-line ri-lg': row.type === 'file',
                  'ri-link ri-lg': row.type === 'link'
                }"
              ></i>
              <span> {{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="110" prop="mode" label="Permissions" :align="'center'">
          <template #default="{ row }">
            {{ row.mode.slice(1) }}
          </template>
        </el-table-column>
        <el-table-column width="100" prop="owner" label="Owner" :align="'center'"></el-table-column>
        <el-table-column width="100" prop="size" label="Size" :align="'center'"></el-table-column>
        <el-table-column prop="mtime" label="Edit Time" :align="'center'">
          <template #default="{ row }">
            {{ row.mtime }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckBox from '@renderer/components/checkbox/checkbox-1.vue'

import { PropType, computed, ref, watch } from 'vue'

type TableItem = FileStat & { checked: boolean }

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

const tableList = ref<TableItem[]>([])

const selectAll = computed({
  get: () => {
    return tableList.value.every((item) => item.checked)
  },
  set: (val) => {
    tableList.value.forEach((item) => {
      item.checked = val
    })
  }
})

// ------------------- C I R C L E ------------------- //
watch(
  () => props.fileList,
  (val) => {
    tableList.value = val.map((item) => {
      return {
        ...item,
        checked: false
      }
    })
  },
  {
    immediate: true
  }
)

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
const onSelectOne = (e: boolean, row: TableItem) => {
  row.checked = e
}
</script>

<style lang="scss" scoped>
.file-list-content {
  position: relative;
  display: flex;
  flex-direction: column;
}

.table tbody {
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
</style>
