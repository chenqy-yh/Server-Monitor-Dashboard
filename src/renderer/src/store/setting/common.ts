import { defineStore } from 'pinia'
import { computed, onBeforeMount, ref } from 'vue'
import { getItem, setItem } from '@renderer/utils/store'

const useCommonSettingStore = defineStore('commonSetting', () => {
  // ----------------- C O N S T A N T ----------------- //

  const server_port = ref(import.meta.env.RE_Remoteserver_Port) // 服务器端口

  const prefix = ref(import.meta.env.RE_Remoteserver_Prefix) // 服务器前缀

  const host = ref() // 远程服务器地址

  const server_url = computed(() => {
    return `http://${host.value}:${server_port.value}${prefix.value}`
  }) // 远程服务器url

  // ------------------- C I R C L E ------------------- //
  onBeforeMount(() => {
    init_common_settings()
  })

  // ----------------- F U N C T I O N ----------------- //

  /**
   *  @description 初始化公共设置
   *
   */
  const init_common_settings = () => {
    host.value = getItem('host') || '0.0.0.0'
  }

  /**
   *  @description 更新主机设置
   *
   */
  const update_host_setting = (val: string) => {
    host.value = val
    setItem('host', val)
  }

  return {
    server_port,
    prefix,
    host,
    server_url,
    update_host_setting
  }
})

export { useCommonSettingStore }
