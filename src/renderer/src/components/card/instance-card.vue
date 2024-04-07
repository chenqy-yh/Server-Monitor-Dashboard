<!--
 * @Date: 2024-04-06 23:35:55
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 16:05:33
 * @FilePath: \server-monitor\src\renderer\src\components\card\instance-card.vue
 * @Description: True or False
-->
<template>
  <div class="instance-card" @click="chooseInstance">
    <el-row class="row1">
      <div class="row1-left">
        <img :src="imgHelper.getImg(instance.Platform.toLowerCase() as any)" />
        <span class="name">{{ instance.InstanceName }}</span>
      </div>
    </el-row>
    <el-row class="row2">
      <span>{{
        i18n.global.t('instances.desc.info', {
          cpu: instance.CPU,
          mem: instance.Memery,
          disksize: instance.SystemDisk.DiskSize
        })
      }}</span>
    </el-row>
    <el-row class="row3">
      {{
        i18n.global.t('instances.desc.extime', {
          exTime: formatDateString(instance.ExpiredTime)
        })
      }}
    </el-row>
    <el-row class="row4">
      <div class="bottom-left">
        <i class="ri-circle-line state"></i>
        <span>{{ i18n.global.t('instances.state.' + instance.InstanceState.toLowerCase()) }}</span>
      </div>
      <div class="bottom-right">
        <span>IP:{{ instance.PublicAddresses[0] }}</span>
        <el-tooltip content="Copy IP" placement="top">
          <el-button text circle @click="copyIp">
            <i class="ri-file-copy-line"></i>
          </el-button>
        </el-tooltip>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { imgHelper } from '@renderer/utils/img'
import { formatDateString } from '@renderer/utils/time'
import { i18n } from '@renderer/plugins/i18n'
import { messageStore } from '@renderer/composables/message'
import { useServerInfoStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

// -------------------- P R O P S -------------------- //

const props = defineProps<{ instance: TLHInstance }>()

// -------------------- S T O R E -------------------- //

const { host, instance: choose_instance } = storeToRefs(useServerInfoStore())

// ----------------- C O N S T A N T ----------------- //

const router = useRouter()

// ----------------- F U N C T I O N ----------------- //

const copyIp = (e) => {
  e.stopPropagation()
  const ip = props.instance.PublicAddresses[0]
  navigator.clipboard.writeText(ip)
  messageStore.success('Copy IP Success')
}

const chooseInstance = () => {
  host.value = props.instance.PublicAddresses[0]
  choose_instance.value = props.instance
  router.push({
    name: 'Detail'
  })
}
</script>

<style lang="scss" scoped>
.instance-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-1x);
  color: var(--font-color);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  width: 300px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    border-color: color-mix(in lch, var(--border-color) 90%, var(--reverse-color));
    background-color: color-mix(in srgb, var(--bg-color) 98%, var(--reverse-color));
  }

  .row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .row1-left {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: 0.8rem;
      .name {
        width: 100px;
        display: block;
        // 多余的文字隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .row2,
  .row3 {
    display: flex;
    font-size: 0.8rem;
    gap: var(--space-sm);
  }
  .row4 {
    display: flex;
    justify-content: space-between;
    .bottom-left {
      display: flex;
      align-items: center;
      gap: var(--space-ssm);
      font-size: 0.8rem;
      .state {
        color: #67c23a;
      }
    }
    .bottom-right {
      font-size: 0.8rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
