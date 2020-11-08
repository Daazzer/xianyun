import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 实时机票城市
   * @param {Object} params
   * @param {string} params.name 出发城市
   * @returns {Promise<Response>}
   */
  getAirsCity: params => handleAxiosRequest(axios.get('/airs/city', { params })),
  getRecommendAirs: () => handleAxiosRequest(axios.get('/airs/sale')),
  /**
   * 机票列表
   * @param {Object} params
   * @param {string} params.departCity 出发城市
   * @param {string} params.departCode 出发城市代码
   * @param {string} params.destCity 目标城市
   * @param {string} params.destCode 目标城市代码
   * @param {string} params.departDate 出发日期（例如：2019-05-01）
   * @returns {Promise<Response>}
   */
  getAirs: params => handleAxiosRequest(axios.get('/airs', { params }))
})
