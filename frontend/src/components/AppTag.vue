<script setup lang="ts">
import { computed } from 'vue'

interface TagProps {
  /** 标签颜色类型 */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  /** 标签尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否可关闭 */
  closable?: boolean
  /** 是否为圆形 */
  round?: boolean
}

const props = withDefaults(defineProps<TagProps>(), {
  color: 'secondary',
  size: 'md',
  closable: false,
  round: true,
})

const emit = defineEmits<{
  close: []
}>()

const tagClass = computed(() => {
  return [
    'ch-tag',
    `ch-tag--${props.color}`,
    `ch-tag--${props.size}`,
    {
      'ch-tag--round': props.round,
      'ch-tag--closable': props.closable,
    }
  ]
})

const handleClose = (event: MouseEvent) => {
  event.stopPropagation()
  emit('close')
}
</script>

<template>
  <span :class="tagClass">
    <span class="ch-tag__content">
      <slot />
    </span>
    <span v-if="closable" class="ch-tag__close" @click="handleClose">✕</span>
  </span>
</template>

<style scoped>
.ch-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1, 0.25rem);
  font-weight: var(--font-weight-medium, 500);
  white-space: nowrap;
  user-select: none;
  transition: all 0.2s ease;
  cursor: default;
}

/* 尺寸变体 */
.ch-tag--sm {
  padding: 2px 8px;
  font-size: var(--font-size-tiny, 0.6875rem);
  border-radius: var(--radius-md, 10px);
}

.ch-tag--md {
  padding: 4px 12px;
  font-size: var(--font-size-xs, 0.75rem);
  border-radius: var(--radius-lg, 12px);
}

.ch-tag--lg {
  padding: 6px 16px;
  font-size: var(--font-size-sm, 0.8125rem);
  border-radius: var(--radius-xl, 16px);
}

/* 圆角 */
.ch-tag--round {
  border-radius: var(--radius-full, 9999px);
}

/* 颜色变体 */
.ch-tag--default {
  background: var(--color-bg-hover, #F5F1E8);
  color: var(--color-text-primary, #4A4A4A);
}

.ch-tag--primary {
  background: var(--color-primary, #9CAF88);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-tag--secondary {
  background: var(--color-secondary, #A8C5D1);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-tag--success {
  background: var(--color-success, #88C070);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-tag--warning {
  background: var(--color-warning, #F0B967);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-tag--error {
  background: var(--color-error, #E87D7D);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-tag--info {
  background: var(--color-info, #A8C5D1);
  color: var(--color-bg-secondary, #FFFFFF);
}

/* 悬停效果 */
.ch-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.06));
}

/* 关闭按钮 */
.ch-tag__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-full, 9999px);
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;
  font-size: 0.75em;
}

.ch-tag__close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

/* 可点击标签 */
.ch-tag--clickable {
  cursor: pointer;
}

.ch-tag--clickable:active {
  transform: translateY(0);
  opacity: 0.9;
}

/* 轮廓样式变体 */
.ch-tag--outline {
  background: transparent;
  border: 1px solid currentColor;
}

.ch-tag--outline.ch-tag--primary {
  color: var(--color-primary, #9CAF88);
  border-color: var(--color-primary, #9CAF88);
}

.ch-tag--outline.ch-tag--secondary {
  color: var(--color-secondary, #A8C5D1);
  border-color: var(--color-secondary, #A8C5D1);
}

.ch-tag--outline.ch-tag--success {
  color: var(--color-success, #88C070);
  border-color: var(--color-success, #88C070);
}

.ch-tag--outline.ch-tag--warning {
  color: var(--color-warning, #F0B967);
  border-color: var(--color-warning, #F0B967);
}

.ch-tag--outline.ch-tag--error {
  color: var(--color-error, #E87D7D);
  border-color: var(--color-error, #E87D7D);
}
</style>
