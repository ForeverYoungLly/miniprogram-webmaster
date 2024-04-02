<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useTokenStore, useUserStore } from '@/stores'
import { getPublickey, userLoginService } from '@/api/api.js'
import { useRouter } from 'vue-router'
import JSEncrypt from 'jsencrypt'

const publickey = ref('')
// 获取密钥函数
onMounted(() => {
  getPublickey().then((res) => {
    publickey.value = res.data.publicKey
  })
})
const LoginData = ref({
  uid: '',
  password: ''
})
const fullscreenLoading = ref(false)

const router = useRouter()

const login = async () => {
  // 进行非空判断
  if (LoginData.value.uid === '' && LoginData.value.password === '') {
    ElMessage({
      showClose: true,
      message: '请填写用户名和密码',
      type: 'error',
      center: true
    })
  }
  console.log(LoginData.value.uid)
  // 定义要发送的数据
  var jsencrypt = new JSEncrypt()
  jsencrypt.setPublicKey(publickey.value)
  var id = jsencrypt.encrypt(LoginData.value.uid)
  var passWord = jsencrypt.encrypt(LoginData.value.password)
  const data = {
    uid: id,
    password: passWord,
    publicKey: publickey.value
  }
  console.log(data)
  let res = await userLoginService(data)
  if (res.data.msg === '用户名或密码错误')
    ElMessage({
      showClose: true,
      message: '用户名或密码错误',
      type: 'error',
      center: true
    })

  if (res.data.code === 200) {
    fullscreenLoading.value = true
    setTimeout(() => {
      fullscreenLoading.value = false
    }, 2000)
  }
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
