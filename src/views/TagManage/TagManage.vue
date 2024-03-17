<script setup>
import { resetPasserword } from '@/api/api.js'
const requestPost = resetPasserword()
console.log(requestPost)
</script>
<template>
  <page-contain title="标签管理">
    <button @click="requestPost">resetPasserword</button>
  </page-contain>
</template>
