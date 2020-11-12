import { handleAxiosRequest } from './index'

export default axios => ({
  /** 城市菜单列表 */
  getRecommendCityList: () => handleAxiosRequest(axios.get('/posts/cities'))
})
