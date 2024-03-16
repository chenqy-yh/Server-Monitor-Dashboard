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
import { onMounted, ref } from 'vue'
import FirewallItem from './firewall-item.vue'

type Option = {
  label: string
  value: string
}
// ----------------- C O N S T A N T ----------------- //

const firewall_config_list = ref<FirewallConfig[]>([]) // 防火墙配置列表

const select_options = ref<Option[]>([]) // 下拉框选项

const choose_firewall_config = ref<string>() // 选择的防火墙配置

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  await getFirewallConfigKeyList()
})

// ----------------- F U N C T I O N ----------------- //

/**
 *  @description 获取防火墙配置列表
 *
 */
const getFirewallConfigKeyList = async () => {
  firewall_config_list.value = await window.api.getFirewallConfigList()
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
