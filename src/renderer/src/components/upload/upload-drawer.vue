<!--
 * @Date: 2024-04-18 08:21:40
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 20:34:25
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\upload-drawer.vue
 * @Description: True or False
-->
<template>
  <el-drawer v-model="_show" :with-header="false" :direction="direction">
    <div class="drawer-content">
      <div class="header">
        <div class="title">Upload</div>
        <el-button text circle @click="_show = false">
          <i class="ri-close-large-fill ri-lg"></i>
        </el-button>
      </div>
      <div class="tools-bar">
        <el-tooltip effect="dark" :content="i18n.global.t('file.upload-file')" placement="bottom">
          <UploadButton
            :server-url="serverUrl"
            :upload-path="filePath"
            @finished="taskComplete"
          ></UploadButton>
        </el-tooltip>
      </div>
      <div class="task-list">
        <UploadTaskItem />
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import UploadButton from './upload-button.vue'

import { i18n } from '@renderer/plugins/i18n'

// -------------------- P R O P S -------------------- //
const props = defineProps<{
  serverUrl: string
  filePath: string
  show: boolean
  direction: 'ltr' | 'rtl' | 'ttb' | 'btt'
}>()

const emits = defineEmits(['update:show', 'finished'])

// ----------------- C O N S T A N T ----------------- //

const _show = computed({
  get() {
    return props.show
  },
  set(val: boolean) {
    emits('update:show', val)
  }
})

// ----------------- F U N C T I O N ----------------- //
const taskComplete = () => {
  emits('finished')
}
</script>

<style lang="scss" scoped>
.drawer-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1x);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-title);
}

.tools-bar {
  @include container(
    (
      radius: var(--radius-sm),
      padding: var(--space-ssm)
    )
  );
}

.task-list {
  @include container(
    (
      radius: var(--radius-sm),
      padding: var(--space-md)
    )
  );
}
</style>
