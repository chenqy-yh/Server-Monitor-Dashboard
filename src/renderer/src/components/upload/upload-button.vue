<!--
 * @Date: 2024-03-29 23:06:59
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 00:33:44
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\upload-button.vue
 * @Description: True or False
-->
<template>
  <el-button text circle @click="click">
    <div>{{ has_upload_chunk_count + '/' + total_chunk_count }}</div>
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

import { ref } from 'vue'
import { useUpload } from './index'

// -------------------- P R O P S -------------------- //
const props = defineProps<{ serverUrl: string; uploadPath: string }>()

const emits = defineEmits(['finished'])

// ----------------- C O N S T A N T ----------------- //

const uploading = ref(false)

// -------------------- S T O R E -------------------- //

const { has_upload_chunk_count, total_chunk_count, handleUploadFile } = useUpload(
  props.serverUrl,
  props.uploadPath
)

// ----------------- C O N S T A N T ----------------- //

const uploadFileRef = ref<HTMLInputElement>()

const click = () => {
  if (!uploadFileRef.value) return
  uploadFileRef.value.click()
}

const getUploadFileList = async (e: Event) => {
  uploading.value = true
  const rawFileList = (e.target as HTMLInputElement).files
  // TODO 暂时只处理单文件上传
  if (!rawFileList || !rawFileList.length) return
  await handleUploadFile(rawFileList[0])
  emits('finished')
  uploading.value = false
}
</script>

<style lang="scss" scoped>
.upload-file {
  display: none;
}
</style>
