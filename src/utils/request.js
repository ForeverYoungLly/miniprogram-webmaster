import axios from 'axios'
import { useTokenStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import router from '@/router'
const tokenStore = useTokenStore()
import request from '@/utils/request'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: 'http://8.146.208.139:10010',
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)
//短token续签方法
const refreshThetoken = () => {
  const headerValue = tokenStore.refreshToken
  const data = ref('')
  return request.post('/auth/manage/refresh', data, {
    headers: {
      refresh_token: headerValue,
      Connection: 'keep-alive'
    }
  })
}

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      // code值为200时视为成功
      return Promise.resolve(res.data)
    }
    if (res.data.code === 402) {
      //续签token
      const response = refreshThetoken()
      console.log(response)
      // 处理数据
      tokenStore.removeAccessToken()
      tokenStore.removeRefreshToken()
      tokenStore.setAccessToken(response.data.access_token)
      tokenStore.setAccessToken(response.data.refresh_token)
      // 再次发送当前请求
      // return axios(res.config)
      return Promise.resolve(res.data)
    }

    if (res.data.code === 406 || res.data.code === 401) {
      router.push('/login')
    }
    return Promise.resolve(res)
  },
  (err) => {
    // 错误的默认情况 => 只要给提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
