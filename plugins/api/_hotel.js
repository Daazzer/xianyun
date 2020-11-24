import { handleAxiosRequest } from './index'
import qs from 'querystring'

export default axios => ({
  /**
   * 获取酒店数据，可以获取列表或者获取详情
   * @param {Object} [params] 参数对象
   * @param {number} [params.id] 酒店id(酒店详情)
   * @param {number} [params.city] 城市id ?
   * @param {Date} [params.enterTime] 入店时间 ?
   * @param {Date} [params.leftTime] 离店时间 ?
   * @param {number} [params.person] 人数 ?
   * @param {number} [params.price_in] 酒店价格 *
   * @param {number[]} [params.hotellevel] 酒店等级 *
   * @param {number[]} [params.hoteltype] 酒店类型 *
   * @param {number[]} [params.hotelasset] 酒店设施 *
   * @param {number[]} [params.hotelbrand] 酒店品牌 *
   * @param {number} [params._start] 数据索引 >
   * @param {number} [params._limit] 条数 >
   * @param {number} [params.scenic] 景点id
   * @param {string} [params.name_contains] 名字模糊查询
   * @param {string} [params._sort] 排序
   * @returns {Promise}
   */
  getHotels (params) {
    params = JSON.parse(JSON.stringify(params)) // 排除掉 undefined 项
    const filterParams = {}

    for (let key in params) {
      if (!Array.isArray(params[key]) || Array.isArray(params[key]) && params[key].length > 0) {
        filterParams[key] = params[key]
      }
    }
    return handleAxiosRequest(axios.get('/hotels', {
      params: filterParams,
      paramsSerializer (params) {
        return qs.stringify(params)
      }
    }))
  },
  /** 获取酒店选项数据 */
  getHotelFilterOptions: () => handleAxiosRequest(axios.get('/hotels/options')),
  /**
   * 获取酒店评论 (后台无数据)
   * @param {Object} params 参数对象
   * @param {number} params.hotel 酒店id
   * @param {string} params._sort 排序
   * @param {number} params._limit 条数
   * @param {number} params._start 数据索引
   * @returns {Promise}
   */
  getHotelComments: params => handleAxiosRequest(axios.get('/hotels/comments', { params }))
})
