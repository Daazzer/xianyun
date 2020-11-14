import { handleAxiosRequest } from './index'

export default axios => ({
  /**
   * 文件上传
   * @param {FormData} files 文件 FormData
   */
  uploadFile: files => handleAxiosRequest(axios.post('/upload', files))
})
