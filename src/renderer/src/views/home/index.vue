<!--
 * @Date: 2024-04-07 14:07:31
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 23:15:29
 * @FilePath: \Spirit-client\src\renderer\src\views\home\index.vue
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  const fullpath = useRouter().currentRoute.value.fullPath
  console.log(fullpath)
})
</script>

<style lang="scss" scoped>
.view-container {
  width: 100%;
}
</style>
