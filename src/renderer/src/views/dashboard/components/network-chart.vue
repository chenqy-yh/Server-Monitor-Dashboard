<template>
  <div class="network-content">
    <div class="info-list">
      <div class="info-item">
        <div class="desc">
          <i class="p" style="--clr: #16a085"></i>
          <span>{{ i18n.global.t('index.network.upstream') }}</span>
        </div>
        <div class="value">{{ up_cur.toFixed(2) }}KB</div>
      </div>
      <div class="info-item">
        <div class="desc">
          <i class="p" style="--clr: #f39c12"></i>
          <span>{{ i18n.global.t('index.network.Downstream') }}</span>
        </div>
        <div class="value">{{ down_cur.toFixed(2) }}KB</div>
      </div>
      <div class="info-item">
        <div class="desc">
          <i class="p" style="--clr: #3498db"></i>
          <span>{{ i18n.global.t('index.network.transmitted') }}</span>
        </div>
        <div class="value">{{ sizeFormat(up_total) }}</div>
      </div>
      <div class="info-item">
        <div class="desc">
          <i class="p" style="--clr: #e74c3c"></i>
          <span>{{ i18n.global.t('index.network.received') }}</span>
        </div>
        <div class="value">{{ sizeFormat(down_total) }}</div>
      </div>
    </div>
    <div ref="chart" class="network-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { i18n } from '@renderer/plugins/i18n'
import { useServerInfoStore, usePersonalSettingStore } from '@renderer/store'
import { sizeFormat } from '@renderer/utils/os'
import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

// -------------------- S T O R E -------------------- //
const { theme_setting } = storeToRefs(usePersonalSettingStore())
const { down_list, up_list, down_total, up_total, down_cur, up_cur } = storeToRefs(
  useServerInfoStore()
)

// ----------------- C O N S T A N T ----------------- //

const option: EChartsOption = {
  color: ['#16a085', '#f39c12'],
  // 设置图标宽
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['Down', 'Up'],
    textStyle: {
      color: theme_setting.value === 'dark' ? '#fefefe' : '#181818'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      axisLabel: {
        show: false
      },
      // 去除刻度
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value} KB',
        color: theme_setting.value === 'dark' ? '#fefefe' : '#181818'
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: 'Up',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#16a085'
          },
          {
            offset: 1,
            color: '#1abc9c7f'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: up_list.value
    },
    {
      name: 'Down',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#f39c12'
          },
          {
            offset: 1,
            color: '#f1c40f7f'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: down_list.value
    }
  ]
}

const chart = ref<HTMLElement>()

const myChart = ref<echarts.ECharts>()

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  init()
})

// ----------------- F U N C T I O N ----------------- //

const init = () => {
  myChart.value = echarts.init(chart.value)
  renderEchart()
}

const renderEchart = () => {
  if (myChart.value) {
    myChart.value.setOption(option)
  }
}

watch([down_cur, down_total, up_cur, up_total], () => {
  renderEchart()
})
</script>

<style lang="scss" scoped>
.network-content {
  --base-size: var(--dashboard-size);
  height: calc(var(--base-size) * 15);
  width: 100%;
  background-color: var(--card-bg-color);
  border-radius: calc(var(--base-size) * 1.25);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 8px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: var(--transition);
  user-select: none;
  &:hover {
    border-color: var(--border-color);
  }
}

.info-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: calc(var(--base-size) * 0.5);
  height: calc(var(--base-size) * 3);
  margin-top: calc(var(--base-size) * 0.5);
  margin-inline: calc(var(--base-size) * 1);
  .info-item {
    font-size: calc(var(--base-size) * 0.75);
    color: var(--font-color);
    .desc {
      display: flex;
      align-items: center;
      i {
        width: calc(var(--base-size) * 0.75);
        height: calc(var(--base-size) * 0.75);
        border-radius: 50%;
        margin-right: calc(var(--base-size) * 0.5);
        background-color: var(--clr);
      }
    }
    .value {
      text-align: center;
    }
  }
}

.network-chart {
  width: 100%;
  height: calc(var(--base-size) * 10);
}
</style>
