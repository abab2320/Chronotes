<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import { validateFields, loginRules } from '@/pages/Login/components/validation'
import { login } from '@/api/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits<{ submit: [payload: { email: string; password: string }] }>()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errors = ref<Record<string, string>>({})
const router = useRouter()

const handleSubmit = async () => {
  // 表单验证
  const { valid, errors: validationErrors } = validateFields({
    email: { value: email.value, rules: loginRules.email },
    password: { value: password.value, rules: loginRules.password }
  })

  errors.value = validationErrors

  if (!valid) {
    // 显示第一个错误信息
    const firstError = Object.values(validationErrors)[0]
    //将第一个错误使用alert显示，其余错误使用输入框下的红色小字显示
    alert(firstError)
    return
  }

  loading.value = true
  try {
    const res = await login({ email: email.value, password: password.value })
    if (res && res.data && res.data.message === 'success') {
      const token = res.data.data.token
      if(token) {
        localStorage.setItem('token', token)
      }
      router.replace('/')
      return
    }
    const msg = res?.data?.message || '登录失败'
    alert(msg)
  } catch (err: any) {
    const msg = err?.response?.data?.message || err?.message || '登录失败'
    alert(msg)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="panel">
    <h3 class="panel__title">登录 Chronotes</h3>
    <p class="panel__desc">欢迎回来，继续你的学习之旅</p>

    <form class="panel__form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <label class="form-item__label">邮箱/用户名</label>
        <AppInput v-model="email" type="email" placeholder="请输入邮箱或用户名" size="lg" icon="📧" clearable />
        <p v-if="errors.email" class="form-item__error">{{ errors.email }}</p>
      </div>

      <div class="form-item">
        <label class="form-item__label">密码</label>
        <AppInput v-model="password" type="password" placeholder="请输入密码" size="lg" icon="🔒" />
        <p v-if="errors.password" class="form-item__error">{{ errors.password }}</p>
      </div>

      <div class="form-extra">
        <a href="#" class="link link--forgot">忘记密码？</a>
      </div>

      <AppButton class="submit-btn" type="primary" size="lg" :loading="loading" @click="handleSubmit">登录</AppButton>
    </form>
  </div>
  
  <div class="panel__slogan">轻量笔记与学习管理平台，让学习更高效</div>
 </template>

<style scoped lang="scss">
.panel { padding: $spacing-8 $spacing-6; }
.panel__title { font-size: $font-size-xl; color: $color-primary-dark; margin: 0 0 $spacing-2; }
.panel__desc { color: $color-text-secondary; margin: 0 0 $spacing-6; }
.form-item { margin-bottom: $spacing-5; }
.form-item__label { display:block; font-size:$font-size-sm; color:$color-text-primary; margin-bottom:$spacing-2; }
.form-item__error {
  font-size: $font-size-xs;
  color: $color-error;
  margin-top: $spacing-2;
  margin-bottom: 0;
}
.form-extra { display:flex; justify-content:flex-end; margin-bottom:$spacing-4; }
.submit-btn { width:100%; margin-top:$spacing-4; }
.panel__slogan { text-align:center; color:$color-text-tertiary; font-size:$font-size-sm; margin-top:$spacing-6; }
</style>