<script setup lang="ts">
import { computed } from 'vue'

interface CardProps {
  /** 是否显示阴影 */
  shadow?: boolean
  /** 是否可悬停 */
  hoverable?: boolean
  /** 内边距尺寸 */
  padding?: 'sm' | 'md' | 'lg'
  /** 圆角尺寸 */
  radius?: 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<CardProps>(), {
  shadow: true,
  hoverable: true,
  padding: 'md',
  radius: 'xl',
})

const cardClass = computed(() => {
  return [
    'ch-card',
    `ch-card--padding-${props.padding}`,
    `ch-card--radius-${props.radius}`,
    {
      'ch-card--shadow': props.shadow,
      'ch-card--hoverable': props.hoverable,
    }
  ]
})
</script>

<template>
  <div :class="cardClass">
    <div v-if="$slots.header" class="ch-card__header">
      <slot name="header" />
    </div>
    <div class="ch-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="ch-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.ch-card {
  background: var(--color-bg-secondary, #FFFFFF);
  transition: all 0.3s ease;
  cursor: default;
}

/* 圆角变体 */
.ch-card--radius-md {
  border-radius: var(--radius-md, 10px);
}

.ch-card--radius-lg {
  border-radius: var(--radius-lg, 12px);
}

.ch-card--radius-xl {
  border-radius: var(--radius-xl, 16px);
}

/* 内边距变体 */
.ch-card--padding-sm {
  padding: var(--spacing-4, 1rem);
}

.ch-card--padding-md {
  padding: var(--spacing-5, 1.25rem);
}

.ch-card--padding-lg {
  padding: var(--spacing-6, 1.5rem);
}

/* 阴影 */
.ch-card--shadow {
  box-shadow: var(--shadow-base, 0 2px 8px rgba(0, 0, 0, 0.08));
}

/* 悬停效果 */
.ch-card--hoverable {
  cursor: pointer;
}

.ch-card--hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg, 0 8px 20px rgba(0, 0, 0, 0.12));
}

/* 卡片结构 */
.ch-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-3, 0.75rem);
}

.ch-card__body {
  flex: 1;
}

.ch-card__footer {
  margin-top: var(--spacing-3, 0.75rem);
  padding-top: var(--spacing-3, 0.75rem);
  border-top: 1px solid var(--color-border, #E8E8E8);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 无边距模式（用于嵌套） */
.ch-card--no-padding {
  padding: 0;
}

.ch-card--no-padding .ch-card__header,
.ch-card--no-padding .ch-card__body,
.ch-card--no-padding .ch-card__footer {
  padding: var(--spacing-5, 1.25rem);
}

.ch-card--no-padding .ch-card__header,
.ch-card--no-padding .ch-card__footer {
  padding-top: var(--spacing-4, 1rem);
  padding-bottom: var(--spacing-4, 1rem);
}
</style>
