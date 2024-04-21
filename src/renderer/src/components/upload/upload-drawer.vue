<!--
 * @Date: 2024-04-18 08:21:40
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-21 23:03:03
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
      <TransitionGroup name="fade" tag="div" class="task-list">
        <UploadTaskItem
          v-for="(item, index) in executor_list"
          :key="index"
          :file-name="item.rawFile.name"
          :percentage="item.percent"
          :status="item.status"
          @delete="() => handleDelete(index)"
          @pause="() => handlePause(index)"
          @play="() => handlePlay(index)"
        ></UploadTaskItem>
      </TransitionGroup>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import UploadButton from './upload-button.vue'
import UploadTaskItem from './upload-task-item.vue'

import { i18n } from '@renderer/plugins/i18n'
// import useUpload from './index'
import useUpload from './index'

// -------------------- S T O R E -------------------- //

// const { upload_task_progress_list, deleteTaskProgress } = useUpload()
const { executor_list } = useUpload()

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

const handleDelete = (index: number) => {
  executor_list.value.splice(index, 1)
}

const handlePause = (index: number) => {
  executor_list.value[index].pause()
}

const handlePlay = (index: number) => {
  executor_list.value[index].uploading()
}
</script>

<style lang="scss" scoped>
.drawer-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1x);
  height: 100%;
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
  height: 100%;
  @include container(
    (
      radius: var(--radius-sm),
      padding: var(--space-md)
    )
  );
  @include flex-column(());
  justify-content: flex-start;
}
</style>
.
