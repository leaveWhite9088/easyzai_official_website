# EasyZ 官网项目

## 品牌定位

**易智软件 (EasyZ)** — AI 落地集成服务商

Slogan: 你的需求，我们来实现

核心业务：Agent 开发 / Workflow 自动化 / RAG 知识库 / 私有化部署 / 海外获客系统 / 信息化转型

目标客户：制造业 / 外贸跨境 / 金融保险 / 零售电商 / 互联网企业

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS
- **动效**: Framer Motion
- **语言**: TypeScript
- **构建**: 输出静态导出 (`output: 'export'`)

## 目录结构

```
src/
├── app/
│   ├── globals.css      # 全局样式、Tailwind 导入
│   ├── layout.tsx      # 根布局、Metadata（含 favicon）
│   └── page.tsx        # 首页入口
└── components/
    ├── Navbar.tsx      # 固定顶部导航（深色背景，滚动毛玻璃）
    ├── Hero.tsx        # 首屏（5 列网格：文字 2 列 + 图像 3 列）
    ├── WorkflowDiagram.tsx  # 工作流 SVG 组件（Mac 窗口风格）
    ├── TrustBar.tsx    # "我们服务过的行业"（蓝色文字无框）
    ├── Services.tsx    # 服务能力（6 张卡片，浅色背景）
    ├── Cases.tsx       # 落地案例（深色背景）
    ├── WhyUs.tsx       # 为什么选我们 + 团队介绍（浅色背景）
    ├── CTA.tsx         # 行动召唤（深色背景，含二维码悬浮效果）
    └── Footer.tsx      # 页脚（最深底色）

public/assets/          # Logo 图片资源、二维码
assets/                 # 源资源（设计稿参考）
```

## 设计系统

### 色彩

| 变量 | 色值 | 用途 |
|------|------|------|
| `deep-charcoal` | #111318 | 页面主背景 |
| `nav-dark` | #16191F | 次深背景、页脚 |
| `indigo-primary` | #4F6BFF | 主强调色、CTA |
| `indigo-light` | #A0AFFF | 次强调色、标签 |
| `text-inverse` | #F5F5F0 | 深色背景上的文字 |
| `text-muted` | #888888 | 辅助文字 |

### 布局节奏

- Section 交替：深色 → 浅色 → 深色 → 浅色 ...
- 区块间距统一使用 `py-16` 或 `py-20`
- 最大内容宽度：`max-w-7xl` (1280px)

## 页面区块顺序

1. Navbar（固定顶部）
2. Hero（min-h-screen，深色）
3. TrustBar（简洁文字，融入 Hero 背景）
4. Services（浅色背景）
5. Cases（深色背景）
6. WhyUs（浅色背景）
7. CTA（深色背景）
8. Footer（最深底色）

## 关键注意事项

- `layout.tsx` 中已配置 favicon: `/assets/logo-浅色-64px.png`
- Hero 布局：5 列网格（文字 2 列 + 图像 3 列），间隔 `gap-6 lg:gap-8`
- WorkflowDiagram：Mac 窗口风格，字体已放大 20%，修改尺寸调整 Hero 中的容器高度
- CTA 悬浮二维码：`/assets/个人二维码.png`
- TrustBar 目前是简化版（无框、仅蓝色文字），如需改回带框版本参考 git 历史
- 所有 Section 使用 `id` 属性供锚点跳转（services/cases/why-us/contact）
- 备案号、真实联系方式待补充（当前为占位符）

## ⚠️ WorkflowDiagram.tsx 修改警告

**SVG Marker Bug**: 修改此文件后页面可能出现"巨大的蓝色箭头"渲染错误。

**原因**: SVG `<marker>` 元素的 `markerWidth`/`markerHeight` 设置过大（如设为12或更大），结合复杂路径和 glow filter 会导致箭头渲染溢出整个视口。

**症状**:
- 页面加载后显示巨大的蓝色箭头覆盖整个屏幕
- 页面内容不渲染或只显示部分

**修复方案**:
1. 如果使用 `<marker>` 定义箭头：
   - 设置合理的 `markerWidth="6" markerHeight="6"` (建议值)
   - 正确设置 `refX` 和 `refY` 使箭头指向路径端点
2. **推荐方案**：改用直接在 `<path>` 元素尾部绘制三角形箭头（类似 `polygon points="..."`），完全避免使用 marker

**检查清单（修改前必读）**:
- [ ] 如果添加了 `<marker>` 元素，确保 `markerWidth` 和 `markerHeight` 不超过 6
- [ ] 如果添加了 glow filter，确保它不会影响 marker 的渲染
- [ ] 修改后刷新页面检查是否正常渲染
- [ ] 检查浏览器控制台是否有 SVG 相关的错误或警告
