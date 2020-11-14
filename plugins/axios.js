// 注意，@nuxtjs/axios 默认就集成了原生 axios，可以直接 import axios from 'axios'
import api from './api'
import { Message } from 'element-ui'

export default ({ $axios }, inject) => {
  /**
   * 判断是否请求到需要 token 的路由
   * @param {string} url 请求地址段
   * @returns {boolean} 是否匹配给定的地址段
   */
  const checkAuthUrl = (url, method) => (
    /^\/comments(\/like)?/.test(url) ||
    /^\/airorders(\/(pay|checkpay))?/.test(url) ||
    /^\/posts\/(star|like)/.test(url) ||
    (/^\/posts/.test(url) && method === 'post') ||
    /^\/upload/.test(url)
  )

  /**
   * @see {@link http://157.122.54.189:9093} 在线项目参考
   * @see {@link http://157.122.54.189:9095} 在线数据库
   * @see {@link http://localhost:1337} 本地数据库
   */
  $axios.setBaseURL('http://157.122.54.189:9095')

  // 请求拦截
  $axios.onRequest(config => {
    const xianyun = JSON.parse(localStorage.getItem('xianyun'))
    if (xianyun && checkAuthUrl(config.url, config.method)) {
      const token = xianyun.user.userInfo.token
      config.headers.Authorization = 'Bearer ' + token
    }
  })

  // 可以设置请求拦截器
  $axios.onError(error => {
    console.dir('axios error: ', error)
    const { statusCode, message } = error.response.data
    if (statusCode === 400) {
      Message.error(message)
    }
  })

  // 通过 inject 将 $api 注入到 Vue 实例原型
  inject('api', api($axios))
}
