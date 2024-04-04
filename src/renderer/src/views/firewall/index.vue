<!--
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 22:44:29
 * @FilePath: \server-monitor\src\renderer\src\views\firewall\index.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <div class="firewall-select">
      <el-select
        v-model="choose_firewall_config"
        placeholder="Select Firewall Config"
        :remote="true"
      >
        <el-option
          v-for="(opt, i) in select_options"
          :key="i"
          :label="opt.label"
          :value="opt.value"
        ></el-option>
      </el-select>
    </div>
    <div class="firewall-item">
      <FirewallItem
        v-if="choose_firewall_config"
        :firewall-config="firewall_config_list[choose_firewall_config]"
      ></FirewallItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import FirewallItem from './firewall-item.vue'

import { useFirewallStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { onMounted, provide, ref } from 'vue'

type Option = {
  label: string
  value: string
}

// -------------------- S T O R E -------------------- //

const firewallStore = useFirewallStore()

const {
  // 防火墙配置列表
  firewall_config_list,
  // 选择的防火墙配置
  choose_firewall_config
} = storeToRefs(firewallStore)

// ----------------- C O N S T A N T ----------------- //

const select_options = ref<Option[]>([]) // 下拉框选项

provide('ins_id', choose_firewall_config) // 提供实例ID

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  await firewallStore.getFirewallConfigKeyList()
  buildSelectOptions()
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  构建下拉框选项
 * @return {*}
 */
const buildSelectOptions = () => {
  select_options.value = firewall_config_list.value.map((config, i) => {
    return {
      label: config.instanceId,
      value: i.toString()
    }
  })
  if (select_options.value.length > 0) {
    choose_firewall_config.value = select_options.value[0].value
  }
}
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
