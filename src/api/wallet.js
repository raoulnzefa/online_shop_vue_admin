import request from '@/utils/request'


export function apiSelectWallet(data) {
    return request({
        url: '/wallet/selectWallet',
        method: 'get',
        data
    })
}

export function apiTopUp(data) {
    return request({
        url: '/wallet/topUp',
        method: 'post',
        data
    })
}

export function apiCost(data) {
    return request({
        url: '/wallet/cost',
        method: 'post',
        data
    })
}

