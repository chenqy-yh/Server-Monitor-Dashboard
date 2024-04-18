// 表格列 配置

const col_template = ref([
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

export { col_template }
