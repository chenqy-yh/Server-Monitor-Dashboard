<template>
  <el-table
    v-loading="table_loading"
    :data="table_data_list.slice((cur_page - 1) * page_size, cur_page * page_size)"
    class="dragTable"
    style="width: 100%"
  >
    <el-table-column prop="AppType" width="150" show-overflow-tooltip>
      <template #header>
        <div class="apptype-header">
          <Checkbox v-model:checked="select_page_all"></Checkbox>
          <span>{{ i18n.global.t('firewall.apptype') }}</span>
        </div>
      </template>
      <template #default="{ row }">
        <div class="apptype-content">
          <Checkbox
            v-model:checked="row.checked"
            @update:checked="(e) => ondelCheckChange(e, row.firewallRuleInfo)"
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
</template>

<script setup lang="ts">
import Checkbox from '@renderer/components/checkbox/checkbox-1.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useConfigStore, useFirewallStore } from '@renderer/store'
import _ from 'lodash'
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
const { win_size_setting } = storeToRefs(useConfigStore())

const firewall_store = useFirewallStore()

const { col_list, firewall_rule_list } = storeToRefs(firewall_store)

// ----------------- C O N S T A N T ----------------- //

const page_size_map = {
  small: 5,
  middle: 8,
  large: 10
}

const cur_page = ref(1) // 当前页码
const del_rules = ref<FirewallRuleInfo[]>([]) // 待删除规则集合

const show_editrule_dialog = ref(false) // 展开编辑规则对话框
const edit_firewall_rule = ref<FirewallRuleInfo>() // 编辑的防火墙规则
const edit_firewall_rule_index = ref<number>() // 编辑的防火墙规则索引
const table_loading = ref(false) // 加载状态
const table_data_list = ref<TableDataItem[]>([]) // 表格数据

const page_size = computed(() => {
  return page_size_map[win_size_setting.value ?? 'small']
}) // 每页显示条数

const select_page_all = computed({
  get() {
    const startIndex = (cur_page.value - 1) * page_size.value
    const endIndex = cur_page.value * page_size.value
    return table_data_list.value.slice(startIndex, endIndex).every((item) => item.checked)
  },
  set(checked) {
    const startIndex = (cur_page.value - 1) * page_size.value
    const endIndex = cur_page.value * page_size.value
    const pageItems = table_data_list.value.slice(startIndex, endIndex)

    pageItems.forEach((item) => {
      if (checked !== item.checked) {
        item.checked = checked
        const index = del_rules.value.findIndex((x) => _.isEqual(x, item.firewallRuleInfo))
        if (checked) {
          del_rules.value.push(item.firewallRuleInfo)
        } else if (index !== -1) {
          del_rules.value.splice(index, 1)
        }
      }
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

/**
 *  @description 获取表格数据
 *
 */
const getTableData = async (config: FirewallConfig) => {
  await firewall_store.requestFirewallRules(config)
  table_data_list.value = infoToTableItem(firewall_rule_list.value)
}

/**
 *  @description 防火墙规则信息转换为表格数据
 *
 */
const infoToTableItem = (firewall_rule_info_list: FirewallRuleInfo[]) => {
  return firewall_rule_info_list.map((item) => {
    return {
      checked: false,
      firewallRuleInfo: { ...item }
    } as TableDataItem
  })
}

/**
 *  @description 规则选中状态变化 选中则添加到待删除规则集合中
 *
 */
const ondelCheckChange = (check, firewallRuleInfo) => {
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
</script>

<style lang="scss" scoped></style>
