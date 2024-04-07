<!--
 * @Date: 2024-04-05 22:30:48
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 14:19:41
 * @FilePath: \server-monitor\src\renderer\src\views\login\index.vue
 * @Description: True or False
-->
<template>
  <div class="login-body">
    <LoginBox></LoginBox>
  </div>
</template>

<script setup lang="ts">
import LoginBox from './components/login-box.vue'
</script>

<style lang="scss" scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
