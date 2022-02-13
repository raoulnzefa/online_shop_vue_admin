import request from '@/utils/request'

export function apiListType() {
    return request({
        url: '/type/listType',
        method: 'get'
    })
}

export function apiAddType(data) {
    return request({
        url: '/type/addType',
        method: 'post',
        data
    })
}


