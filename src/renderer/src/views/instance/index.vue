<!--
 * @Date: 2024-04-06 14:10:39
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 14:22:12
 * @FilePath: \server-monitor\src\renderer\src\views\instance\index.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <div class="inner">
      <ul class="instance-list">
        <li v-for="(instance, idx) in instanceList" :key="idx" class="instance-item">
          <InstanceCard :instance="instance"></InstanceCard>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import InstanceCard from '@renderer/components/card/instance-card.vue'

import { useTcloudStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
// -------------------- S T O R E -------------------- //

const { instanceList } = storeToRefs(useTcloudStore())
</script>

<style lang="scss" scoped>
.main-content {
  padding: var(--space-1x);
}
.inner {
  background-color: var(--bg-color);
  height: 100%;
  padding: var(--space-1x);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
}

.instance-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1x);
  .instance-item {
    list-style: none;
  }
}
</style>
