import { defineStore } from 'pinia'
import Sortable from 'sortablejs'
import { computed, ref } from 'vue'
import { useTcloudStore, useServerInfoStore } from '@renderer/store'
import { storeToRefs } from 'pinia'

export const useFirewallStore = defineStore('firewall', () => {
  // -------------------- S T O R E -------------------- //
  const { apiId, apiKey, region } = storeToRefs(useTcloudStore())
  const { instance } = storeToRefs(useServerInfoStore())

  // ----------------- C O N S T A N T ----------------- //
  // 表格列 配置
  const col_list = ref([
    {
      prop: 'AppType',
      label: 'firewall.apptype',
      align: 'center',
      width: 120,
      showOverflowTooltip: true
    },
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

  const choose_firewall_config = computed<FirewallConfig>(() => {
    return {
      instanceId: instance.value?.InstanceId ?? '',
      secretId: apiId.value,
      secretKey: apiKey.value,
      region: region.value
    }
  })

  const error_code = ref(0) // 错误码 1 实例配置错误

  // ----------------- F U N C T I O N ----------------- //

  /**
   * @description:  清空 store
   * @return {*}
   */
  const clearStore = () => {
    firewall_rule_list.value = []
    firewall_rule_list_copy.value = []
    active_sort_mode.value = false
    sort_obj.value = undefined
    save_loading.value = false
  }

  /**
   * @description:  激活排序模式
   * @param {HTMLElement} el
   * @return {*}
   */
  function activeSortMode(el: HTMLElement) {
    active_sort_mode.value = !active_sort_mode.value
    if (!sort_obj.value) initSortable(el)
  }

  /**
   * @description:  FirewallRuleInfo 转 FirewallRule
   * @param {FirewallRuleInfo} info
   * @return {*}
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
   * @description:  保存防火墙规则
   * @return {*}
   */
  const saveList = async () => {
    try {
      save_loading.value = true
      const pararms = {
        firewallConfig: choose_firewall_config.value,
        FirewallRules: firewall_rule_list_copy.value
      }
      await window.api.modifyFirewallRules(JSON.stringify(pararms))
    } finally {
      save_loading.value = false
      cancelSort()
    }
  }

  /**
   * @description:  取消排序
   * @return {*}
   */
  const cancelSort = () => {
    active_sort_mode.value = false
    sort_obj.value?.destroy()
    sort_obj.value = undefined
  }

  /**
   * @description:  初始化排序
   * @return {*}
   */
  const initSortable = (el: HTMLElement) => {
    if (el) {
      sort_obj.value = Sortable.create(el, {
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
   * @description:  请求防火墙规则
   * @param {FirewallConfig} params
   * @return {*}
   */
  async function requestFirewallRules(params: FirewallConfig) {
    clearStore()
    try {
      const res = await window.api.descFirewallRules(params)
      firewall_rule_list.value = res.FirewallRuleSet
      firewall_rule_list_copy.value = firewall_rule_list.value.map((item) => infoToRule(item))
      return firewall_rule_list.value
    } catch (error) {
      console.error('requestFirewallRules error', error)
      error_code.value = 1
      return []
    }
  }

  return {
    error_code,
    col_list,
    firewall_rule_list,
    active_sort_mode,
    save_loading,
    choose_firewall_config,
    activeSortMode,
    saveList,
    cancelSort,
    requestFirewallRules,
    infoToRule,
    clearStore
  }
})
