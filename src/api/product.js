import request from '@/utils/request'

export function apiGetAllProduct() {
    return request({
        url: '/product/allProduct',
        method: 'get',
    })
}

export function apiSearchProduct(data) {
    return request({
        url: '/product/searchProduct',
        method: 'post',
        data
    })
}

export function apiAddProduct(data) {
    return request({
        url: '/product/addProduct',
        method: 'post',
        data
    })
}

export function apiUpdateProduct(data) {
    return request({
        url: '/product/updateProduct',
        method: 'post',
        data
    })
}

export function apiDeleteProduct(data) {
    return request({
        url: '/product/deleteProduct',
        method: 'post',
        data
    })
}