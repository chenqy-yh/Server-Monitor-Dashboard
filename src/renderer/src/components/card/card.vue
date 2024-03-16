<template>
  <div class="main-content">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="default"></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-content {
  background-color: var(--bg-color);
  border-radius: var(--radius-sm);
  position: relative;
  .header {
    border: 1px solid var(--border-color);
    padding: var(--space-md);
    color: var(--font-color);
    font-size: var(--font-size-title);
    position: sticky;
    top: 0;
    background-color: var(--bg-color);
    border-top-right-radius: var(--radius-sm);
    border-top-left-radius: var(--radius-sm);
    transition: var(--transition);
    z-index: 10;
  }
  .body {
    padding: var(--space-md);
    color: var(--font-color);
    border-inline: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    border-bottom-right-radius: var(--radius-sm);
    border-bottom-left-radius: var(--radius-sm);
    transition: var(--transition);
  }
}
</style>
