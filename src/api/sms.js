import request from '@/utils/request'

export function getNumberList(params) {
  return request.post('/sms/allPricePage', params)
}

export function getCountryList(params) {
  return request({
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

