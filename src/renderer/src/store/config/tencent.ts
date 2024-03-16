import { defineStore } from 'pinia'
import { getItem, setItem } from '@renderer/utils/store'
import { onMounted, ref } from 'vue'

const useTencentStore = defineStore('tencent', () => {
  const secretId = ref<string>() // 腾讯云secretId
  const secretKey = ref<string>() // 腾讯云secretKey
  const region = ref<string>() // 腾讯云地域
  const ins_id = ref<string>() // 腾讯云实例ID

  onMounted(() => {
    initCredit()
    initRegion()
    initInsId()
  })

  /**
   *  @description 初始化腾讯云凭证
   *
   */
  const initCredit = () => {
    secretId.value = getItem('tencent_secretId') || ''
    secretKey.value = getItem('tencent_secretKey') || ''
  }

  /**
   *  @description 初始化腾讯云地域
   *
   */
  const initRegion = () => {
    region.value = getItem('tencent_region') || ''
  }

  /**
   *  @description 初始化腾讯云实例ID
   *
   */
  const initInsId = () => {
    ins_id.value = getItem('tencent_ins_id') || ''
  }

  /**
   *  @description 更新腾讯云凭证
   *
   */
  const updateCredit = (id: string, key: string) => {
    secretId.value = id
    secretKey.value = key
    setItem('tencent_secretId', id)
    setItem('tencent_secretKey', key)
  }

  /**
   *  @description 更新腾讯云地域
   *
   */
  const updateRegion = (r: string) => {
    region.value = r
    setItem('tencent_region', r)
  }

  /**
   *  @description 更新腾讯云实例ID
   *
   */
  const updateInsId = (id: string) => {
    ins_id.value = id
    setItem('tencent_ins_id', id)
  }

  return {
    secretId,
    secretKey,
    region,
    ins_id,
    updateCredit,
    updateRegion,
    updateInsId
  }
})

export { useTencentStore }
