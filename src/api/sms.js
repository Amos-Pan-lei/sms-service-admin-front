import request from '@/utils/request'
import { flushBalance } from '@/utils/bus'

export function getNumberList(params) {
  return request.post('/sms/allPricePage', params)
}

export function buyNumber(params) {
  return request.post('/sms/buyNumber', params)
}

export function currentActivations() {
  return request({
    url: '/sms/currentActivations',
    method: 'get'
  })
}

let allCountry = []
request({
  url: '/sms/allCountry',
  method: 'get'
}).then(res => {
  allCountry = res.data
})

export function getCountryList() {
  return allCountry
}

let allService = []
request({
  url: '/sms/allService',
  method: 'get'
}).then(res => {
  allService = res.data
})

export function getServiceList() {
  return allService
}

// 查询余额
export const balanceObj = { cashBack: 0, balance: 0, balanceAndCashBack: 0 }

export function queryBalance() {
  request({
    url: '/sms/balance',
    method: 'get'
  }).then(res => {
    balanceObj.balance = res.data.balance
    balanceObj.cashBack = res.data.cashBack
    balanceObj.balanceAndCashBack = res.data.balanceAndCashBack
    flushBalance(balanceObj.balance)
  })
}

