<!--
 * @Date: 2024-03-18 00:02:23
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 22:39:00
 * @FilePath: \server-monitor\src\renderer\src\components\card\social-card.vue
 * @Description: True or False
-->
<template>
  <div class="card">
    <Loading></Loading>
    <div class="time">
      <div v-for="(time_item, i) in timeFormat" :key="i" class="time-item">{{ time_item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@renderer/components/loading/loading-2.vue'

import { computed, onMounted, ref } from 'vue'

const time = ref(new Date())

const timeFormat = computed(() => {
  const hours = time.value.getHours()
  const minutes = time.value.getMinutes()
  const time_1 = (hours / 10) | 0
  const time_2 = hours % 10
  const time_3 = (minutes / 10) | 0
  const time_4 = minutes % 10
  return [time_1, time_2, ':', time_3, time_4]
})

onMounted(() => {
  setInterval(() => {
    time.value = new Date()
  }, 1000)
})
</script>

<style lang="scss" scoped>
.card {
  --base-size: var(--dashboard-size);
  background-color: var(--card-bg-color);
  height: calc(var(--base-size) * 15);
  aspect-ratio: 1.32;
  border-radius: calc(var(--base-size) * 1.25);
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px;
  transition: var(--transition);
  border: 1px solid transparent;
  position: relative;
  user-select: none;
  &:hover {
    border-color: var(--border-color);
  }
}

.time {
  display: flex;
  z-index: 10;
  .time-item {
    font-size: calc(var(--base-size) * 5);
    font-weight: 800;
    color: var(--font-color);
    text-align: center;
    animation: come-in 0.5s ease forwards;

    &:nth-child(1) {
      animation-delay: -0.3s;
    }
    &:nth-child(2) {
      animation-delay: -0.225s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
    &:nth-child(4) {
      animation-delay: -0.075s;
    }

    @keyframes come-in {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
}
</style>
