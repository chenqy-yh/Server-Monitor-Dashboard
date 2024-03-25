<!--
 * @Date: 2024-03-09 20:21:29
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-24 23:17:22
 * @FilePath: \server-monitor\src\renderer\src\views\home\components\header.vue
 * @Description: True or False
-->
<!-- <template>
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
import { ref, onMounted, watch } from 'vue'
import { i18n } from '@renderer/plugins/i18n'
import { Drag } from '@renderer/composables/common/drag'
import { useHeader } from '@renderer/composables/common/header'

// -------------------- S T O R E -------------------- //
const configStore = useConfigStore()
const { direct_exit_setting, win_size_setting } = storeToRefs(configStore)

// ----------------- C O N S T A N T ----------------- //
const { isFullScreen, installDrag, appMin, fullScreen, exit } = useHeader(
  configStore.getWinSizeVal()
)

const header_ref = ref<HTMLElement>()
const drag = new Drag()

const dialogVisible = ref(false)

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  installDrag()
})

watch(win_size_setting, () => {
  drag.setWinSize(...configStore.getWinSizeVal())
})

// ----------------- F U N C T I O N ----------------- //
const appMin = () => {
  window.api.appMin()
}

const installDrag = () => {
  if (!header_ref.value) return
  drag.setWinSize(...configStore.getWinSizeVal())
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
</style> -->
<template>
  <div ref="header_ref">
    <el-header class="header">
      <div class="content"></div>
      <div class="btn-group">
        <el-button text circle @click="_appMin">
          <i class="ri-subtract-line ri-2x"></i>
        </el-button>
        <el-button text circle @click="_fullScreen">
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
import { useHeader } from '@renderer/composables/common/header'
import { i18n } from '@renderer/plugins/i18n'
import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

// -------------------- S T O R E -------------------- //
const configStore = useConfigStore()
const { direct_exit_setting, win_size_setting } = storeToRefs(configStore)

// ----------------- C O N S T A N T ----------------- //
const { installDrag, appMin, fullScreen, exit, onResize } = useHeader(configStore.getWinSizeVal())

const header_ref = ref<HTMLElement>()

const dialogVisible = ref(false)

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  if (!header_ref.value) return
  installDrag(header_ref.value)
})

watch(win_size_setting, () => {
  onResize(...configStore.getWinSizeVal())
})

// ----------------- F U N C T I O N ----------------- //
const _appMin = () => {
  appMin()
}

const _fullScreen = () => {
  fullScreen(...configStore.getWinSizeVal())
}

const onWindowClose = () => {
  if (direct_exit_setting.value) {
    _exit()
    return
  }
  dialogVisible.value = true
}

const _exit = () => {
  dialogVisible.value = false
  exit()
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
