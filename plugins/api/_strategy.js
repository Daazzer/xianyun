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
   * 提交评论
   * @param {Object} data 参数对象
   * @param {string} data.content 评论内容
   * @param {Object} data.score 评分对象
   * @param {number} data.score.location 位置评分
   * @param {number} data.score.service 服务评分
   * @param {number} data.score.fancility 设施评分
   * @param {number} data.score.all 总体评分
   * @param {Object[]} data.pics 图片列表，上传文件成功后的文件信息对象
   * @param {number} data.hotel 酒店 id
   * @param {number} data.post 文章 id
   * @param {number} data.follow 回复 id
   * @returns {Promise}
   */
  postComment: data => handleAxiosRequest(axios.post('/comments', data)),
  /**
   * 文章点赞
   * @param {Object} params 参数对象
   * @param {number} params.id 文章 id
   * @returns {Promise}
   */
  likeStrategicalArticle: params => handleAxiosRequest(axios.get('/posts/like', { params })),
  /**
   * 获取文章评论
   * @param {Object} params 参数对象
   * @param {number} [params.post] 文章 id
   * @param {string} [params._sort] 排序
   * @param {number} [params._limit] 	条数
   * @param {number} [params._start] 当前数据索引
   * @returns {Promise}
   */
  getComments: params => handleAxiosRequest(axios.get('/posts/comments', { params })),
})
