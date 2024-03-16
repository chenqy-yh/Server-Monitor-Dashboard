<template>
  <div>
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
import { useServerInfoStore } from '@renderer/store'
import { sizeFormat } from '@renderer/utils/os'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

type EChartsOption = echarts.EChartsOption

// -------------------- S T O R E -------------------- //

const { down_list, up_list, down_total, up_total, down_cur, up_cur } = storeToRefs(
  useServerInfoStore()
)

// ----------------- C O N S T A N T ----------------- //

const option: EChartsOption = {
  color: ['#16a085', '#f39c12'],
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
      color: '#888888'
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
      boundaryGap: false,
      axisLabel: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'KB/s'
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
.info-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .info-item {
    .desc {
      display: flex;
      align-items: center;
      i {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 5px;
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
  aspect-ratio: 16 / 9;
}
</style>
