import { handleAxiosRequest } from './index'

export default axios => ({
  /** 首页轮播图数据 */
  getBanners: () => handleAxiosRequest(axios.get('/scenics/banners'))
})
