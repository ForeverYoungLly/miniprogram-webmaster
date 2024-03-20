<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useTokenStore, useUserStore } from '@/stores'
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
  const userStore = useUserStore()
  userStore.setUid(LoginData.value.uid)
  tokenStore.setAccessToken(res.data.access_token)
  tokenStore.setRefreshToken(res.data.refresh_token)
  router.push('/Manage')
}
</script>

<template>
  <div class="bigBox">
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="6" :offset="3" class="form">
        <!-- 登录相关表单 -->
        <el-form ref="form" size="large" autocomplete="off">
          <el-form-item>
            <h1>Meet社交搭子匹配平台管理端登录</h1>
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
              plain
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
  </div>
</template>

<style lang="scss" scoped>
.bigBox {
  width: 100%;
  height: 100%;
  background: url('https://file.51pptmoban.com/d/file/2017/02/23/c05b203024cf5991cb35dab95b4f45d3.jpg');
}
.login-page {
  height: 100vh;
  .bg {
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
