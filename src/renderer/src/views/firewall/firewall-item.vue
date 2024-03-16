<template>
  <Transition name="fade" mode="out-in">
    <div v-if="!show_error" class="main-content">
      <div class="btn-groups">
        <el-button @click="addFirewallRules">{{
          i18n.global.t('firewall.btn.addrules')
        }}</el-button>
        <el-button>{{ i18n.global.t('firewall.btn.delrules') }}</el-button>
        <el-button
          class="sort-btn"
          :class="{ active: active_sort_mode }"
          @click="firewall_store.activeSortMode"
          >{{ i18n.global.t('firewall.btn.sort') }}</el-button
        >
        <Transition name="fade" mode="out-in">
          <el-button
            v-if="active_sort_mode"
            v-loading="save_loading"
            @click="firewall_store.saveList"
            >{{ i18n.global.t('firewall.btn.save') }}</el-button
          >
        </Transition>
      </div>
      <div v-if="firewall_rule_list.length > 0" class="table-data">
        <el-table
          :data="firewall_rule_list.slice((cur_page - 1) * page_size, cur_page * page_size)"
          class="dragTable"
          style="width: 100%"
        >
          <el-table-column prop="AppType" width="130" :align="'center'">
            <template #header>
              <div class="apptype-header">
                <Checkbox></Checkbox>
                <span>{{ i18n.global.t('firewall.apptype') }}</span>
              </div>
            </template>
            <template #default="{ row }">
              <div class="apptype-content">
                <Checkbox></Checkbox>
                <span>{{ row.AppType }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(col, i) in col_list"
            :key="i"
            :prop="col.prop"
            :label="i18n.global.t(col.label)"
            :width="col.width"
            :show-overflow-tooltip="col.showOverflowTooltip"
            :align="col.align"
          ></el-table-column>
          <el-table-column
            width="150"
            :label="i18n.global.t('firewall.op')"
            :align="'center'"
            fixed="right"
          >
            <template #default="{ row, $index }">
              <div class="btn-groups">
                <el-button @click="() => openEditRuleDialog(row, $index)">{{
                  i18n.global.t('firewall.btn.edit-rule')
                }}</el-button>
                <el-button>{{ i18n.global.t('firewall.btn.delrule') }}</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <Pagination
          v-model="cur_page"
          :btn-num="Math.min(total, 4)"
          :min-num="1"
          :max-num="total"
        ></Pagination>
      </div>

      <AddFirewallRulesDialog
        :show="show_addrules_dialog"
        @cancel="show_addrules_dialog = false"
        @confirm="show_addrules_dialog = false"
      ></AddFirewallRulesDialog>
      <EditFirewallRulesDialog
        :firewallrule="edit_firewall_rule"
        :rule-index="edit_firewall_rule_index"
        :show="show_editrule_dialog"
        @cancel="show_editrule_dialog = false"
        @confirm="show_editrule_dialog = false"
      >
      </EditFirewallRulesDialog>
    </div>
    <div v-else>
      <el-alert
        :title="i18n.global.t('error.connect-server-failed')"
        type="error"
        :description="i18n.global.t('error.check-server-address') + ' ' + server_url"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Pagination from '@renderer/components/pagination/pagination-1.vue'
import AddFirewallRulesDialog from '@renderer/views/firewall/components/add-rules.vue'
import EditFirewallRulesDialog from '@renderer/views/firewall/components/edit-rules.vue'
import Checkbox from '@renderer/components/checkbox/checkbox-1.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useConfigStore, useFirewallStore, useServerInfoStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { PropType, computed, onMounted, onUnmounted, ref, watch } from 'vue'
// -------------------- P R O P S -------------------- //
const props = defineProps({
  firewallConfig: {
    type: Object as PropType<FirewallConfig>,
    required: true
  }
})

// -------------------- S T O R E -------------------- //
const { win_size_setting, server_url } = storeToRefs(useConfigStore())
const { show_error } = storeToRefs(useServerInfoStore())

const firewall_store = useFirewallStore()

const { active_sort_mode, col_list, firewall_rule_list, save_loading } = storeToRefs(firewall_store)

// ----------------- C O N S T A N T ----------------- //

const page_size_map = {
  small: 5,
  middle: 8,
  large: 10
}

/**
 * @description 当前页码
 *
 * */
const cur_page = ref(1)

/**
 * @description 待删除规则集合
 *
 * */
const del_rules = ref<FirewallRule[]>([])

/**
 * 总页数
 *
 * */
const page_size = computed(() => {
  return page_size_map[win_size_setting.value ?? 'small']
})

/**
 * 页码总数
 *
 * */
const total = computed(() => Math.ceil(firewall_rule_list.value.length / page_size.value))

/**
 * 展示添加规则对话框
 *
 * */
const show_addrules_dialog = ref(false)

/**
 * 展开编辑规则对话框
 *
 * */
const show_editrule_dialog = ref(false)
/**
 * 编辑的防火墙规则
 *
 * */
const edit_firewall_rule = ref<FirewallRuleInfo>()

/**
 * 编辑的防火墙规则索引
 *
 * */
const edit_firewall_rule_index = ref<number>()

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  await firewall_store.requestFirewallRules(props.firewallConfig)
})

onUnmounted(() => {
  firewall_store.clearStore()
})

watch(
  () => props.firewallConfig,
  async (newConfig) => {
    await firewall_store.requestFirewallRules(newConfig)
  }
)

// ----------------- F U N C T I O N ----------------- //
/**
 * 添加防火墙规则
 *
 * */
const addFirewallRules = () => {
  show_addrules_dialog.value = true
  // window.api.createNewWindow('/addfirewallrules', 'addFirewallWin')
}

/**
 * 打开编辑规则对话框
 *
 * */
const openEditRuleDialog = (row: FirewallRuleInfo, index: number) => {
  edit_firewall_rule.value = row
  edit_firewall_rule_index.value = index
  show_editrule_dialog.value = true
}
</script>

<style lang="scss" scoped>
.apptype-header {
  display: flex;
  align-items: center;
  gap: var(--space-1x);
}

.apptype-content {
  display: flex;
  align-items: center;
  gap: var(--space-1x);
}

.main-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-1x);
}
.btn-groups {
  display: flex;
  gap: var(--space-sm);
  width: max-content;
  .sort-btn {
    &.active {
      color: var(--active-color) !important;
      border-color: var(--active-color) !important;
    }
  }
}
.table-data {
  height: 100%;
  padding: var(--space-d);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
