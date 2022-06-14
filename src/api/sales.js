import request from '@/utils/request'

export function apiSaleData(data) {
    return request({
      url: '/order/saleData',
      method: 'post',
        data
    })
  }
export function apiSaleDataInfo(data) {
    return request({
        url: '/order/saleDataInfo',
        method: 'post',
        data
    })
}
