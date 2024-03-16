<template>
  <div class="main-content">
    <Card>
      <template #header>
        <span>{{ i18n.global.t('setting.tencent.title') }}</span>
      </template>
      <template #default>
        <!-- <Tabbed :tab-list="tab_list" :tab-name-list="tab_name_list"></Tabbed> -->
        <!-- <el-form
          v-model="form_data"
          style="max-width: 600px"
          label-width="100px"
          label-position="left"
          class="form"
          @submit.prevent
        >
          <el-form-item v-for="(config_item, i) in form_config" :key="i">
            <template #label>
              <div class="form-label">{{ i18n.global.t(config_item.label) }}</div>
            </template>
            <el-input v-model="form_data[config_item.model]" style="width: 240px"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-groups">
          <el-button @click="save">{{ i18n.global.t('common.save') }}</el-button>
        </div> -->
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'
import Tabbed from '@renderer/components/tabbed/tabbed.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useTencentStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

// -------------------- S T O R E -------------------- //

const tencentStore = useTencentStore()
const { region, secretId, secretKey, ins_id } = storeToRefs(tencentStore)

// ----------------- C O N S T A N T ----------------- //

// 表格数据模型
const form_data = reactive({
  region: region.value || '',
  secretId: secretId.value || '',
  secretKey: secretKey.value || '',
  ins_id: ins_id.value || ''
})

// 表格配置
const form_config = [
  {
    label: 'setting.tencent.region',
    model: 'region'
  },
  {
    label: 'setting.tencent.api-secret-id',
    model: 'secretId'
  },
  {
    label: 'setting.tencent.api-secret-key',
    model: 'secretKey'
  },
  {
    label: 'setting.tencent.ins-id',
    model: 'ins_id'
  }
]

const tab_list = ref<number[]>([])

const tab_name_list = ref<string[]>(['tab1', 'tab2'])

// ----------------- F U N C T I O N ----------------- //

/**
 *  保存配置
 *
 */
const save = () => {
  tencentStore.updateCredit(form_data.secretId, form_data.secretKey)
  tencentStore.updateRegion(form_data.region)
  tencentStore.updateInsId(form_data.ins_id)
}
</script>

<style lang="scss" scoped>
.main-content {
  transition: var(--transition);
  .btn-groups {
    display: flex;
    justify-content: center;
    margin-top: var(--space-sm);
  }
}

.form-label {
  color: var(--font-color);
}
</style>
