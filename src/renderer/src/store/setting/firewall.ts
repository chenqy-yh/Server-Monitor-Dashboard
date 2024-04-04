import { defineStore } from 'pinia'
import { ref } from 'vue'

const useFirewallSettingStore = defineStore('firewallSetting', () => {
  const ins_id = ref<string>(import.meta.env.RE_InstanceID) // 实例ID

  return {
    ins_id
  }
})

export { useFirewallSettingStore }
