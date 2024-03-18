<script setup>
import { getSwipers } from '@/api/api.js'
import { onMounted } from 'vue'

onMounted(() => {
  const list = getSwipers()
  console.log(list)
})
</script>
<template>
  <page-contain title="标签管理"> </page-contain>
</template>
