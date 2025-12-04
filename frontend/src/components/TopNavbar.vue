<script setup lang="ts">
import { ref } from 'vue'

// 定义 Props 接口
interface Props {
  logoText?: string
  searchPlaceholder?: string
  userName?: string
}

// 定义 Props（带默认值）
const props = withDefaults(defineProps<Props>(), {
  logoText: 'Chronotes',
  searchPlaceholder: '搜索笔记、任务...',
  userName: 'U'
})

// 定义 Emits
const emit = defineEmits<{
  search: [query: string]
  menuClick: [action: string]
}>()

// 用户菜单显示状态
const showUserMenu = ref(false)
// 搜索关键词
const searchQuery = ref('')

// 切换用户菜单
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// 处理搜索
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
  }
}

// 处理菜单项点击
const handleMenuClick = (action: string) => {
  emit('menuClick', action)
  showUserMenu.value = false
}
</script>

<template>
  <header class="top-nav">
    <div class="nav-left">
      <h1 class="logo">{{ props.logoText }}</h1>
    </div>
    
    <div class="nav-center">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery"
          type="text" 
          :placeholder="props.searchPlaceholder"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
    
    <div class="nav-right">
      <div class="user-profile" @click="toggleUserMenu">
        <div class="avatar">{{ props.userName }}</div>
        <transition name="fade">
          <div v-if="showUserMenu" class="user-menu">
            <div class="menu-item" @click="handleMenuClick('profile')">
              👤 个人主页
            </div>
            <div class="menu-item" @click="handleMenuClick('settings')">
              ⚙️ 设置
            </div>
            <div class="menu-item" @click="handleMenuClick('logout')">
              🚪 退出
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.top-nav {
  height: $navbar-height;
  background: $color-bg-primary;
  border-bottom: 1px solid $color-border;
  display: flex;
  align-items: center;
  padding: 0 $spacing-6;
  gap: $spacing-6;
  @include soft-shadow(base);
  z-index: $z-index-navbar;
}

.nav-left {
  flex-shrink: 0;
}

.logo {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $color-primary;
  letter-spacing: $letter-spacing-tight;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    opacity: 0.8;
  }
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  width: 100%;
  max-width: 500px;
  height: $input-height-md;
  background: $color-bg-secondary;
  border-radius: $radius-2xl;
  display: flex;
  align-items: center;
  padding: 0 $spacing-4;
  gap: $spacing-3;
  @include soft-shadow(sm);
  transition: all $transition-slow;

  &:focus-within {
    @include soft-shadow(md);
    transform: translateY(-1px);
  }
}

.search-icon {
  font-size: 16px;
  opacity: 0.5;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: $font-size-base;
  color: $color-text-primary;

  &::placeholder {
    color: $color-text-secondary;
  }
}

.nav-right {
  flex-shrink: 0;
}

.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: $avatar-size-md;
  height: $avatar-size-md;
  border-radius: $radius-full;
  background: $color-primary;
  color: $color-bg-secondary;
  @include flex-center;
  font-weight: $font-weight-semibold;
  font-size: $font-size-lg;
  transition: all $transition-slow;

  &:hover {
    transform: scale(1.05);
    @include soft-shadow(md);
  }
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: $color-bg-secondary;
  border-radius: $radius-lg;
  @include soft-shadow(lg);
  min-width: 160px;
  overflow: hidden;
}

.menu-item {
  padding: $spacing-3 $spacing-4;
  cursor: pointer;
  transition: background $transition-base;
  font-size: $font-size-base;
  color: $color-text-primary;

  &:hover {
    background: $color-bg-hover;
  }
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
