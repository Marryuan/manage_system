import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const user = ref({})
    const setUser = obj => (user.value = obj)

    const setToken = t => (token.value = t) // 设置 token
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      console.log('store获取的用户信息', res.data.data)
      user.value = res.data.data
    }
    return { token, setToken, getUser, user, setUser }
  },
  {
    persist: true, // 持久化
  },
)
