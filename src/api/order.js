import request from '@/utils/request'

export function apiGetAllOrder() {
    return request({
        url: '/order/allOrder',
        method: 'get',
    })
}

export function apiSearchOrder(data) {
    return request({
        url: '/order/searchOrder',
        method: 'post',
        data
    })
}

export function apiUpdateOrder(data) {
    return request({
        url: '/order/updateOrder',
        method: 'post',
        data
    })
}