<!--
 * @Date: 2024-04-17 22:04:14
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-21 00:12:01
 * @FilePath: \Spirit-client\src\renderer\src\views\test\index.vue
 * @Description: True or False
-->
<template>
  <div>
    <div v-for="(item, idx) in list" :key="idx">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
class A {
  name = 'A'

  setName(name: string) {
    this.name = name
  }
}

const list = ref<A[]>([])

onMounted(() => {
  list.value = [new A(), new A(), new A()]
  Promise.resolve().then(() => {
    list.value[0].setName('B')
  })
})
</script>

<style lang="scss" scoped></style>
