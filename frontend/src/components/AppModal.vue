<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

interface ModalProps {
  /** 是否显示模态框 */
  modelValue: boolean
  /** 模态框标题 */
  title?: string
  /** 宽度 */
  width?: string
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 点击遮罩层是否关闭 */
  closeOnClickModal?: boolean
  /** 按 ESC 是否关闭 */
  closeOnPressEscape?: boolean
  /** 是否居中显示 */
  center?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  width: '600px',
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  center: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  open: []
  close: []
}>()

const visible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    emit('open')
    document.body.style.overflow = 'hidden'
  } else {
    emit('close')
    document.body.style.overflow = ''
  }
})

const close = () => {
  emit('update:modelValue', false)
}

const handleMaskClick = () => {
  if (props.closeOnClickModal) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnPressEscape && visible.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ch-modal-fade">
      <div v-if="visible" class="ch-modal-mask" @click="handleMaskClick">
        <Transition name="ch-modal-scale">
          <div 
            v-if="visible"
            class="ch-modal-wrapper"
            :class="{ 'ch-modal-wrapper--center': center }"
          >
            <div 
              class="ch-modal"
              :style="{ width }"
              @click.stop
              role="dialog"
              aria-modal="true"
            >
              <!-- 头部 -->
              <div v-if="title || showClose" class="ch-modal__header">
                <slot name="title">
                  <h3 class="ch-modal__title">{{ title }}</h3>
                </slot>
                <button 
                  v-if="showClose"
                  class="ch-modal__close"
                  @click="close"
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>

              <!-- 内容 -->
              <div class="ch-modal__body">
                <slot />
              </div>

              <!-- 底部 -->
              <div v-if="$slots.footer" class="ch-modal__footer">
                <slot name="footer" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ch-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: var(--z-index-modal-backdrop, 900);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6, 1.5rem);
}

.ch-modal-wrapper {
  max-height: 90vh;
  overflow-y: auto;
}

.ch-modal-wrapper--center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ch-modal {
  position: relative;
  background: var(--color-bg-secondary, #FFFFFF);
  border-radius: var(--radius-xl, 16px);
  box-shadow: var(--shadow-xl, 0 12px 28px rgba(0, 0, 0, 0.15));
  max-width: 100%;
  z-index: var(--z-index-modal, 1000);
}

.ch-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6, 1.5rem);
  padding-bottom: var(--spacing-4, 1rem);
  border-bottom: 1px solid var(--color-border, #E8E8E8);
}

.ch-modal__title {
  font-size: var(--font-size-xl, 1.125rem);
  font-weight: var(--font-weight-semibold, 600);
  color: var(--color-text-primary, #4A4A4A);
  margin: 0;
}

.ch-modal__close {
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--color-text-tertiary, #A0A0A0);
  font-size: 1.25rem;
  cursor: pointer;
  border-radius: var(--radius-base, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.ch-modal__close:hover {
  background: var(--color-bg-hover, #F5F1E8);
  color: var(--color-text-primary, #4A4A4A);
}

.ch-modal__body {
  padding: var(--spacing-6, 1.5rem);
  max-height: 60vh;
  overflow-y: auto;
}

.ch-modal__footer {
  padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
  padding-top: var(--spacing-4, 1rem);
  border-top: 1px solid var(--color-border, #E8E8E8);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3, 0.75rem);
}

/* 动画效果 */
.ch-modal-fade-enter-active,
.ch-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.ch-modal-fade-enter-from,
.ch-modal-fade-leave-to {
  opacity: 0;
}

.ch-modal-scale-enter-active,
.ch-modal-scale-leave-active {
  transition: all 0.3s ease;
}

.ch-modal-scale-enter-from,
.ch-modal-scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

/* 滚动条样式 */
.ch-modal__body::-webkit-scrollbar {
  width: 6px;
}

.ch-modal__body::-webkit-scrollbar-track {
  background: transparent;
}

.ch-modal__body::-webkit-scrollbar-thumb {
  background: var(--color-border, #E8E8E8);
  border-radius: 3px;
}

.ch-modal__body::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary, #9CAF88);
}
</style>
