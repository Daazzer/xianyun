import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 获取手机验证码
   * @param {Object} data
   * @param {string} data.tel 手机号码
   * @returns {Promise<Response>}
   */
  getCaptchas: data => handleAxiosRequest(axios.post('/captchas', data)),
  /**
   * 登录
   * @param {Object} data
   * @param {string} data.username 用户名
   * @param {string} data.password 密码
   * @returns {Promise<Response>}
   */
  login: data => handleAxiosRequest(axios.post('/accounts/login', data)),
  /**
   * 注册
   * @param {Object} data
   * @param {string} data.username 用户名
   * @param {string} data.nickname 昵称
   * @param {string} data.captcha 手机验证码
   * @param {string} data.password 密码
   * @returns {Promise<Response>}
   */
  register: data => handleAxiosRequest(axios.post('/accounts/register', data))
})
