<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义 Props 接口
interface Module {
  id: string
  icon: string
  name: string
}

interface Props {
  modules?: Module[]
  activeModule?: string
  showSecondSidebar?: boolean
}

// 定义 Props（带默认值）
const props = withDefaults(defineProps<Props>(), {
  modules: () => [
    { id: 'tasks', icon: '✓', name: '任务' },
    { id: 'notes', icon: '📝', name: '笔记' },
    { id: 'ai', icon: '🤖', name: 'AI助手' },
    { id: 'settings', icon: '⚙', name: '设置' }
  ],
  activeModule: 'notes',
  showSecondSidebar: true
})

// 定义 Emits
const emit = defineEmits<{
  switchModule: [moduleId: string]
}>()

// 内部状态（用于第二层侧边栏的展开/收缩）
const internalShowSecond = ref(props.showSecondSidebar)

// 计算属性：侧边栏是否展开
const isSecondSidebarExpanded = computed(() => internalShowSecond.value)

// 第二层侧边栏内容（根据当前模块动态生成）
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
  return contents[props.activeModule] || contents.notes
})

// 切换模块（通知父组件）
const switchModule = (moduleId: string) => {
  if (props.activeModule === moduleId) {
    // 点击当前模块，切换第二层显示/隐藏
    internalShowSecond.value = !internalShowSecond.value
  } else {
    // 切换到新模块，展开第二层
    internalShowSecond.value = true
  }
  emit('switchModule', moduleId)
}

// 切换第二层侧边栏
function toggleSecondSidebar() {
  internalShowSecond.value = !internalShowSecond.value
}
</script>

<template>
    <div class="app-sidebar">
      <!-- 第一层侧边栏 (图标栏) -->
      <aside class="first-sidebar">
        <div class="module-icons">
          <div
            v-for="module in props.modules"
            :key="module.id"
            class="module-icon"
            :class="{ active: props.activeModule === module.id }"
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
        <aside v-if="isSecondSidebarExpanded" class="second-sidebar">
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
      
      <!-- 收缩状态的展开按钮 -->
      <transition name="fade">
        <button 
          v-if="!isSecondSidebarExpanded" 
          class="expand-trigger"
          @click="toggleSecondSidebar"
          title="展开侧边栏"
        >
          ›
        </button>
      </transition>
    </div>
</template>

<style scoped lang="scss">
.app-sidebar {
  display: flex;
  position: relative;
}

.first-sidebar {
  width: $sidebar-first-width;
  background: $color-bg-secondary;
  border-right: 1px solid $color-border;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-5 0;
  @include soft-shadow(base);
  z-index: $z-index-sidebar-first;
}
.module-icons {
  display: flex;
  flex-direction: column;
  gap: $spacing-2;
  width: 100%;
}

.module-icon {
  position: relative;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  @include flex-center;
  border-radius: $radius-xl;
  cursor: pointer;
  transition: all $transition-slow;
  font-size: $font-size-2xl;

  &:hover {
    background: $color-bg-hover;
    transform: scale(1.05);
  }

  &.active {
    background: $color-primary;

    .icon {
      filter: brightness(1.2);
    }
  }
}

.tooltip {
  position: absolute;
  left: 70px;
  background: $color-text-primary;
  color: $color-bg-secondary;
  padding: $spacing-1 $spacing-3;
  border-radius: $radius-base;
  font-size: $font-size-xs;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity $transition-base;
  z-index: $z-index-navbar;
}

.module-icon:hover .tooltip {
  opacity: 1;
}

/* 第二层侧边栏 */
.second-sidebar {
  width: $sidebar-second-width;
  background: $color-bg-secondary;
  border-right: 1px solid $color-border;
  display: flex;
  flex-direction: column;
  @include soft-shadow(base);
  z-index: $z-index-sidebar;
}

.sidebar-header {
  padding: $spacing-6 $spacing-5;
  border-bottom: 1px solid $color-border;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: $font-size-xl;
    color: $color-text-primary;
    font-weight: $font-weight-semibold;
  }
}

.collapse-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  color: var(--dark-text);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: var(--beige);
  border-color: var(--morandi-green);
  color: var(--morandi-green);
}

.sidebar-content {
  flex: 1;
  padding: $spacing-3 0;
  overflow-y: auto;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: $spacing-3;
  padding: $spacing-3 $spacing-5;
  cursor: pointer;
  transition: all $transition-base;
  position: relative;

  &:hover {
    background: $color-bg-hover;

    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: $color-primary;
    opacity: 0;
    transition: opacity $transition-base;
  }
}

.item-icon {
  font-size: $font-size-xl;
}

.item-label {
  flex: 1;
  font-size: $font-size-base;
  color: $color-text-primary;
}

.item-count {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  background: $color-border;
  padding: 2px $spacing-2;
  border-radius: $radius-md;
}

.expand-icon {
  font-size: $font-size-xl;
  color: $color-text-secondary;
  transition: transform $transition-base;
}

.sidebar-item:hover .expand-icon {
  transform: translateX(2px);
}

.sidebar-footer {
  padding: $spacing-4 $spacing-5;
  border-top: 1px solid $color-border;
}

.new-button {
  width: 100%;
  height: $btn-height-md;
  background: $color-bg-hover;
  border: none;
  border-radius: $radius-lg;
  @include flex-center;
  gap: $spacing-2;
  cursor: pointer;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  transition: all $transition-slow;

  &:hover {
    background: $color-primary;
    color: $color-bg-secondary;
    transform: translateY(-2px);
    @include soft-shadow(md);
  }
}

.btn-icon {
  font-size: $font-size-xl;
}

/* 收缩状态的展开按钮 */
.expand-trigger {
  position: absolute;
  left: $sidebar-first-width;
  top: $spacing-6;
  width: $btn-height-sm;
  height: $btn-height-sm;
  background: $color-bg-secondary;
  border: 1px solid $color-border;
  border-radius: $radius-base;
  cursor: pointer;
  font-size: $font-size-xl;
  color: $color-text-primary;
  @include flex-center;
  transition: all $transition-base;
  @include soft-shadow(base);
  z-index: $z-index-fixed;

  &:hover {
    background: $color-primary;
    color: $color-bg-secondary;
    border-color: $color-primary;
    transform: translateX(2px);
  }
}

/* 动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all $transition-slow;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-base;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 滚动条 */
.sidebar-content::-webkit-scrollbar {
  width: 6px;
}

.sidebar-content::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-content::-webkit-scrollbar-thumb {
  background: $color-border;
  border-radius: 3px;

  &:hover {
    background: $color-primary;
  }
}
</style>