import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块 token setToken removeToken
export const useTokenStore = defineStore(
  'token',
  () => {
    const accessToken = ref('')
    const setAccessToken = (newToken) => {
      accessToken.value = newToken
    }
    const removeAccessToken = () => {
      accessToken.value = ''
    }

    const refreshToken = ref('')
    const setRefreshToken = (newToken) => {
      refreshToken.value = newToken
    }
    const removeRefreshToken = () => {
      refreshToken.value = ''
    }

    return {
      accessToken,
      refreshToken,
      setAccessToken,
      removeAccessToken,
      setRefreshToken,
      removeRefreshToken
    }
  },
  {
    persist: true
  }
)
