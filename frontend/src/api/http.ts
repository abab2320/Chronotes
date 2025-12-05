import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

// 请求拦截：自动添加 Authorization
http.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem('token')
    const skipAuthPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/send-code']
    const requestUrl = (config.url || '')
    const shouldSkip = skipAuthPaths.some(p => requestUrl.endsWith(p) || requestUrl.includes(p))
    if (!shouldSkip && token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } catch (e) {
    // ignore
  }
  return config
})

// 响应拦截：统一错误处理
http.interceptors.response.use(
  res => res,
  err => {
    const response = err.response
    if (response) {
      // 可在此做统一提示或跳转
      if (response.status === 401) {
        // token 过期或未认证
        localStorage.removeItem('token')
      }
    }
    return Promise.reject(err)
  }
)

export default http
