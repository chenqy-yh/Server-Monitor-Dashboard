<!--
 * @Date: 2023-12-22 15:54:21
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 22:43:23
 * @FilePath: \Spirit-client\src\renderer\src\components\menu\left-menu.vue
 * @Description: True or False
-->

<template>
  <Transition name="fade">
    <MenuBase>
      <MenuItem
        v-for="(menuItem, idx) in menu_tree"
        :key="idx"
        :level="0"
        :menu="menuItem"
        :has-child="menuItem.children && menuItem.children.length > 0"
      />
      <div class="back" @click="backInstances">
        <i class="ri-arrow-left-line"></i>
        <span>{{ i18n.global.t('common.back') }}</span>
      </div>
    </MenuBase>
  </Transition>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import MenuBase from './menu.vue'

import { i18n } from '@renderer/plugins/i18n'
import { useServerInfoStore } from '@renderer/store'
import useMenu, { type Menu } from './index'

// -------------------- P R O P S -------------------- //

const props = defineProps<{ menuType: string }>()

const emits = defineEmits(['show-menu'])

// -------------------- S T O R E -------------------- //

const serverInfoStore = useServerInfoStore()

// ----------------- C O N S T A N T ----------------- //

const menuIns = ref<Menu>() // 菜单实例

const router = useRouter() // 路由

const menu_tree = computed(() => getMenuList()) // 菜单树

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  initMenu()
  triggerShowMenu()
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  获取菜单列表
 * @return {*}
 */
const getMenuList = () => {
  if (!menuIns.value) return []
  return menuIns.value.getMenu()
}

/**
 * @description:  初始化菜单
 * @return {*}
 */
const initMenu = () => {
  menuIns.value = useMenu(props.menuType)
}

/**
 * @description:  触发显示菜单
 * @return {*}
 */
const triggerShowMenu = () => {
  if (!menuIns.value) return
  emits('show-menu', menu_tree.value.length > 0)
}

/**
 * @description:  返回实例列表
 * @return {*}
 */
const backInstances = () => {
  serverInfoStore.clearInstance()
  router.push({
    name: 'instances'
  })
}
</script>

<style lang="scss" scoped>
.back {
  display: flex;
  align-items: center;
  color: var(--font-color);
  padding-left: var(--space-md);
  gap: var(--space-lg);
  padding-block: var(--space-sm);
  font-family: 'roboto';
  cursor: pointer;
  &:hover {
    background-color: var(--menu-item-hover-bg);
  }
}
</style>
