<!--
 * @Date: 2024-04-06 14:10:39
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:49:03
 * @FilePath: \Spirit-client\src\renderer\src\views\instance\index.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <div class="inner">
      <div class="title-bar">
        <span class="title"> {{ i18n.global.t('instances.title') }} </span>
        <el-button text circle @click="backLogin">
          <i class="ri-arrow-right-line ri-lg"></i>
        </el-button>
      </div>

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
import { i18n } from '@renderer/plugins/i18n'
import { useRouter } from 'vue-router'
// -------------------- S T O R E -------------------- //

const { instanceList } = storeToRefs(useTcloudStore())

// ----------------- C O N S T A N T ----------------- //

const router = useRouter()

// ----------------- F U N C T I O N ----------------- //

const backLogin = () => {
  router.push({ name: 'Login' })
}
</script>

<style lang="scss" scoped>
.main-content {
  padding: var(--space-1x);
}
.inner {
  background-color: var(--bg-color);
  height: 100%;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  .title-bar {
    font-size: var(--font-size-title);
    border-bottom: 1px solid var(--border-color);
    padding: var(--space-sm);
    color: var(--font-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.instance-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1x);
  padding: var(--space-1x);
  .instance-item {
    list-style: none;
  }
}
</style>
