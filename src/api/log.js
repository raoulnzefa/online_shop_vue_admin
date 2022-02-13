import request from '@/utils/request'

export function apiGetList() {
  return request({
    url: '/log/getList',
    method: 'post',
  })
}

export function apiGetListByUserId(data) {
  return request({
    url: '/log/getListByUserId',
    method: 'post',
    data
  })
}

export function apiDeleteLog(data) {
  return request({
    url: '/log',
    method: 'post',
    data
  })
}