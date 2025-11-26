# Chronotes 设计系统规范

## 📋 目录
1. [界面风格分析](#1-界面风格分析)
2. [完整设计系统](#2-完整设计系统)
3. [代码形式的样式规范](#3-代码形式的样式规范)
4. [组件规范](#4-组件规范)

---

## 1. 界面风格分析

### 🎨 配色风格
**风格定位：莫兰迪色系 + 现代简约**

- **主色调**：莫兰迪绿 `#9CAF88` - 温柔、专业、平静
- **副色调**：柔和蓝 `#A8C5D1` - 轻松、清新
- **强调色**：米黄色 `#F5F1E8` - 温暖、舒适
- **背景色系**：以米黄和白色为主，营造舒适的阅读环境

### 🌓 明暗风格
- **当前模式**：浅色模式（Light Mode）
- **特点**：低对比度、柔和过渡、护眼舒适
- **建议**：可扩展深色模式，使用相同色相但降低亮度

### 📏 视觉密度
- **整体密度**：适中偏宽松
- **内边距**：12px - 32px 区间
- **卡片间距**：20px（网格布局）
- **留白充足**：营造呼吸感

### 🔲 圆角风格
- **主要圆角**：`12px - 16px`（中等圆角）
- **小元素圆角**：`8px - 10px`
- **大卡片圆角**：`16px - 20px`
- **完全圆角**：`50%`（头像、小徽章）
- **风格**：现代友好，避免锐利感

### 🌫️ 阴影风格
- **类型**：软阴影（Soft Shadow）
- **主要阴影**：`0 2px 8px rgba(0, 0, 0, 0.08)`
- **悬停阴影**：`0 8px 20px rgba(0, 0, 0, 0.12)`
- **特点**：透明度低、扩散范围广、层次感强

### ✍️ 字体与字号趋势
- **字体家族**：Poppins（现代无衬线字体）
- **标题字号**：24px - 28px（大标题倾向）
- **正文字号**：14px（主要）
- **小字号**：12px - 13px
- **字重**：400（常规）、500（中等）、600（标题）
- **行高**：1.4 - 1.6（舒适阅读）

### 📐 布局倾向
- **结构**：左侧栏 + 主内容 + 右侧辅助面板（三栏布局）
- **卡片化**：强烈的卡片设计倾向
- **栅格系统**：响应式网格布局（`grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`）
- **留白**：充足的内外边距
- **层次**：明确的视觉层级（导航栏 > 侧边栏 > 主内容）

---

## 2. 完整设计系统

### 🎨 颜色体系（Color Palette）

#### 主色系（Primary Colors）
```
主色（Primary）
├─ 主色-深   #7D9570  (Hover/Active)
├─ 主色-标准 #9CAF88  (默认)
├─ 主色-浅   #B8C9A8  (Disabled)
└─ 主色-极浅 #D4E1C8  (Background)
```

#### 副色系（Secondary Colors）
```
副色（Secondary）- 柔和蓝
├─ 副色-深   #8EB0BF
├─ 副色-标准 #A8C5D1
├─ 副色-浅   #C2D9E3
└─ 副色-极浅 #DDE9F0
```

#### 中性色系（Neutral Colors）
```
中性色（Neutrals）
├─ 深色文本   #4A4A4A  (标题、主要文本)
├─ 中色文本   #7A7A7A  (次要文本)
├─ 浅色文本   #A0A0A0  (辅助文本)
├─ 分割线     #E8E8E8  (边框)
├─ 浅背景     #F5F1E8  (米黄色背景)
├─ 卡片背景   #FFFFFF  (纯白)
└─ 悬浮背景   #FAF8F3  (右侧面板)
```

#### 功能色系（Functional Colors）
```
成功（Success）  #88C070
警告（Warning）  #F0B967
错误（Error）    #E87D7D
信息（Info）     #A8C5D1
```

#### 阴影色系（Shadow Colors）
```
浅阴影   rgba(0, 0, 0, 0.04)
标准阴影 rgba(0, 0, 0, 0.08)
悬浮阴影 rgba(0, 0, 0, 0.12)
深阴影   rgba(0, 0, 0, 0.16)
```

### ✍️ 字体体系（Typography）

#### 字体家族（Font Families）
```
主字体：'Poppins', sans-serif
备用字体：system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'
等宽字体：'Fira Code', 'Consolas', monospace
```

#### 字号标尺（Font Scale）
```
超大标题  32px / 2rem      (h1)
大标题    28px / 1.75rem   (h2)
中标题    24px / 1.5rem    (h3)
小标题    18px / 1.125rem  (h4)
正文大    16px / 1rem      (body-lg)
正文      14px / 0.875rem  (body)
正文小    13px / 0.8125rem (body-sm)
辅助文本  12px / 0.75rem   (caption)
极小文本  11px / 0.6875rem (tiny)
```

#### 字重标尺（Font Weight）
```
常规  400  (Regular)
中等  500  (Medium)
半粗  600  (Semi Bold)
加粗  700  (Bold)
```

#### 行高标尺（Line Height）
```
紧凑  1.2   (标题)
标准  1.4   (卡片标题)
舒适  1.5   (正文)
宽松  1.6   (描述文本)
```

### 📏 间距体系（Spacing Scale）

```
间距-0    0px
间距-1    4px    (0.25rem)
间距-2    8px    (0.5rem)
间距-3    12px   (0.75rem)
间距-4    16px   (1rem)
间距-5    20px   (1.25rem)
间距-6    24px   (1.5rem)
间距-7    28px   (1.75rem)
间距-8    32px   (2rem)
间距-10   40px   (2.5rem)
间距-12   48px   (3rem)
间距-16   64px   (4rem)
```

**应用场景**：
- `4px` - 紧密元素间距（图标与文本）
- `8px` - 标签间距、按钮内边距
- `12px` - 卡片内元素间距
- `16px` - 按钮内边距、表单间距
- `20px` - 卡片外边距、侧边栏内边距
- `24px` - 区块间距、导航栏内边距
- `32px` - 大区块间距、主内容区内边距

### 🔲 圆角体系（Border Radius Scale）

```
圆角-none   0px       (直角)
圆角-sm     4px       (轻微圆角)
圆角-base   8px       (小按钮)
圆角-md     10px      (标签、小卡片)
圆角-lg     12px      (按钮、输入框)
圆角-xl     16px      (大卡片、模块图标)
圆角-2xl    20px      (搜索框、特殊卡片)
圆角-full   9999px    (药丸形状、头像)
```

### 🌫️ 阴影体系（Shadow Scale）

```
阴影-none    none
阴影-xs      0 1px 2px rgba(0, 0, 0, 0.04)
阴影-sm      0 2px 4px rgba(0, 0, 0, 0.06)
阴影-base    0 2px 8px rgba(0, 0, 0, 0.08)
阴影-md      0 4px 12px rgba(0, 0, 0, 0.10)
阴影-lg      0 8px 20px rgba(0, 0, 0, 0.12)
阴影-xl      0 12px 28px rgba(0, 0, 0, 0.15)
阴影-inner   inset 0 2px 4px rgba(0, 0, 0, 0.06)
```

**应用场景**：
- `阴影-base` - 卡片默认状态
- `阴影-lg` - 卡片悬停状态
- `阴影-md` - 导航栏、浮层
- `阴影-xl` - 模态框、抽屉

### 📐 组件尺寸体系（Size Tokens）

#### 按钮尺寸
```
小按钮  height: 32px, padding: 0 12px, font-size: 12px
中按钮  height: 40px, padding: 0 16px, font-size: 14px
大按钮  height: 48px, padding: 0 24px, font-size: 16px
```

#### 输入框尺寸
```
小输入框  height: 32px, padding: 0 12px
中输入框  height: 40px, padding: 0 16px
大输入框  height: 48px, padding: 0 20px
```

#### 图标尺寸
```
极小图标  14px
小图标    16px
中图标    18px
大图标    24px
超大图标  32px
```

---

## 3. 代码形式的样式规范

### 方案一：CSS 变量（推荐用于 Vue 项目）

详见：`design-tokens.css`

### 方案二：SCSS 变量

详见：`_variables.scss`

### 方案三：TypeScript 设计令牌

详见：`design-tokens.ts`

---

## 4. 组件规范

### 4.1 Button（按钮）

#### 风格总结
- 柔和圆角（12px）
- 悬停时轻微上浮（-2px）+ 阴影增强
- 主色按钮使用莫兰迪绿
- 次要按钮使用米黄色背景

#### 尺寸规范
```
小按钮  32px × auto
中按钮  40px × auto（默认）
大按钮  48px × auto
```

#### 样式规范
```
圆角：12px
阴影：hover 时 0 4px 12px rgba(0, 0, 0, 0.08)
过渡：all 0.3s ease
字重：500
```

#### 示例代码
详见：`components/ChButton.vue`

---

### 4.2 Card（卡片）

#### 风格总结
- 白色背景 + 柔和阴影
- 悬停时上浮效果（-4px）
- 圆角 16px
- 内边距 20px

#### 尺寸规范
```
最小宽度：320px
内边距：20px
圆角：16px
```

#### 样式规范
```
背景：#FFFFFF
阴影：0 2px 8px rgba(0, 0, 0, 0.08)
悬停阴影：0 8px 20px rgba(0, 0, 0, 0.12)
过渡：all 0.3s ease
```

#### 示例代码
详见：`components/ChCard.vue`

---

### 4.3 Input / 表单控件

#### 风格总结
- 圆角 12px
- 白色背景 + 浅灰边框
- 聚焦时阴影增强
- 占位符颜色：#7A7A7A

#### 尺寸规范
```
小输入框  32px
中输入框  40px（默认）
大输入框  48px
```

#### 样式规范
```
圆角：12px
边框：1px solid #E8E8E8
聚焦边框：1px solid #9CAF88
聚焦阴影：0 0 0 3px rgba(156, 175, 136, 0.1)
内边距：0 16px
```

#### 示例代码
详见：`components/ChInput.vue`

---

### 4.4 Tag（标签）

#### 风格总结
- 小圆角（12px）
- 柔和蓝背景 + 白色文字
- 悬停时轻微上浮

#### 尺寸规范
```
内边距：4px 12px（垂直 × 水平）
字号：12px
圆角：12px
```

#### 样式规范
```
背景：#A8C5D1
颜色：#FFFFFF
字重：500
圆角：12px
```

#### 示例代码
详见：`components/ChTag.vue`

---

### 4.5 Navbar（导航栏）

#### 风格总结
- 固定高度 64px
- 米黄色背景 + 底部边框
- 柔和阴影
- 三栏布局（左中右）

#### 尺寸规范
```
高度：64px
内边距：0 24px
Logo 字号：24px
```

#### 样式规范
```
背景：#F5F1E8
边框：1px solid #E8E8E8
阴影：0 2px 8px rgba(0, 0, 0, 0.08)
z-index：100
```

---

### 4.6 Sidebar（侧边栏）

#### 风格总结
- 白色背景
- 右侧边框分隔
- 悬停时左侧绿色指示条
- 图标 + 文字布局

#### 尺寸规范
```
第一层（图标栏）：72px
第二层（功能栏）：260px
```

#### 样式规范
```
背景：#FFFFFF
边框：1px solid #E8E8E8
阴影：2px 0 8px rgba(0, 0, 0, 0.08)
项目内边距：12px 20px
项目圆角：0
悬停指示条：3px × 100%, 颜色 #9CAF88
```

---

### 4.7 Modal / Drawer（模态框/抽屉）

#### 风格总结
- 白色背景
- 大圆角（16px）
- 深阴影
- 遮罩层：rgba(0, 0, 0, 0.3)

#### 尺寸规范
```
Modal 最大宽度：600px
Drawer 宽度：400px
内边距：24px
```

#### 样式规范
```
背景：#FFFFFF
圆角：16px
阴影：0 12px 28px rgba(0, 0, 0, 0.15)
遮罩：rgba(0, 0, 0, 0.3)
动画：fade + scale / slide
```

---

### 4.8 Layout（三栏布局）

#### 风格总结
- 响应式三栏布局
- 左侧双层侧边栏（可折叠）
- 主内容区自适应
- 右侧辅助面板（固定宽度）

#### 尺寸规范
```
第一侧边栏：72px
第二侧边栏：260px（可折叠）
主内容区：flex: 1
右侧面板：280px
```

#### 布局代码
```css
.main-layout {
  display: flex;
  height: calc(100vh - 64px);
}

.first-sidebar {
  width: 72px;
  flex-shrink: 0;
}

.second-sidebar {
  width: 260px;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}

.right-panel {
  width: 280px;
  flex-shrink: 0;
}
```

---

### 4.9 主题可调项（Theme Tokens）

#### 可切换主题变量
```css
/* 主题模式：浅色/深色 */
[data-theme="light"] {
  --bg-primary: #F5F1E8;
  --bg-secondary: #FFFFFF;
  --text-primary: #4A4A4A;
  --text-secondary: #7A7A7A;
}

[data-theme="dark"] {
  --bg-primary: #2A2A2A;
  --bg-secondary: #3A3A3A;
  --text-primary: #E8E8E8;
  --text-secondary: #B0B0B0;
}
```

#### 主题切换建议
1. 保持主色相（绿色、蓝色）但调整亮度
2. 降低阴影透明度
3. 文本颜色反转
4. 保持圆角和间距一致

---

## 📦 使用建议

### 引入方式

**全局引入 CSS 变量**：
```typescript
// main.ts
import './styles/design-tokens.css'
```

**在组件中使用**：
```vue
<style scoped>
.custom-button {
  background: var(--color-primary);
  padding: var(--spacing-4) var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
}
</style>
```

### Tailwind CSS 集成

如需使用 Tailwind，可创建 `tailwind.config.js`：

```javascript
export default {
  theme: {
    extend: {
      colors: {
        'morandi-green': '#9CAF88',
        'beige': '#F5F1E8',
        'soft-blue': '#A8C5D1',
        // ... 其他颜色
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'hover': '0 8px 20px rgba(0, 0, 0, 0.12)',
      }
    }
  }
}
```

---

## ✨ 设计原则总结

1. **柔和优先**：使用莫兰迪色系，避免高饱和度颜色
2. **留白充足**：保持宽松的间距，营造呼吸感
3. **圆角温和**：12px - 16px 为主，避免锐利
4. **阴影轻柔**：低透明度（0.08 - 0.12），大扩散范围
5. **交互反馈**：悬停上浮 + 阴影增强 + 轻微缩放
6. **层次清晰**：通过阴影、背景色、边框区分层级
7. **响应友好**：使用 rem 单位，支持响应式

---

**文档版本**：v1.0  
**最后更新**：2025-11-26  
**适用项目**：Chronotes Frontend
