import { getItem, setItem } from '@renderer/utils/store'
import { i18n } from '@renderer/plugins/i18n'

const usePersonalSettingStore = defineStore('personalSetting', () => {
  // ----------------- C O N S T A N T ----------------- //
  const lang_setting = ref<Lang>() // 语言设置

  const theme_setting = ref<Theme>() // 主题设置

  const win_size_setting = ref<WinSize>() // 窗口大小设置

  const direct_exit_setting = ref<boolean>() // 直接退出设置

  const opacity_setting = ref<number>() // 透明度设置

  const init_config = {
    lang: 'en' as Lang,
    theme: 'light' as Theme,
    win_size: 'medium' as WinSize,
    direct_exit: false,
    opacity: 100
  } // 初始配置

  const sizeMap: Record<WinSize, [number, number]> = {
    small: [1024, 700],
    medium: [1280, 768],
    large: [1440, 800]
  } // 窗口大小映射

  // ------------------- C I R C L E ------------------- //

  onBeforeMount(() => {
    init_personal_settings()
  })

  // ----------------- F U N C T I O N ----------------- //
  /**
   *  @description 初始化个人设置
   *
   */
  const init_personal_settings = () => {
    init_personal_setting_of_lang()
    init_personal_setting_of_theme()
    init_personal_setting_of_win_size()
    init_personal_setting_of_direct_exit()
    init_personal_setting_of_opacity()
  }

  const init_personal_setting_of_opacity = () => {
    const opacity_setting_from_store = getItem('opacity_setting') as number
    if (!opacity_setting_from_store) {
      setItem('opacity_setting', init_config.opacity)
    }
    opacity_setting.value = getItem('opacity_setting') || init_config.opacity
  }

  /**
   *  @description 初始化语言设置
   *
   */
  const init_personal_setting_of_lang = () => {
    const lang_setting_from_store = getItem('lang_setting') as Lang
    if (!lang_setting_from_store) {
      setItem('lang_setting', init_config.lang)
    }
    lang_setting.value = getItem('lang_setting') || init_config.lang
    i18n.global.locale.value = lang_setting.value
  }

  /**
   *  @description 初始化主题设置
   *
   */
  const init_personal_setting_of_theme = () => {
    const theme_setting_from_store = getItem('theme_setting') as Theme
    if (!theme_setting_from_store) {
      setItem('theme_setting', init_config.theme)
    }
    theme_setting.value = getItem('theme_setting') || init_config.theme
    document.documentElement.setAttribute('theme', theme_setting.value)
  }

  /**
   *  @description 初始化窗口大小设置
   *
   */
  const init_personal_setting_of_win_size = () => {
    const win_size_setting_from_store = getItem('win_size_setting') as WinSize
    if (!win_size_setting_from_store) {
      setItem('win_size_setting', init_config.win_size)
    }
    win_size_setting.value = win_size_setting_from_store || init_config.win_size
    window.api.winResize(...sizeMap[win_size_setting.value])
  }

  /**
   *  @description 初始化直接退出设置
   *
   */
  const init_personal_setting_of_direct_exit = () => {
    const direct_exit_setting_from_store = getItem('direct_exit_setting') as boolean
    if (!direct_exit_setting_from_store) {
      setItem('direct_exit_setting', init_config.direct_exit)
    }
    direct_exit_setting.value = getItem('direct_exit_setting') || init_config.direct_exit
  }

  const update_opacity_setting = (val: number) => {
    opacity_setting.value = val
    setItem('opacity_setting', val)
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

  const getWinSizeVal = (): [number, number] => {
    if (!win_size_setting.value) return sizeMap.medium
    return sizeMap[win_size_setting.value]
  }

  return {
    sizeMap,
    lang_setting,
    theme_setting,
    win_size_setting,
    direct_exit_setting,
    opacity_setting,
    update_opacity_setting,
    update_theme_setting,
    update_lang_setting,
    update_win_size_setting,
    update_direct_exit_setting,
    getWinSizeVal
  }
})

export { usePersonalSettingStore }
