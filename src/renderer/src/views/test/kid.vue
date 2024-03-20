<template>
  <div>this is kid</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  message: 'Hello, Vue 3!'
})

defineExpose({
  state
})
</script>

<style lang="scss" scoped></style>
