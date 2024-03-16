<template>
  <div class="main-content">
    <el-radio-group v-model="setting_block" class="radio-group">
      <el-radio-button label="common">{{ i18n.global.t('setting.common.label') }}</el-radio-button>
      <el-radio-button label="personal">{{
        i18n.global.t('setting.personal.label')
      }}</el-radio-button>
      <el-radio-button label="firewall">
        {{ i18n.global.t('setting.firewall.label') }}
      </el-radio-button>
      <!-- <el-radio-button label="tencent">{{
        i18n.global.t('setting.tencent.label')
      }}</el-radio-button> -->
    </el-radio-group>
    <Transition name="fade" mode="out-in">
      <component :is="setting_component"></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CommonSetting from './components/common-setting.vue'
import PersonalSetting from './components/personal-setting.vue'
import TencentSetting from './components/tencent-setting.vue'
import FirewallSetting from './components/firewall-setting.vue'

import { computed, ref } from 'vue'
import { i18n } from '@renderer/plugins/i18n'

// ----------------- C O N S T A N T ----------------- //

const setting_component_list = {
  common: CommonSetting,
  personal: PersonalSetting,
  tencent: TencentSetting,
  firewall: FirewallSetting
}

const setting_block = ref<'common' | 'personal'>('common')
const setting_component = computed(() => {
  return setting_component_list[setting_block.value]
})

// ------------------- C I R C L E ------------------- //

// ----------------- F U N C T I O N ----------------- //
</script>

<style lang="scss" scoped>
.radio-group {
  margin-bottom: var(--space-sm);
}

.tag {
  background: var(--font-color);
  color: var(--bg-color);
  border-color: var(--border-color);
}

.main-content {
  .title {
    font-size: var(--font-size-title);
    padding-bottom: var(--space-sm);
    // margin-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border-color);
  }
  .form-label {
    font-size: var(--font-size);
    border-bottom: 1px solid var(--border-color);
    width: max-content;
    padding-block: var(--space-sm);
  }
  .form-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
