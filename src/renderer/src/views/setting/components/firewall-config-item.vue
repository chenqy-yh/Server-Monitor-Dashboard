<template>
  <div class="main-content">
    <el-form
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
      <el-button v-if="!isEdit" @click="editConfig">编辑</el-button>
      <el-button v-else @click="save">{{ i18n.global.t('common.save') }}</el-button>
      <el-button v-if="!isEdit" @click="deleteConfig">删除</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { i18n } from '@renderer/plugins/i18n'
import { PropType, reactive } from 'vue'

// -------------------- P R O P S -------------------- //
const props = defineProps({
  firewallConfig: {
    type: Object as PropType<FirewallConfig>,
    default: () => ({})
  },
  isEdit: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['delConfig', 'save', 'edit'])

// ----------------- C O N S T A N T ----------------- //

// 表格数据模型
const form_data = reactive({
  region: props.firewallConfig.region || '',
  secretId: props.firewallConfig.secretId || '',
  secretKey: props.firewallConfig.secretKey || '',
  ins_id: props.firewallConfig.instanceId || ''
})

// 表格配置
const form_config = [
  {
    label: 'setting.tencent.ins-id',
    model: 'ins_id'
  },
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
  }
]

// ----------------- F U N C T I O N ----------------- //

/**
 *  @description 保存配置
 *
 */
const save = () => {
  const firewallConfig = {
    instanceId: form_data.ins_id,
    region: form_data.region,
    secretId: form_data.secretId,
    secretKey: form_data.secretKey
  }
  emits('save', firewallConfig)
}
/**
 *  @description 删除配置
 *
 */
const deleteConfig = () => {
  const firewallConfig = {
    instanceId: form_data.ins_id,
    region: form_data.region,
    secretId: form_data.secretId,
    secretKey: form_data.secretKey
  }
  window.api.deleteFirewallConfig(JSON.stringify(firewallConfig))
  emits('delConfig')
}

const editConfig = () => {
  emits('edit')
}
</script>

<style lang="scss" scoped>
.main-content {
  padding: var(--space-1x);
  .btn-groups {
    display: flex;
    justify-content: center;
    gap: var(--space-1x);
  }
  .form {
    .form-label {
      color: var(--font-color);
    }
  }
}
</style>
