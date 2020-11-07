// 注意，@nuxtjs/axios 默认就集成了原生 axios，可以直接 import axios from 'axios'
import api from './api'

export default ({ $axios }, inject) => {
  /**
   * @see {@link http://157.122.54.189:9095} 在线数据库
   * @see {@link http://localhost:1337} 本地数据库
   */
  $axios.setBaseURL('http://157.122.54.189:9095')

  // 可以设置请求拦截器

  // 通过 inject 将 $api 注入到 Vue 实例原型
  inject('api', api($axios))
}
