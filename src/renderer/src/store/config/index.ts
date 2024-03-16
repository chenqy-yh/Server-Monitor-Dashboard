import { i18n } from '@renderer/plugins/i18n'
import { getItem, setItem } from '@renderer/utils/store'
import { defineStore } from 'pinia'
import { computed, onBeforeMount, ref, watch } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // common
  const server_port = ref(import.meta.env.RE_Remoteserver_Port) // 服务器端口
  const prefix = ref(import.meta.env.RE_Remoteserver_Prefix) // 服务器前缀

  const host = ref() // 远程服务器地址

  const server_url = computed(() => {
    return `http://${host.value}:${server_port.value}${prefix.value}`
  }) // 远程服务器url

  //personal
  const lang_setting = ref<Lang>() // 语言设置
  const theme_setting = ref<Theme>() // 主题设置
  const win_size_setting = ref<WinSize>() // 窗口大小设置
  const direct_exit_setting = ref<boolean>() // 直接退出设置

  // COS
  const ins_id = ref<string>(import.meta.env.RE_InstanceID) // 实例ID

  // Other
  // 窗口大小映射
  const sizeMap: Record<WinSize, [number, number]> = {
    small: [800, 600],
    middle: [1024, 768],
    large: [1280, 800]
  }

  // ------------------- C I R C L E ------------------- //
  onBeforeMount(() => {
    init_common_settings()
    init_personal_settings()
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
   *  @description 初始化个人设置
   *
   */
  const init_personal_settings = () => {
    init_personal_setting_of_lang()
    init_personal_setting_of_theme()
    init_personal_setting_of_win_size()
    init_personal_setting_of_direct_exit()
  }

  /**
   *  @description 初始化语言设置
   *
   */
  const init_personal_setting_of_lang = () => {
    lang_setting.value = getItem('lang_setting') || 'en'
    i18n.global.locale.value = lang_setting.value
  }

  /**
   *  @description 初始化主题设置
   *
   */
  const init_personal_setting_of_theme = () => {
    theme_setting.value = getItem('theme_setting') || 'light'
    document.documentElement.setAttribute('theme', theme_setting.value)
  }

  /**
   *  @description 初始化窗口大小设置
   *
   */
  const init_personal_setting_of_win_size = () => {
    win_size_setting.value = getItem('win_size_setting') || 'middle'
    window.api.winResize(...sizeMap[win_size_setting.value])
  }

  /**
   *  @description 初始化直接退出设置
   *
   */
  const init_personal_setting_of_direct_exit = () => {
    direct_exit_setting.value = getItem('direct_exit_setting') || false
  }

  /**
   *  @description 更新主机设置
   *
   */
  const update_host_setting = (val: string) => {
    host.value = val
    setItem('host', val)
  }

  /**
   *  @description 更新主题设置
   *
   */
  const update_theme_setting = (val: Theme) => {
    theme_setting.value = val
    document.documentElement.setAttribute('theme', val ?? 'light')
    setItem('theme_setting', val)
  }

  /**
   *  @description 更新语言设置
   *
   */
  const update_lang_setting = (val: Lang) => {
    lang_setting.value = val
    i18n.global.locale.value = val
    setItem('lang_setting', val)
  }

  /**
   *  @description 更新窗口大小设置
   *
   */
  const update_win_size_setting = (size: WinSize) => {
    win_size_setting.value = size
    const [width, height] = sizeMap[size]
    window.api.winResize(width, height)
    setItem('win_size_setting', size)
  }

  /**
   *  @description 更新直接退出设置
   *
   */
  const update_direct_exit_setting = (val: boolean) => {
    direct_exit_setting.value = val
    setItem('direct_exit_setting', val)
  }

  return {
    ins_id,
    host,
    server_url,
    lang_setting,
    theme_setting,
    win_size_setting,
    direct_exit_setting,
    update_host_setting,
    update_theme_setting,
    update_lang_setting,
    update_win_size_setting,
    update_direct_exit_setting
  }
})
