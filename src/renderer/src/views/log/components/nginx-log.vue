<template>
  <div class="main-content">
    <div class="body">
      <el-table :data="log_list" style="width: 100% !important">
        <el-table-column prop="ip" width="140" label="ip" align="center">
          <template #header>
            {{ i18n.global.t('log.nginx.ip') }}
          </template>
        </el-table-column>
        <el-table-column prop="remoteUser" width="130" label="remoteUser" align="center">
          <template #header>
            {{ i18n.global.t('log.nginx.remoteUser') }}
          </template>
        </el-table-column>
        <el-table-column width="220" prop="time" label="time" align="center">
          <template #header>
            {{ i18n.global.t('log.nginx.time') }}
          </template>
        </el-table-column>
        <el-table-column prop="method" label="method" :show-overflow-tooltip="true" align="center">
          <template #header>
            {{ i18n.global.t('log.nginx.method') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          width="100"
          label="url"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #header>
            {{ i18n.global.t('log.nginx.url') }}
          </template>
        </el-table-column>
        <el-table-column width="100" prop="protocol" label="protocol" :show-overflow-tooltip="true">
          <template #header>
            {{ i18n.global.t('log.nginx.protocol') }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="status" align="center">
          <template #header>
            {{ i18n.global.t('log.nginx.status') }}
          </template>
        </el-table-column>
        <el-table-column prop="bytes" label="bytes" align="center">
          <template #header>
            {{ i18n.global.t('log.nginx.bytes') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="referer"
          label="referer"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #header>
            {{ i18n.global.t('log.nginx.referer') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="userAgent"
          label="userAgent"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template #header>
            {{ i18n.global.t('log.nginx.ua') }}
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

import { useServerInfoStore, usePersonalSettingStore } from '@renderer/store'
import { i18n } from '@renderer/plugins/i18n'

interface NginxLogInfo {
  ip: string
  remoteUser: string
  time: string
  method: string
  url: string
  protocol: string
  status: string
  bytes: string
  referer: string
  userAgent: string
}

// -------------------- S T O R E -------------------- //

const { server_url } = storeToRefs(useServerInfoStore())

const { win_size_setting } = storeToRefs(usePersonalSettingStore())

// ----------------- C O N S T A N T ----------------- //

const LOG_REGEX =
  /^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\\-]\d{4})\] "(\S+)\s?(\S+)?\s?(\S+)?" (\d{3}) (\d+) "([^"]+)" "([^"]+)"$/

const log_list = ref<NginxLogInfo[]>([]) // 日志列表

const cur_page = ref<number>(0) //  当前页

const total = ref<number>(0) // 总数

const loading_finish = ref<boolean>(false) // 加载完成

const page_size = computed(() => {
  switch (win_size_setting.value) {
    case 'small':
      return 8
    case 'medium':
      return 10
    case 'large':
      return 12
    default:
      return 12
  }
}) // 每页显示条数

// ------------------- C I R C L E ------------------- //

watch(
  cur_page,
  (val) => {
    getLogInfo(val)
  },
  { immediate: true }
)

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  解析nginx日志
 * @param {*} item
 * @return {*}
 */
const parseNignxLogItem = (item: string): NginxLogInfo | undefined => {
  const matches = item.match(LOG_REGEX)
  if (!matches) {
    return
  }
  const [, ip, remoteUser, , time, method, url, protocol, status, bytes, referer, userAgent] =
    matches
  return {
    ip,
    remoteUser,
    time,
    method,
    url,
    protocol,
    status,
    bytes,
    referer,
    userAgent
  }
}

/**
 * @description:  获取日志信息
 * @param {*} page
 * @return {*}
 */
async function getLogInfo(page: number) {
  const res = await window.api.getServerLog(server_url.value, 'nginx', page, page_size.value)
  const { data, total: _total } = res
  total.value = _total
  log_list.value = data.map(parseNignxLogItem).filter(Boolean) as NginxLogInfo[]
  loading_finish.value = true
}
</script>

<style lang="scss" scoped>
.main-content {
  .body {
    overflow-x: auto;
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
}
</style>
