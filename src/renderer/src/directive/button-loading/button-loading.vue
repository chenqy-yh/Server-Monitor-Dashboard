<!--
 * @Date: 2024-04-06 15:06:58
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-06 15:42:15
 * @FilePath: \server-monitor\src\renderer\src\directive\button-loading\button-loading.vue
 * @Description: True or False
-->
<template>
  <div class="loading-box">
    <LoadingIcon :r="r" :color="color" />
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@renderer/components/loading/loading-icon.vue'
defineProps({
  r: {
    type: Number,
    default: 10
  },
  color: {
    type: String,
    default: '#fefefe'
  }
})
</script>

<style lang="scss" scoped>
.loading-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: inherit;
}
</style>
