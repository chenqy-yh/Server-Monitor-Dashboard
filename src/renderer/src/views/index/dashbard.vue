<template>
  <div class="server-content">
    <div class="card-container">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoCard from '@renderer/components/card/card-2.vue'
import SocialCard from '@renderer/components/card/social-card.vue'
import NetworkChart from '@renderer/views/index/components/network-chart.vue'

import { useServerInfoStore } from '@renderer/store'
import { sizeStrToByte, sortDisk } from '@renderer/utils/os'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

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
const { server_info } = storeToRefs(useServerInfoStore())

// ----------------- C O N S T A N T ----------------- //

const card_list = computed(() => {
  if (!server_info.value) return Array(3).fill({})
  const disk = sortDisk(server_info.value.disk)[0]

  return [
    {
      title: 'Processor',
      titleDesc: server_info.value.cpu.manufacturer + ' ' + server_info.value.cpu.brand,
      rate: Math.ceil(server_info.value.cpu.usage * 100),
      rateDesc: 'Processor Usage',
      footer: [
        server_info.value.cpu.physical + ' Cores',
        server_info.value.cpu.speed + ' Threads',
        '64-bit'
      ],
      to: 'processor',
      color: '#4bcffa',
      pointColor: '#0be881'
    },
    {
      title: 'Machine',
      titleDesc: server_info.value.sname,
      rate: Math.ceil((server_info.value.mem.used * 100) / server_info.value.mem.total),
      rateDesc: 'Memory Usage',
      footer: [
        server_info.value.mem.size,
        server_info.value.mem.type,
        server_info.value.procs + ' Procs'
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
  padding: var(--space-1x);
  padding-top: var(--space-lg);
  overflow-y: auto;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  transition: var(--transition);
  .card-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
    gap: var(--space-lg);
    width: max-content;
    height: max-content;

    .network {
      display: none;
    }

    // //屏幕宽度大于1024
    // @media (min-width: 1024px) {
    // }

    // // 屏幕宽度大于1280
    // @media (min-width: 1280px) {
    // }
  }
}

@media (min-width: 1024px) {
  .server-content {
    .card-container {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-1x);
      .network {
        display: block;
        grid-column: span 2;
        width: 100%;
      }
    }
  }
}

@media (min-width: 1280px) {
  .server-content {
    align-items: center;
    .card-container {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-1x);
      .network {
        display: block;
        grid-column: span 2;
        width: 100%;
      }
    }
  }
}
</style>
