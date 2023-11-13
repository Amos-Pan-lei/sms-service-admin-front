import request from '@/utils/request'
import { flushBalance } from '@/utils/bus'

export function getNumberList(params) {
  return request.post('/sms/allPricePage', params).then(res => res.data)
}

export function buyNumber(params) {
  return request.post('/sms/buyNumber', params).then(res => res.data)
}

export function currentActivations() {
  return request({
    url: '/sms/currentActivations',
    method: 'get'
  }).then(res => res.data)
}

let allCountry = []
const countryMap = new Map()
export function getCountryList() {
  return allCountry
}

let allService = []
export function getServiceList() {
  return allService
}
const serviceMap = new Map()
// 查询余额
export const balanceObj = { cashBack: 0, balance: 0, balanceAndCashBack: 0 }

export function queryBalance() {
  return request({
    url: '/sms/balance',
    method: 'get'
  }).then(res => {
    balanceObj.balance = res.data.balance
    balanceObj.cashBack = res.data.cashBack
    balanceObj.balanceAndCashBack = res.data.balanceAndCashBack
    return balanceObj
  })
}

export function flushUserBalance() {
  return flushBalance()
}

export async function init() {
  allCountry = await request({
    url: '/sms/allCountry',
    method: 'get'
  }).then(res => res.data)
  allCountry.forEach(e => {
    countryMap.set(e.countryId, e)
  })
  allService = await request({
    url: '/sms/allService',
    method: 'get'
  }).then(res => res.data)
  allService.forEach(e => {
    serviceMap.set(e.code, e)
  })
}

export function getCountryById(id) {
  if (typeof id === 'string') {
    id = Number(id)
  }
  return countryMap.get(id)
}
export function getServiceByCode(code) {
  return serviceMap.get(code)
}
