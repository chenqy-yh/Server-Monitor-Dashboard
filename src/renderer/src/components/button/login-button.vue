<!--
 * @Date: 2024-04-07 22:35:38
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-17 13:55:23
 * @FilePath: \Spirit-client\src\renderer\src\components\button\login-button.vue
 * @Description: True or False
-->
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
  --color: #1677ff;
  --hover-color: #4485ff;
  width: 100%;
  height: 2rem;
  border-radius: var(--radius-sm);
  border: none;
  font-size: 1.2rem;
  background: linear-gradient(100deg, var(--color) 20%, var(--hover-color) 40%, var(--color) 60%);
  background-size: 200% 100%;
  background-position-x: 120%;
  color: var(--white);
  font-weight: 500;
  letter-spacing: 3px;
  font-family: 'roboto';
  cursor: pointer;
  transition: none;
  position: relative;
  &:hover {
    background-position-x: -40%;
    transition: all 0.8s;
  }
}
</style>
