<!--
 * @Date: 2023-12-22 15:54:21
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 17:49:31
 * @FilePath: \server-monitor\src\renderer\src\components\menu\left-menu.vue
 * @Description: True or False
-->

<template>
  <Transition name="fade">
    <Menu>
      <MenuItem
        v-for="(menuItem, idx) in menu"
        :key="idx"
        :level="0"
        :menu="menuItem"
        :has-child="menuItem.children && menuItem.children.length > 0"
      />
      <div class="back" @click="backInstances">
        <i class="ri-arrow-left-line"></i>
        <span>{{ i18n.global.t('common.back') }}</span>
      </div>
    </Menu>
  </Transition>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import Menu from './menu.vue'

import { usePermissionStore } from '@renderer/store'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import useMenu from './index'
import { RouteRecordRaw } from 'vue-router'
import { i18n } from '@renderer/plugins/i18n'
import { useRouter } from 'vue-router'

// -------------------- P R O P S -------------------- //

const emits = defineEmits(['show-menu'])

// -------------------- S T O R E -------------------- //

const { role_list } = storeToRefs(usePermissionStore())

// ----------------- C O N S T A N T ----------------- //

const menu = ref<RouteRecordRaw[]>([]) // 菜单列表

const router = useRouter()

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  initMenu()
  triggerShowMenu()
})

watch(role_list, () => {
  refreshMenu()
  triggerShowMenu()
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  初始化菜单
 * @return {*}
 */
const initMenu = () => {
  menu.value = useMenu().menu_tree
}

/**
 * @description:  刷新菜单
 * @return {*}
 */
const refreshMenu = () => {
  useMenu().refresh()
  menu.value = useMenu().menu_tree
}

/**
 * @description:  触发显示菜单
 * @return {*}
 */
const triggerShowMenu = () => {
  emits('show-menu', menu.value.length > 0)
}

/**
 * @description:  返回实例列表
 * @return {*}
 */
const backInstances = () => {
  router.push({
    name: 'instances'
  })
}
</script>

<style lang="scss" scoped>
.back {
  display: flex;
  color: var(--font-color);
  padding-left: var(--space-md);
  gap: var(--space-lg);
  padding-block: var(--space-sm);
  cursor: pointer;
  &:hover {
    background-color: var(--menu-item-hover-bg);
  }
}
</style>
