import request from '@/utils/request'

export function apiLogin(data) {
    return request({
      url: '/admin/login',
      method: 'post',
      data
    })
  }
// export function apiLogin(data) {
//     return request({
//         url: '/admin/login',
//         method: 'post',
//         data
//     })
// }