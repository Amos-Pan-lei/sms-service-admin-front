import request from '@/utils/request'

export function getNumberList(params) {
  return request.post('/sms/allPrice', params)
}

export function getCountryList(params) {
  return request.get({
    url: '/sms/allCountry',
    method: 'get',
    params
  })
}

export function getServiceList(params) {
  return request({
    url: '/sms/allService',
    method: 'get',
    params
  })
}

