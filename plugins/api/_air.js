import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 实时机票城市
   * @param {Object} params
   * @param {string} params.name 出发城市
   * @returns {Promise}
   */
  getAirsCity: params => handleAxiosRequest(axios.get('/airs/city', { params })),
  /** 获取机票推荐数据 */
  getRecommendAirs: () => handleAxiosRequest(axios.get('/airs/sale')),
  /**
   * 机票列表
   * @param {Object} params
   * @param {string} params.departCity 出发城市
   * @param {string} params.departCode 出发城市代码
   * @param {string} params.destCity 目标城市
   * @param {string} params.destCode 目标城市代码
   * @param {string} params.departDate 出发日期（例如：2019-05-01）
   * @returns {Promise}
   */
  getAirs: params => handleAxiosRequest(axios.get('/airs', { params })),
  /**
   * 选择机票
   * @param {string} id 机票id
   * @param {Object} params 获取机票的参数对象
   * @param {string} params.seat_xid 座位id
   * @returns {Promise}
   */
  getAirsById: (id, params) => handleAxiosRequest(axios.get(`/airs/${id}`, { params })),

  /**
   * 提交机票订单
   * @param {Object} data 参数对象
   * @param {Object[]} data.users 用户列表
   * @param {string} data.users[].username 用户名
   * @param {string} data.users[].id 用户 id
   * @param {string} data.insurances 保险 id
   * @param {string} data.contactName 联系人名字
   * @param {string} data.contactPhone 联系人电话
   * @param {boolean} data.invoice 是否需要发票
   * @param {string} data.seat_xid 座位 id
   * @param {string} data.air 航班 id
   * @returns {Promise}
   */
  submitAirsOrders: data => handleAxiosRequest(axios.post('/airorders', data)),
  /**
   * 订单详情
   * @param {string} id 订单 id
   * @returns {Promise}
   */
  getAirsOrderById: id => handleAxiosRequest(axios.get(`/airorders/${id}`))
})
