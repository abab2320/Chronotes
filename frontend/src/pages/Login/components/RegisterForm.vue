<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import { validateFields, validateField, registerRules, validatePasswordMatch } from '@/pages/Login/components/validation'
import { sendCode, register } from '@/api/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits<{ submit: [payload: { email: string; verifyCode: string; password: string; confirmPassword: string }] }>()

const email = ref('')
const verifyCode = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const sendingCode = ref(false)
const countdown = ref(0)
const errors = ref<Record<string, string>>({})
let sendCodeTimer: number | null = null
const router = useRouter()

onBeforeUnmount(() => {
  if (sendCodeTimer) {
    clearInterval(sendCodeTimer)
    sendCodeTimer = null
  }
})

const codeButtonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}秒后重试`
  }
  return '发送验证码'
})

//判断现在是否可以发送验证码（是否有邮箱地址以及倒计时是否结束）
const canSendCode = computed(() => {
  return email.value && !sendingCode.value && countdown.value === 0
})

const handleSendCode = async () => {
  if (!canSendCode.value) return

  // 验证邮箱格式
  const emailValidation = validateField(email.value, registerRules.email)
  if (!emailValidation.valid) {
    alert(emailValidation.message)
    return
  }

  sendingCode.value = true
  try {
    const res = await sendCode({ email: email.value })

    if (res && res.data && res.data.code === 0) {
      alert(res.data.message)
      // 发送成功，开始倒计时
      countdown.value = 60
      if (sendCodeTimer) {
        clearInterval(sendCodeTimer)
      }

      sendCodeTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          if (sendCodeTimer) {
            clearInterval(sendCodeTimer)
            sendCodeTimer = null
          }
        }
      }, 1000) as unknown as number

    } else {
      const msg = res?.data?.message || '发送失败，请稍后重试'
      alert(msg)
    }
  } catch (err: any) {
    const msg = err?.response?.data?.message || err?.message || '发送失败'
    alert(msg)
  } finally {
    sendingCode.value = false
  }
}

const handleSubmit = async () => {
  // 表单验证
  const { valid, errors: validationErrors } = validateFields({
    email: { value: email.value, rules: registerRules.email },
    verifyCode: { value: verifyCode.value, rules: registerRules.verifyCode },
    password: { value: password.value, rules: registerRules.password },
    confirmPassword: { value: confirmPassword.value, rules: registerRules.confirmPassword }
  })

  errors.value = validationErrors

  if (!valid) {
    const firstError = Object.values(validationErrors)[0]
    alert(firstError)
    return
  }

  // 验证两次密码是否一致
  const passwordMatchResult = validatePasswordMatch(password.value, confirmPassword.value)
  if (!passwordMatchResult.valid) {
    errors.value.confirmPassword = passwordMatchResult.message
    alert(passwordMatchResult.message)
    return
  }

  try{
    loading.value = true
    const res = await register({
      email: email.value,
      verifyCode: verifyCode.value,
      password: password.value
    })
    if (res && res.data && res.data.message === 'success') {
      const token = res.data.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }
      // 注册成功后跳转到首页
      router.replace('/')
      return
    }
    else {
      const msg = res?.data?.message || '注册失败'
      alert(msg)
    }
  } catch (err: any) {
    const msg = err?.response?.data?.message || err?.message || '注册失败'
    alert(msg)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="panel">
    <h3 class="panel__title">注册 Chronotes</h3>
    <p class="panel__desc">创建账户，开启高效学习</p>

    <form class="panel__form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <label class="form-item__label">邮箱</label>
        <AppInput v-model="email" type="email" placeholder="请输入邮箱" size="lg" icon="📧" clearable />
        <p v-if="errors.email" class="form-item__error">{{ errors.email }}</p>
      </div>

      <div class="form-item">
        <label class="form-item__label">验证码</label>
        <div class="code-input-group">
          <AppInput v-model="verifyCode" type="text" placeholder="请输入验证码" size="lg" icon="🔐" />
          <AppButton 
            class="code-btn" 
            type="secondary" 
            size="lg" 
            :disabled="!canSendCode"
            :loading="sendingCode"
            @click="handleSendCode"
          >
            {{ codeButtonText }}
          </AppButton>
        </div>
        <p v-if="errors.verifyCode" class="form-item__error">{{ errors.verifyCode }}</p>
      </div>

      <div class="form-item">
        <label class="form-item__label">密码</label>
        <AppInput v-model="password" type="password" placeholder="请输入密码" size="lg" icon="🔒" />
        <p v-if="!errors.password" class="form-item__hint">密码需包含数字和字母，长度8-20位</p>
        <p v-if="errors.password" class="form-item__error">{{ errors.password }}</p>
      </div>

      <div class="form-item">
        <label class="form-item__label">确认密码</label>
        <AppInput v-model="confirmPassword" type="password" placeholder="请再次输入密码" size="lg" icon="🔒" />
        <p v-if="errors.confirmPassword" class="form-item__error">{{ errors.confirmPassword }}</p>
      </div>

      <AppButton class="submit-btn" type="primary" size="lg" :loading="loading" @click="handleSubmit">注册</AppButton>
    </form>
  </div>
</template>

<style scoped lang="scss">
.panel { padding: $spacing-8 $spacing-6; }
.panel__title { font-size: $font-size-xl; color: $color-primary-dark; margin: 0 0 $spacing-2; }
.panel__desc { color: $color-text-secondary; margin: 0 0 $spacing-6; }
.form-item { margin-bottom: $spacing-5; }
.form-item__label { display:block; font-size:$font-size-sm; color:$color-text-primary; margin-bottom:$spacing-2; }
.form-item__hint { 
  font-size: $font-size-xs; 
  color: $color-text-tertiary; 
  margin-top: $spacing-2; 
  margin-bottom: 0;
}
.form-item__error {
  font-size: $font-size-xs;
  color: $color-error;
  margin-top: $spacing-2;
  margin-bottom: 0;
}
.code-input-group {
  display: flex;
  gap: $spacing-3;
  align-items: center;
}
.code-btn {
  flex-shrink: 0;
  white-space: nowrap;
  min-width: 120px;
}
.submit-btn { width:100%; margin-top:$spacing-4; }
.panel__slogan { text-align:center; color:$color-text-tertiary; font-size:$font-size-sm; margin-top:$spacing-6; }
</style>