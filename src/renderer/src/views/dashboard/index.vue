<!--
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 17:53:02
 * @FilePath: \server-monitor\src\renderer\src\views\dashboard\index.vue
 * @Description: True or False
-->
<template>
  <div class="server-content">
    <div class="card-container">
      <TransitionGroup v-if="!loading" class="card-list" name="fade" tag="div" mode="out-in">
        <SocialCard key="scard"></SocialCard>
        <InfoCard
          v-for="(item, i) in card_list ?? 3"
          :key="i"
          :footer="item.footer"
          :title="item.title"
          :title-desc="item.titleDesc"
          :rate="item.rate"
          :rate-desc="item.rateDesc"
          :color="item.color"
          :point-color="item.pointColor"
          :to="item.to ?? ''"
        ></InfoCard>
        <div key="network" class="network">
          <Transition name="fade">
            <NetworkChart v-if="server_info" />
          </Transition>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoCard from '@renderer/components/card/card-2.vue'
import SocialCard from '@renderer/components/card/social-card.vue'
import NetworkChart from '@renderer/views/dashboard/components/network-chart.vue'

import { useServerInfoStore } from '@renderer/store'
import { sizeStrToByte, sortDisk } from '@renderer/utils/os'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { i18n } from '@renderer/plugins/i18n'

type CardItem = {
  title: string
  rate: number
  titleDesc: string
  rateDesc: string
  footer: string[]
  color: any
  pointColor: any
  to: string
}

// -------------------- S T O R E -------------------- //
const { server_info, loading } = storeToRefs(useServerInfoStore())

// ----------------- C O N S T A N T ----------------- //

const card_list = computed(() => {
  if (!server_info.value) return Array(3).fill({})
  const disk = sortDisk(server_info.value.disk)[0]

  return [
    {
      title: i18n.global.t('dashboard.index.processor'),
      titleDesc: server_info.value.cpu.manufacturer + ' ' + server_info.value.cpu.brand,
      rate: Math.ceil(server_info.value.cpu.usage * 100),
      rateDesc:
        i18n.global.t('dashboard.index.processor') + ' ' + i18n.global.t('dashboard.index.usage'),
      footer: [
        server_info.value.cpu.physical + ' ' + i18n.global.t('dashboard.index.cores'),
        server_info.value.cpu.speed + ' ' + i18n.global.t('dashboard.index.threads'),
        '64-' + i18n.global.t('dashboard.index.bit')
      ],
      to: 'processor',
      color: '#4bcffa',
      pointColor: '#0be881'
    },
    {
      title: i18n.global.t('dashboard.index.mem'),
      titleDesc: server_info.value.sname,
      rate: Math.ceil((server_info.value.mem.used * 100) / server_info.value.mem.total),
      rateDesc: i18n.global.t('dashboard.index.mem') + ' ' + i18n.global.t('dashboard.index.usage'),
      footer: [
        server_info.value.mem.size,
        server_info.value.mem.type,
        server_info.value.procs + ' ' + i18n.global.t('dashboard.index.procs')
      ],
      color: '#ef5777',
      pointColor: '#e056fd'
    },
    {
      title: 'Storage',
      titleDesc: server_info.value.disk_name,
      rate: Math.ceil((sizeStrToByte(disk.used) / sizeStrToByte(disk.size)) * 100),
      rateDesc: 'Storage Usage',
      footer: [disk.used, disk.size, disk.mountedOn],
      color: '#ffc048',
      pointColor: '#EE5A24'
    }
  ] as CardItem[]
})
</script>

<style lang="scss" scoped>
.server-content {
  .card-container {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background-color: var(--bg-color);
    width: max-content;
    padding: var(--space-1x);
    .card-list {
      width: max-content;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-1x);
      // 媒体查询 窗口宽度大于1200px时显示
      @media (min-width: 1280px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .network {
      display: block;
      grid-column: span 2;
      width: 100%;
    }
  }
}

// @media (min-width: 1024px) {
//   .server-content {
//     .card-list {
//       grid-template-columns: repeat(2, 1fr);
//       .network {
//         display: block;
//         grid-column: span 2;
//         width: 100%;
//       }
//     }
//   }
// }

// @media (min-width: 1280px) {
//   .server-content {
//     align-items: center;
//     .card-list {
//       grid-template-columns: repeat(3, 1fr);
//       gap: var(--space-1x);
//       .network {
//         display: block;
//         grid-column: span 2;
//         width: 100%;
//       }
//     }
//   }
// }
</style>
