<!--
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-30 23:43:24
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

const { server_url } = useConfigStore()
const file_path = '/root/monitor_client/upload'

const test = async () => {
  // await window.api.test()

  const blob = new Blob([`import { foo } from './2.js'; foo();`], {
    type: 'application/javascript'
  })
  blob.arrayBuffer().then((buffer) => {
    console.log(buffer)
  })
}
</script>

<style lang="scss" scoped>
.upload-file {
  display: none;
}
</style>
