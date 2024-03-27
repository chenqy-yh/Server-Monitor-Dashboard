<!--
 * @Date: 2023-12-22 00:35:03
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-27 22:31:23
 * @FilePath: \server-monitor\src\renderer\src\views\home\home.vue
 * @Description: True or False
-->
<template>
  <div id="thome" class="home-content">
    <el-container class="container">
      <el-aside width="170px">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container class="right-container">
        <Header></Header>
        <!-- <el-header class="header"> </el-header> -->
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
  </div>
</template>

<script setup lang="ts">
import LeftMenu from '@renderer/components/menu/left-menu.vue'
import Header from './components/header.vue'

import { useConfigStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

// -------------------- P R O P S -------------------- //
const { opacity_setting } = storeToRefs(useConfigStore())

// ----------------- C O N S T A N T ----------------- //

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  window.addEventListener('keydown', keyDown, true)
})

// ----------------- F U N C T I O N ----------------- //
const keyDown = (e: KeyboardEvent) => {
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
