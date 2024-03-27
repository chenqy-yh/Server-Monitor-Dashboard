<!--
 * @Date: 2024-03-26 11:06:45
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-28 00:00:10
 * @FilePath: \server-monitor\src\renderer\src\views\test\test.vue
 * @Description: True or False
-->
<template>
  <div class="main-content">
    <!-- <div class="box">box</div> -->
    <ContextMenuBox :menu="menu">
      <div class="box"></div>
    </ContextMenuBox>
  </div>
</template>

<script setup lang="ts">
// import ContextMenu from '@renderer/components/context-menu/context-menu.vue'
import ContextMenuBox from '@renderer/components/context-menu/context-menu-box.vue'

// ----------------- C O N S T A N T ----------------- //
const menu = [
  {
    icon: 'ri-file-line',
    label: 'Item 1',
    action: () => handleMenuItemClick('Item 1')
  },
  {
    icon: 'ri-file-line',
    label: 'Item 2',
    action: () => handleMenuItemClick('Item 2')
  },
  {
    icon: 'ri-file-line',
    label: 'Item 3',
    action: () => handleMenuItemClick('Item 3'),
    expand: true
  }
]

// ----------------- F U N C T I O N ----------------- //

const handleMenuItemClick = (item: string) => {
  console.log(item)
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
}
</style>
