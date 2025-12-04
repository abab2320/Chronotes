<script setup lang="ts">
// 定义 Props 接口
interface HighlightItem {
  title: string
  time: string
}

interface ScheduleItem {
  title: string
  time: string
}

interface Props {
  highlights?: HighlightItem[]
  schedules?: ScheduleItem[]
  tags?: string[]
}

// 定义 Props（带默认值）
const props = withDefaults(defineProps<Props>(), {
  highlights: () => [
    { title: '完成 3 个任务', time: '14:30' },
    { title: '新增 2 条笔记', time: '10:15' },
    { title: 'AI 推荐了 5 篇相关内容', time: '09:00' }
  ],
  schedules: () => [
    { title: '团队会议', time: '15:00 - 16:00' },
    { title: '代码评审', time: '16:30 - 17:30' }
  ],
  tags: () => ['Vue', 'TypeScript', '算法', '学习', '前端', '管理']
})
</script>

<template>
  <aside class="right-panel">
    <!-- 今日热点 -->
    <div class="panel-section">
      <h4>📌 今日热点</h4>
      <div class="highlights-list">
        <div
          v-for="(item, index) in props.highlights"
          :key="index"
          class="highlight-item"
        >
          <span class="highlight-title">{{ item.title }}</span>
          <span class="highlight-time">{{ item.time }}</span>
        </div>
      </div>
    </div>

    <!-- 日程概览 -->
    <div class="panel-section">
      <h4>📅 日程概览</h4>
      <div
        v-for="(item, index) in props.schedules"
        :key="index"
        class="schedule-item"
      >
        <div class="schedule-dot"></div>
        <div>
          <div class="schedule-title">{{ item.title }}</div>
          <div class="schedule-time">{{ item.time }}</div>
        </div>
      </div>
    </div>

    <!-- 最近标签 -->
    <div class="panel-section">
      <h4>🏷️ 最近标签</h4>
      <div class="tags-cloud">
        <span
          v-for="tag in props.tags"
          :key="tag"
          class="cloud-tag"
        >{{ tag }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.right-panel {
  width: $panel-right-width;
  background: $color-bg-secondary;
  border-left: 1px solid $color-border;
  padding: $spacing-6 $spacing-5;
  overflow-y: auto;
  box-shadow: -2px 0 8px $shadow-color;
}

.panel-section {
  margin-bottom: $spacing-8;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    font-size: $font-size-lg;
    color: $color-text-primary;
    margin-bottom: $spacing-4;
    font-weight: $font-weight-semibold;
  }
}

/* 今日热点 */
.highlights-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-3;
}

.highlight-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-3 $spacing-4;
  background: $color-bg-hover;
  border-radius: $radius-lg;
  transition: all $transition-base;
  cursor: pointer;

  &:hover {
    background: $color-primary;
    color: $color-bg-secondary;
    transform: translateX(-4px);
    @include soft-shadow(md);
  }
}

.highlight-title {
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
}

.highlight-time {
  font-size: $font-size-xs;
  opacity: 0.7;
}

/* 日程概览 */
.schedule-item {
  display: flex;
  gap: $spacing-3;
  margin-bottom: $spacing-4;
  padding: $spacing-3;
  border-radius: $radius-lg;
  transition: all $transition-base;
  cursor: pointer;

  &:hover {
    background: $color-bg-hover;
  }
}

.schedule-dot {
  width: 12px;
  height: 12px;
  background: $color-primary;
  border-radius: $radius-full;
  margin-top: 4px;
  flex-shrink: 0;
}

.schedule-title {
  font-size: $font-size-base;
  color: $color-text-primary;
  font-weight: $font-weight-medium;
  margin-bottom: 4px;
}

.schedule-time {
  font-size: $font-size-xs;
  color: $color-text-secondary;
}

/* 标签云 */
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cloud-tag {
  padding: 6px 14px;
  background: var(--beige);
  border-radius: 16px;
  font-size: 13px;
  color: var(--dark-text);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.cloud-tag:hover {
  background: var(--morandi-green);
  color: var(--white);
  border-color: var(--morandi-green);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow);
}

/* 滚动条 */
.right-panel::-webkit-scrollbar {
  width: 6px;
}

.right-panel::-webkit-scrollbar-track {
  background: transparent;
}

.right-panel::-webkit-scrollbar-thumb {
  background: $color-border;
  border-radius: 3px;

  &:hover {
    background: $color-primary;
  }
}
</style>
