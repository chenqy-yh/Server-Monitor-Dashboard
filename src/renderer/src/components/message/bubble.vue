<!--
 * @Date: 2024-04-01 12:01:09
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-08 11:19:01
 * @FilePath: \Spirit-client\src\renderer\src\components\message\bubble.vue
 * @Description: True or False
-->
<template>
  <div class="bubble">
    <div class="content" v-html="mkd"></div>
  </div>
</template>

<script setup lang="ts">
import { markdown } from '@renderer/composables/markdown'

// -------------------- P R O P S -------------------- //
const props = defineProps<{
  content: string
}>()

const mkd = computed(() => markdown.render(props.content))
</script>

<style lang="scss" scoped>
.bubble {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  color: var(--font-color);
  word-break: break-all;
  font-family: 'Consolas', 'Courier New', 'monospace';
  font-size: 0.8rem;
  transition: var(--transition);
  &:hover {
    border-color: color-mix(in srgb, var(--border-color) 80%, var(--reverse-color));
  }
  .content {
    word-break: break-all;
  }
}
</style>
