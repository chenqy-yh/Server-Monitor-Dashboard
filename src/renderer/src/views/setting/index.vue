<!--
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 12:37:34
 * @FilePath: \Spirit-client\src\renderer\src\views\setting\index.vue
 * @Description: True or False
-->
<template>
  <RadioTabLayout :radio-tab-list="radioTabList" :show-back="true" />
</template>

<script setup lang="ts">
import RadioTabLayout from '@renderer/layouts/radio-tab-layout.vue'
import PersonalSetting from './components/personal-setting.vue'
import OpenaiSetting from './components/openai-setting.vue'

// ----------------- C O N S T A N T ----------------- //
const radioTabList = [
  {
    label: 'setting.personal.label',
    component: PersonalSetting
  },
  {
    label: 'openai',
    component: OpenaiSetting
  }
]
</script>

<style lang="scss" scoped></style>
