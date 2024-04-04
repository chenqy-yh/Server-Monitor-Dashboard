<!--
 * @Date: 2023-12-22 00:35:03
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-03 14:53:59
 * @FilePath: \server-monitor\src\renderer\src\views\home\home.vue
 * @Description: True or False
-->
<template>
  <div class="home-content">
    <el-container class="container">
      <el-aside width="170px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container class="right-container">
        <Header></Header>
        <el-main class="content">
          <div class="view">
            <router-view v-slot="{ Component }">
              <Transition name="fade" mode="out-in">
                <component :is="Component" class="view-container"></component>
              </Transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <MessageBox />
  </div>
</template>

<script setup lang="ts">
import LeftMenu from '@renderer/components/menu/left-menu.vue'
import Header from './components/header/header.vue'

import { usePersonalSettingStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

// -------------------- P R O P S -------------------- //

const { opacity_setting } = storeToRefs(usePersonalSettingStore())

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  window.addEventListener('keydown', BanF11, true)
})

onMounted(() => {
  window.addEventListener('keydown', BanF11, true)
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  禁止F11全屏
 * @param {*} e
 * @return {*}
 */
const BanF11 = (e: KeyboardEvent) => {
  if (e.key === 'F11') {
    e.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
.home-content {
  height: 100vh;
  opacity: v-bind(opacity_setting);
  border-radius: var(--space-sm);
  border: 1px solid var(--border-color);
  overflow: hidden;
  .container {
    height: 100%;
  }
}
.right-container {
  display: flex;
  flex-direction: column;
  .content {
    padding: var(--space-1x);
    background-color: var(--bg-bt-color);
    transition: var(--transition);
    .view {
      height: 100%;
      overflow-y: auto;
      padding-right: var(--space-sm);
      &::-webkit-scrollbar {
        width: 0.8rem;
      }
      .view-container {
        transition: var(--transition);
        height: 100%;
      }
    }
  }
}
</style>
../../composables/mouse
