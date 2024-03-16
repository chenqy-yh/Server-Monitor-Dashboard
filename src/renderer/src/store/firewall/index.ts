import { useConfigStore } from '@renderer/store'
import { defineStore, storeToRefs } from 'pinia'
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'
import _ from 'lodash'

export const useFirewallStore = defineStore('firewall', () => {
  // -------------------- S T O R E -------------------- //

  // const { ins_id } = storeToRefs(useConfigStore())

  // ----------------- C O N S T A N T ----------------- //
  // 表格列 配置
  const col_list = ref([
    {
      prop: 'CidrBlock',
      label: 'firewall.source',
      width: 120,
      align: 'center'
    },
    {
      prop: 'Protocol',
      label: 'firewall.protocol',
      width: 100,
      align: 'center'
    },
    {
      prop: 'Port',
      label: 'firewall.port',
      align: 'center'
    },
    {
      prop: 'Action',
      label: 'firewall.action',
      align: 'center'
    },
    {
      prop: 'FirewallRuleDescription',
      label: 'firewall.description',
      width: 120,
      showOverflowTooltip: true,
      align: 'center'
    }
  ])

  const firewall_rule_list = ref<FirewallRuleInfo[]>([]) // 防火墙规则列表
  const firewall_rule_list_copy = ref<FirewallRuleInfo[]>([]) // 防火墙规则列表副本
  const active_sort_mode = ref(false) // 是否激活排序模式
  const sort_obj = ref<Sortable>() // 排序对象
  const save_loading = ref(false)

  // ------------------- C I R C L E ------------------- //
  // onMounted(async () => {
  //   await requestFirewallRules()
  // })

  // ----------------- F U N C T I O N ----------------- //

  const clearStore = () => {
    firewall_rule_list.value = []
    firewall_rule_list_copy.value = []
    active_sort_mode.value = false
    sort_obj.value?.destroy()
    save_loading.value = false
  }

  /**
   *  激活排序模式
   *
   */
  function activeSortMode() {
    active_sort_mode.value = !active_sort_mode.value
    if (!sort_obj.value) initSortable()
  }

  /**
   *  FirewallRuleInfo 转 FirewallRule
   *
   */
  const infoToRule = (info: FirewallRuleInfo) => {
    return {
      Action: info.Action,
      CidrBlock: info.CidrBlock,
      FirewallRuleDescription: info.FirewallRuleDescription,
      Port: info.Port,
      Protocol: info.Protocol
    } as FirewallRule
  }

  /**
   *  保存防火墙规则
   *
   */
  const saveList = async () => {
    try {
      save_loading.value = true
      await window.api.modifyFirewallRules(
        JSON.stringify({
          InstanceId: import.meta.env.RE_InstanceID,
          FirewallRules: firewall_rule_list_copy.value
        })
      )
    } finally {
      save_loading.value = false
      cancelSort()
    }
  }

  /**
   *  取消排序
   *
   */
  const cancelSort = () => {
    active_sort_mode.value = false
    sort_obj.value?.destroy()
    sort_obj.value = undefined
  }

  /**
   *  初始化排序
   *
   */
  const initSortable = () => {
    const el = document.querySelector('.dragTable tbody')
    if (el) {
      sort_obj.value = Sortable.create(el as HTMLElement, {
        animation: 150,
        delay: 0,
        handle: '.el-table__row',
        onEnd: ({ newIndex, oldIndex }) => {
          const cur_row = firewall_rule_list_copy.value.splice(oldIndex!, 1)[0]
          firewall_rule_list_copy.value.splice(newIndex!, 0, cur_row)
        }
      })
    }
  }

  /**
   *  请求防火墙规则列表
   *
   */
  async function requestFirewallRules(params: FirewallConfig) {
    clearStore()
    const res = await window.api.descFirewallRules(JSON.stringify(params))
    firewall_rule_list.value = res.FirewallRuleSet
    firewall_rule_list_copy.value = firewall_rule_list.value.map((item) => infoToRule(item))
    return firewall_rule_list.value
  }

  return {
    col_list,
    firewall_rule_list,
    active_sort_mode,
    save_loading,
    activeSortMode,
    saveList,
    cancelSort,
    requestFirewallRules,
    infoToRule,
    clearStore
  }
})
