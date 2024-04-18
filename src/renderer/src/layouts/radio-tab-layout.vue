<!--
 * @Date: 2024-04-18 11:10:30
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-18 15:03:50
 * @FilePath: \Spirit-client\src\renderer\src\layouts\radio-tab-layout.vue
 * @Description: True or False
-->
<template>
  <div class="setting-content">
    <div class="top">
      <el-radio-group v-model="activeRadioTab" class="radio-group" @change="handleRadioTabChange">
        <el-radio-button
          v-for="(radioItem, index) in radioTabList"
          :key="index"
          :label="radioItem.label"
          >{{ i18n.global.t(radioItem.label) }}
        </el-radio-button>
      </el-radio-group>
      <el-button v-if="showBack" text circle @click="back">
        <i class="ri-arrow-right-line ri-lg"></i>
      </el-button>
    </div>

    <Transition name="fade" mode="out-in">
      <component :is="displayComponent"></component>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ElEmpty } from 'element-plus'
import { useRouter } from 'vue-router'
import { i18n } from '@renderer/plugins/i18n/index'

type RadioTabItem = {
  label: string
  component: unknown
}

// -------------------- P R O P S -------------------- //
const props = defineProps<{
  radioTabList: RadioTabItem[]
  activeRadio?: string
  showBack?: boolean
}>()

const emits = defineEmits(['update:activeRadio'])

// ----------------- C O N S T A N T ----------------- //

const router = useRouter()

const activeRadioTab = ref<string>(
  props.activeRadio || (props.radioTabList.length > 0 ? props.radioTabList[0].label : '')
) // 当前设置类型

const displayComponent = computed(() => getComponent(activeRadioTab.value)) // 当前设置组件

// ----------------- F U N C T I O N ----------------- //

const back = () => {
  router.go(-1)
}

const getComponent = (label: string) => {
  const item = props.radioTabList.find((item) => item.label === label)
  return item ? item.component : ElEmpty
}

const handleRadioTabChange = (val: string) => {
  emits('update:activeRadio', val)
}
</script>

<style lang="scss" scoped>
.setting-content {
  padding: var(--space-1x);
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-1x);
  }
}
</style>
