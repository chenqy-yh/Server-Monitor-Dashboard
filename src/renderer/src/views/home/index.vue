<!--
 * @Date: 2024-04-07 14:07:31
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 14:13:16
 * @FilePath: \server-monitor\src\renderer\src\views\home\index.vue
 * @Description: True or False
-->
<template>
  <CommonLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" class="view-container"></component>
      </Transition>
    </RouterView>
  </CommonLayout>
</template>

<script setup lang="ts">
import CommonLayout from '@renderer/layouts/common-layout.vue'
</script>

<style lang="scss" scoped>
.view-container {
  width: 100%;
}
</style>
