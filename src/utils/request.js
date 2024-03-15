import axios from 'axios'
import { useTokenStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://8.146.208.139:10010'
const tokenStore = useTokenStore()

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
  headers: {
    "Content-type": "application/json"
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带短token
    config.headers['Authorization'] = tokenStore.accessToken
    return config
  },
  (err) => Promise.reject(err)
)
//短token续签方法
const refreshThetoken = () => {
  const headerValue = tokenStore.refreshToken
  return axios.get('/auth/manage/refresh',{
    headers: {'pass': headerValue}
  });
};


// 响应拦截器 
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res
    }
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    if (err.data.code === 401) {
      //续签token
      const response = refreshThetoken();
      // 处理数据
      tokenStore.removeAccessToken()
      tokenStore.removeRefreshToken()
      tokenStore.setAccessToken(response.data.access_token)
      tokenStore.setAccessToken(response.data.refresh_token)
      // 再次发送当前请求
      return axios(err.config);
    }

    if (err.data.code === 406) {
      router.push('/login')
    }

    // 错误的默认情况 => 只要给提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
