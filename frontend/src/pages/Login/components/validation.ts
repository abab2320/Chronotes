/**
 * 表单验证工具函数
 */

export interface ValidationRule {
  required?: boolean
  email?: boolean
  password?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string) => boolean
  message: string
}

export interface ValidationResult {
  valid: boolean
  message: string
}

/**
 * 验证单个字段
 */
export function validateField(value: string, rules: ValidationRule[]): ValidationResult {
  for (const rule of rules) {
    // 必填验证
    if (rule.required && !value.trim()) {
      return { valid: false, message: rule.message }
    }

    // 如果值为空且不是必填，跳过其他验证
    if (!value.trim() && !rule.required) {
      continue
    }

    // 邮箱验证
    if (rule.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return { valid: false, message: rule.message }
      }
    }

    // 密码验证（包含数字和字母，8-20位）
    if (rule.password) {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
      if (!passwordRegex.test(value)) {
        return { valid: false, message: rule.message }
      }
    }

    // 最小长度验证
    if (rule.minLength !== undefined && value.length < rule.minLength) {
      return { valid: false, message: rule.message }
    }

    // 最大长度验证
    if (rule.maxLength !== undefined && value.length > rule.maxLength) {
      return { valid: false, message: rule.message }
    }

    // 正则验证
    if (rule.pattern && !rule.pattern.test(value)) {
      return { valid: false, message: rule.message }
    }

    // 自定义验证函数
    if (rule.validator && !rule.validator(value)) {
      return { valid: false, message: rule.message }
    }
  }

  return { valid: true, message: '' }
}

/**
 * 验证多个字段
 */
export function validateFields(fields: Record<string, { value: string; rules: ValidationRule[] }>): {
  valid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}
  let valid = true

  for (const [fieldName, { value, rules }] of Object.entries(fields)) {
    const result = validateField(value, rules)
    if (!result.valid) {
      errors[fieldName] = result.message
      valid = false
    }
  }

  return { valid, errors }
}

/**
 * 登录表单验证规则
 */
export const loginRules = {
  email: [
    { required: true, message: '请输入邮箱' },
    { email: true, message: '请输入有效的邮箱地址' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { minLength: 8, message: '密码至少8位' }
  ]
}

/**
 * 注册表单验证规则
 */
export const registerRules = {
  email: [
    { required: true, message: '请输入邮箱' },
    { email: true, message: '请输入有效的邮箱地址' }
  ],
  verifyCode: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式不正确' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { password: true, message: '密码需包含数字和字母，长度8-20位' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码' }
  ]
}

/**
 * 验证两次密码是否一致
 */
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (password !== confirmPassword) {
    return { valid: false, message: '两次输入的密码不一致' }
  }
  return { valid: true, message: '' }
}
