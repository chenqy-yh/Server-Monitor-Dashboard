<!--
 * @Date: 2023-12-22 00:35:03
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 23:14:44
 * @FilePath: \Spirit-client\src\renderer\src\views\detail\index.vue
 * @Description: True or False
-->
<template>
  <div class="home-content" :class="{ showMenu }">
    <el-aside width="max-content">
      <LeftMenu @show-menu="handleShowMenu"></LeftMenu>
    </el-aside>
    <el-container class="right-container">
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
  </div>
</template>

<script setup lang="ts">
import LeftMenu from '@renderer/components/menu/left-menu.vue'

import { onMounted, ref } from 'vue'

// ----------------- C O N S T A N T ----------------- //

const showMenu = ref(false) // 是否显示菜单

// ------------------- C I R C L E ------------------- //

onMounted(() => {
  window.addEventListener('keydown', BanF11)
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
    e.stopPropagation()
  }
}

const handleShowMenu = (show: boolean) => {
  showMenu.value = show
}
</script>

<style lang="scss" scoped>
.home-content {
  height: 100%;
  display: grid;
  grid-template-columns: 0px 1fr;
  transition: var(--transition);
  &.showMenu {
    grid-template-columns: 200px 1fr;
  }

  .right-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      height: 100%;
      padding: var(--space-1x);
      background-color: var(--bg-bt-color);
      transition: var(--transition);
      .view {
        height: calc(100vh - var(--header-height) - var(--space-1x) * 2);
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
}
</style>
../../composables/mouse
