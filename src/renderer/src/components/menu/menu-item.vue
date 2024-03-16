<template>
  <li class="menu-item" :class="{ active }" :style="style" @click="handleClick">
    <div class="icon-slot">
      <slot name="icon"></slot>
    </div>
    <div class="menu-content">
      <slot></slot>
    </div>
  </li>
</template>

<script setup lang="ts">
// -------------------- P R O P S -------------------- //
defineProps({
  style: {
    type: Object,
    default: () => ({})
  },
  active: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
// ----------------- F U N C T I O N ----------------- //
const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss">
.menu-item {
  color: var(--menu-item-color);
  min-height: max-content;
  background-color: var(--menu-item-bg);
  border-bottom: var(--menu-item-border);
  display: grid;
  grid-template-columns: var(--menu-icon-size) 1fr;
  align-items: center;
  padding: var(--menu-item-padding);
  padding-left: var(--space-sm);
  gap: var(--space-sm);
  transition: var(--transition);
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: var(--menu-item-hover-bg);
  }

  .icon-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--menu-item-icon-color);
    transition: var(--transition);
  }
  .menu-content {
    // border: 1px solid red;
    font-family: 'Poppins', sans-serif;
    // font-size: var(--menu-item=);
    font-size: var(--menu-item-font-size);
    transition: var(--transition);
  }

  &.active {
    background-color: var(--menu-item-active-bg);
    color: var(--menu-item-active-color);
    .icon-slot {
      color: var(--menu-item-icon-active-color);
    }
  }
}
</style>
