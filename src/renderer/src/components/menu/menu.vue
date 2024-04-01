<!--
 * @Date: 2024-03-09 12:38:33
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 14:40:09
 * @FilePath: \server-monitor\src\renderer\src\components\menu\menu.vue
 * @Description: True or False
-->
<template>
  <ul class="menu-area">
    <slot></slot>
  </ul>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.menu-area {
  height: 100%;
  border-right: 1px solid var(--menu-border-color);
  background-color: var(--bg-color);
  transition: var(--transition);
}
</style>
