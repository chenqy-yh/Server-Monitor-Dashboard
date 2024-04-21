<!--
 * @Date: 2024-03-29 23:06:59
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-21 23:11:24
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\upload-button.vue
 * @Description: True or False
-->
<template>
  <el-button text circle @click="click">
    <input
      ref="uploadFileRef"
      type="file"
      class="upload-file"
      :disabled="uploading"
      :multiple="true"
      @change="getUploadFileList"
    />
    <Transition name="fade" mode="out-in">
      <i v-if="!uploading" class="ri-upload-2-line ri-lg"></i>
      <loading v-else :r="6" />
    </Transition>
  </el-button>
</template>

<script setup lang="ts">
import loading from '@renderer/components/loading/loading-icon.vue'

// import useUpload from './index'
import useUpload from './index'
import { UploadExecutor } from './useExecutor'

// -------------------- P R O P S -------------------- //
const props = defineProps<{ serverUrl: string; uploadPath: string }>()

const emits = defineEmits(['finished'])

// ----------------- C O N S T A N T ----------------- //

const chunkSize = 1024 * 1024 * 0.5 // 0.5MB

const uploading = ref(false)

// -------------------- S T O R E -------------------- //

const { createUploadTask } = useUpload()

// ----------------- C O N S T A N T ----------------- //

const uploadFileRef = ref<HTMLInputElement>()

const click = () => {
  if (!uploadFileRef.value) return
  uploadFileRef.value.click()
}

const resetInputValue = (e) => {
  ;(e.target as HTMLInputElement).value = ''
}

const getUploadFileList = (e: Event) => {
  uploading.value = true
  const rawFileList = (e.target as HTMLInputElement).files

  // TODO 暂时只处理单文件上传
  if (!rawFileList || !rawFileList.length) return
  const task_list: Promise<UploadExecutor>[] = []
  for (let i = 0; i < rawFileList.length; i++) {
    const create_executor = createUploadTask({
      chunkSize: chunkSize,
      rawFile: rawFileList[i],
      serverUrl: props.serverUrl,
      uploadPath: props.uploadPath,
      failTaskItemEffect: () => {
        uploading.value = false
        emits('finished')
      },
      finishTaskEffect: () => {
        uploading.value = false
        emits('finished')
      }
    })
    task_list.push(create_executor)
  }
  Promise.all(task_list).then(() => {
    resetInputValue(e)
  })
}
</script>

<style lang="scss" scoped>
.upload-file {
  display: none;
}
</style>
.
