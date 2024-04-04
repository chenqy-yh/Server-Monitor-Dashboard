<!--
 * @Date: 2024-03-28 14:18:21
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-04 23:36:17
 * @FilePath: \server-monitor\src\renderer\src\components\context-menu\context-menu-outer.vue
 * @Description: True or False
-->
<template>
  <div class="context-menu-outer">
    <ContextMenuInner
      :show="true"
      :menus="menus"
      :style="style"
      @hide-main-menu="removeContextMenu"
    ></ContextMenuInner>
  </div>
  <!-- <div class="mask" @click="removeContextMenu" @contextmenu.prevent="removeContextMenu"></div> -->
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import ContextMenuInner from './context-menu-inner.vue'

export default defineComponent({
  name: 'ContextMenu',
  components: {
    ContextMenuInner
  },
  props: {
    pos: {
      type: Object as PropType<{ x: number; y: number }>,
      required: true
    },
    el: {
      type: HTMLElement,
      required: true
    },
    menus: {
      type: Array as PropType<ContextMenuItem[]>,
      required: true
    },
    removeContextMenu: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const { pos } = props

    const style = {
      top: pos.y,
      left: pos.x
    }

    return {
      style
    }
  }
})
</script>

<style lang="scss" scoped></style>
