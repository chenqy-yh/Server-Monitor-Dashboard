<template>
  <el-progress
    type="circle"
    :percentage="rate"
    status="success"
    :stroke-width="8"
    stroke-linecap="round"
    :indeterminate="true"
  >
    <template #default>
      <span class="rate">{{ rate }}%</span>
    </template>
  </el-progress>
</template>

<script setup lang="ts">
defineProps({
  rate: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
.rate {
  font-size: 1.5rem;
  transition: var(--transition);
}
</style>
