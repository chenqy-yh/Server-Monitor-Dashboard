<!--
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 20:35:31
 * @FilePath: \Spirit-client\src\renderer\src\layouts\common-layout.vue
 * @Description: True or False
-->
<!--
 * @Date: 2023-12-22 00:35:03
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 17:52:41
 * @FilePath: \server-monitor\src\renderer\src\layouts\common-layout.vue
 * @Description: True or False
-->
<template>
  <div class="home-content">
    <el-container class="header-container">
      <Header></Header>
    </el-container>
    <el-container class="body-container">
      <slot></slot>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from '@renderer/components/header/header.vue'

import { usePersonalSettingStore } from '@renderer/store'

// -------------------- P R O P S -------------------- //

const { opacity_setting } = storeToRefs(usePersonalSettingStore())

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  window.addEventListener('keydown', BanF11)
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  禁止F11全屏
 * @param {*} e
 * @return {*}
 */
const BanF11 = (e: KeyboardEvent) => {
  if (e.key === 'F11') {
    e.preventDefault()
    e.stopPropagation()
  }
}
</script>

<style lang="scss" scoped>
.home-content {
  height: 100vh;
  opacity: v-bind(opacity_setting);
  border-radius: var(--space-sm);
  border: 1px solid var(--border-color);
  overflow: hidden;
  background-color: white;
  display: grid;
  grid-template-rows: max-content 1fr;
  .header-container {
    width: 100%;
    height: max-content;
  }
  .body-container {
    height: 100%;
    background-color: var(--bg-bt-color);
  }
}
</style>
../../composables/mouse
