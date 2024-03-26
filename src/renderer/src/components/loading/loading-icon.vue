<!--
 * @Date: 2024-03-26 11:24:05
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-26 21:57:41
 * @FilePath: \server-monitor\src\renderer\src\components\loading\loading-icon.vue
 * @Description: True or False
-->
<template>
  <svg class="svg" xmlns="http://www.w3.org/2000/svg">
    <circle
      class="mycircle"
      cx="50%"
      cy="50%"
      :r="r"
      fill="none"
      stroke="#888"
      :stroke-width="stroke_w"
      :stroke-dasharray="dasharray(300)"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const pi = Math.PI
const r = ref(6)

const svg_size = computed(() => r.value * 3 + 'px')

const dasharray = computed(() => (rt) => `${(pi * 2 * r.value * rt) / 360}`)
const stroke_w = computed(() => r.value * 0.3)
</script>

<style lang="scss" scoped>
.svg {
  // border: 1px solid red;
  width: v-bind(svg_size);
  height: v-bind(svg_size);
}
.mycircle {
  animation: rotate 2s linear infinite;
  transform-origin: center;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
