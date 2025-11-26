<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'text' | 'danger'
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否为圆形按钮 */
  circle?: boolean
  /** 图标（可选） */
  icon?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  circle: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClass = computed(() => {
  return [
    'ch-button',
    `ch-button--${props.type}`,
    `ch-button--${props.size}`,
    {
      'ch-button--disabled': props.disabled,
      'ch-button--loading': props.loading,
      'ch-button--circle': props.circle,
    }
  ]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button 
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="ch-button__loading">⏳</span>
    <span v-else-if="icon" class="ch-button__icon">{{ icon }}</span>
    <span v-if="$slots.default" class="ch-button__content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.ch-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: var(--radius-lg, 12px);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-medium, 500);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  user-select: none;
  outline: none;
}

/* 尺寸变体 */
.ch-button--sm {
  height: var(--btn-height-sm, 2rem);
  padding: 0 var(--btn-padding-x-sm, 0.75rem);
  font-size: var(--font-size-xs, 0.75rem);
}

.ch-button--md {
  height: var(--btn-height-md, 2.5rem);
  padding: 0 var(--btn-padding-x-md, 1rem);
  font-size: var(--font-size-base, 0.875rem);
}

.ch-button--lg {
  height: var(--btn-height-lg, 3rem);
  padding: 0 var(--btn-padding-x-lg, 1.5rem);
  font-size: var(--font-size-lg, 1rem);
}

/* 类型变体 */
.ch-button--primary {
  background: var(--color-primary, #9CAF88);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-button--primary:hover:not(.ch-button--disabled) {
  background: var(--color-primary-dark, #7D9570);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.ch-button--primary:active:not(.ch-button--disabled) {
  transform: translateY(0);
  opacity: 0.9;
}

.ch-button--secondary {
  background: var(--color-bg-primary, #F5F1E8);
  color: var(--color-text-primary, #4A4A4A);
}

.ch-button--secondary:hover:not(.ch-button--disabled) {
  background: var(--color-primary-lighter, #D4E1C8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.ch-button--text {
  background: transparent;
  color: var(--color-text-primary, #4A4A4A);
}

.ch-button--text:hover:not(.ch-button--disabled) {
  background: var(--color-bg-hover, #F5F1E8);
}

.ch-button--danger {
  background: var(--color-error, #E87D7D);
  color: var(--color-bg-secondary, #FFFFFF);
}

.ch-button--danger:hover:not(.ch-button--disabled) {
  background: #D86666;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 125, 125, 0.3);
}

/* 状态 */
.ch-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ch-button--loading {
  cursor: wait;
  opacity: 0.7;
}

.ch-button--circle {
  border-radius: var(--radius-full, 9999px);
  padding: 0;
  width: var(--btn-height-md, 2.5rem);
  aspect-ratio: 1;
}

.ch-button--circle.ch-button--sm {
  width: var(--btn-height-sm, 2rem);
}

.ch-button--circle.ch-button--lg {
  width: var(--btn-height-lg, 3rem);
}

/* 图标和内容 */
.ch-button__icon,
.ch-button__loading {
  display: inline-flex;
  font-size: 1.125em;
}

.ch-button__loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 聚焦样式（可访问性） */
.ch-button:focus-visible {
  outline: 2px solid var(--color-primary, #9CAF88);
  outline-offset: 2px;
}
</style>
