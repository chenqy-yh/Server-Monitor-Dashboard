<template>
  <div class="main-content">
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

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// ----------------- C O N S T A N T ----------------- //
const router = useRouter()

// ------------------- C I R C L E ------------------- //
onMounted(async () => {
  window.addEventListener('keydown', keyDown, true)
  installContextMenu()
})

// ----------------- F U N C T I O N ----------------- //
const keyDown = (e: KeyboardEvent) => {
  if (e.key === 'F11') {
    e.preventDefault()
  }
}

const installContextMenu = () => {
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    const path = router.currentRoute.value.path
    window.api.showContextMenu(path)
  })
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 100vh;
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
