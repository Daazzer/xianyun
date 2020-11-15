import { handleAxiosRequest } from './index'

export default axios => ({
  /** 城市菜单列表 */
  getRecommendCityList: () => handleAxiosRequest(axios.get('/posts/cities')),
  /**
   * 获取文章列表
   * @param {Object} params 参数对象
   * @param {number} [params._start] 当前数据项索引，分页时需要注意计算（从0开始）
   * @param {number} [params._limit] 条数
   * @param {string} [params.city] 城市
   * @returns {Promise}
   */
  getStrategicalArticles: params => handleAxiosRequest(axios.get('/posts', { params })),
  /**
   * 新增文章
   * @param {Object} data 参数对象
   * @param {string} data.content 文章内容
   * @param {string} data.title 文章标题
   * @param {number|string} data.city 城市id | 城市名称
   */
  publishStrategicalArticle: data => handleAxiosRequest(axios.post('/posts', data)),
  /**
   * 文章详情
   * @param {Object} params 参数对象
   * @param {number} params.id 文章id
   * @returns {Promise}
   */
  getStrategicalArticleDetail: params => handleAxiosRequest(axios.get('/posts', { params })),
  /**
   * 获取文章评论
   * @param {Object} params 参数对象
   * @param {number} [params.post] 文章 id
   * @param {string} [params._sort] 排序
   * @param {number} [params._limit] 	条数
   * @param {number} [params._start] 开始数据（分页）
   * @returns {Promise}
   */
  getComments: params => handleAxiosRequest(axios.get('/posts/comments', { params })),
})
