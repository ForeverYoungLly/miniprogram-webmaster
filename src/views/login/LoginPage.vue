<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useTokenStore } from '@/stores'
import { userLoginService } from '@/api/api.js'
import { useRouter } from 'vue-router'

const LoginData = ref({
  uid: '',
  password: ''
})

const router = useRouter()
const login = async () => {
  // 定义要发送的数据
  const data = {
    uid: LoginData.value.uid,
    password: LoginData.value.password
  }
  let res = await userLoginService(JSON.stringify(data))
  const tokenStore = useTokenStore()
  tokenStore.setAccessToken(res.data.access_token)
  tokenStore.setRefreshToken(res.data.refresh_token)
  router.push('/Manage')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录相关表单 -->
      <el-form ref="form" size="large" autocomplete="off">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="uid">
          <el-input
            v-model="LoginData.uid"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="LoginData.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
