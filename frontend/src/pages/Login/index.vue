<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const emit = defineEmits<{ login: [] }>()

const isLogin = ref(true)

const onLoginSubmit = (payload: { email: string; password: string }) => {
  console.log('登录', payload)
  emit('login')
}

const onRegisterSubmit = (payload: { email: string; password: string; confirmPassword: string }) => {
  console.log('注册', payload)
  emit('login')
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-page__bg">
      <div class="decoration decoration--1"></div>
      <div class="decoration decoration--2"></div>
      <div class="decoration decoration--3"></div>
    </div>

    <!-- 双面板卡片容器 -->
    <div class="dual-card">
      <div class="dual-card__inner">
        <div class="dual-card__left">
          <LoginForm @submit="onLoginSubmit" />
        </div>
        <div class="dual-card__right">
          <RegisterForm @submit="onRegisterSubmit" />
        </div>
      </div>

      <!-- 滑块遮罩 -->
      <div class="slider" :class="{ 'is-right': isLogin }">
        <div class="slider__content">
          <div class="logo">
            <div class="logo__icon">📚</div>
            <h1 class="logo__text">Chronotes</h1>
          </div>
          <h2 class="slider__title">{{ isLogin ? '欢迎回来' : '加入我们' }}</h2>
          <p class="slider__subtitle">{{ isLogin ? '登录您的账户，继续学习之旅' : '创建账户，开启高效学习' }}</p>

          <AppButton type="primary" size="lg" class="slider__btn" @click="toggleMode">
            {{ isLogin ? '去注册' : '去登录' }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.auth-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, $color-bg-primary 0%, $color-bg-tertiary 100%);
  padding: $spacing-8;
  overflow: hidden;
}

// 背景装饰
.auth-page__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.decoration {
  position: absolute;
  opacity: 0.1;
  border-radius: $radius-full;
}

.decoration--1 {
  width: 400px;
  height: 400px;
  background: $color-primary;
  top: -100px;
  left: -100px;
  animation: float 20s ease-in-out infinite;
}

.decoration--2 {
  width: 300px;
  height: 300px;
  background: $color-secondary;
  bottom: -80px;
  right: -80px;
  animation: float 15s ease-in-out infinite reverse;
}

.decoration--3 {
  width: 200px;
  height: 200px;
  background: $color-primary-light;
  top: 50%;
  right: 10%;
  animation: float 18s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

// 双面板卡片
.dual-card {
  position: relative;
  width: 100%;
  max-width: 960px;
  border-radius: $radius-2xl;
  box-shadow: $shadow-xl;
  background: $color-bg-secondary;
  overflow: visible;
  animation: slideUp 0.6s ease-out;
}

.dual-card__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.dual-card__left,
.dual-card__right {
  min-height: 540px;
  background: $color-bg-secondary;
  border-radius: $radius-2xl;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Logo 和标题区
.auth-card__header {
  text-align: center;
  margin-bottom: $spacing-8;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-2;
  margin-bottom: $spacing-6;
}

.logo__icon {
  font-size: $font-size-4xl;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.logo__text {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-primary-dark;
  margin: 0;
  letter-spacing: $letter-spacing-tight;
}

.auth-card__title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin: 0 0 $spacing-2 0;
}

.auth-card__subtitle {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin: 0;
}

// 表单
.auth-form {
  margin-bottom: $spacing-6;
}

.form-item {
  margin-bottom: $spacing-5;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-item__label {
  display: block;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  margin-bottom: $spacing-2;
}

.form-extra {
  display: flex;
  justify-content: flex-end;
  margin-bottom: $spacing-5;
}

.submit-btn {
  width: 100%;
  margin-top: $spacing-6;
  font-weight: $font-weight-semibold;
  letter-spacing: $letter-spacing-wide;
  transition: all $transition-slow;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba($color-primary, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
}

// 链接样式
.link {
  color: $color-secondary;
  text-decoration: none;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  transition: all $transition-base;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: $color-secondary;
    transition: width $transition-base;
  }

  &:hover {
    color: $color-secondary-dark;

    &::after {
      width: 100%;
    }
  }
}

.link--forgot {
  font-size: $font-size-sm;
}

.link--toggle {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-primary;

  &::after {
    background: $color-primary;
  }

  &:hover {
    color: $color-primary-dark;
  }
}

// 底部区域
.auth-card__footer {
  text-align: center;
  padding-top: $spacing-6;
  border-top: 1px solid $color-border-light;
  margin-bottom: $spacing-6;
}

.footer-text {
  color: $color-text-secondary;
  font-size: $font-size-base;
  margin-right: $spacing-2;
}

.auth-card__slogan {
  text-align: center;
  
  p {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
    margin: 0;
    line-height: $line-height-relaxed;
  }
}

// 响应式设计
@include respond-to(md) {
  .auth-card {
    padding: $spacing-12 $spacing-10;
  }
}

// 滑块遮罩
.slider {
  position: absolute;
  --overflow-offset:16px;
  top: calc(0px - var(--overflow-offset)*2);
  left: calc(0px - var(--overflow-offset)*2);
  width: calc(50% + var(--overflow-offset) * 2);
  height: calc(100% + var(--overflow-offset) * 4);
  background: $color-primary-lighter;
  border-radius: $radius-2xl;
  box-shadow: 0 20px 40px $shadow-color;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform $transition-slow;
  z-index: 2;
}

.slider.is-right {
  transform: translateX(calc(100% ));
}

.slider__content { text-align: center; padding: $spacing-10; }
.slider__title { font-size: $font-size-2xl; color: $color-text-primary; margin: 0 0 $spacing-2; }
.slider__subtitle { color: $color-text-secondary; margin: 0 0 $spacing-6; }
.slider__btn { min-width: 200px; }

@media (max-width: 640px) {
  .auth-page {
    padding: $spacing-4;
  }

  .dual-card {
    max-width: 100%;
    border-radius: $radius-xl;
  }

  .dual-card__inner {
    grid-template-columns: 1fr;
  }

  .dual-card__left,
  .dual-card__right {
    min-height: auto;
  }

  .slider {
    width: 100%;
    height: 40%;
    border-radius: 0 0 $radius-xl $radius-xl;
    transform: translateY(0);
  }

  .slider.is-right {
    transform: translateY(60%);
  }

  .logo__text {
    font-size: $font-size-2xl;
  }

  .auth-card__title {
    font-size: $font-size-xl;
  }

  .decoration--1,
  .decoration--2,
  .decoration--3 {
    display: none;
  }
}

// 输入框聚焦动画增强
:deep(.ch-input:focus-within) {
  transform: translateY(-2px);
  transition: all $transition-slow;
}
</style>