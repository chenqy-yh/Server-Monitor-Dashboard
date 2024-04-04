<!--
 * @Date: 2024-03-09 10:44:50
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 23:27:58
 * @FilePath: \server-monitor\src\renderer\src\views\setting\components\common-setting.vue
 * @Description: True or False
-->
<template>
  <Card>
    <template #header>
      <span>{{ i18n.global.t('setting.common.title') }}</span>
    </template>
    <template #default>
      <el-form
        label-position="top"
        label-width="auto"
        :model="form_data"
        style="width: max-content"
        @submit.prevent
      >
        <el-form-item>
          <template #label>
            <div class="form-label">{{ i18n.global.t('setting.common.host') }}</div>
          </template>
          <el-input v-model="form_data.host" style="width: 240px"></el-input>
        </el-form-item>
        <div class="form-footer">
          <el-button @click="save">{{ i18n.global.t('setting.common.save') }}</el-button>
        </div>
      </el-form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'

import { useCommonSettingStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { i18n } from '@renderer/plugins/i18n'
// -------------------- S T O R E -------------------- //

const commonSettingStore = useCommonSettingStore()

const { host } = storeToRefs(commonSettingStore)

// ----------------- C O N S T A N T ----------------- //
const form_data = reactive({
  host: host.value
})

// ----------------- F U N C T I O N ----------------- //
const save = () => {
  commonSettingStore.update_host_setting(form_data.host)
}
</script>

<style lang="scss" scoped>
.tag {
  background: var(--font-color);
  color: var(--bg-color);
  border-color: var(--border-color);
}
.title {
  font-size: var(--font-size-title);
  padding-bottom: var(--space-sm);
  // margin-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}
.form-label {
  color: var(--font-color);
  font-size: var(--font-size);
  width: max-content;
}
.form-footer {
  display: flex;
  justify-content: center;
}
</style>
