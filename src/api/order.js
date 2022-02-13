import request from '@/utils/request'

export function apiGetAllOrder() {
    return request({
        url: '/order/allOrder',
        method: 'get',
    })
}

export function apiGetList3(data) {
    return request({
        url: '/order/list3',
        method: 'post',
        data
    })
}
export function apiGetList1(data) {
    return request({
        url: '/order/list1',
        method: 'post',
        data
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