<!--
 * @Date: 2024-04-18 09:26:01
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-21 23:02:02
 * @FilePath: \Spirit-client\src\renderer\src\components\upload\upload-task-item.vue
 * @Description: True or False
-->
<template>
  <div class="upload-task-item">
    <el-row class="file-info">
      <img class="file-icon" :src="FileIcon" />
      <el-tooltip effect="dark" :content="fileName" placement="top">
        <p class="file-name">{{ fileName }}</p>
      </el-tooltip>
    </el-row>
    <el-progress :percentage="percentage" :color="STATUS_COLOR[status]"></el-progress>
    <div class="tool-bar">
      <el-button
        text
        circle
        :disabled="status === 'success'"
        :class="{ disabled: status === 'success' }"
        @click="handlePause"
      >
        <i class="ri-pause-large-line"></i>
      </el-button>
      <el-button text circle @click="handlePlay">
        <i class="ri-play-mini-fill"></i>
      </el-button>
      <el-button text circle @click="handleDelete">
        <i class="ri-delete-bin-line"></i>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileIcon from '@renderer/assets/img/file.png'
// -------------------- P R O P S -------------------- //
defineProps<{
  fileName: string
  percentage: number
  status: string
}>()

const emits = defineEmits(['pause', 'delete', 'play'])

// ----------------- C O N S T A N T ----------------- //
const STATUS_COLOR = {
  uploading: '#3498db',
  pause: '#f39c12',
  success: '#2ecc71',
  fail: '#e74c3c',
  created: '#b2bec3'
}

// ----------------- F U N C T I O N ----------------- //

const handlePause = () => {
  emits('pause')
}

const handleDelete = () => {
  emits('delete')
}

const handlePlay = () => {
  emits('play')
}
</script>

<style lang="scss" scoped>
.upload-task-item {
  border: 1px solid var(--border-color);
  padding: var(--space-ssm);
  position: relative;
  background-color: var(--bg-color);

  @include container(());
  @include flex-column(());
  overflow: hidden;
  .file-info {
    width: 80%;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: var(--space-sm);
    .file-icon {
      width: var(--font-size-content);
      height: var(--font-size-content);
    }
    .file-name {
      width: max-content;
      font-size: 0.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .tool-bar {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: inherit;
    padding-inline: var(--space-sm);
    display: flex;
    gap: var(--space-sm);
    opacity: 0;
    transition: var(--transition);
    // add left box shadow
    box-shadow: -5px 0 5px 0px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    .tool-bar {
      opacity: 1;
    }
  }
}
</style>
