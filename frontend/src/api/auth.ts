import http from './http'

export interface LoginPayload {
  email: string
  password: string
}

export interface SendCodePayload {
  email: string
}

export interface RegisterPayload {
  email: string
  verifyCode: string
  password: string
}

export interface AuthResponse {
  token: string
  email: string
  username: string
  avatarUrl?: string
  bio?: string
}

export async function sendCode(payload: SendCodePayload) {
  return http.post('/api/auth/send-code', payload)
}

export async function register(payload: RegisterPayload) {
  return http.post('/api/auth/register', payload)
}

export async function login(payload: LoginPayload) {
  const res = await http.post('/api/auth/login', payload)
  if (res && res.data && res.data.success && res.data.data && res.data.data.token) {
    localStorage.setItem('token', res.data.data.token)
  }
  return res
}

export default {
  sendCode,
  register,
  login
}
