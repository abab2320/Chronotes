<script setup lang="ts">
import { ref, computed } from 'vue'

// 当前激活的模块
const activeModule = ref('notes')
// 控制第二层侧边栏的显示
const showSecondSidebar = ref(true)
// 用户菜单显示状态
const showUserMenu = ref(false)

// 模块配置
const modules = [
  { id: 'tasks', icon: '✓', name: '任务' },
  { id: 'notes', icon: '📝', name: '笔记' },
  { id: 'ai', icon: '🤖', name: 'AI助手' },
  { id: 'settings', icon: '⚙', name: '设置' }
]

// 第二层侧边栏内容
const secondSidebarContent = computed(() => {
  const contents: Record<string, any> = {
    tasks: {
      title: '任务',
      items: [
        { icon: '📅', label: '今日任务', count: 5 },
        { icon: '📆', label: '本周计划', count: 12 },
        { icon: '✅', label: '已完成任务', count: 28 },
      ],
      action: { icon: '+', label: '新建任务' }
    },
    notes: {
      title: '笔记',
      items: [
        { icon: '📚', label: '所有笔记', count: 156 },
        { icon: '🕐', label: '最近编辑', count: 8 },
        { icon: '⭐', label: '收藏笔记', count: 23 },
        { icon: '🏷', label: '标签管理', expandable: true },
      ],
      action: { icon: '+', label: '新建笔记' }
    },
    ai: {
      title: 'AI助手',
      items: [
        { icon: '💡', label: '推荐笔记' },
        { icon: '📊', label: '智能摘要' },
        { icon: '🔥', label: '今日热点' },
        { icon: '🔍', label: '智能搜索' },
        { icon: '📈', label: '分析报告' },
      ]
    },
    settings: {
      title: '设置',
      items: [
        { icon: '👤', label: '个人资料' },
        { icon: '🎨', label: '主题切换' },
        { icon: '⚙️', label: '系统设置' },
      ]
    }
  }
  return contents[activeModule.value] || contents.notes
})

// 示例笔记数据
const notes = [
  {
    id: 1,
    title: 'Vue 3 Composition API 学习笔记',
    tags: ['前端', 'Vue'],
    summary: '深入学习 Vue 3 的 Composition API，包括 ref、reactive、computed 等核心概念...',
    date: '2025-11-23'
  },
  {
    id: 2,
    title: 'TypeScript 高级类型技巧',
    tags: ['TypeScript', '编程'],
    summary: '总结 TypeScript 中的泛型、联合类型、交叉类型等高级特性的使用方法...',
    date: '2025-11-22'
  },
  {
    id: 3,
    title: '数据结构与算法复习',
    tags: ['算法', '学习'],
    summary: '复习常见数据结构：数组、链表、树、图，以及排序和搜索算法...',
    date: '2025-11-21'
  },
  {
    id: 4,
    title: '项目管理心得',
    tags: ['管理', '效率'],
    summary: '记录项目管理过程中的经验教训，包括时间规划、团队协作等方面...',
    date: '2025-11-20'
  }
]

// 右侧面板数据
const todayHighlights = [
  { title: '完成 3 个任务', time: '14:30' },
  { title: '新增 2 条笔记', time: '10:15' },
  { title: 'AI 推荐了 5 篇相关内容', time: '09:00' }
]

const recentTags = ['Vue', 'TypeScript', '算法', '学习', '前端', '管理']

// 切换模块
const switchModule = (moduleId: string) => {
  if (activeModule.value === moduleId) {
    showSecondSidebar.value = !showSecondSidebar.value
  } else {
    activeModule.value = moduleId
    showSecondSidebar.value = true
  }
}

// 切换用户菜单
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-left">
        <h1 class="logo">Chronotes</h1>
      </div>
      <div class="nav-center">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="搜索笔记、任务..." />
        </div>
      </div>
      <div class="nav-right">
        <div class="user-profile" @click="toggleUserMenu">
          <div class="avatar">U</div>
          <transition name="fade">
            <div v-if="showUserMenu" class="user-menu">
              <div class="menu-item">👤 个人主页</div>
              <div class="menu-item">⚙️ 设置</div>
              <div class="menu-item">🚪 退出</div>
            </div>
          </transition>
        </div>
      </div>
    </header>

    <!-- 主体区域 -->
    <div class="main-layout">
      <!-- 第一层侧边栏 (图标栏) -->
      <aside class="first-sidebar">
        <div class="module-icons">
          <div
            v-for="module in modules"
            :key="module.id"
            class="module-icon"
            :class="{ active: activeModule === module.id }"
            @click="switchModule(module.id)"
            :title="module.name"
          >
            <span class="icon">{{ module.icon }}</span>
            <div class="tooltip">{{ module.name }}</div>
          </div>
        </div>
      </aside>

      <!-- 第二层侧边栏 (功能列表) -->
      <transition name="slide">
        <aside v-if="showSecondSidebar" class="second-sidebar">
          <div class="sidebar-header">
            <h3>{{ secondSidebarContent.title }}</h3>
          </div>
          <div class="sidebar-content">
            <div
              v-for="(item, index) in secondSidebarContent.items"
              :key="index"
              class="sidebar-item"
            >
              <span class="item-icon">{{ item.icon }}</span>
              <span class="item-label">{{ item.label }}</span>
              <span v-if="item.count" class="item-count">{{ item.count }}</span>
              <span v-if="item.expandable" class="expand-icon">›</span>
            </div>
          </div>
          <div v-if="secondSidebarContent.action" class="sidebar-footer">
            <button class="new-button">
              <span class="btn-icon">{{ secondSidebarContent.action.icon }}</span>
              <span>{{ secondSidebarContent.action.label }}</span>
            </button>
          </div>
        </aside>
      </transition>

      <!-- 主内容区 -->
      <main class="main-content">
        <div class="content-header">
          <h2>我的笔记</h2>
          <div class="view-controls">
            <button class="view-btn active">📱 卡片</button>
            <button class="view-btn">📋 列表</button>
          </div>
        </div>
        <div class="notes-grid">
          <div
            v-for="note in notes"
            :key="note.id"
            class="note-card"
          >
            <div class="card-header">
              <h3>{{ note.title }}</h3>
              <div class="card-actions">
                <button class="action-btn">✏️</button>
                <button class="action-btn">🗑️</button>
              </div>
            </div>
            <div class="card-tags">
              <span v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <p class="card-summary">{{ note.summary }}</p>
            <div class="card-footer">
              <span class="date">📅 {{ note.date }}</span>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧辅助面板 -->
      <aside class="right-panel">
        <div class="panel-section">
          <h4>📌 今日热点</h4>
          <div class="highlights-list">
            <div
              v-for="(item, index) in todayHighlights"
              :key="index"
              class="highlight-item"
            >
              <span class="highlight-title">{{ item.title }}</span>
              <span class="highlight-time">{{ item.time }}</span>
            </div>
          </div>
        </div>

        <div class="panel-section">
          <h4>📅 日程概览</h4>
          <div class="schedule-item">
            <div class="schedule-dot"></div>
            <div>
              <div class="schedule-title">团队会议</div>
              <div class="schedule-time">15:00 - 16:00</div>
            </div>
          </div>
          <div class="schedule-item">
            <div class="schedule-dot"></div>
            <div>
              <div class="schedule-title">代码评审</div>
              <div class="schedule-time">16:30 - 17:30</div>
            </div>
          </div>
        </div>

        <div class="panel-section">
          <h4>🏷️ 最近标签</h4>
          <div class="tags-cloud">
            <span
              v-for="tag in recentTags"
              :key="tag"
              class="cloud-tag"
            >{{ tag }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* 全局变量 - 莫兰迪色系 */
:root {
  --morandi-green: #9CAF88;
  --beige: #F5F1E8;
  --light-gray: #E8E8E8;
  --soft-blue: #A8C5D1;
  --dark-text: #4A4A4A;
  --light-text: #7A7A7A;
  --white: #FFFFFF;
  --shadow: rgba(0, 0, 0, 0.08);
  --hover-shadow: rgba(0, 0, 0, 0.12);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--beige);
  overflow: hidden;
}

/* 顶部导航栏 */
.top-nav {
  height: 64px;
  background: var(--beige);
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 24px;
  box-shadow: 0 2px 8px var(--shadow);
  z-index: 100;
}

.nav-left {
  flex-shrink: 0;
}

.logo {
  font-size: 24px;
  font-weight: 600;
  color: var(--morandi-green);
  letter-spacing: -0.5px;
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
  height: 40px;
  background: var(--white);
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  box-shadow: 0 2px 6px var(--shadow);
  transition: all 0.3s ease;
}

.search-box:focus-within {
  box-shadow: 0 4px 12px var(--hover-shadow);
  transform: translateY(-1px);
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
  font-size: 14px;
  color: var(--dark-text);
}

.search-box input::placeholder {
  color: var(--light-text);
}

.nav-right {
  flex-shrink: 0;
}

.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--morandi-green);
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px var(--hover-shadow);
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 4px 16px var(--shadow);
  min-width: 160px;
  overflow: hidden;
}

.menu-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: var(--dark-text);
}

.menu-item:hover {
  background: var(--beige);
}

/* 主体布局 */
.main-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 第一层侧边栏 */
.first-sidebar {
  width: 72px;
  background: var(--white);
  border-right: 1px solid var(--light-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: 2px 0 8px var(--shadow);
  z-index: 50;
}

.module-icons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.module-icon {
  position: relative;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 24px;
}

.module-icon:hover {
  background: var(--beige);
  transform: scale(1.05);
}

.module-icon.active {
  background: var(--morandi-green);
}

.module-icon.active .icon {
  filter: brightness(1.2);
}

.tooltip {
  position: absolute;
  left: 70px;
  background: var(--dark-text);
  color: var(--white);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.module-icon:hover .tooltip {
  opacity: 1;
}

/* 第二层侧边栏 */
.second-sidebar {
  width: 260px;
  background: var(--white);
  border-right: 1px solid var(--light-gray);
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px var(--shadow);
  z-index: 40;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid var(--light-gray);
}

.sidebar-header h3 {
  font-size: 18px;
  color: var(--dark-text);
  font-weight: 600;
}

.sidebar-content {
  flex: 1;
  padding: 12px 0;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.sidebar-item:hover {
  background: var(--beige);
}

.sidebar-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--morandi-green);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.sidebar-item:hover::before {
  opacity: 1;
}

.item-icon {
  font-size: 18px;
}

.item-label {
  flex: 1;
  font-size: 14px;
  color: var(--dark-text);
}

.item-count {
  font-size: 12px;
  color: var(--light-text);
  background: var(--light-gray);
  padding: 2px 8px;
  border-radius: 10px;
}

.expand-icon {
  font-size: 18px;
  color: var(--light-text);
  transition: transform 0.2s ease;
}

.sidebar-item:hover .expand-icon {
  transform: translateX(2px);
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--light-gray);
}

.new-button {
  width: 100%;
  height: 40px;
  background: var(--beige);
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-text);
  transition: all 0.3s ease;
}

.new-button:hover {
  background: var(--morandi-green);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
}

.btn-icon {
  font-size: 18px;
}

/* 主内容区 */
.main-content {
  flex: 1;
  background: var(--beige);
  padding: 32px;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.content-header h2 {
  font-size: 28px;
  color: var(--dark-text);
  font-weight: 600;
}

.view-controls {
  display: flex;
  gap: 8px;
}

.view-btn {
  padding: 8px 16px;
  background: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--dark-text);
  transition: all 0.2s ease;
}

.view-btn:hover {
  background: var(--beige);
}

.view-btn.active {
  background: var(--morandi-green);
  color: var(--white);
  border-color: var(--morandi-green);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.note-card {
  background: var(--white);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px var(--shadow);
  transition: all 0.3s ease;
  cursor: pointer;
}

.note-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px var(--hover-shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.card-header h3 {
  flex: 1;
  font-size: 16px;
  color: var(--dark-text);
  font-weight: 600;
  line-height: 1.4;
}

.card-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.note-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: var(--beige);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--morandi-green);
  transform: scale(1.1);
}

.card-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: var(--soft-blue);
  color: var(--white);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.card-summary {
  font-size: 14px;
  color: var(--light-text);
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date {
  font-size: 12px;
  color: var(--light-text);
}

/* 右侧辅助面板 */
.right-panel {
  width: 280px;
  background: #FAF8F3;
  padding: 24px 20px;
  overflow-y: auto;
  border-left: 1px solid var(--light-gray);
}

.panel-section {
  margin-bottom: 28px;
}

.panel-section h4 {
  font-size: 14px;
  color: var(--dark-text);
  font-weight: 600;
  margin-bottom: 16px;
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.highlight-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 2px 4px var(--shadow);
}

.highlight-title {
  font-size: 13px;
  color: var(--dark-text);
  flex: 1;
}

.highlight-time {
  font-size: 12px;
  color: var(--light-text);
}

.schedule-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0 2px 4px var(--shadow);
}

.schedule-dot {
  width: 8px;
  height: 8px;
  background: var(--morandi-green);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.schedule-title {
  font-size: 13px;
  color: var(--dark-text);
  font-weight: 500;
  margin-bottom: 4px;
}

.schedule-time {
  font-size: 12px;
  color: var(--light-text);
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cloud-tag {
  padding: 6px 12px;
  background: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 12px;
  font-size: 12px;
  color: var(--dark-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cloud-tag:hover {
  background: var(--morandi-green);
  color: var(--white);
  border-color: var(--morandi-green);
  transform: translateY(-2px);
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 滚动条样式 */
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
