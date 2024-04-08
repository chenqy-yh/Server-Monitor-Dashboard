<!--
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 22:42:43
 * @FilePath: \Spirit-client\src\renderer\src\views\setting\index.vue
 * @Description: True or False
-->
<template>
  <div class="setting-content">
    <div class="top">
      <el-radio-group v-model="setting_block" class="radio-group">
        <el-radio-button
          v-for="(setting_item, index) in settingTypeList"
          :key="index"
          :label="setting_item"
          >{{ i18n.global.t(`setting.${setting_item}.label`) }}</el-radio-button
        >
      </el-radio-group>
      <el-button text circle @click="back">
        <i class="ri-arrow-right-line ri-lg"></i>
      </el-button>
    </div>

    <Transition name="fade" mode="out-in">
      <component :is="setting_component"></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import PersonalSetting from './components/personal-setting.vue'
import OpenaiSetting from './components/openai-setting.vue'

import { computed, ref } from 'vue'
import { i18n } from '@renderer/plugins/i18n'
import { useRouter } from 'vue-router'

type SettingType = 'common' | 'personal' | 'firewall' | 'openai'

// ----------------- C O N S T A N T ----------------- //

const router = useRouter()

const settingTypeList: Partial<SettingType[]> = ['personal', 'openai'] // 设置类型列表

const setting_component_list: Partial<Record<SettingType, any>> = {
  personal: PersonalSetting,
  openai: OpenaiSetting
} // 设置组件列表

const setting_block = ref<SettingType>('personal') // 当前设置类型

const setting_component = computed(() => {
  return setting_component_list[setting_block.value]
}) // 当前设置组件

// ----------------- F U N C T I O N ----------------- //

const back = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.setting-content {
  padding: var(--space-1x);
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
  }
}
</style>
