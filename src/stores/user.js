import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
    // 定义管理用户数据的state
    const userInfo = ref({})

    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
    }

    // 清除用户信息，退出登录
    const clearUserInfo = () => {
        userInfo.value = {}
    }

    // 以对象格式将state和action返回
    return {
        userInfo, 
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true,
})