<!--
 * @Date: 2024-03-31 22:09:39
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-01 12:04:47
 * @FilePath: \server-monitor\src\renderer\src\views\test\test.vue
 * @Description: True or False
-->
<template>
  <div>
    <div class="box">
      <Bubble>
        this is a bubble,this is a bubble,this is a bubble,this is a bubble,this is a bubble,this is
        a bubble,this is a bubble,this is a bubble,this is a bubble,this is a bubble,this is a
        bubble,
      </Bubble>
    </div>
  </div>
</template>

<script setup lang="ts">
import Bubble from '@renderer/components/message/bubble.vue'
</script>

<style lang="scss" scoped>
.box {
  width: 300px;
  height: 400px;
  border: 1px solid red;
  overflow-y: auto;
}
</style>
