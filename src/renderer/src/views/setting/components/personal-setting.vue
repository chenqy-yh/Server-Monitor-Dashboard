<template>
  <div class="main-content">
    <Card>
      <template #header>
        <span>{{ i18n.global.t('setting.personal.title') }}</span>
      </template>
      <template #default>
        <el-form style="max-width: 600px" label-width="100px" class="form" @submit.prevent>
          <el-form-item>
            <template #label>
              <div class="form-label">{{ i18n.global.t('setting.personal.theme') }}</div>
            </template>
            <el-radio-group v-model="theme_setting" @change="updateThemeSetting">
              <el-radio-button label="light">{{
                i18n.global.t('setting.personal.light')
              }}</el-radio-button>
              <el-radio-button label="dark">{{
                i18n.global.t('setting.personal.dark')
              }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <template #label>
              <div class="form-label">{{ i18n.global.t('setting.personal.language') }}</div>
            </template>
            <el-select
              v-model="lang_setting"
              placeholder="Select"
              style="width: 240px"
              @change="updateLangSetting"
            >
              <el-option
                v-for="item in lang_list"
                :key="item"
                :label="i18n.global.t('setting.personal.' + item)"
                :value="item"
                >{{ i18n.global.t('setting.personal.' + item) }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #label>
              <div class="form-label">{{ i18n.global.t('setting.personal.winsize') }}</div>
            </template>
            <el-select
              v-model="win_size_setting"
              placeholder="Select"
              style="width: 240px"
              @change="updateWinSizeSetting"
            >
              <el-option
                v-for="item in win_size_list"
                :key="item"
                :label="transformSize(item)"
                :value="item"
                >{{ transformSize(item) }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #label>
              <div class="form-label">{{ i18n.global.t('setting.personal.exit-direct') }}</div>
            </template>
            <el-switch
              v-model="direct_exit_setting"
              :active-text="i18n.global.t('common.yes')"
              :inactive-text="i18n.global.t('common.no')"
              @change="updateDirectExitSetting"
            ></el-switch>
          </el-form-item>
          <el-form-item>
            <template #label>
              <div class="form-label">{{ i18n.global.t('setting.personal.opacity') }}</div>
            </template>
            <template #default>
              <el-slider
                v-model="opacity_setting"
                style="width: 240px"
                :min="0.9"
                :max="1"
                :step="0.01"
                @change="updateOpacity"
              ></el-slider>
            </template>
          </el-form-item>
        </el-form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'
import { usePersonalSettingStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { i18n } from '@renderer/plugins/i18n'
import { computed } from 'vue'
// -------------------- S T O R E -------------------- //

const personalSettingStore = usePersonalSettingStore()

const { sizeMap } = personalSettingStore

const { theme_setting, lang_setting, win_size_setting, direct_exit_setting, opacity_setting } =
  storeToRefs(personalSettingStore)
// ----------------- C O N S T A N T ----------------- //

const lang_list: Lang[] = ['en', 'cn'] // 语言列表

const win_size_list: WinSize[] = ['small', 'medium', 'large'] // 窗口大小列表

const transformSize = computed(() => (size: string) => {
  return i18n.global.t('setting.personal.' + size) + ' ' + sizeMap[size].join(' x ')
}) // 窗口大小转换

// ----------------- F U N C T I O N ----------------- //
/**
 *  @description: 更新主题设置
 *
 */
const updateThemeSetting = (val) => {
  personalSettingStore.update_theme_setting(val)
}

/**
 *  @description: 更新语言设置
 *
 */
const updateLangSetting = (val) => {
  personalSettingStore.update_lang_setting(val)
}

/**
 *  @description: 更新窗口大小设置
 *
 */
const updateWinSizeSetting = (val) => {
  personalSettingStore.update_win_size_setting(val)
}
/**
 *  @description: 更新直接退出设置
 *
 */
const updateDirectExitSetting = (val) => {
  personalSettingStore.update_direct_exit_setting(val)
}

/**
 *  @description: 更新透明度设置
 *
 */
const updateOpacity = (val) => {
  personalSettingStore.update_opacity_setting(val)
}
</script>

<style lang="scss" scoped>
.main-content {
  transition: var(--transition);
}

.form-label {
  color: var(--font-color);
  width: 100%;
}
</style>
