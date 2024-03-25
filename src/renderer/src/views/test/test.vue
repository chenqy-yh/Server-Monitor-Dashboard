<!--
 * @Date: 2023-12-22 11:08:35
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-03-25 17:35:11
 * @FilePath: \server-monitor\src\renderer\src\views\test\test.vue
 * @Description: True or False
-->
<template>
  <div>
    <PaginationTable>
      <el-table>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="age" label="age"></el-table-column>
      </el-table>
    </PaginationTable>
  </div>
</template>

<script setup lang="ts">
import PaginationTable from '@renderer/components/table/pagination-table.vue'
</script>

<style lang="scss" scoped></style>
