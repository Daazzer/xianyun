import index from './_index'
import hotel from './_hotel'
import account from './_account'
import air from './_air'
import strategy from './_strategy'
import upload from './_upload'

/**
 * 集中处理 axios 的响应与错误
 * @param {Promise} axios axios Promise 对象
 * @returns {Promise}
 */
export const handleAxiosRequest = axios => (
  axios.then(res => [null, res]).catch(err => [err])
)

export default axios => ({
  ...index(axios),
  ...hotel(axios),
  ...account(axios),
  ...air(axios),
  ...strategy(axios),
  ...upload(axios)
})
