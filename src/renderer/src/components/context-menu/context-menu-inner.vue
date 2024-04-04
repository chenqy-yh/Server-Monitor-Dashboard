<!--
 * @Date: 2024-03-28 13:45:09
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-29 00:15:11
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\context-menu-inner.vue
 * @Description: True or False
-->
<template>
  <ul
    :ref="getMenuRef as any"
    class="context-menu-content"
    :style="{
      top: style.top + 'px',
      left: style.left + 'px',
      display: show ? 'block' : 'none'
    }"
    @click.stop
    @contextmenu.stop
  >
    <template v-for="(item, index) in menus" :key="item.label || index">
      <li
        :ref="getMenuItemRef as any"
        class="context-menu-item"
        :class="{
          disabled: item.disabled
        }"
        @click="submenuManagement.executeMenuItemAction(item)"
        @mouseenter="(e) => item.expand && submenuManagement.toggleSubMenu(e, item, index)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
        <i v-if="item.expand" class="ri-arrow-right-s-line"></i>
      </li>
      <div
        v-if="item.children && item.showSubMenu"
        @mouseleave="submenuManagement.hideSubMenu(item)"
      >
        <ContextMenuInner
          :ref="(el) => getSubMenuRef(el, index)"
          :show="item.showSubMenu"
          :style="subStyle"
          :menus="item.children"
          :handle-click-menu-item="handleClickMenuItem"
        ></ContextMenuInner>
      </div>
    </template>
  </ul>
</template>

<script lang="ts">
import { PropType, VNodeRef, defineComponent, nextTick, ref } from 'vue'

type VNodeHTMLElementIntersection = VNodeRef & HTMLElement

export default defineComponent({
  name: 'ContextMenuInner',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    style: {
      type: Object as PropType<{ top: number; left: number }>,
      required: true
    },
    menus: {
      type: Array as PropType<ContextMenuItem[]>,
      required: true
    },
    handleClickMenuItem: {
      type: Function,
      required: true
    }
  },
  emits: ['mouseleave', 'hideMainMenu'],
  setup(props, { emit }) {
    const subStyle = ref({
      top: 0,
      left: 0
    })
    // get window width and height
    const contextMenuRef = ref<VNodeHTMLElementIntersection>()
    const menuItemRef = ref<VNodeHTMLElementIntersection[]>([])
    const subMenuRef = new Map<number, VNodeHTMLElementIntersection>()

    // ----------------- F U N C T I O N ----------------- //
    /**
     * @description:  获取菜单元素
     * @param {*} el
     * @return {*}
     */
    const getMenuRef = (el: VNodeHTMLElementIntersection) => {
      contextMenuRef.value = el
    }

    /**
     * @description: 获取菜单项元素
     * @param {*} el
     * @return {*}
     */
    const getMenuItemRef = (el: VNodeHTMLElementIntersection) => {
      menuItemRef.value.push(el)
    }

    /**
     * @description: 获取子菜单元素
     * @param {*} el
     * @param {*} index
     * @return {*}
     */
    const getSubMenuRef = (el: any, index: number) => {
      subMenuRef.set(index, el)
    }

    const submenuManagement = {
      /**
       * @description:  隐藏所有子菜单
       * @param {*} menus
       * @return {*}
       */
      hiddeAllMenu: (menus: ContextMenuItem[]) => {
        menus.forEach((item) => {
          item.showSubMenu = false
          if (item.children) {
            submenuManagement.hiddeAllMenu(item.children)
          }
        })
      },
      /**
       * @description:  显示子菜单
       * @param {*} e
       * @param {*} item
       * @param {*} index
       * @return {*}
       */
      toggleSubMenu: (e: MouseEvent, item: ContextMenuItem, index: number) => {
        submenuManagement.hiddeAllMenu(props.menus)
        item.showSubMenu = true
        submenuManagement.calcSubMenuPosition(index)
      },
      /**
       * @description: 计算子菜单位置
       * @param {*} index
       * @return {*}
       */
      calcSubMenuPosition(index: number) {
        nextTick(() => {
          const { width: subW, height: subH } = (
            subMenuRef.get(index)! as any
          ).$el.getBoundingClientRect()
          const { width: parentW, x: pX, y: pY } = menuItemRef.value[index].getBoundingClientRect()
          const winH = window.innerHeight
          const winW = window.innerWidth
          subStyle.value = {
            top: pY + subH > winH ? pY - subH : pY,
            left: pX + parentW + subW > winW ? pX - subW : pX + parentW
          }
        })
      },
      /**
       * @description:  隐藏子菜单
       * @return {*}
       */
      hideSubMenu: (item: ContextMenuItem) => {
        item.showSubMenu = false
      },
      /**
       * @description:  鼠标移入菜单项
       * @param {*} e
       * @param {*} item
       * @return {*}
       */
      handleMenuItemMouseout: (e: MouseEvent, item: ContextMenuItem) => {
        item.showSubMenu = false
      },
      /**
       * @description:  执行菜单项动作
       * @param {*} item
       * @return {*}
       */
      executeMenuItemAction: (item: ContextMenuItem) => {
        if (item.disabled) return
        item.action && item.action()
        // 隐藏所有菜单
        submenuManagement.hiddeAllMenu(props.menus)
        // 隐藏主菜单
        emit('hideMainMenu')
      }
    }

    return {
      subStyle,
      getMenuRef,
      getMenuItemRef,
      getSubMenuRef,
      submenuManagement
    }
  }
})
</script>

<style lang="scss" scoped>
@keyframes come-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.context-menu-content {
  min-width: 150px;
  background-color: var(--bg-color);
  position: fixed;
  // opacity: 0;
  animation: come-in 0.3s ease-in forwards;
  // 除去默认样式
  list-style: none;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-ssm);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .context-menu-item {
    padding-inline: var(--space-sm);
    padding-block: var(--space-sm);
    color: var(--font-color);
    border-radius: var(--radius-md);
    display: grid;
    grid-template-columns: 1fr 3fr 0.5fr;
    transition: background-color 0.3s;
    user-select: none;
    &.disabled {
      color: var(--font-color-3);
    }

    &:hover {
      background-color: var(--bg-color-hover);
    }
  }
}
</style>
