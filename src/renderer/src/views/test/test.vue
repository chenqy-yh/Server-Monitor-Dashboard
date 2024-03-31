<!--
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 12:40:19
 * @FilePath: \server-monitor\src\renderer\src\views\test\test.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <UploadButton :server-url="server_url" :upload-path="file_path" />
    <!-- <el-button @click="test">test</el-button> -->
  </div>
</template>

<script setup lang="ts">
import UploadButton from '@renderer/components/upload/upload-button.vue'
import { useConfigStore } from '@renderer/store'
import { ArrayBuffer } from 'spark-md5'

const { server_url } = useConfigStore()
const file_path = '/root/monitor_client/upload'

const test = async () => {
  const spark = new ArrayBuffer()
  const blob = new Blob([''], { type: 'text/plain' })
  const reader = new FileReader()
  reader.readAsArrayBuffer(blob)
  reader.onload = (e) => {
    spark.append((e.target as any).result)
    console.log('hash:', spark.end())
  }
}
</script>

<style lang="scss" scoped>
.upload-file {
  display: none;
}
</style>
