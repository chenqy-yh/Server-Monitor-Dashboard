<!-- <template>
  <Transition name="fade" mode="out-in">
    <div v-if="!show_error" class="main-content">
      <div class="btn-groups">
        <el-button @click="addFirewallRules">{{
          i18n.global.t('firewall.btn.addrules')
        }}</el-button>
        <el-button class="forbid" :disabled="!del_rules.length">{{
          i18n.global.t('firewall.btn.delrules')
        }}</el-button>
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
          v-loading="loading"
          :data="firewall_rule_list.slice((cur_page - 1) * page_size, cur_page * page_size)"
          class="dragTable"
          style="width: 100%"
        >
          <el-table-column prop="AppType" width="150" show-overflow-tooltip>
            <template #header>
              <div class="apptype-header">
                <Checkbox></Checkbox>
                <span>{{ i18n.global.t('firewall.apptype') }}</span>
              </div>
            </template>
            <template #default="{ row, $index }">
              <div class="apptype-content">
                <Checkbox @checked="(e) => onChange(e, row, $index)"></Checkbox>
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
                <el-button @click="() => delRule(row, $index)">{{
                  i18n.global.t('firewall.btn.delrule')
                }}</el-button>
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

type TableDataItem = {
  checked: boolean
  firewallRuleInfo: FirewallRuleInfo
}

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

const cur_page = ref(1) // 当前页码
const del_rules = ref<Record<string, FirewallRuleInfo>>({}) // 待删除规则集合

const show_addrules_dialog = ref(false) // 展开添加规则对话框
const show_editrule_dialog = ref(false) // 展开编辑规则对话框
const edit_firewall_rule = ref<FirewallRuleInfo>() // 编辑的防火墙规则
const edit_firewall_rule_index = ref<number>() // 编辑的防火墙规则索引
const loading = ref(false) // 加载状态
const table_data_list = ref<TableDataItem[]>([]) // 表格数据

const page_size = computed(() => {
  return page_size_map[win_size_setting.value ?? 'small']
}) // 每页显示条数

const total = computed(() => Math.ceil(firewall_rule_list.value.length / page_size.value)) // 总页数

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  getTableData(props.firewallConfig)
  // await firewall_store.requestFirewallRules(props.firewallConfig)
})

onUnmounted(() => {
  firewall_store.clearStore()
})

watch(
  () => props.firewallConfig,
  (newConfig) => {
    getTableData(newConfig)
  }
)

// ----------------- F U N C T I O N ----------------- //
const getTableData = async (config: FirewallConfig) => {
  table_data_list.value = (await firewall_store.requestFirewallRules(config)).map((item) => {
    return {
      checked: false,
      firewallRuleInfo: { ...item }
    } as TableDataItem
  })
}

const getCurrentIndex = (index: number) => {
  return page_size.value * (cur_page.value - 1) + index
}

const rowInDelRules = (index: number) => {
  return del_rules.value[getCurrentIndex(index)] !== undefined
}

const onChange = (check, row, index) => {
  // console.log(e, row, index)
  if (check) {
    del_rules.value[getCurrentIndex(index)] = row
  } else {
    delete del_rules.value[getCurrentIndex(index)]
  }
  console.log(del_rules.value)
}

/**
 * @description 添加防火墙规则
 *
 * */
const addFirewallRules = () => {
  show_addrules_dialog.value = true
  // window.api.createNewWindow('/addfirewallrules', 'addFirewallWin')
}

/**
 * @description 打开编辑规则对话框
 *
 * */
const openEditRuleDialog = (row: FirewallRuleInfo, index: number) => {
  edit_firewall_rule.value = row
  edit_firewall_rule_index.value = index
  show_editrule_dialog.value = true
}

/**
 * @description 删除防火墙规则
 *
 */
const delRule = async (row: FirewallRuleInfo, index: number) => {
  loading.value = true
  const params = {
    InstanceId: props.firewallConfig.instanceId,
    FirewallRules: [firewall_store.infoToRule(row)]
  }
  await window.api.delFirewallRules(JSON.stringify(params))
  firewall_rule_list.value.splice(index, 1)
  loading.value = false
}
</script>

<style lang="scss" scoped>
.forbid {
  color: var(--border-color) !important;
}

.apptype-header {
  display: flex;
  align-items: center;
  gap: var(--space-1x);
  span {
    width: 100%;
    text-align: center;
  }
}

.apptype-content {
  display: flex;
  align-items: center;
  gap: var(--space-1x);
  span {
    width: 100%;
    // 只显示一行
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
</style> -->
<template>
  <Transition name="fade" mode="out-in">
    <div v-if="!show_error" class="main-content">
      <div class="btn-groups">
        <el-button @click="addFirewallRules">{{
          i18n.global.t('firewall.btn.addrules')
        }}</el-button>
        <el-button
          :class="{
            forbid: !del_rules.length
          }"
          :disabled="!del_rules.length"
          @click="deleteChooseRules"
          >{{ i18n.global.t('firewall.btn.delrules') }}</el-button
        >
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
      <div v-if="table_data_list.length > 0" class="table-data">
        <el-table
          v-loading="table_loading"
          :data="table_data_list.slice((cur_page - 1) * page_size, cur_page * page_size)"
          class="dragTable"
          style="width: 100%"
        >
          <el-table-column prop="AppType" width="150" show-overflow-tooltip>
            <template #header>
              <div class="apptype-header">
                <!-- <input v-model="selectPageAll" type="checkbox" /> -->
                <Checkbox v-model:checked="selectPageAll"></Checkbox>
                <span>{{ i18n.global.t('firewall.apptype') }}</span>
              </div>
            </template>
            <template #default="{ row }">
              <div class="apptype-content">
                <Checkbox
                  v-model:checked="row.checked"
                  @update:checked="(e) => onChange(e, row.firewallRuleInfo)"
                ></Checkbox>
                <span>{{ row.firewallRuleInfo.AppType }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(col, i) in col_list"
            :key="i"
            :prop="`firewallRuleInfo.${col.prop}`"
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
                <el-button @click="() => openEditRuleDialog(row.firewallRuleInfo, $index)">{{
                  i18n.global.t('firewall.btn.edit-rule')
                }}</el-button>
                <el-button @click="() => delRule(row.firewallRuleInfo, $index)">{{
                  i18n.global.t('firewall.btn.delrule')
                }}</el-button>
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
        @confirm="onAddRulesConfirm"
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
        type="error"
        :title="i18n.global.t('error.connect-server-failed')"
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
import _ from 'lodash'

type TableDataItem = {
  checked: boolean
  firewallRuleInfo: FirewallRuleInfo
}

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

const cur_page = ref(1) // 当前页码
const del_rules = ref<FirewallRuleInfo[]>([]) // 待删除规则集合

const show_addrules_dialog = ref(false) // 展开添加规则对话框
const show_editrule_dialog = ref(false) // 展开编辑规则对话框
const edit_firewall_rule = ref<FirewallRuleInfo>() // 编辑的防火墙规则
const edit_firewall_rule_index = ref<number>() // 编辑的防火墙规则索引
const table_loading = ref(false) // 加载状态
const table_data_list = ref<TableDataItem[]>([]) // 表格数据

const page_size = computed(() => {
  return page_size_map[win_size_setting.value ?? 'small']
}) // 每页显示条数

const total = computed(() => Math.ceil(firewall_rule_list.value.length / page_size.value)) // 总页数

const selectPageAll = computed({
  get() {
    return table_data_list.value
      .slice((cur_page.value - 1) * page_size.value, cur_page.value * page_size.value)
      .every((item) => item.checked)
  },
  set(checked) {
    table_data_list.value
      .slice((cur_page.value - 1) * page_size.value, cur_page.value * page_size.value)
      .forEach((item) => {
        if (checked && !item.checked) {
          item.checked = true
          del_rules.value.push(item.firewallRuleInfo)
        } else if (!checked && item.checked) {
          del_rules.value.splice(
            del_rules.value.findIndex((x) => _.isEqual(x, item.firewallRuleInfo)),
            1
          )
        }
        item.checked = checked
      })
    console.log(del_rules.value)
  }
})

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  getTableData(props.firewallConfig)
  // await firewall_store.requestFirewallRules(props.firewallConfig)
})

onUnmounted(() => {
  firewall_store.clearStore()
})

watch(
  () => props.firewallConfig,
  (newConfig) => {
    getTableData(newConfig)
  }
)

// ----------------- F U N C T I O N ----------------- //

const deleteChooseRules = async () => {
  table_loading.value = true
  const params = {
    InstanceId: props.firewallConfig.instanceId,
    FirewallRules: del_rules.value.map((x) => firewall_store.infoToRule(x))
  }
  await window.api.delFirewallRules(JSON.stringify(params))
  del_rules.value = []

  getTableData(props.firewallConfig)
  table_loading.value = false
}

const getTableData = async (config: FirewallConfig) => {
  await firewall_store.requestFirewallRules(config)
  table_data_list.value = infoToTableItem(firewall_rule_list.value)
}

const infoToTableItem = (firewall_rule_info_list: FirewallRuleInfo[]) => {
  return firewall_rule_info_list.map((item) => {
    return {
      checked: false,
      firewallRuleInfo: { ...item }
    } as TableDataItem
  })
}

const onChange = (check, firewallRuleInfo) => {
  if (check) {
    del_rules.value.push(firewallRuleInfo)
  } else {
    del_rules.value.splice(
      del_rules.value.findIndex((x) => _.isEqual(x, firewallRuleInfo)),
      1
    )
  }
  console.log(del_rules.value)
}

/**
 * @description 添加防火墙规则
 *
 * */
const addFirewallRules = () => {
  show_addrules_dialog.value = true
  // window.api.createNewWindow('/addfirewallrules', 'addFirewallWin')
}

/**
 * @description 打开编辑规则对话框
 *
 * */
const openEditRuleDialog = (row: FirewallRuleInfo, index: number) => {
  edit_firewall_rule.value = row
  edit_firewall_rule_index.value = index
  show_editrule_dialog.value = true
}

/**
 * @description 删除防火墙规则
 *
 */
const delRule = (row: FirewallRuleInfo, index: number) => {
  const params = {
    InstanceId: props.firewallConfig.instanceId,
    FirewallRules: [firewall_store.infoToRule(row)]
  }
  firewall_rule_list.value.splice(index, 1)
  window.api.delFirewallRules(JSON.stringify(params))
}

const onAddRulesConfirm = () => {
  show_addrules_dialog.value = false
  table_data_list.value = infoToTableItem(firewall_rule_list.value)
}
</script>

<style lang="scss" scoped>
.forbid {
  color: var(--border-color) !important;
}

.apptype-header {
  display: flex;
  align-items: center;
  gap: var(--space-1x);
  span {
    width: 100%;
    text-align: center;
  }
}

.apptype-content {
  display: flex;
  align-items: center;
  gap: var(--space-1x);
  span {
    width: 100%;
    // 只显示一行
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
