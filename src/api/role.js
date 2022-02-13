import request from '@/utils/request'



export function apiGetAllRole() {
  return request({
    url: '/user/listUserDto',
    method: 'get',
  })
}

export function apiSearchRole(data) {
  return request({
    url: '/user/searchUserDto',
    method: 'post',
    data
  })
}

export function apiAddRole(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function apiUpdateRole(data) {
  return request({
    url: '/user/modifyInfo',
    method: 'post',
    data
  })
}

export function apiDeleteRole(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}