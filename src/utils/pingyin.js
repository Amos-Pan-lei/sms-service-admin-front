import { pinyin } from 'pinyin-pro'

// 参考 https://pinyin-pro.cn/use/pinyin.html#%E5%8F%82%E6%95%B0
const options = {
  type: 'string',
  toneType: 'none',
  pattern: 'pinyin',
  multiple: false,
  mode: 'normal',
  removeNonZh: false,
  nonZh: 'consecutive',
  v: true
}
const shoupingoptions = {
  type: 'string',
  toneType: 'none',
  pattern: 'first',
  multiple: false,
  mode: 'normal',
  removeNonZh: false,
  nonZh: 'consecutive',
  v: true
}

export function toPingying(word) {
  return pinyin(word, options).replaceAll(' ', '')
}
export function toShouPing(word) {
  return pinyin(word, shoupingoptions).replaceAll(' ', '')
}

export function matchPingYing(matchWord, search) {
  return toShouPing(matchWord).includes(search) || toPingying(matchWord).includes(search)
}
