<!--
 * @Date: 2024-03-12 23:33:35
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 23:09:40
 * @FilePath: \server-monitor\src\renderer\src\views\firewall\components\add-rules.vue
 * @Description: True or False
-->
<template>
  <el-dialog
    ref="dialog_ref"
    v-model="dialogShow"
    width="800"
    :before-close="cancel"
    :close-on-click-modal="false"
  >
    <template #header>
      <span ref="header_ref" class="dialog-header">{{ i18n.global.t('firewall.title.main') }}</span>
    </template>
    <template #default>
      <div class="main-content">
        <div class="tableData">
          <el-table :data="add_rules">
            <el-table-column :label="i18n.global.t('firewall.protocol')" prop="Protocol">
              <template #default="{ row }">
                <el-select v-model="row.Protocol" placeholder="Protocol">
                  <el-option label="TCP" value="TCP" />
                  <el-option label="UDP" value="UDP" />
                  <el-option label="ICMP" value="ICMP" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column width="180" :label="i18n.global.t('firewall.port')" prop="Port">
              <template #default="{ row }">
                <el-input v-model="row.Port" />
              </template>
            </el-table-column>
            <el-table-column :label="i18n.global.t('firewall.action')" prop="Action">
              <template #default="{ row }">
                <el-select v-model="row.Action" placeholder="Action">
                  <el-option label="Accept" value="ACCEPT" />
                  <el-option label="Drop" value="DROP" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              :label="i18n.global.t('firewall.description')"
              prop="FirewallRuleDescription"
            >
              <template #default="{ row }">
                <el-input v-model="row.FirewallRuleDescription" />
              </template>
            </el-table-column>
            <el-table-column :label="i18n.global.t('firewall.source')" prop="CidrBlock">
              <template #default="{ row }">
                <el-input v-model="row.CidrBlock" />
              </template>
            </el-table-column>
            <el-table-column v-if="add_rules.length > 1" width="60" :align="'center'">
              <template #default="scope">
                <el-button type="danger" text circle @click="delRules(scope)">
                  <i class="ri-close-large-line"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="btn-groups">
            <el-button class="add-more-btn" text circle @click="addMoreRules">
              <i class="ri-add-large-line ri-lg"></i>
            </el-button>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <span v-if="submit_rules_error" class="error-msg">Error in add rules</span>
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="confirm"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { i18n } from '@renderer/plugins/i18n'
import { useFirewallStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

// -------------------- P R O P S -------------------- //
const props = defineProps<{ show: boolean; insId: string }>()

const emits = defineEmits(['cancel', 'confirm'])

// -------------------- S T O R E -------------------- //
const { firewall_rule_list } = storeToRefs(useFirewallStore())

// ----------------- C O N S T A N T ----------------- //

const idx = ref<number>(0)

const add_rules = ref<FirewallRule[]>([{}])

const submit_rules_error = ref<boolean>(false)

const header_ref = ref<HTMLElement>()

const dialogShow = computed({
  get() {
    return props.show
  },
  set(val) {
    return val
  }
})

// ----------------- F U N C T I O N ----------------- //

const delRules = (scope: any) => {
  add_rules.value.splice(scope.$index, 1)
}

const addMoreRules = () => {
  idx.value++
  add_rules.value.push({})
}

const cancel = () => {
  beforeClose()
  emits('cancel')
}

const confirm = async () => {
  const params = {
    InstanceId: props.insId,
    FirewallRules:
      add_rules.value.map((x) => {
        x.Port = x.Port?.toString()
        return x
      }) || []
  }
  try {
    await window.api.addFirewallRules(JSON.stringify(params))
    const newFirewallRuleInfoList = add_rules.value.map((x) => {
      return {
        AppType: '自定义',
        ...x
      } as FirewallRuleInfo
    })
    firewall_rule_list.value = [...newFirewallRuleInfoList, ...firewall_rule_list.value]
    beforeClose()
    emits('confirm', newFirewallRuleInfoList)
  } catch (error) {
    console.error('error:', error)
    submit_rules_error.value = true
  }
}

const beforeClose = () => {
  submit_rules_error.value = false
}
</script>

<style lang="scss" scoped>
.btn-groups {
  padding: var(--space-sm);
  display: flex;
  justify-content: center;
}

.dialog-header {
  padding: var(--space-md);
  font-size: var(--font-size-title);
  color: var(--font-color);
  width: 100%;
  display: block;
  cursor: move;
}

.dialog-footer {
  // border: 1px solid red;
  padding: var(--space-md);
  padding-top: 0;
  // border: 1px solid red;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-md);
  .error-msg {
    transition: var(--transition);
    color: var(--font-color);
  }
}

.main-content {
  height: max-content;
  background-color: var(--bg-color);
  padding-inline: var(--space-md);
}
</style>
