<!--
 * @Date: 2024-03-25 12:22:13
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 17:11:04
 * @FilePath: \server-monitor\src\renderer\src\components\icon\brand.vue
 * @Description: True or False
-->
<!-- #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100% -->
<template>
  <div class="brand-icon">
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: #4158d0; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #c850c0; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #ffcc70; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="size / 2.5"
        fill="none"
        stroke="url(#grad1)"
        :stroke-width="size / 6"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 30
  }
})
</script>

<style lang="scss" scoped>
svg {
  filter: drop-shadow(1px 3px 2px rgb(0 0 0 / 0.4));
}
</style>
