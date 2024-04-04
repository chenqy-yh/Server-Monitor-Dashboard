<template>
  <div class="pagination">
    <button class="arrow first" @click="goFirst">
      <i class="ri-skip-left-line ri-2x"></i>
    </button>
    <button class="pre arrow" @click="pre">
      <i class="ri-arrow-left-s-line ri-2x"></i>
    </button>
    <div class="p-btn-list">
      <button
        v-for="item in btnNum"
        :key="item"
        :class="['p-btn', { active: active_btn === item - 1 }]"
        @click="changeActiveBtn(item - 1)"
      >
        {{ start_num + item - 1 }}
      </button>
    </div>
    <button class="post arrow" @click="post">
      <i class="ri-arrow-right-s-line ri-2x"></i>
    </button>
    <button class="arrow last" @click="goLast">
      <i class="ri-skip-right-line ri-2x"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
// -------------------- P R O P S -------------------- //
const props = defineProps({
  minNum: {
    type: Number,
    default: 1
  },
  maxNum: {
    type: Number,
    default: 10
  },
  btnNum: {
    type: Number,
    default: 4
  },
  modelValue: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// ----------------- C O N S T A N T ----------------- //

const active_btn = ref<number>(0)
const start_num = ref<number>(0)

// ------------------- C I R C L E ------------------- //

onMounted(() => init())

watch(
  () => props.modelValue,
  (val) => {
    console.log('pagination modelvalue change:', val)
    if (val === props.minNum) {
      init()
    }
  }
)

// ----------------- F U N C T I O N ----------------- //
function init() {
  if (props.maxNum - props.modelValue + 1 < props.btnNum) {
    active_btn.value = props.maxNum - props.modelValue
    start_num.value = props.maxNum - props.btnNum + 1
  } else {
    active_btn.value = 0
    start_num.value = props.modelValue
  }
}

const changeActiveBtn = (index: number) => {
  active_btn.value = index
  emits('update:modelValue', start_num.value + index)
}

const pre = () => {
  if (props.modelValue <= props.minNum) return
  if (active_btn.value > 0) {
    active_btn.value -= 1
  } else {
    start_num.value -= 1
  }
  emits('update:modelValue', props.modelValue - 1)
}

const goFirst = () => {
  active_btn.value = 0
  start_num.value = props.minNum
  emits('update:modelValue', props.minNum)
}

const goLast = () => {
  active_btn.value = props.btnNum - 1
  start_num.value = props.maxNum - props.btnNum + 1
  emits('update:modelValue', props.maxNum)
}

const post = () => {
  if (props.modelValue >= props.maxNum) return
  if (active_btn.value < props.btnNum - 1) {
    active_btn.value += 1
  } else {
    start_num.value += 1
  }
  emits('update:modelValue', props.modelValue + 1)
}

defineExpose({
  change: init
})
</script>

<style lang="scss" scoped>
.pagination {
  --size: 0.8rem;

  width: max-content;
  height: max-content;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border: 1px solid var(--pagination-border-color);
  border-radius: var(--radius-sm);
  padding-inline: calc(var(--size) * 0.5);
  padding-block: calc(var(--size) * 0.3);
  background-color: var(--pagination-bg-color);
  .arrow {
    background-color: transparent;
    border: none;
    cursor: pointer;
    i {
      color: var(--pagination-color);
    }

    .last {
      display: flex;
      justify-content: start;
      border: 1px solid red;
      background-color: red;
    }
  }
  .p-btn-list {
    display: flex;
    gap: calc(var(--size) * 0.5);
  }

  .p-btn {
    font-family: 'roboto';
    border: none;
    background-color: transparent;
    color: var(--pagination-color);
    width: calc(var(--size) * 1.8);
    height: calc(var(--size) * 1.8);
    border-radius: 15px;
    transition: var(--transition);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--size);
    cursor: pointer;
    &.active {
      width: calc(var(--size) * 6);
      background-color: var(--pagination-color);
      color: var(--pagination-bg-color);
    }
    &:hover {
      background-color: var(--pagination-color);
      color: var(--pagination-bg-color);
    }
  }
}
</style>
