import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 酒店详情
   * @param {Object} params 参数对象
   * @param {number} params.id 酒店id(酒店详情)
   * @param {number} params.city 城市id
   * @param {number} params.price_in 酒店价格
   * @param {number} params.scenic 景点id
   * @param {string} params.name_contains 名字模糊查询
   * @param {number} params.hotellevel 酒店星级
   * @param {number} params.hoteltype 酒店类型
   * @param {number} params.hotelbrand 酒店品牌
   * @param {number} params.hotelasset 酒店设施
   * @param {Date} params.enterTime 入店时间
   * @param {number} params.person 人数
   * @param {string} params._sort 排序
   * @param {number} params._limit 条数
   * @param {number} params._start 开始数据（分页）
   * @returns {Promise}
   */
  getHotelDetails: params => handleAxiosRequest(axios.get('/hotels', { params })),
  /** 获取酒店选项数据 */
  getHotelOptions: () => handleAxiosRequest(axios.get('/hotels/options')),
  /**
   * 获取酒店评论
   * @param {Object} params 参数对象
   * @param {number} params.hotel 酒店id
   * @param {string} params._sort 排序
   * @param {number} params._limit 条数
   * @param {number} params._start 开始数据（分页）
   * @returns {Promise}
   */
  getHotelComments: params => handleAxiosRequest(axios.get('/hotels/comments', { params }))
})
