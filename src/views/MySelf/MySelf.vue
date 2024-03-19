<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores'
import { postUser, resetPasserword } from '@/api/api'
const userStore = useUserStore()

// do not use same name with ref
const form = ref({
  userName: '',
  uid: userStore.uerUid,
  sex: '',
  phoneNumber: '',
  status: '',
  type: '',
  password: ''
})

const repassword = ref('')
const reset = () => {
  const data = {
    uid: userStore.uerUid
  }
  resetPasserword(JSON.stringify(data)).then((res) => {
    console.log(res)
    repassword.value = res.data.resetPassword
  })
}

onMounted(() => {
  const data = {
    pageNum: 1,
    pageSize: 1,
    uid: userStore.uerUid
  }
  postUser(JSON.stringify(data)).then((res) => {
    console.log(res.data.rows[0])
    if (res.data.rows[0].sex === 0) res.data.rows[0].sex = '男'
    else res.data.rows[0].sex = '女'
    if (res.data.rows[0].status === 0) res.data.rows[0].status = '账号正常'
    else res.data.rows[0].status = '账号已封禁'
    if (res.data.rows[0].type === 0) res.data.rows[0].type = '普通用户'
    else res.data.rows[0].type = '管理员'
    form.value = res.data.rows[0]
  })
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
            <el-input v-model="form.userName" />
          </el-form-item>
          <!-- 用户ID -->
          <el-form-item label="用户ID">
            <el-input v-model="form.uid" style="width: 240px" disabled />
          </el-form-item>
          <!-- 性别 -->
          <el-form-item label="性别">
            <el-input v-model="form.sex" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phoneNumber" />
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
        <el-form-item label="用户ID">
          <el-input v-model="form.uid" />
        </el-form-item>
        <el-form-item label="重置密码">
          <el-button type="primary" @click="reset">点击重置</el-button>
        </el-form-item>
        <el-form-item label="重置后密码">
          <el-input v-model="repassword" />
        </el-form-item>
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
