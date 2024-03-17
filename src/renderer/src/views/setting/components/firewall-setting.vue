<template>
  <div class="main-content">
    <Card>
      <template #header>
        <span>{{ i18n.global.t('setting.firewall.title') }}</span>
      </template>
      <template #default>
        <Tabbed
          v-if="!loading"
          v-model:active-tab-idx="active_tab_idx"
          v-model:tab-list="tab_list"
          :max-tab-num="6"
          :before-add-tab="beforeAddTab"
          :before-close-tab="beforeCloseTab"
          @update:tab-list="onUpdateTabList"
        >
          <FirewallConfigItem
            v-for="(id, i) in tab_list"
            v-show="id === active_tab_idx"
            :key="id"
            :firewall-config="firewall_config_list[i]"
            :is-edit="save_config_list[i].edit"
            @del-config="() => onDelConfig(i)"
            @save="onSaveConfig"
            @edit="onEditConfig(i)"
          ></FirewallConfigItem>
        </Tabbed>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'
import Tabbed from '@renderer/components/tabbed/tabbed.vue'
import FirewallConfigItem from './firewall-config-item.vue'

import { i18n } from '@renderer/plugins/i18n'
import { ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'

// ----------------- C O N S T A N T ----------------- //

const loading = ref(false) // 加载状态

const tab_list = ref<number[]>([]) // tab列表

const active_tab_idx = ref(0) // 当前激活的tab索引

const firewall_config_list = ref<FirewallConfig[]>([]) // 防火墙配置列表

const save_config_list = ref<
  {
    id: number
    edit: boolean
  }[]
>([])

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  getFirewallConfig()
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description 获取防火墙配置列表
 *
 */
const getFirewallConfig = async () => {
  loading.value = true
  firewall_config_list.value = await window.api.getFirewallConfigList()
  tab_list.value = Array.from({ length: firewall_config_list.value.length }, (_, i) => i)
  save_config_list.value = Array.from({ length: firewall_config_list.value.length }, (_, i) => ({
    id: i,
    edit: false
  }))
  loading.value = false
}

/**
 *  @description 删除配置
 *
 */
const onDelConfig = (idx: number) => {
  firewall_config_list.value.splice(idx, 1)
  tab_list.value.splice(idx, 1)
  save_config_list.value.splice(idx, 1)
  active_tab_idx.value = 0
}

/**
 *  @description 保存配置
 *
 */
const onSaveConfig = async (firewallConfig: FirewallConfig) => {
  await window.api.setFirewallConfig(JSON.stringify(firewallConfig))
  getFirewallConfig()
}

/**
 *  @description 编辑配置
 *
 */
const onEditConfig = (idx: number) => {
  save_config_list.value[idx].edit = true
}

/**
 *  @description 更新tab列表
 *
 */
const onUpdateTabList = (tabList: number[]) => {
  save_config_list.value = tabList.map((id, i) => {
    return {
      id,
      edit: i < save_config_list.value.length ? save_config_list.value[i].edit : true
    }
  })
}

const beforeAddTab = async () => {
  const is_edit = save_config_list.value.some((item) => item.edit)
  if (is_edit) {
    return ElMessageBox.confirm(
      i18n.global.t('warning.have-unsaved'),
      i18n.global.t('common.warning'),
      {
        confirmButtonText: i18n.global.t('common.confirm'),
        type: 'warning',
        showCancelButton: false
      }
    )
      .then(() => {
        return false
      })
      .catch(() => {
        return false
      })
  }
  return true
}

const beforeCloseTab = async () => {
  const is_edit = save_config_list.value.some((item) => item.edit)
  if (is_edit) {
    return ElMessageBox.confirm(
      i18n.global.t('warning.have-unsaved'),
      i18n.global.t('common.warning'),
      {
        confirmButtonText: i18n.global.t('common.del'),
        cancelButtonText: i18n.global.t('common.cancel')
      }
    )
      .then(() => {
        onDelConfig(active_tab_idx.value)
        return true
      })
      .catch(() => {
        return false
      })
  }
  return true
}
</script>

<style lang="scss" scoped>
.main-content {
  transition: var(--transition);
  .btn-groups {
    display: flex;
    justify-content: center;
    margin-top: var(--space-sm);
  }
}

.form-label {
  color: var(--font-color);
}
</style>
