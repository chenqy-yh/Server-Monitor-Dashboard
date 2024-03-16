<template>
  <input :checked="checked" type="checkbox" class="checkbox" @change="onChange" />
</template>

<script setup lang="ts">
// -------------------- P R O P S -------------------- //
defineProps({
  checked: Boolean
})

const emits = defineEmits(['update', 'update:checked'])

// ----------------- F U N C T I O N ----------------- //
const onChange = (e: Event) => {
  emits('update:checked', (e.target as HTMLInputElement).checked)
}
</script>

<style lang="scss" scoped>
.checkbox {
  appearance: none;
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  border: 3px solid transparent;
  box-shadow:
    3px 3px 6px rgba(0, 0, 0, 0.5),
    -1px -1px 4px rgba(255, 255, 255, 0.2);
  &:checked {
    box-shadow:
      3px 3px 6px rgba(0, 0, 0, 0.5),
      -1px -1px 4px rgba(255, 255, 255, 0.2),
      inset 3px 3px 6px rgba(0, 0, 0, 0.5),
      inset -1px -1px 4px rgba(255, 255, 255, 0.2);
  }
}
</style>
