import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 查找城市
   * @param {Object} params 参数对象
   * @param {string} params.name 城市名称
   * @returns {Promise}
   */
  getCities: params => handleAxiosRequest(axios.get('/cities', { params }))
})
