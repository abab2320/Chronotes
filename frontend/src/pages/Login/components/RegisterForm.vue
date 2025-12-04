<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits<{ submit: [payload: { email: string; password: string; confirmPassword: string }] }>()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  setTimeout(() => {
    emit('submit', { email: email.value, password: password.value, confirmPassword: confirmPassword.value })
    loading.value = false
  }, 800)
}
</script>

<template>
  <div class="panel">
    <h3 class="panel__title">注册 Chronotes</h3>
    <p class="panel__desc">创建账户，开启高效学习</p>

    <form class="panel__form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <label class="form-item__label">邮箱/用户名</label>
        <AppInput v-model="email" type="email" placeholder="请输入邮箱或用户名" size="lg" icon="📧" clearable />
      </div>

      <div class="form-item">
        <label class="form-item__label">密码</label>
        <AppInput v-model="password" type="password" placeholder="请输入密码" size="lg" icon="🔒" />
      </div>

      <div class="form-item">
        <label class="form-item__label">确认密码</label>
        <AppInput v-model="confirmPassword" type="password" placeholder="请再次输入密码" size="lg" icon="🔒" />
      </div>

      <AppButton class="submit-btn" type="primary" size="lg" :loading="loading" @click="handleSubmit">注册</AppButton>
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
.submit-btn { width:100%; margin-top:$spacing-4; }
.panel__slogan { text-align:center; color:$color-text-tertiary; font-size:$font-size-sm; margin-top:$spacing-6; }
</style>