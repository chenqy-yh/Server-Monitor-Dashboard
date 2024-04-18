/*
 * @Date: 2024-04-05 23:27:46
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-19 00:14:46
 * @FilePath: \Spirit-client\src\renderer\src\store\tcloud\index.ts
 * @Description: True or False
 */
import { getItem, setItem } from '@renderer/utils/store'

const useTcloudStore = defineStore('tcloud', () => {
  // ----------------- C O N S T A N T ----------------- //

  const SUPPORT_PLATFORM = ['CENTOS']

  const loginStatus = ref<boolean>(false) // Login statuss

  const instanceList = ref<TLHInstance[]>([]) // Instance list

  const apiId = computed({
    get() {
      return getItem<string>('tcloud_api_id') ?? ''
    },
    set(value) {
      setItem('tcloud_api_id', value)
    }
  })

  const apiKey = computed({
    get() {
      return getItem<string>('tcloud_api_key') ?? ''
    },
    set(value) {
      setItem('tcloud_api_key', value)
    }
  })

  const region = computed({
    get() {
      return getItem<string>('tcloud_region') ?? ''
    },
    set(value) {
      setItem('tcloud_region', value)
    }
  })

  // ----------------- F U N C T I O N ----------------- //

  /**
   * @description:  登陆
   * @param {string} formDataApiId
   * @param {string} formDataApiKey
   * @param {string} formDataRegion
   * @return {*}
   */
  const login = async (formDataApiId: string, formDataApiKey: string, formDataRegion: string) => {
    try {
      instanceList.value =
        (
          await window.api.getTLHInstanceList(formDataApiId, formDataApiKey, formDataRegion)
        ).InstanceSet?.filter((x) => SUPPORT_PLATFORM.includes(x.Platform)) ?? []
      loginStatus.value = true
      return true
    } catch (error) {
      loginStatus.value = false
      return false
    }
  }

  return {
    apiId,
    apiKey,
    region,
    loginStatus,
    instanceList,
    login
  }
})

export { useTcloudStore }
