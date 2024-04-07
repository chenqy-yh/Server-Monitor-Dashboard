import { getItem, setItem } from '@renderer/utils/store'
import { formatDateString } from '@renderer/utils/time'
import { defineStore } from 'pinia'
import { computed, onBeforeMount, onMounted, ref } from 'vue'

export const useServerInfoStore = defineStore('server-info', () => {
  // -------------------- S T O R E -------------------- //

  // ----------------- C O N S T A N T ----------------- //

  const instance = ref<TLHInstance>()

  const server_port = ref(import.meta.env.RE_Remoteserver_Port) // 服务器端口

  const prefix = ref(import.meta.env.RE_Remoteserver_Prefix) // 服务器前缀

  const host = ref() // 远程服务器地址

  const server_url = computed(() => {
    return `http://${host.value}:${server_port.value}${prefix.value}`
  }) // 远程服务器url

  const interval = ref(5) // 每次记录网络信息的时间间隔（单位：D秒）
  const maxL = 15 // Echarts横坐标最大长度

  const server_info = ref<ServerData>() // 服务器信息

  const loading = ref(true) // 加载状态
  const show_error = ref(false) // 是否显示错误信息

  let flag = false // 是否是第一次记录网络信息
  let pre = [0, 0] // 上一次的下载上传总量

  const down_list = ref<[Date, number][]>([]) // 下载速度列表
  const up_list = ref<[Date, number][]>([]) // 上传速度列表
  const down_total = ref(0) // 总下载量
  const up_total = ref(0) // 总上传量
  const down_cur = ref(0) // 当前下载速度（单位：KB/s）
  const up_cur = ref(0) // 当前上传速度（单位：KB/s）

  const cpu_usage_list = ref<[Date, number][]>([]) // CPU使用率列表

  // ------------------- C I R C L E ------------------- //

  onBeforeMount(() => {
    init_common_settings()
  })

  onMounted(async () => {
    setInterval(
      (() => {
        scheduledTask()
        return scheduledTask
      })(),
      5 * 1000
    )
  })

  // ----------------- F U N C T I O N ----------------- //

  /**
   *  @description 清空服务器信息
   *
   */
  const clearServerInfo = () => {
    down_list.value = []
    up_list.value = []
    down_total.value = 0
    up_total.value = 0
    down_cur.value = 0
    up_cur.value = 0
    cpu_usage_list.value = []
  }

  /**
   *  @description 定时任务
   *
   */
  const scheduledTask = async () => {
    try {
      loading.value = false
      await getServerInfo()
      show_error.value = false
    } catch (error) {
      show_error.value = true
    }
  }

  /**
   * 获取服务器信息
   *
   * */
  const getServerInfo = async () => {
    server_info.value = await window.api.getServerInfo(server_url.value)
    network_step(server_info.value.network)
    cput_step(server_info.value.cpu)
  }

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

  /**
   * @description 获取服务器网络信息
   *
   * */
  const network_step = (info: NetworkData) => {
    const { downT, upT } = info
    down_total.value = downT
    up_total.value = upT

    if (!flag) {
      flag = true
    } else {
      if (down_list.value.length > maxL) {
        down_list.value.shift()
        up_list.value.shift()
      }

      const currentTime = new Date()

      const timeDiff = interval.value * 1000
      down_cur.value = (info.downT - pre[0]) / timeDiff
      up_cur.value = (info.upT - pre[1]) / timeDiff

      const formattedDate = formatDateString(currentTime)
      down_list.value.push([formattedDate, down_cur.value])
      up_list.value.push([formattedDate, up_cur.value])
    }

    pre = [info.downT, info.upT]
  }

  /**
   *  @description 获取CPU信息
   *
   */
  const cput_step = (info: CpuData) => {
    const { usage } = info
    if (cpu_usage_list.value.length > maxL) {
      cpu_usage_list.value.shift()
    }
    const currentTime = new Date()
    const formattedDate = formatDateString(currentTime)
    cpu_usage_list.value.push([formattedDate, usage * 100])
  }

  return {
    // -------------------- I N D E X -------------------- //
    instance,
    server_info,
    loading,
    show_error,
    server_port,
    prefix,
    host,
    server_url,

    // -------------------- N E T W O R K ----------------//
    down_list,
    up_list,
    down_total,
    up_total,
    down_cur,
    up_cur,
    // -------------------- C P U -----------------------//
    cpu_usage_list,
    // -------------------- F U N C T I O N ----------------//
    clearServerInfo,
    update_host_setting
  }
})
