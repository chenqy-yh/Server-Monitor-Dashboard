<template>
  <div class="main-content">
    <div class="header">
      <h1>Processor</h1>
      <el-button text circle @click="back">
        <i class="ri-arrow-right-line ri-2x"></i>
      </el-button>
    </div>
    <div class="content">
      <div class="top-content">
        <div class="small-card">
          <i class="ri-percent-line ri-4x"></i>
          <span class="num">{{ info.usage }}</span>
          <span class="unit">Per</span>
        </div>
        <div class="small-card">
          <i class="ri-align-item-bottom-line ri-4x"></i>
          <span class="num">{{ info.physical }}</span>
          <span class="unit">Cores</span>
        </div>
        <div class="small-card">
          <i class="ri-flashlight-fill ri-4x"></i>
          <span class="num">{{ info.speed }}</span>
          <span class="unit">GHz</span>
        </div>
      </div>
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServerInfoStore, useConfigStore } from '@renderer/store'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

// -------------------- S T O R E -------------------- //
const { theme_setting } = storeToRefs(useConfigStore())
const { server_info, cpu_usage_list } = storeToRefs(useServerInfoStore())

// ----------------- C O N S T A N T ----------------- //
const router = useRouter()
const chart = ref<HTMLElement>()

const info = computed(() => {
  if (!server_info.value) return {}
  return {
    brand: server_info.value.cpu.brand,
    manufacturer: server_info.value.cpu.manufacturer,
    usage: Math.ceil(server_info.value.cpu.usage * 100),
    physical: server_info.value.cpu.physical,
    speed: server_info.value.cpu.speed
  }
})
const chartInstance = ref<echarts.ECharts>()
const option = {
  title: {
    // 文本居中
    left: 'center',
    // 标题文本样式
    textStyle: {
      color: theme_setting.value === 'dark' ? '#fefefe' : '#181818'
    },
    text: 'CPU Usage',
    top: 15
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    }
  },
  yAxis: {
    type: 'value',
    // 改变Y轴刻度描述文字的颜色
    axisLabel: {
      color: theme_setting.value === 'dark' ? '#fefefe' : '#181818'
    },
    // 单位 %
    name: '%',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    }
  },
  series: [
    {
      data: cpu_usage_list.value,
      type: 'line'
    }
  ]
}

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  init()
})

watch(server_info, () => {
  renderChart()
})

// ----------------- F U N C T I O N ----------------- //

const renderChart = () => {
  chartInstance.value?.setOption(option)
}

const init = () => {
  chartInstance.value = echarts.init(chart.value)
  chartInstance.value.setOption(option)
}

const back = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.main-content {
  overflow-y: auto;
  background-color: var(--bg-color);
  border-radius: var(--radius-sm);
  color: var(--font-color);
  border: 1px solid var(--border-color);
  .header {
    position: sticky;
    top: 0;
    background-color: var(--bg-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--font-color);
    font-size: var(--font-size-title);
    padding: var(--space-1x);
    border-bottom: 1px solid var(--border-color);
  }

  .content {
    padding: var(--space-1x) 0;
    padding-inline: var(--space-1x);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    .top-content {
      display: flex;
      width: 100%;
      gap: var(--space-md);
      .small-card {
        border: 1px solid var(--border-color);
        width: 15rem;
        max-width: 15rem;
        height: 8rem;
        max-height: 8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-1x);
        padding-inline: var(--space-md);
        padding-block: var(--space-lg);
        border-radius: var(--radius-md);
        i {
          border-radius: var(--radius-md);
          min-width: 5rem;
          height: 5rem;
          background-color: var(--card-bg-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .num {
          font-size: 3.5rem;
          line-height: 3.5rem;
          width: 100%;
          text-align: center;
        }
        .unit {
          display: block;
          width: 20%;
          text-align: center;
        }
      }
    }
    .chart {
      border: 1px solid var(--border-color);
      width: 100%;
      height: 50vh;
      border-radius: var(--radius-md);
    }
  }
}
</style>
