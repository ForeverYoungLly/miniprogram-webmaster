<script setup>
// 测无感刷新
import { showPost } from '@/api/api.js'

const data = {
  pageNum: 1,
  pageSize: 1
}
const requestPost = async () => {
  let res = await showPost(JSON.stringify(data))
  console.log(res)
}
</script>
<template>
  <page-contain title="标签管理">
    <button @click="requestPost">resetPasserword</button>
  </page-contain>
</template>
