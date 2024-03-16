import { useConfigStore } from '@renderer/store'
import { formatDateString } from '@renderer/utils/time'
import { defineStore, storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
export const useServerInfoStore = defineStore('server-info', () => {
  // -------------------- S T O R E -------------------- //
  const { server_url } = storeToRefs(useConfigStore())

  // ----------------- C O N S T A N T ----------------- //

  const interval = ref(5) // 每次记录网络信息的时间间隔（单位：秒）
  const maxL = 20 // Echarts横坐标最大长度

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

  // ------------------- C I R C L E ------------------- //

  onMounted(async () => {
    setInterval(
      (() => {
        scheduledTask()
        return scheduledTask
      })(),
      5 * 1000
    )
  })

  // 定时更新network chart
  watch(server_info, () => {
    if (server_info.value) {
      step(server_info.value.network)
    }
  })

  // ----------------- F U N C T I O N ----------------- //
  /**
   * 获取服务器信息
   *
   * */
  const scheduledTask = async () => {
    try {
      loading.value = false
      await getServerInfo()
      show_error.value = false
    } catch (error) {
      show_error.value = true
    }
  }

  const getServerInfo = async () => {
    server_info.value = await window.api.getServerInfo(server_url.value)
  }

  // ----------------- F U N C T I O N ----------------- //

  /**
   * 获取服务器网络信息
   *
   * */
  const step = async (info: NetworkData) => {
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

  return {
    // -------------------- I N D E X -------------------- //
    server_info,
    loading,
    show_error,
    // -------------------- N E T W O R K ----------------//
    down_list,
    up_list,
    down_total,
    up_total,
    down_cur,
    up_cur
  }
})
