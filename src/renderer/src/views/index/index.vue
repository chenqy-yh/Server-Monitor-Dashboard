<template>
  <div v-loading="loading && !show_error" class="main-content">
    <Transition name="fade" mode="out-in">
      <div v-if="!show_error" class="_content">
        <Card class="card">
          <template #header>
            <div class="card-header">
              <span class="title">{{ i18n.global.t('index.status.title') }}</span>
              <div class="btn-group">
                <el-button
                  v-show="status_item_list.length > 4"
                  text
                  circle
                  @click="toggleMoreServerInfo"
                >
                  <Transition name="fade" mode="out-in">
                    <i v-if="!open_status_item_list" class="ri-add-line ri-xl"></i>
                    <i v-else class="ri-subtract-line"></i>
                  </Transition>
                </el-button>
              </div>
            </div>
          </template>
          <div class="status-content">
            <TransitionGroup class="item-list" name="fade" tag="div">
              <div
                v-for="(item, i) in status_item_list.slice(
                  0,
                  open_status_item_list ? status_item_list.length : status_item_list_common_size
                )"
                :key="i"
                class="item"
              >
                <div class="item-top">{{ item.title }}</div>
                <CircleProgress :rate="item.value"></CircleProgress>
                <div class="item-bottom">{{ item.desc }}</div>
              </div>
            </TransitionGroup>
          </div>
        </Card>
        <Card class="card">
          <template #header>
            <div class="card-header">
              <span>{{ i18n.global.t('index.network.title') }}</span>
            </div>
          </template>
          <NetworkChart v-if="server_info" />
        </Card>
      </div>
      <div v-else>
        <el-alert
          :title="i18n.global.t('error.connect-server-failed')"
          type="error"
          :description="i18n.global.t('error.check-server-address') + ' ' + server_url"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'
import CircleProgress from '@renderer/components/progress/circle-progress.vue'
import NetworkChart from './components/network-chart.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useConfigStore, useServerInfoStore } from '@renderer/store'
import { sizeFormat, sortDisk } from '@renderer/utils/os'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

// -------------------- S T O R E -------------------- //
const { server_url } = storeToRefs(useConfigStore())
const { server_info, loading, show_error } = storeToRefs(useServerInfoStore())

// ----------------- C O N S T A N T ----------------- //
const status_item_list_common_size = 4
const { t } = useI18n()
const open_status_item_list = ref(false)

const status_item_list = computed(() => {
  return server_info.value
    ? [
        {
          title: t('index.status.load'),
          value: getLoadRate(server_info.value.load.process),
          unit: '%',
          desc: (() => {
            const per = getLoadRate(server_info.value.load.process)
            if (per > 0.7) {
              return t('index.status.soHigh')
            } else if (per > 0.5) {
              return t('index.status.high')
            } else {
              return t('index.status.normal')
            }
          })()
        },
        {
          title: t('index.status.cpu'),
          value: parseFloat((server_info.value.cpu.usage * 100).toFixed(2)),
          unit: '%',
          desc: server_info.value.cpu.physical + ' ' + t('index.status.cores')
        },
        {
          title: t('index.status.mem'),
          value: parseFloat(
            ((server_info.value.mem.used / server_info.value.mem.total) * 100).toFixed(2)
          ),
          unit: '%',
          desc: server_info.value.mem.used + 'M / ' + server_info.value.mem.total + 'M'
        },
        ...sortDisk(server_info.value.disk).map((disk_item) => {
          const rate = parseFloat(disk_item.capacity.slice(0, -1))
          return {
            title: disk_item.mountedOn,
            value: rate,
            unit: '%',
            desc: disk_item.used + ' / ' + disk_item.size
          }
        })
      ]
    : []
})

// ------------------- C I R C L E ------------------- //

const getLoadRate = (rate_str) => {
  if (!rate_str) return 0
  const res = (rate_str.split('/')[0] / rate_str.split('/')[1]) * 100
  // 保留两位小数
  return parseFloat(res.toFixed(2))
}

const toggleMoreServerInfo = () => {
  open_status_item_list.value = !open_status_item_list.value
}
</script>

<style lang="scss" scoped>
.main-content {
  background-color: transparent;
  ._content {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .card {
    background-color: var(--bg-color);
    border-color: var(--border-color);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: max-content;
  }

  .status-content {
    padding-bottom: var(--space-md);
    .item-list {
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      justify-items: center;
      gap: var(--space-md) 0;
      .item {
        height: max-content;
        width: max-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-sm);
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        padding: var(--space-sm);
        transition: var(--transition);
        .item-top {
          font-size: var(--font-size-content);
          color: var(--font-color-2);
          transition: var(--transtion);
        }
        .item-bottom {
          font-size: var(--font-size-content);
          color: var(--font-color-2);
          transition: var(--transtion);
        }
        &:hover {
          background-color: var(--bg-color-hover);
          border-color: var(--border-color);
        }
      }
    }
  }
}
</style>
