<!--
 * @Date: 2024-04-01 23:46:53
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 00:05:12
 * @FilePath: \server-monitor\src\renderer\src\views\setting\components\openai-setting.vue
 * @Description: True or False
-->
<template>
  <div class="openai-setting">
    <Card>
      <template #header>
        <span>{{ i18n.global.t('setting.openai.title') }}</span>
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
              <div class="form-label">Model</div>
            </template>
            <el-select v-model="form_data.model" style="width: 240px">
              <el-option
                v-for="(modelName, index) in model_name_list"
                :key="index"
                :label="modelName"
                :value="modelName"
                >{{ modelName }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #label>
              <div class="form-label">Api Key</div>
            </template>
            <el-input v-model="form_data.apikey" style="width: 240px" />
          </el-form-item>
          <div class="form-footer">
            <el-button @click="save">{{ i18n.global.t('common.save') }}</el-button>
          </div>
        </el-form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'

import { i18n } from '@renderer/plugins/i18n'
import { onMounted, reactive, watch } from 'vue'
import { useOpenaiStore, ModelConfigItem, ModelType } from '@renderer/store/openai'

// -------------------- S T O R E -------------------- //
const openaiStore = useOpenaiStore()

// ----------------- C O N S T A N T ----------------- //
const form_data = reactive<ModelConfigItem>({
  model: '',
  apikey: ''
})

const model_name_list: ModelType[] = ['gpt-3.5-turbo', 'gpt-4']

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  init()
})

watch(() => form_data.model, formDataModelWatchEffect)

// ----------------- F U N C T I O N ----------------- //

function formDataModelWatchEffect(modelName) {
  if (modelName === '') return
  const model_config_key = openaiStore.getOpenaiModelConfig(modelName)
  form_data.apikey = model_config_key?.apikey ?? ''
}

const init = () => {
  const choose_model = openaiStore.getChooseModel()
  form_data.model = choose_model ?? ''
}

const save = () => {
  if (form_data.model === '' || form_data.apikey === '') {
    return
  }
  openaiStore.setOpenaiModelConfig(form_data.model, form_data.apikey)
}
</script>

<style lang="scss" scoped>
.form-footer {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
