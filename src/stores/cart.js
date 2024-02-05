// 封装购物车
import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, deleteCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    // 判断是否登陆
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 购物车列表
    const cartList = ref([])

    // 获取最新购物车数据
    const updateCartList = async () => {
        const res = await findNewCartListAPI()  // 获取最新数据
        cartList.value = res.result             // 覆盖旧数据
    }

    // 添加购物车
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if (isLogin.value) {
            await insertCartAPI({ skuId, count })   // 加入购物车列表
            updateCartList()
        } else {
            // 未登录状态下，本地加入购物车
            // 已添加过，则count+1；没有添加则push
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }
    }
    
    // 删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await deleteCartAPI([skuId])
            updateCartList()
        } else {
            // 1. splice 找到要删除的下标值
            const idx = cartList.value.findIndex((item) => skuId === item)
            if (idx != -1) {
                cartList.value.splice(idx, 1)
            } else {
                console.error('Item not found for skuId: ', skuId)
            }
            

            // 2. filter 使用数据过滤的方法
            // cartList.value = cartList.value.filter((item) => skuId !== item)
        }
    }

    // 清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    // 选择框
    const CheckSingle = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        if (item) {
            item.selected = selected
        } else {
            console.error('Item not found for skuId: ', skuId)
        }

        // 2. 通过索引获取
        // const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        // if (idx !== -1) {
        //     cartList.value[idx].selected = selected
        // } else {
        //     console.error('Item not found for skuId: ', skuId)
        // }
    }
    const CheckAll = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    // 汇总数据
    const totalCount = computed(() => cartList.value.reduce((preValue, curValue) => preValue + curValue.count, 0))
    const totalPrice = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0))
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    // 返回已选择的商品数量
    const selectedCount = computed(() => 
        cartList.value.filter((item) => item.selected)
            .reduce((preValue, curValue) => preValue + curValue.count, 0)
    )
    const selectedPrice = computed(() => 
        cartList.value.filter((item) => item.selected)
            .reduce((pre, cur) => pre + cur.count * cur.price, 0)
    )

    return {
        cartList,
        addCart,
        delCart,
        totalCount,
        totalPrice,
        CheckSingle,
        CheckAll,
        isAll,
        selectedCount,
        selectedPrice,
        clearCart,
        updateCartList
    }
}, {
    persist: true,
})