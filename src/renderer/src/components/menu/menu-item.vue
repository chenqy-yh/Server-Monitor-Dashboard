<!--
 * @Date: 2024-04-04 14:37:57
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-07 16:28:30
 * @FilePath: \server-monitor\src\renderer\src\components\menu\menu-item.vue
 * @Description: True or False
-->
<template>
  <li class="menu-item" :style="style" :class="{ active: show }">
    <div
      class="cur-menu-item"
      :class="{ active: active_menu }"
      @click="(e) => toggleMenu(e, menu.name as string)"
    >
      <div class="icon-slot">
        <i :class="menu.meta?.icon"></i>
      </div>
      <div class="menu-content">
        <span class="menu-item-title">{{ i18n.global.t(menu.meta?.title!) }}</span>
      </div>
    </div>

    <ul class="child-menu">
      <menu-item
        v-for="(child, idx) in menu.children"
        :key="idx"
        :level="level + 1"
        :menu="child"
        :has-child="child.children && child.children.length > 0"
      ></menu-item>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { i18n } from '@renderer/plugins/i18n'
import { useRouter } from 'vue-router'
import * as _ from 'lodash'

// -------------------- P R O P S -------------------- //
const props = defineProps({
  style: {
    type: Object,
    default: () => ({})
  },
  level: {
    type: Number,
    default: 0
  },
  hasChild: {
    type: Boolean,
    default: false
  },
  menu: {
    type: Object as PropType<RouteRecordRaw>,
    default: () => ({})
  }
})

// ----------------- C O N S T A N T ----------------- //

const router = useRouter()

const show = ref(false) // 是否显示子菜单

const childMenuRef = ref<HTMLElement | null>(null) // 子菜单元素

const active_menu = computed(() => {
  return router.currentRoute.value.name === props.menu.name
}) // 当前菜单是否激活

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  切换菜单
 * @param {*} e
 * @param {*} name
 * @return {*}
 */
const toggleMenu = (e: Event, name: string) => {
  e.stopPropagation()
  show.value = !show.value
  navigateTo(name)
}

/**
 * @description:  跳转
 * @param {*} name
 * @return {*}
 */
const navigateTo = (name: string) => {
  router.push({ name: name })
}
</script>

<style lang="scss">
.menu-item {
  display: grid;
  grid-template-rows: max-content 0fr;
  overflow: hidden;
  transition: all 0.5s;
  width: 200px;

  &.active {
    grid-template-rows: max-content 1fr;
  }

  .cur-menu-item {
    color: var(--menu-item-color);
    min-height: max-content;
    background-color: var(--menu-item-bg);
    display: grid;
    grid-template-columns: var(--menu-icon-size) 1fr;
    align-items: center;
    padding: var(--menu-item-padding);
    padding-left: var(--space-sm);
    gap: var(--space-sm);
    transition: var(--transition);
    user-select: none;
    cursor: pointer;
    padding-left: calc(v-bind(level) * 1rem);

    &.active {
      background-color: var(--menu-item-active-bg);
      color: var(--menu-item-active-color);
      .icon-slot {
        color: var(--menu-item-icon-active-color);
      }
      &:hover {
        background-color: var(--menu-item-hover-bg);
      }
    }
    &:hover {
      background-color: var(--menu-item-hover-bg);
    }
  }

  .child-menu {
    list-style-type: none;
    min-height: 0;
  }

  .icon-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--menu-item-icon-color);
    transition: var(--transition);
  }
  .menu-content {
    // border: 1px solid red;
    font-family: 'Poppins', sans-serif;
    // font-size: var(--menu-item=);
    font-size: var(--menu-item-font-size);
    transition: var(--transition);
    .menu-item-title {
      display: flex;
    }
  }
}
</style>
