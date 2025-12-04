<script setup lang="ts">
import { ref } from 'vue'
import TopNavbar from '../components/TopNavbar.vue'
import LeftSiderbar from '../components/LeftSiderbar.vue'
import RightSiderbar from '../components/RightSiderbar.vue'

// 当前激活的模块
const activeModule = ref('notes')

// 切换模块（接收来自 LeftSidebar 的事件）
const handleModuleSwitch = (moduleId: string) => {
  activeModule.value = moduleId
  console.log('当前激活模块:', moduleId)
}

// 处理搜索
const handleSearch = (query: string) => {
  console.log('搜索:', query)
  // TODO: 实现搜索功能
}

// 处理菜单点击
const handleMenuClick = (action: string) => {
  console.log('菜单操作:', action)
  // TODO: 实现菜单操作
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏组件 -->
    <TopNavbar
      @search="handleSearch"
      @menu-click="handleMenuClick"
    />

    <!-- 主体区域 -->
    <div class="main-layout">
      <!-- 左侧边栏组件 -->
      <LeftSiderbar
        :active-module="activeModule"
        @switch-module="handleModuleSwitch"
      />

      <!-- 主内容区占位 -->
      <main class="main-content">
        <div class="content-placeholder">
          <p>当前模块: {{ activeModule }}</p>
          <p>内容区域待实现</p>
        </div>
      </main>

      <!-- 右侧边栏组件 -->
      <RightSiderbar />
    </div>
  </div>
</template>

<style scoped>
/* 保留仅在 App.vue 模板中实际出现的结构类样式。
   顶部导航、左右侧边栏、卡片等样式已移入各自组件并 scoped，不再在此生效。 */
.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--beige);
  overflow: hidden;
}

.main-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.main-content {
  flex: 1;
  background: var(--beige);
  padding: 32px;
  overflow-y: auto;
}

.content-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
}

.content-placeholder p {
  font-size: 18px;
  color: var(--light-text);
}

/* 滚动条（仅作用于本组件的可滚动区域） */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--light-gray);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--morandi-green);
}
</style>