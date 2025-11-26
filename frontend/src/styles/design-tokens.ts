/**
 * Chronotes 设计令牌（Design Tokens）- TypeScript 版本
 * 基于莫兰迪色系的现代设计系统
 * 版本：v1.0
 * 
 * 使用方式：
 * import { colors, spacing, radius } from '@/styles/design-tokens'
 */

// ========================================
// 颜色系统（Color System）
// ========================================

export const colors = {
  // 主色系 - 莫兰迪绿
  primary: {
    dark: '#7D9570',
    DEFAULT: '#9CAF88',
    light: '#B8C9A8',
    lighter: '#D4E1C8',
  },
  
  // 副色系 - 柔和蓝
  secondary: {
    dark: '#8EB0BF',
    DEFAULT: '#A8C5D1',
    light: '#C2D9E3',
    lighter: '#DDE9F0',
  },
  
  // 中性色系
  text: {
    primary: '#4A4A4A',
    secondary: '#7A7A7A',
    tertiary: '#A0A0A0',
    disabled: '#CCCCCC',
  },
  
  border: {
    DEFAULT: '#E8E8E8',
    light: '#F0F0F0',
  },
  
  background: {
    primary: '#F5F1E8',
    secondary: '#FFFFFF',
    tertiary: '#FAF8F3',
    hover: '#F5F1E8',
  },
  
  // 功能色系
  success: {
    DEFAULT: '#88C070',
    light: '#A8D090',
    bg: '#E8F5E3',
  },
  
  warning: {
    DEFAULT: '#F0B967',
    light: '#F5CA87',
    bg: '#FEF5E7',
  },
  
  error: {
    DEFAULT: '#E87D7D',
    light: '#F0A0A0',
    bg: '#FDEAEA',
  },
  
  info: {
    DEFAULT: '#A8C5D1',
    light: '#C2D9E3',
    bg: '#E8F1F5',
  },
  
  // 阴影颜色
  shadow: {
    light: 'rgba(0, 0, 0, 0.04)',
    DEFAULT: 'rgba(0, 0, 0, 0.08)',
    hover: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.16)',
  },
} as const

// ========================================
// 字体系统（Typography）
// ========================================

export const typography = {
  fontFamily: {
    base: "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Fira Code', 'Consolas', 'Monaco', monospace",
  },
  
  fontSize: {
    tiny: '0.6875rem',    // 11px
    xs: '0.75rem',        // 12px
    sm: '0.8125rem',      // 13px
    base: '0.875rem',     // 14px
    lg: '1rem',           // 16px
    xl: '1.125rem',       // 18px
    '2xl': '1.5rem',      // 24px
    '3xl': '1.75rem',     // 28px
    '4xl': '2rem',        // 32px
  },
  
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    snug: 1.4,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  letterSpacing: {
    tight: '-0.5px',
    normal: '0',
    wide: '0.5px',
  },
} as const

// ========================================
// 间距系统（Spacing Scale）
// ========================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
} as const

// ========================================
// 圆角系统（Border Radius）
// ========================================

export const radius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.625rem',  // 10px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.25rem',  // 20px
  full: '9999px',
} as const

// ========================================
// 阴影系统（Box Shadow）
// ========================================

export const shadow = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.06)',
  base: '0 2px 8px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.10)',
  lg: '0 8px 20px rgba(0, 0, 0, 0.12)',
  xl: '0 12px 28px rgba(0, 0, 0, 0.15)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
} as const

// ========================================
// 组件尺寸（Component Sizes）
// ========================================

export const componentSize = {
  button: {
    sm: { height: '2rem', paddingX: '0.75rem', fontSize: '0.75rem' },
    md: { height: '2.5rem', paddingX: '1rem', fontSize: '0.875rem' },
    lg: { height: '3rem', paddingX: '1.5rem', fontSize: '1rem' },
  },
  
  input: {
    sm: { height: '2rem', paddingX: '0.75rem' },
    md: { height: '2.5rem', paddingX: '1rem' },
    lg: { height: '3rem', paddingX: '1.25rem' },
  },
  
  icon: {
    xs: '0.875rem',   // 14px
    sm: '1rem',       // 16px
    md: '1.125rem',   // 18px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
  },
  
  avatar: {
    sm: '2rem',     // 32px
    md: '2.5rem',   // 40px
    lg: '3rem',     // 48px
    xl: '4rem',     // 64px
  },
} as const

// ========================================
// 布局尺寸（Layout Sizes）
// ========================================

export const layout = {
  navbar: {
    height: '4rem',  // 64px
  },
  sidebar: {
    first: '4.5rem',    // 72px
    second: '16.25rem', // 260px
  },
  panel: {
    right: '17.5rem',   // 280px
  },
} as const

// ========================================
// 过渡动画（Transitions）
// ========================================

export const transition = {
  fast: '0.15s ease',
  base: '0.2s ease',
  slow: '0.3s ease',
  slower: '0.4s ease',
} as const

// ========================================
// Z-Index 层级（Z-Index Scale）
// ========================================

export const zIndex = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  sidebar: 40,
  sidebarFirst: 50,
  navbar: 100,
  modalBackdrop: 900,
  modal: 1000,
  tooltip: 1100,
} as const

// ========================================
// 断点（Breakpoints）
// ========================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ========================================
// 类型定义
// ========================================

export type ColorKey = keyof typeof colors
export type SpacingKey = keyof typeof spacing
export type RadiusKey = keyof typeof radius
export type ShadowKey = keyof typeof shadow
export type BreakpointKey = keyof typeof breakpoints

// ========================================
// 工具函数
// ========================================

/**
 * 获取间距值
 * @param key - 间距键值
 * @returns 间距值
 */
export const getSpacing = (key: SpacingKey): string => {
  return spacing[key]
}

/**
 * 获取主色
 * @param variant - 颜色变体
 * @returns 颜色值
 */
export const getPrimaryColor = (variant: keyof typeof colors.primary = 'DEFAULT'): string => {
  return colors.primary[variant]
}

/**
 * 获取副色
 * @param variant - 颜色变体
 * @returns 颜色值
 */
export const getSecondaryColor = (variant: keyof typeof colors.secondary = 'DEFAULT'): string => {
  return colors.secondary[variant]
}

/**
 * 获取阴影
 * @param level - 阴影级别
 * @returns 阴影值
 */
export const getShadow = (level: ShadowKey = 'base'): string => {
  return shadow[level]
}

/**
 * 获取圆角
 * @param size - 圆角尺寸
 * @returns 圆角值
 */
export const getRadius = (size: RadiusKey = 'lg'): string => {
  return radius[size]
}

// ========================================
// 主题配置（Theme Config）
// ========================================

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadow,
  componentSize,
  layout,
  transition,
  zIndex,
  breakpoints,
} as const

export default theme

// ========================================
// 使用示例
// ========================================

/**
 * 在 Vue 组件中使用：
 * 
 * <script setup lang="ts">
 * import { colors, spacing, radius } from '@/styles/design-tokens'
 * 
 * const buttonStyle = {
 *   background: colors.primary.DEFAULT,
 *   padding: `${spacing[4]} ${spacing[6]}`,
 *   borderRadius: radius.lg,
 * }
 * </script>
 * 
 * <style scoped>
 * .custom-button {
 *   background: v-bind('colors.primary.DEFAULT');
 *   padding: v-bind('spacing[4]') v-bind('spacing[6]');
 *   border-radius: v-bind('radius.lg');
 * }
 * </style>
 */
