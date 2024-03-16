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
