<!--
 * @Date: 2024-03-31 15:51:52
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-31 16:50:54
 * @FilePath: \server-monitor\src\renderer\src\views\home\components\msg-bar\msg-bar.vue
 * @Description: True or False
-->
<template>
  <transition name="fade">
    <div class="msg-bar-content">
      <span>{{ cur_msg || 'msg' }}</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

// ----------------- C O N S T A N T ----------------- //

const cur_msg = ref('')

let Timer: NodeJS.Timer | undefined = undefined

// ------------------- C I R C L E ------------------- //

onMounted(async () => {
  Timer = setInterval(test, 5000)
})

onUnmounted(() => {
  Timer && clearInterval(Timer)
})

watch(
  () => cur_msg,
  () => {}
)

// ----------------- F U N C T I O N ----------------- //

const test = () => {
  cur_msg.value = 'New Message' + Math.ceil(Math.random() * 1000)
}
</script>

<style lang="scss" scoped>
.msg-bar-content {
  color: var(--font-color-2);
}
</style>
