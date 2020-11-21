import index from './_index'
import account from './_account'
import air from './_air'
import strategy from './_strategy'
import hotel from './_hotel'
import address from './_address'
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
  ...account(axios),
  ...air(axios),
  ...strategy(axios),
  ...hotel(axios),
  ...address(axios),
  ...upload(axios)
})
