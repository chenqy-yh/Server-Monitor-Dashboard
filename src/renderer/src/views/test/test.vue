<template>
  <div>
    <!-- 全选按钮 -->
    <input type="checkbox" v-model="allChecked" @change="selectAll" />

    <!-- 对象数组 -->
    <div v-for="(item, index) in items" :key="index">
      <input type="checkbox" v-model="item.checked" @change="selectOne(index)" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

export default {
  setup() {
    // 对象数组
    const items = ref([
      { name: 'Item 1', checked: false },
      { name: 'Item 2', checked: false },
      { name: 'Item 3', checked: false }
    ])

    // 全选按钮的状态
    const allChecked = computed({
      get() {
        return items.value.every((item) => item.checked)
      },
      set(value) {
        items.value.forEach((item) => (item.checked = value))
      }
    })

    // 当全选按钮的状态变化时更新对象数组的选中状态
    const selectAll = () => {
      allChecked.value = !allChecked.value
    }

    // 当单个对象的选中状态变化时检查是否所有对象都被选中
    const selectOne = (index) => {
      if (!items.value[index].checked) {
        allChecked.value = false
      } else {
        allChecked.value = items.value.every((item) => item.checked)
      }
    }

    return {
      items,
      allChecked,
      selectAll,
      selectOne
    }
  }
}
</script>
