<!--
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 18:58:43
 * @FilePath: \server-monitor\src\renderer\src\views\firewall\index.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <div v-if="!error_code" class="firewall-item">
      <FirewallItem
        v-if="choose_firewall_config"
        :firewall-config="choose_firewall_config"
      ></FirewallItem>
    </div>
    <div v-else>
      <el-alert
        :title="i18n.global.t('firewall.warning.get-config-failed.title')"
        type="error"
        :description="i18n.global.t('firewall.warning.get-config-failed.content')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FirewallItem from './firewall-item.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useFirewallStore } from '@renderer/store'
import { storeToRefs } from 'pinia'

// -------------------- S T O R E -------------------- //

const firewallStore = useFirewallStore()

const {
  // 选择的防火墙配置
  choose_firewall_config,
  // 异常代码
  error_code
} = storeToRefs(firewallStore)

// ----------------- F U N C T I O N ----------------- //
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1x);
}

.firewall-select {
  width: max-content;
  background-color: var(--bg-color);
  border-radius: var(--radius-sm);
}

.firewall-item {
  background-color: var(--bg-color);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  padding: var(--space-1x);
  height: 100%;
}
</style>
./firewall
