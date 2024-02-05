import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cart'
import { mergeCartsAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
    // 定义管理用户数据的state
    const userInfo = ref({})
    
    const cartStore = useCartStore()

    // 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 合并本地购物车数据
        mergeCartsAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count,
            }
        }))
        // 更新购物车最新的数据
        cartStore.updateCartList() 
    }

    // 清除用户信息，退出登录
    const clearUserInfo = () => {
        cartStore.clearCart()
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