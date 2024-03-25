<!--
 * @Date: 2023-12-22 15:54:21
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 12:33:13
 * @FilePath: \server-monitor\src\renderer\src\components\menu\left-menu.vue
 * @Description: True or False
-->
<template>
  <Menu>
    <menu-item>
      <template #icon>
        <BrandIcon />
      </template>
      <template #default>
        <span class="brand-title">{{ i18n.global.t('brand.name') }}</span>
      </template>
    </menu-item>
    <MenuItem
      v-for="(menuIem, idx) in menu?.menu_tree"
      :key="idx"
      :active="menuIem.meta.active"
      @click="() => navigateTo(menuIem.name)"
    >
      <template #icon>
        <i :class="menuIem.meta.icon + ' icon'"></i>
      </template>
      <template #default>
        <span class="menu-item-title">{{ i18n.global.t(menuIem.meta.title) }}</span>
      </template>
    </MenuItem>
  </Menu>
</template>

<script setup lang="ts">
import BrandIcon from '@renderer/components/icon/brand.vue'
import Menu from './menu.vue'
import MenuItem from './menu-item.vue'

import { i18n } from '@renderer/plugins/i18n'
import { ref, onMounted } from 'vue'
import useMenu from '@renderer/composables/menu'
import { router } from '@renderer/router'

const menu = ref<IMenu>()

// ------------------- C I R C L E ------------------- //
onMounted(() => {
  menu.value = useMenu()
})

// ----------------- F U N C T I O N ----------------- //
const navigateTo = (name: string) => {
  menu.value?.menu_tree.forEach((item) => {
    item.meta.active = false
    if (item.name === name) {
      item.meta.active = true
    }
  })
  router.push({ name })
}
</script>

<style lang="scss" scoped>
.brand {
  font-size: var(--brand-icon-size);
  color: var(--brand-icon-color);
}
.brand-title {
  font-size: var(--brand-font-size);
  font-weight: bold;
  font-family: 'josefin-sans', sans-serif;
}
// menu-item
.icon {
  font-size: 1.3rem;
}
</style>
