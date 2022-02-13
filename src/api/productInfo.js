import request from '@/utils/request'

export function apiListProductInfo(data) {
    return request({
        url: '/productInfo/listProductInfo',
        method: 'get',
        data
    })
}

export function apiAddProductInfo(data) {
    return request({
        url: '/productInfo/addProductInfo',
        method: 'post',
        data
    })
}

export function apiUpdateProductInfo(data) {
    return request({
        url: '/productInfo/updateProductInfo',
        method: 'post',
        data
    })
}

export function apiDeleteProductInfo(data) {
    return request({
        url: '/productInfo/deleteProductInfo',
        method: 'post',
        data
    })
}