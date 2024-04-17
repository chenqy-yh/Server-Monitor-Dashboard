/*
 * @Date: 2024-04-05 23:27:46
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-17 12:08:42
 * @FilePath: \Spirit-client\src\renderer\src\store\tcloud\index.ts
 * @Description: True or False
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePermissionStore } from '@renderer/store'

const useTcloudStore = defineStore('tcloud', () => {
  // -------------------- S T O R E -------------------- //
  const permissionStore = usePermissionStore()

  // ----------------- C O N S T A N T ----------------- //

  const SUPPORT_PLATFORM = ['CENTOS']

  const apiId = ref<string>('') // API ID

  const apiKey = ref<string>('') // API Key

  const region = ref<string>('') // Region

  const loginStatus = ref<boolean>(false) // Login status

  const instanceList = ref<TLHInstance[]>([]) // Instance list

  // ----------------- F U N C T I O N ----------------- //

  /**
   * @description:  登陆
   * @param {string} formDataApiId
   * @param {string} formDataApiKey
   * @param {string} formDataRegion
   * @return {*}
   */
  const login = async (formDataApiId: string, formDataApiKey: string, formDataRegion: string) => {
    apiId.value = formDataApiId
    apiKey.value = formDataApiKey
    region.value = formDataRegion

    try {
      instanceList.value =
        (
          await window.api.getTLHInstanceList(apiId.value, apiKey.value, region.value)
        ).InstanceSet?.filter((x) => SUPPORT_PLATFORM.includes(x.Platform)) ?? []
      loginStatus.value = true
      permissionStore.setRoleList(['user'])
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
