<template>
  <div class="pagination">
    <button class="arrow first" @click="first">
      <i class="ri-skip-left-line ri-2x"></i>
    </button>
    <button class="pre arrow" @click="pre">
      <i class="ri-arrow-left-s-line ri-2x"></i>
    </button>
    <div class="p-btn-list">
      <button
        v-for="item in showPagerCount"
        :key="item"
        :class="['p-btn', { active: active_pager === item - 1 }]"
        @click="handleClickPager(item - 1)"
      >
        {{ getPagerNumber(item) }}
      </button>
    </div>
    <button class="post arrow" @click="next">
      <i class="ri-arrow-right-s-line ri-2x"></i>
    </button>
    <button class="arrow last" @click="last">
      <i class="ri-skip-right-line ri-2x"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { paginationDefaultConfig } from './config'
// -------------------- P R O P S -------------------- //
const props = defineProps({
  currentPage: {
    type: Number,
    default: paginationDefaultConfig.currentPage
  },
  defaultPageSize: {
    type: Number,
    default: paginationDefaultConfig.defaultPageSize
  },
  total: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['update:currentPage'])

// ----------------- C O N S T A N T ----------------- //

type PagerAction = 'pre' | 'next' | 'first' | 'last' // 操作页号动作

const maxShowPagerCount = paginationDefaultConfig.maxShowPagerCount // 最大显示页码数量

const pager_count = computed(() => getPagerCount()) // 总页数

const showPagerCount = computed(() => Math.min(pager_count.value, maxShowPagerCount)) // 显示页码数量

const cur_max_pager = computed(() => start_pager.value + showPagerCount.value - 1) // 当前最大页码

const cur_min_pager = computed(() => start_pager.value) // 当前最小页码

const _cur_page = ref(props.currentPage) // 当前页码

const start_pager = ref(0) // 开始页码

const active_pager = computed(() => _cur_page.value - start_pager.value) // 当前激活页码

// ------------------- C I R C L E ------------------- //
onBeforeMount(() => {
  initPager()
})

// ----------------- F U N C T I O N ----------------- //

/**
 * @description:  初始化页码
 * @return {*}
 */
const initPager = () => {
  if (props.currentPage + showPagerCount.value > pager_count.value) {
    start_pager.value = pager_count.value - showPagerCount.value
  } else {
    start_pager.value = props.currentPage
  }
}

/**
 * @description:  更新开始页码
 * @param {PagerAction} action
 * @return {*}
 */
const updateStartPager = (action: PagerAction) => {
  switch (action) {
    case 'pre':
      if (cur_min_pager.value > _cur_page.value) {
        start_pager.value--
      }
      break
    case 'next':
      if (_cur_page.value > cur_max_pager.value) {
        start_pager.value++
      }
      break
    case 'first':
      start_pager.value = 0
      break
    case 'last':
      start_pager.value = pager_count.value - showPagerCount.value
      break
  }
}

/**
 * @description:  获取总页数
 * @return {*}
 */
function getPagerCount() {
  return Math.ceil(props.total / props.defaultPageSize) ?? 1
}

/**
 * @description:  点击页码
 * @param {number} index
 * @return {*}
 */
const handleClickPager = (index: number) => {
  _cur_page.value = start_pager.value + index
  emits('update:currentPage', _cur_page.value)
}

/**
 * @description:  获取页码
 * @param {number} index
 * @return {*}
 */
const getPagerNumber = (index: number) => {
  return index + start_pager.value
}

/**
 * @description:  上一页
 * @return {*}
 */
const pre = () => {
  if (_cur_page.value === 0) return
  _cur_page.value--
  updateStartPager('pre')
  emits('update:currentPage', _cur_page.value)
}

/**
 * @description:  下一页
 * @return {*}
 */
const next = () => {
  if (_cur_page.value === pager_count.value - 1) return
  _cur_page.value++
  updateStartPager('next')
  emits('update:currentPage', _cur_page.value)
}

/**
 * @description:  首页
 * @return {*}
 */
const first = () => {
  _cur_page.value = 0
  updateStartPager('first')
  emits('update:currentPage', _cur_page.value)
}

/**
 * @description:  尾页
 * @return {*}
 */
const last = () => {
  _cur_page.value = pager_count.value - 1
  updateStartPager('last')
  emits('update:currentPage', _cur_page.value)
}
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
