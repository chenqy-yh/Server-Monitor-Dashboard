<template>
  <el-dialog
    ref="dialog_ref"
    v-model="dialogShow"
    width="500"
    :before-close="cancel"
    :close-on-click-modal="false"
    @opened="opened"
    @closed="closed"
  >
    <template #header>
      <span class="dialog-header" ref="header_ref">{{ i18n.global.t('firewall.title.edit') }}</span>
    </template>
    <template #default>
      <div class="main-content">
        <el-form
          v-if="edit_firewall_rule"
          v-model="edit_firewall_rule"
          label-width="80"
          label-position="left"
        >
          <el-form-item :label="i18n.global.t('firewall.apptype')">
            <el-input v-model="edit_firewall_rule.AppType" style="width: 180px" />
          </el-form-item>
          <el-form-item :label="i18n.global.t('firewall.source')">
            <el-input v-model="edit_firewall_rule.CidrBlock" style="width: 180px" />
          </el-form-item>
          <el-form-item :label="i18n.global.t('firewall.protocol')">
            <el-input v-model="edit_firewall_rule.Protocol" style="width: 180px" />
          </el-form-item>
          <el-form-item :label="i18n.global.t('firewall.port')">
            <el-input v-model="edit_firewall_rule.Port" style="width: 180px" />
          </el-form-item>
          <el-form-item :label="i18n.global.t('firewall.action')">
            <el-input v-model="edit_firewall_rule.Action" style="width: 180px" />
          </el-form-item>
          <el-form-item :label="i18n.global.t('firewall.description')">
            <el-input v-model="edit_firewall_rule.FirewallRuleDescription" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <span v-if="submit_rules_error" class="error-msg">Error in edit rules</span>
        <el-button @click="cancel">{{ i18n.global.t('common.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">
          {{ i18n.global.t('common.confirm') }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Drag } from '@renderer/composables/common/drag'
import { i18n } from '@renderer/plugins/i18n'
import { useConfigStore, useFirewallStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { PropType, computed, ref } from 'vue'
import _ from 'lodash'

// -------------------- P R O P S -------------------- //
const props = defineProps({
  show: Boolean,
  firewallrule: {
    type: Object as PropType<FirewallRuleInfo>,
    require: true
  },
  ruleIndex: {
    type: Number,
    require: true
  }
})

const emits = defineEmits(['cancel', 'confirm'])

// -------------------- S T O R E -------------------- //
const { ins_id } = storeToRefs(useConfigStore())
const firewallStore = useFirewallStore()
const { firewall_rule_list } = storeToRefs(firewallStore)
const submit_rules_error = ref<boolean>(false)

// ----------------- C O N S T A N T ----------------- //
const header_ref = ref<HTMLElement>()

const drag = new Drag()

const dialogShow = computed({
  get() {
    return props.show
  },
  set(val) {
    return val
  }
})

const edit_firewall_rule = ref<FirewallRuleInfo>()

// ----------------- F U N C T I O N ----------------- //

const opened = () => {
  edit_firewall_rule.value = _.cloneDeep(props.firewallrule)
  installDrag()
}

const closed = () => {
  uninstallDrag()
}

const installDrag = () => {
  if (!header_ref.value) return
  drag.install(header_ref.value)
}

const uninstallDrag = () => {
  if (!header_ref.value) return
  drag.uninstall(header_ref.value)
}

const cancel = () => {
  beforeClose()
  emits('cancel')
}

const modifyFirewallDesc = () => {
  if (!props.ruleIndex) {
    submit_rules_error.value = true
    return
  }
  firewall_rule_list.value[props.ruleIndex].FirewallRuleDescription =
    edit_firewall_rule.value?.FirewallRuleDescription
  const ignore = ['Ipv6CidrBlock', 'AppType']
  const params = {
    InstanceId: ins_id.value,
    FirewallRule: _.omit(edit_firewall_rule.value, ignore) as FirewallRule
  }
  return window.api.modifyFirewallRuleDescription(JSON.stringify(params))
}

const modifyFirewallList = () => {
  if (props.ruleIndex === undefined || edit_firewall_rule.value === undefined) {
    submit_rules_error.value = true
    return
  }
  const ignore = ['Ipv6CidrBlock']
  firewall_rule_list.value[props.ruleIndex] = _.omit(
    edit_firewall_rule.value,
    ignore
  ) as FirewallRuleInfo
  const firewallRules = firewall_rule_list.value.map((item) => {
    return firewallStore.infoToRule(item)
  })
  const params = {
    InstanceId: ins_id.value,
    FirewallRules: firewallRules
  }
  return window.api.modifyFirewallRules(JSON.stringify(params))
}

const confirm = async () => {
  const eq_all = _.isEqual(edit_firewall_rule.value, props.firewallrule)
  if (eq_all) {
    beforeClose()
    emits('confirm')
  }
  if (edit_firewall_rule.value === undefined || props.firewallrule === undefined) {
    submit_rules_error.value = true
    return
  }
  const eq_desc =
    edit_firewall_rule.value.FirewallRuleDescription === props.firewallrule.FirewallRuleDescription

  try {
    await (eq_desc ? modifyFirewallList() : modifyFirewallDesc())
    beforeClose()
    emits('confirm')
  } catch (error) {
    console.log('error:', error)
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
  padding-inline: var(--space-lg);
}
</style>
