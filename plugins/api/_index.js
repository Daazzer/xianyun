import { handleAxiosRequest } from './index'

export default axios => ({
  getBanners: () => handleAxiosRequest(axios.get('/scenics/banners'))
})