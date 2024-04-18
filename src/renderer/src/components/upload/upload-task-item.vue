<template>
  <div class="upload-task-item">
    <p>File name</p>
    <el-progress :percentage="50"></el-progress>
    <div class="tool-bar">
      <el-button type="text" size="mini">Pause</el-button>
      <el-button type="text" size="mini">Cancel</el-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.upload-task-item {
  border: 1px solid var(--border-color);
  padding: var(--space-ssm);
  position: relative;
  .tool-bar {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: inherit;
  }
}
</style>
