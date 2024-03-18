<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

// do not use same name with ref
const form = reactive({
  name: '',
  userID: userStore.uerUid,
  sex: '',
  phone: '',
  status: '',
  type: ''
})
</script>
<template>
  <page-contain title="个人中心">
    <!-- 个人资料 -->
    <!-- 携带uid获取资料 -->
    <!-- 展示资料 -->

    <!-- 重置密码 -->
    <!-- uid＋重置按钮  -->
    <!-- 展示重置后密码 -->
    <div class="bigBox">
      <el-card style="max-width: 50%">
        <template #header>
          <div class="card-header">
            <span>个人资料</span>
          </div>
        </template>
        <el-form :model="form" label-width="auto" style="max-width: 500px">
          <!-- 用户名 -->
          <el-form-item label="用户名">
            <el-input v-model="form.name" />
          </el-form-item>
          <!-- 用户ID -->
          <el-form-item label="用户ID">
            <el-input v-model="form.userID" style="width: 240px" disabled />
          </el-form-item>
          <!-- 性别 -->
          <el-form-item label="性别">
            <el-input v-model="form.sex" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="封禁状态">
            <el-input v-model="form.status" />
          </el-form-item>
          <el-form-item label="用户类型">
            <el-input v-model="form.type" />
          </el-form-item>
        </el-form>
      </el-card>
      <el-card style="max-width: 50%">
        <template #header>
          <div class="card-header">
            <span>重置密码</span>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      </el-card>
    </div>
  </page-contain>
</template>

<style lang="scss" scoped>
.bigBox {
  display: flex;
  justify-content: space-around;
}
</style>
