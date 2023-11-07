import request from '@/utils/request'

export function getNumberList(params) {
  return request({
    url: '/sms/number/list',
    method: 'get',
    params
  })
}

export function getCountryList(params) {
  return request({
    url: '/sms/country/list',
    method: 'get',
    params
  })
}

export function getServiceList(params) {
  return request({
    url: '/sms/server/list',
    method: 'get',
    params
  })
}

