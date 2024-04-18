<template>
  <div class="main-content">
    <div class="body">
      <el-table :data="log_list" style="width: 100% !important">
        <el-table-column prop="time" label="Time" width="250" align="center">
          <template #header>
            {{ i18n.global.t('log.mysql.time') }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" width="80" align="center">
          <template #header>
            {{ i18n.global.t('log.mysql.id') }}
          </template>
        </el-table-column>
        <el-table-column prop="command" label="Command" width="100" align="center">
          <template #header>
            {{ i18n.global.t('log.mysql.command') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="argument"
          label="Argument"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #header>
            {{ i18n.global.t('log.mysql.argument') }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <Pagination v-if="loading_finish" v-model:current-page="cur_page" :total="total"></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import Pagination from '@renderer/components/pagination/pagination-1.vue'

import { usePersonalSettingStore, useServerInfoStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { i18n } from '@renderer/plugins/i18n'

interface MysqlLogInfo {
  time: string
  id: string
  command: string
  argument: string
}

// -------------------- S T O R E -------------------- //

const { server_url } = storeToRefs(useServerInfoStore())

const { win_size_setting } = storeToRefs(usePersonalSettingStore())

const log_list = ref<MysqlLogInfo[]>([])

const cur_page = ref<number>(0)

const total = ref<number>(0)

const loading_finish = ref<boolean>(false)

const page_size = computed(() => {
  switch (win_size_setting.value) {
    case 'small':
      return 8
    case 'medium':
      return 10
    case 'large':
      return 12
    default:
      return 0
  }
})

// ------------------- C I R C L E ------------------- //

watch(
  cur_page,
  (val) => {
    getLogInfo(val)
  },
  { immediate: true }
)

// ----------------- F U N C T I O N ----------------- //

async function getLogInfo(page: number) {
  const res = await window.api.getServerLog(server_url.value, 'mysql', page, page_size.value)
  const { data, total: _total } = res
  total.value = _total
  log_list.value = data.map((item) => {
    const t1 = item.split('\t')
    const [_, id, command] = t1[1].split(/\s+/)
    return {
      time: t1[0],
      id,
      command,
      argument: t1[2]
    }
  })
  loading_finish.value = true
}
</script>

<style lang="scss" scoped>
.main-content {
  // border: 1px solid blue;
  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
