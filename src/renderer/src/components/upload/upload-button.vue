<!--
 * @Date: 2024-03-29 23:06:59
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 00:16:52
 * @FilePath: \server-monitor\src\renderer\src\components\upload\upload-button.vue
 * @Description: True or False
-->
<template>
  <el-button text circle @click="click">
    <input
      ref="uploadFileRef"
      type="file"
      class="upload-file"
      :multiple="true"
      @change="getUploadFileList"
    />
    <i class="ri-upload-2-line ri-lg"></i>
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUpload } from './index'

// -------------------- P R O P S -------------------- //
const props = defineProps<{ serverUrl: string; uploadPath: string }>()

// -------------------- S T O R E -------------------- //

const { handleUploadFile } = useUpload(props.serverUrl, props.uploadPath)

// ----------------- C O N S T A N T ----------------- //

const uploadFileRef = ref<HTMLInputElement>()

const click = () => {
  if (!uploadFileRef.value) return
  uploadFileRef.value.click()
}

const getUploadFileList = (e: Event) => {
  const rawFileList = (e.target as HTMLInputElement).files
  console.log(rawFileList)
  // TODO 暂时只处理单文件上传
  if (!rawFileList || !rawFileList.length) return
  handleUploadFile(rawFileList[0])
}
</script>

<style lang="scss" scoped>
.upload-file {
  display: none;
}
</style>
