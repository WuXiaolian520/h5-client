import axios from 'axios'
import { showToast } from 'vant';
import 'vant/es/toast/style';

// axios配置
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL
axios.defaults.withCredentials = false

axios.interceptors.response.use((resp) => {
  if (resp.data) {
    if(resp.data.code === 0) {
      return Promise.resolve(resp.data.data)
    } else {
      resp.data.msg && showToast(resp.data.msg)
      return false
    }
  }
}, (error) => {
  if (error && error.response && error.response.status === 401) {
    return Promise.resolve({ })
  }
  if (!error.response?.data) return
  const data = error.response.data
  const message = data
  showToast(message)
  return Promise.reject(message)
})

export default axios
