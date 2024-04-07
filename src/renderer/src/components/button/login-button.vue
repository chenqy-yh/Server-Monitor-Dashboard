<template>
  <button class="login-button" @click="click">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
// -------------------- P R O P S -------------------- //
defineProps<{ label: string }>()

const emits = defineEmits(['click'])

// -------------------- S T O R E -------------------- //
const click = () => {
  emits('click')
}
</script>

<style lang="scss" scoped>
.login-button {
  --active-hover-color: color-mix(in lch, var(--active-color) 90%, var(--reverse-color));
  width: 100%;
  height: 2rem;
  border-radius: var(--radius-sm);
  border: none;
  font-size: 1.2rem;
  background: linear-gradient(
    100deg,
    var(--active-color) 20%,
    var(--active-hover-color) 40%,
    var(--active-color) 60%
  );
  background-size: 200% 100%;
  background-position-x: 120%;
  color: var(--reverse-color);
  font-weight: 500;
  letter-spacing: 3px;
  font-family: 'roboto';
  cursor: pointer;
  transition: none;
  position: relative;
  &:hover {
    background-position-x: -40%;
    transition: all 1s;
  }
}
</style>
