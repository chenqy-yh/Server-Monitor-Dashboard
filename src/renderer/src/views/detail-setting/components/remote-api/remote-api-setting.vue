<!--
 * @Date: 2024-04-18 11:05:23
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:12:36
 * @FilePath: \Spirit-client\src\renderer\src\views\detail-setting\components\remote-api\remote-api-setting.vue
 * @Description: True or False
-->
<template>
  <Card>
    <template #header>
      <div class="title">{{ i18n.global.t('detail-setting.remote-api.label') }}</div>
    </template>
    <template #default>
      <el-form label-position="top" label-width="auto" style="width: max-content" @submit.prevent>
        <el-form-item>
          <template #label>
            <div class="form-label">{{ i18n.global.t('detail-setting.remote-api.prefix') }}</div>
          </template>
          <el-input v-model="prefix" :spellcheck="false" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <div class="form-label">{{ i18n.global.t('detail-setting.remote-api.port') }}</div>
          </template>
          <el-input v-model="server_port" style="width: 240px" :spellcheck="false" />
        </el-form-item>
      </el-form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useServerInfoStore } from '@renderer/store'
// -------------------- S T O R E -------------------- //
const { prefix, server_port } = storeToRefs(useServerInfoStore())
</script>

<style lang="scss" scoped>
.remote-api-setting {
  @include container(());
}
</style>
