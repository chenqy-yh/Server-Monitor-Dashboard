<template>
  <div class="tabbed-container">
    <div class="tab-list">
      <div
        v-for="(id, i) in tabList"
        :key="id"
        class="tab-item"
        :class="{ active: id === activeTabIdx }"
        @click="() => active_tab(id)"
        @dblclick="() => openCloseDialog(id)"
      >
        <span>{{ tabNameList ? tabNameList[i] ?? i + 1 : i + 1 }}</span>
      </div>
      <div v-if="tabList.length < maxTabNum" class="tab-item add-tab-btn" @click="executeAddTab">
        <i class="ri-add-large-line"></i>
      </div>
    </div>
    <div class="tabbed-item">
      <slot></slot>
    </div>
    <el-dialog v-model="show_dialog" width="500">
      <template #header>
        <div class="dialog-header">{{ i18n.global.t('common.warning') }}</div>
      </template>
      <div class="dialog-body">{{ i18n.global.t('warning.del-tab') }}</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="show_dialog = false">{{ i18n.global.t('common.cancel') }}</el-button>
          <el-button type="primary" @click="executeCloseTab">
            {{ i18n.global.t('common.confirm') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import { i18n } from '@renderer/plugins/i18n'

// -------------------- P R O P S -------------------- //
const props = defineProps({
  maxTabNum: {
    type: Number,
    default: 4
  },
  tabList: {
    type: Array as PropType<number[]>,
    required: true
  },
  tabNameList: {
    type: Array as PropType<string[]>
  },
  activeTabIdx: {
    type: Number,
    default: 0
  },
  beforeAddTab: {
    type: Function as PropType<() => Promise<boolean>>
  },
  beforeCloseTab: {
    type: Function as PropType<() => Promise<boolean>>
  }
})

const emits = defineEmits(['update:tabList', 'update:activeTabIdx'])

// ----------------- C O N S T A N T ----------------- //

// const active_tab_idx = ref(props.activeTabIdx || 0)
// const tab_list = ref<number[]>(props.tabList || [])

const tab_id = ref(props.tabList.length) // 选项卡起始id
const show_dialog = ref(false) // 是否显示对话框
const del_item_idx = ref() // 删除的选项卡索引

// ----------------- F U N C T I O N ----------------- //

/**
 * @description 激活tab
 *
 */
const active_tab = (idx: number) => {
  emits('update:activeTabIdx', idx)
  // active_tab_idx.value = idx
}

/**
 *  @description 添加tab
 *
 */
const addtab = () => {
  if (props.tabList.length >= props.maxTabNum) return
  const cur_tab_id = tab_id.value++
  emits('update:tabList', [...props.tabList, cur_tab_id])
  active_tab(cur_tab_id)
}

/**
 *  @description 执行添加tab
 *
 */
const executeAddTab = async () => {
  if (props.beforeAddTab) {
    ;(await props.beforeAddTab()) && addtab()
  } else {
    addtab()
  }
}

/**
 *  @description 打开关闭对话框
 *
 */
const openCloseDialog = (idx: number) => {
  del_item_idx.value = idx
  show_dialog.value = true
}

/**
 *  @description 关闭tab
 *
 */
const closeTab = () => {
  // confirm
  emits(
    'update:tabList',
    props.tabList.filter((item) => item !== del_item_idx.value)
  )
  if (props.activeTabIdx === del_item_idx.value) {
    active_tab(props.tabList[0])
  }
  // emits('change', tab_list.value)
  show_dialog.value = false
  del_item_idx.value = undefined
}

/**
 *  @description 执行关闭tab
 *
 */
const executeCloseTab = async () => {
  if (props.beforeCloseTab) {
    ;(await props.beforeCloseTab()) && closeTab()
  } else {
    closeTab()
  }
}
</script>

<style lang="scss" scoped>
.dialog-header {
  background-color: var(--bg-color);
  color: var(--font-color);
  font-size: var(--font-size-title);
  padding: var(--space-md);
}

.dialog-body {
  font-size: var(--font-size);
  color: var(--font-color);
  padding: var(--space-md);
}

.dialog-footer {
  padding: var(--space-md);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-md);
}

.main-content {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.tabbed-container {
  overflow: hidden;

  .tab-list {
    display: flex;
    width: 100%;
    gap: var(--space-sm);
    .tab-item {
      flex-shrink: 0;
      width: 5rem;
      color: var(--font-color);
      border-top-left-radius: var(--radius-sm);
      border-top-right-radius: var(--radius-sm);
      background-color: var(--bg-color);
      border: 1px solid var(--border-color);
      border-bottom-color: var(--bg-color);
      display: flex;
      justify-content: center;
      align-items: center;
      padding-block: 3px;
      position: relative;
      z-index: 100;
      user-select: none;
      cursor: pointer;
      transition: var(--transition);
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        background-color: var(--bg-color);
        opacity: 0;
        transition: var(--transition);
      }
      &.active {
        &::before {
          opacity: 1;
        }
      }
      &:hover {
        color: var(--active-color);
      }
    }
    .add-tab-btn {
      display: flex;
      align-items: center;
    }
  }
  .tabbed-item {
    border: 1px solid var(--border-color);
    min-height: 10vh;
    background-color: var(--bg-color);
    border-bottom-left-radius: var(--radius-sm);
    border-bottom-right-radius: var(--radius-sm);
    border-top-right-radius: var(--radius-sm);
  }
}
</style>
