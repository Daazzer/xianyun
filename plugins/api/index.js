import index from './_index'
import hotel from './_hotel'

/**
 * 处理 axios 的响应与错误
 * @param {Promise} axios axios Promise 对象
 * @returns {Promise<Response>}
 */
export const handleAxiosRequest = axios => (
  axios.then(res => [null, res]).catch(err => [err])
)

export default axios => ({
  ...index(axios),
  ...hotel(axios)
})

