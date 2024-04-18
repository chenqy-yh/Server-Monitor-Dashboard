<template>
  <div class="main-content">
    <div class="_content">
      <Card>
        <template #header>
          <div class="header">
            <div class="title">{{ i18n.global.t('terminal.title') }}</div>
          </div>
        </template>
        <template #default>
          <Tabbed v-model:active-tab-idx="active_tab_idx" v-model:tab-list="tab_list">
            <TerminalItem
              v-for="id in tab_list"
              v-show="id === active_tab_idx"
              :key="id"
              @close-socket="() => handleCloseSocket(id)"
              @finish-create="handleFinishCreatingTerminal"
            ></TerminalItem>
          </Tabbed>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@renderer/components/card/card.vue'
import Tabbed from '@renderer/components/tabbed/tabbed.vue'
import TerminalItem from './components/terminal-item.vue'

import { i18n } from '@renderer/plugins/i18n'

// ----------------- C O N S T A N T ----------------- //

const active_tab_idx = ref(0)
const tab_list = ref<number[]>([])

const creating_terminal = ref(false)
// ----------------- F U N C T I O N ----------------- //

const handleCloseSocket = (id) => {
  tab_list.value = tab_list.value.filter((item) => item !== id)
  if (active_tab_idx.value === id) {
    active_tab(tab_list.value[0])
  }
}

const active_tab = (idx: number) => {
  active_tab_idx.value = idx
}

const handleFinishCreatingTerminal = () => {
  creating_terminal.value = false
}
</script>

<style lang="scss" scoped>
.main-content {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.terminal-container {
  overflow: hidden;
}
</style>
