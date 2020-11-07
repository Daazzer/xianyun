import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 实时机票城市
   * @param {Object} params
   * @param {string} params.name 出发城市
   * @returns {Promise<Response>}
   */
  getAirsCity: params => handleAxiosRequest(axios.get('/airs/city', { params }))
})
