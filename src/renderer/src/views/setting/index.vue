<!--
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-03 23:14:34
 * @FilePath: \server-monitor\src\renderer\src\views\setting\setting.vue
 * @Description: True or False
-->
<template>
  <div class="setting-content">
    <el-radio-group v-model="setting_block" class="radio-group">
      <el-radio-button
        v-for="(setting_item, index) in settingTypeList"
        :key="index"
        :label="setting_item"
        >{{ i18n.global.t(`setting.${setting_item}.label`) }}</el-radio-button
      >
    </el-radio-group>
    <Transition name="fade" mode="out-in">
      <component :is="setting_component"></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CommonSetting from './components/common-setting.vue'
import PersonalSetting from './components/personal-setting.vue'
import FirewallSetting from './components/firewall-setting.vue'
import OpenaiSetting from './components/openai-setting.vue'

import { computed, ref } from 'vue'
import { i18n } from '@renderer/plugins/i18n'

type SettingType = 'common' | 'personal' | 'firewall' | 'openai'

// ----------------- C O N S T A N T ----------------- //

const settingTypeList: SettingType[] = ['common', 'personal', 'firewall', 'openai']

const setting_component_list: Record<SettingType, any> = {
  common: CommonSetting,
  personal: PersonalSetting,
  firewall: FirewallSetting,
  openai: OpenaiSetting
}

const setting_block = ref<SettingType>('common')
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

.setting-content {
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
