// 封装购物车接口
import request from "@/utils/http";

export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count,
        }
    })
}

export const findNewCartListAPI = () => {
    return request({
        url: '/member/cart',
    })
}

export const deleteCartAPI = (ids) => {
    return request({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

export const mergeCartsAPI = (data) => {
    return request({
        url: '/member/cart/merge',
        method: 'POST',
        data
    })
}