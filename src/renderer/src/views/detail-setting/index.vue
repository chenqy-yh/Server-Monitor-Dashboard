<!--
 * @Date: 2024-04-18 10:59:44
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:08:59
 * @FilePath: \Spirit-client\src\renderer\src\views\detail-setting\index.vue
 * @Description: True or False
-->
<template>
  <RadioTabLayout :radio-tab-list="radioTabList"></RadioTabLayout>
</template>

<script setup lang="ts">
import RadioTabLayout from '@renderer/layouts/radio-tab-layout.vue'
import RemoteApiComponent from './components/remote-api/remote-api-setting.vue'

const radioTabList = [
  {
    label: 'detail-setting.remote-api.label',
    component: RemoteApiComponent
  }
]
</script>

<style lang="scss" scoped></style>
