<template>
  <div ref="header_ref">
    <el-header class="header">
      <div class="content"></div>
      <div class="btn-group">
        <el-button text circle @click="appMin">
          <i class="ri-subtract-line ri-2x"></i>
        </el-button>
        <el-button text circle @click="fullScreen">
          <i class="ri-square-line ri-lg"></i>
        </el-button>
        <el-button text circle @click="onWindowClose">
          <i class="ri-close-line ri-2x"></i>
        </el-button>
      </div>
    </el-header>
  </div>

  <el-dialog v-model="dialogVisible" width="500">
    <template #header>
      <span class="dialog-header">{{ i18n.global.t('tips.tips') }}</span>
    </template>
    <span class="dialog-content">{{ i18n.global.t('tips.exit-tips') }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-switch
          v-model="direct_exit_setting"
          size="large"
          :active-text="i18n.global.t('tips.no-prompt')"
        />
        <div class="footer-right">
          <el-button @click="dialogVisible = false">{{ i18n.global.t('common.cancel') }}</el-button>
          <el-button type="primary" @click="exit">
            {{ i18n.global.t('common.confirm') }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { i18n } from '@renderer/plugins/i18n'
import { Drag } from '@renderer/composables/common/drag'

// -------------------- S T O R E -------------------- //
const { direct_exit_setting } = storeToRefs(useConfigStore())

// ----------------- C O N S T A N T ----------------- //
const header_ref = ref<HTMLElement>()
const drag = new Drag()

const dialogVisible = ref(false)

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  installDrag()
})

// ----------------- F U N C T I O N ----------------- //
const appMin = () => {
  window.api.appMin()
}

const installDrag = () => {
  if (!header_ref.value) return
  drag.install(header_ref.value)
}

const fullScreen = () => {
  window.api.appFullScreen()
}

const onWindowClose = () => {
  if (direct_exit_setting.value) {
    exit()
    return
  }
  dialogVisible.value = true
}

const exit = () => {
  dialogVisible.value = false
  window.api.appQuit()
}
</script>

<style lang="scss" scoped>
.dialog-header {
  padding: var(--space-md);
  display: block;
  font-size: var(--font-size-title);
  color: var(--font-color);
}
.dialog-content {
  padding: var(--space-md);
  display: block;
  font-size: var(--font-size);
  color: var(--font-color);
}
.dialog-footer {
  padding: var(--space-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footer-right {
    display: flex;
    gap: var(--space-sm);
  }
}

.header {
  cursor: move;
  border-bottom: 1px solid var(--header-border-color);
  height: var(--header-height);
  background-color: var(--bg-color);
  transition: var(--transition);
  display: flex;
  justify-content: space-between;
  // border: 1px solid red;
  .btn-group {
    display: flex;
    align-items: center;
  }
}
</style>
