<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()

// do not use same name with ref
const form = reactive({
  name: '',
  userID: userStore.uerUid,
  sex: '1',
  delivery: false,
  type: []
})

// 修改个人资料
const onSubmit = () => {
  console.log('1111')
}
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
            <el-radio-group v-model="form.sex" class="ml-4">
              <el-radio value="0" size="large">男</el-radio>
              <el-radio value="1" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Instant delivery">
            <el-switch v-model="form.delivery" />
          </el-form-item>
          <el-form-item label="Activity type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox value="Online activities" name="type">
                Online activities
              </el-checkbox>
              <el-checkbox value="Promotion activities" name="type">
                Promotion activities
              </el-checkbox>
              <el-checkbox value="Offline activities" name="type">
                Offline activities
              </el-checkbox>
              <el-checkbox value="Simple brand exposure" name="type">
                Simple brand exposure
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click="onSubmit"
              style="margin: auto"
              >提交</el-button
            >
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
