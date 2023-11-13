
import { io } from 'socket.io-client'
import { getToken } from '@/utils/auth'

const socketServerHost = 'http://localhost:7741'

const loginOptions = {
  query: {
    // 随便约定的密钥 ,到服务端校验下字符串内容
    'authToken': getToken()
  }
}
localStorage.debug = '*'
export const socket = io(socketServerHost, loginOptions)

socket.on('connect', () => {
  console.log('建立连接 --- ', socket.id, socket.connected)
})

socket.on('refreshPage', (data) => {
  console.log('接受到服务端指令 刷新页面')
  location.reload()
})

socket.on('disconnect', () => {
  console.log('断开连接 --- ', socket.id, socket.connected)
})

export const setupSocetIoClient = () => {
  // initial connect

  console.log('socketIo 初始化。。。。。')
}

