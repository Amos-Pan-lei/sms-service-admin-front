import Vue from 'vue'

export const bus = new Vue()

// 发送事件
export function flushBalance(data) {
  bus.$emit('flush-balance', data)
}

