<template>
  <Transition name="fade" mode="out-in">
    <div v-if="!show_error" class="main-content">
      <el-radio-group v-model="choose_log">
        <el-radio-button value="mysql" label="mysql">{{
          i18n.global.t('log.mysql.title')
        }}</el-radio-button>
        <el-radio-button value="nginx" label="nginx">{{
          i18n.global.t('log.nginx.title')
        }}</el-radio-button>
      </el-radio-group>
      <!-- <div class="test"></div> -->
      <div class="log-content">
        <Transition name="fade" mode="out-in">
          <component :is="log_component"></component>
        </Transition>
      </div>
    </div>
    <div v-else>
      <el-alert
        :title="i18n.global.t('error.connect-server-failed')"
        type="error"
        :description="i18n.global.t('error.check-server-address') + ' ' + server_url"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import MysqlLog from './components/mysql-log.vue'
import NginxLog from './components/nginx-log.vue'

import { computed, ref } from 'vue'
import { i18n } from '@renderer/plugins/i18n'
import { useServerInfoStore, useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'

// -------------------- S T O R E -------------------- //
const { show_error } = storeToRefs(useServerInfoStore())
const { server_url } = storeToRefs(useConfigStore())

const choose_log = ref<string>('mysql')
const log_component_list = {
  mysql: MysqlLog,
  nginx: NginxLog
}
const log_component = computed(() => {
  return log_component_list[choose_log.value]
})
</script>

<style lang="scss" scoped>
.main-content {
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: var(--space-sm);
  .log-content {
    border: 1px solid var(--border-color);
    overflow-x: hidden;
    padding: var(--space-md);
    background-color: var(--bg-color);
    color: var(--font-color);
    border-radius: var(--radius-sm);
  }
}
</style>
