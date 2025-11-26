<script setup lang="ts">
import { computed } from 'vue'

interface InputProps {
  /** 输入框值 */
  modelValue?: string | number
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number' | 'search'
  /** 占位符 */
  placeholder?: string
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只读 */
  readonly?: boolean
  /** 前置图标 */
  icon?: string
  /** 后置图标 */
  suffixIcon?: string
  /** 是否可清空 */
  clearable?: boolean
  /** 最大长度 */
  maxlength?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const inputClass = computed(() => {
  return [
    'ch-input',
    `ch-input--${props.size}`,
    {
      'ch-input--disabled': props.disabled,
      'ch-input--readonly': props.readonly,
      'ch-input--with-icon': props.icon,
      'ch-input--with-suffix': props.suffixIcon || props.clearable,
    }
  ]
})

const showClear = computed(() => {
  return props.clearable && props.modelValue && !props.disabled && !props.readonly
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <div :class="inputClass">
    <span v-if="icon" class="ch-input__icon">{{ icon }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      class="ch-input__inner"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <span v-if="showClear" class="ch-input__clear" @click="handleClear">✕</span>
    <span v-else-if="suffixIcon" class="ch-input__suffix">{{ suffixIcon }}</span>
  </div>
</template>

<style scoped>
.ch-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  background: var(--color-bg-secondary, #FFFFFF);
  border: 1px solid var(--color-border, #E8E8E8);
  border-radius: var(--radius-lg, 12px);
  transition: all 0.2s ease;
  gap: var(--spacing-2, 0.5rem);
}

/* 尺寸变体 */
.ch-input--sm {
  height: var(--input-height-sm, 2rem);
  padding: 0 var(--input-padding-x-sm, 0.75rem);
  font-size: var(--font-size-sm, 0.8125rem);
}

.ch-input--md {
  height: var(--input-height-md, 2.5rem);
  padding: 0 var(--input-padding-x-md, 1rem);
  font-size: var(--font-size-base, 0.875rem);
}

.ch-input--lg {
  height: var(--input-height-lg, 3rem);
  padding: 0 var(--input-padding-x-lg, 1.25rem);
  font-size: var(--font-size-lg, 1rem);
}

/* 内部输入框 */
.ch-input__inner {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text-primary, #4A4A4A);
  font-family: inherit;
  font-size: inherit;
  padding: 0;
}

.ch-input__inner::placeholder {
  color: var(--color-text-secondary, #7A7A7A);
}

/* 图标 */
.ch-input__icon,
.ch-input__suffix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary, #A0A0A0);
  font-size: 1rem;
  flex-shrink: 0;
}

/* 清空按钮 */
.ch-input__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius-full, 9999px);
  background: var(--color-text-tertiary, #A0A0A0);
  color: var(--color-bg-secondary, #FFFFFF);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.ch-input__clear:hover {
  background: var(--color-text-secondary, #7A7A7A);
  transform: scale(1.1);
}

/* 聚焦状态 */
.ch-input:focus-within {
  border-color: var(--color-primary, #9CAF88);
  box-shadow: 0 0 0 3px rgba(156, 175, 136, 0.1);
}

/* 禁用状态 */
.ch-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--color-bg-hover, #F5F1E8);
}

.ch-input--disabled .ch-input__inner {
  cursor: not-allowed;
}

/* 只读状态 */
.ch-input--readonly {
  background: var(--color-bg-tertiary, #FAF8F3);
}

.ch-input--readonly .ch-input__inner {
  cursor: default;
}

/* 错误状态 */
.ch-input--error {
  border-color: var(--color-error, #E87D7D);
}

.ch-input--error:focus-within {
  box-shadow: 0 0 0 3px rgba(232, 125, 125, 0.1);
}

/* 成功状态 */
.ch-input--success {
  border-color: var(--color-success, #88C070);
}

.ch-input--success:focus-within {
  box-shadow: 0 0 0 3px rgba(136, 192, 112, 0.1);
}
</style>
