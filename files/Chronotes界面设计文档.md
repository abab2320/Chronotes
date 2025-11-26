# 🎨 Chronotes 设计系统

> 基于莫兰迪色系的现代化设计系统，为 Chronotes 应用提供统一、优雅的视觉体验。

## 📚 文档目录

- **[DESIGN_SYSTEM.md](./Chronotes界面设计详细规范.md)** - 完整的设计系统规范
- **[COMPONENT_SPECS.md](./通用组件规范文档.md)** - 组件详细规范
- **[COMPONENT_EXAMPLES.md](./通用组件使用方法.md)** - 组件使用示例

## ✨ 设计理念

### 核心特点

- **🌿 莫兰迪色系**：温柔、专业、舒适的配色方案
- **🎯 柔和优先**：低对比度、大圆角、软阴影
- **📐 留白充足**：宽松的间距系统，营造呼吸感
- **🎨 卡片化设计**：清晰的视觉层次和模块化布局
- **♿ 无障碍友好**：支持键盘导航和屏幕阅读器

### 视觉风格

```
配色：莫兰迪绿 (#9CAF88) + 米黄 (#F5F1E8)
圆角：12px - 16px（柔和友好）
阴影：rgba(0, 0, 0, 0.08)（轻柔透明）
字体：Poppins（现代无衬线）
布局：三栏式（左侧栏 + 主内容 + 右侧面板）
```

## 🎨 颜色系统

### 主色调

| 颜色名称 | Hex 值 | 用途 |
|---------|--------|------|
| 主色 | `#9CAF88` | 按钮、激活状态、强调元素 |
| 副色 | `#A8C5D1` | 标签、辅助元素 |
| 米黄 | `#F5F1E8` | 背景、次要按钮 |
| 纯白 | `#FFFFFF` | 卡片、输入框 |

### 文本颜色

| 颜色名称 | Hex 值 | 用途 |
|---------|--------|------|
| 主要文本 | `#4A4A4A` | 标题、正文 |
| 次要文本 | `#7A7A7A` | 描述、辅助信息 |
| 三级文本 | `#A0A0A0` | 占位符、提示 |

## 📏 设计令牌

### CSS 变量

```css
/* 颜色 */
--color-primary: #9CAF88;
--color-secondary: #A8C5D1;
--color-bg-primary: #F5F1E8;

/* 间距 */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */

/* 圆角 */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */

/* 阴影 */
--shadow-base: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 20px rgba(0, 0, 0, 0.12);
```

### TypeScript 令牌

```typescript
import { colors, spacing, radius } from '@/styles/design-tokens'

const buttonStyle = {
  background: colors.primary.DEFAULT,
  padding: `${spacing[4]} ${spacing[6]}`,
  borderRadius: radius.lg,
}
```

## 🧩 组件库

### 基础组件

| 组件 | 描述 | 文件 |
|------|------|------|
| ChButton | 按钮组件（5种类型、3种尺寸） | `components/ChButton.vue` |
| ChCard | 卡片容器（支持头部/底部插槽） | `components/ChCard.vue` |
| ChInput | 输入框（支持图标、清空） | `components/ChInput.vue` |
| ChTag | 标签（6种颜色、可关闭） | `components/ChTag.vue` |
| ChModal | 模态框（支持自定义宽度） | `components/ChModal.vue` |

### 组件特性

- ✅ TypeScript 类型支持
- ✅ 响应式设计
- ✅ 可访问性优化
- ✅ 柔和动画过渡
- ✅ 自定义主题

## 🚀 快速开始

### 1. 安装依赖

```bash
cd frontend
pnpm install
```

### 2. 引入设计令牌

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import './styles/design-tokens.css'

createApp(App).mount('#app')
```

### 3. 使用组件

```vue
<script setup lang="ts">
import ChButton from '@/components/ChButton.vue'
import ChCard from '@/components/ChCard.vue'
</script>

<template>
  <ChCard>
    <template #header>
      <h3>欢迎使用 Chronotes</h3>
    </template>
    <p>这是一个基于莫兰迪色系的设计系统。</p>
    <template #footer>
      <ChButton type="primary">开始使用</ChButton>
    </template>
  </ChCard>
</template>
```

## 📦 文件结构

```
frontend/
├── DESIGN_SYSTEM.md          # 设计系统完整规范
├── COMPONENT_SPECS.md         # 组件详细规范
├── COMPONENT_EXAMPLES.md      # 使用示例
├── src/
│   ├── styles/
│   │   ├── design-tokens.css  # CSS 变量
│   │   ├── design-tokens.ts   # TypeScript 令牌
│   │   └── _variables.scss    # SCSS 变量
│   └── components/
│       ├── ChButton.vue       # 按钮组件
│       ├── ChCard.vue         # 卡片组件
│       ├── ChInput.vue        # 输入框组件
│       ├── ChTag.vue          # 标签组件
│       └── ChModal.vue        # 模态框组件
```

## 🎯 使用示例

### 按钮

```vue
<ChButton type="primary">主要按钮</ChButton>
<ChButton type="secondary">次要按钮</ChButton>
<ChButton size="sm" icon="✓">小按钮</ChButton>
<ChButton :loading="true">加载中...</ChButton>
```

### 卡片

```vue
<ChCard hoverable>
  <template #header>
    <h3>笔记标题</h3>
    <ChTag>新</ChTag>
  </template>
  <p>笔记内容...</p>
  <template #footer>
    <span>📅 2025-11-26</span>
    <ChButton size="sm">查看</ChButton>
  </template>
</ChCard>
```

### 输入框

```vue
<ChInput 
  v-model="value"
  icon="🔍"
  placeholder="搜索..."
  clearable
/>
```

### 标签

```vue
<ChTag color="primary">Vue</ChTag>
<ChTag color="secondary">TypeScript</ChTag>
<ChTag closable @close="handleClose">可关闭</ChTag>
```

### 模态框

```vue
<ChModal v-model="visible" title="提示">
  <p>模态框内容</p>
  <template #footer>
    <ChButton type="secondary" @click="visible = false">取消</ChButton>
    <ChButton type="primary">确定</ChButton>
  </template>
</ChModal>
```

## 🎨 主题定制

### 方式一：修改 CSS 变量

```css
:root {
  --color-primary: #88A070;  /* 自定义主色 */
  --radius-lg: 8px;          /* 自定义圆角 */
}
```

### 方式二：深色模式

```css
[data-theme="dark"] {
  --color-bg-primary: #1A1A1A;
  --color-bg-secondary: #2A2A2A;
  --color-text-primary: #E8E8E8;
}
```

## 📱 响应式断点

| 断点 | 尺寸 | 设备 |
|------|------|------|
| sm | 640px | 手机横屏 |
| md | 768px | 平板竖屏 |
| lg | 1024px | 平板横屏 |
| xl | 1280px | 小屏笔记本 |
| 2xl | 1536px | 大屏显示器 |

## 🔧 开发建议

### 命名规范

- 组件前缀：`Ch`（Chronotes）
- 文件命名：`ChButton.vue`
- CSS 类名：BEM 风格 `.ch-button--primary`

### 代码风格

```vue
<!-- 推荐：使用 TypeScript -->
<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('')
</script>

<!-- 推荐：使用设计令牌 -->
<style scoped>
.custom-class {
  color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}
</style>
```

## 🌟 设计原则

1. **柔和优先** - 使用柔和的颜色、圆角和阴影
2. **留白充足** - 保持宽松的间距，避免拥挤
3. **层次清晰** - 通过阴影和背景色区分层级
4. **交互友好** - 提供清晰的悬停和点击反馈
5. **响应灵敏** - 适配各种屏幕尺寸
6. **无障碍性** - 支持键盘导航和辅助技术

## 📖 参考资源

- [Poppins 字体](https://fonts.google.com/specimen/Poppins)
- [莫兰迪色系配色](https://www.happyhues.co/)
- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

## 📝 更新日志

### v1.0 (2025-11-26)

- ✨ 初始版本发布
- 🎨 完整的设计系统规范
- 🧩 5个基础组件
- 📚 详细的文档和示例
- 🎯 三种样式令牌格式（CSS、SCSS、TypeScript）

## 🤝 贡献指南

1. 遵循现有的设计规范
2. 保持组件的一致性
3. 添加 TypeScript 类型
4. 编写清晰的文档
5. 提供使用示例

## 📄 许可证

MIT License

---

**文档版本**：v1.0  
**最后更新**：2025-11-26  
**项目**：Chronotes Frontend  
**作者**：GitHub Copilot
