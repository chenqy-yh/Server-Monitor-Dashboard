<!--
 * @Date: 2024-04-01 12:01:09
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 12:30:58
 * @FilePath: \server-monitor\src\renderer\src\components\message\bubble.vue
 * @Description: True or False
-->
<template>
  <div class="bubble">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bubble {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  color: var(--font-color);
  word-break: break-all;
  font-family: 'Consolas', 'Courier New', 'monospace';
  font-size: 0.8rem;
  transition: var(--transition);
  &:hover {
    border-color: color-mix(in srgb, var(--border-color) 80%, var(--reverse-color));
  }
}
</style>
