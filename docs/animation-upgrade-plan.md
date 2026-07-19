# 官网动效升级方案

> **日期**：2026-07-11  
> **文档作用**：本方案参考 [React Bits](https://reactbits.dev/) 的动效组件库，梳理当前 EasyZ 官网各板块现有内容与文字，并给出可落地的动效升级建议。目的是帮助团队在不改变品牌调性的前提下，用轻量、可维护的动画提升首屏冲击力和页面阅读节奏。

---

## 1. 当前官网板块与内容对照表

以下按 `src/app/[locale]/page.tsx` 中的顺序排列，便于把「代码里的板块名」和「页面上实际出现的文字」对应起来。

| 序号 | 板块组件 | 板块 ID | 在页面上的作用 | 当前主要文字内容 |
|------|----------|---------|----------------|------------------|
| 1 | `Navbar` | — | 顶部固定导航 | 首页、服务、案例、在线体验、关于、思考、开始沟通、语言切换、主题切换 |
| 2 | `Hero` | `#hero` | 首屏主视觉 | eyebrow: `EasyZ · 研究型 AI 落地团队`；主标题：`难解的问题，研究着做`；副标题：`复杂场景 AI 落地 · 来自顶尖院校的研究型小团队`；CTA：`看代表案例`、`聊聊你的问题` |
| 3 | `TrustBar` | — | 品牌信任主张 | eyebrow: `我们只做一件事`；正文：`把 AI 落进真实的业务里。非标场景、复杂数据、不确定的技术路线——这才是我们擅长的。` |
| 4 | `Services` | `#services` | 痛点 + 方法论 | 标题：`你来找我们，是因为这类问题`（4 条痛点）；`我们怎么做`（4 步：理解问题 → 方案研究 → 工程交付 → 持续迭代） |
| 5 | `Cases` | `#cases` | 代表案例 | 标题：`代表案例`；副标题：`以下案例均已脱敏，数据来自真实交付`；4 个案例：编程语言生态库迁移工具、证券中台管理系统 AI 化改造、激光加工设备企业智能客服、出海企业海外获客自动化系统 |
| 6 | `LiveDemo` | `#demo` | 交互演示 | 标题：`上手点一点，看它怎么工作`；4 个 Tab：代码迁移、智能授权、智能客服、出海获客 |
| 7 | `WhyUs` | `#why-us` | 团队介绍 + 对比 + 承诺 | Part A `我们是谁`；Part B `大团队通常卡在这 / 我们怎么不卡`（4 组对比）；Part C `我们的承诺`（并行项目 ≤3、年承接 ≤8、能力外不接活） |
| 8 | `CTA` | `#contact` | 联系转化 | 标题：`聊聊你的难题`；副标题：`告诉我们你的问题，我们来看怎么解。`；按钮：`开始沟通`；邮箱：`18781630574@163.com`；微信二维码 |
| 9 | `Partners` | `#partners` | 合作伙伴 | 标题：`特别合作伙伴`；副标题：`与我们一起探索 AI 落地的同行者。`；云汉孵化中心、连尚集团、智猩猩 |
| 10 | `Footer` | — | 页脚 | Logo、公司中英文名称、代表案例链接、联系邮箱、地址、备案信息 |

---

## 2. React Bits 动效组件选型说明

React Bits 是 DavidHDev 维护的开源 React 动效组件库，组件按以下大类组织：

- **Text Animations**：文字入场、字符动画、打字机、模糊聚焦等。
- **Animations**：滚动触发、磁吸、淡入、视差等通用动画包装器。
- **Components**：SpotlightCard、AnimatedList、Dock 等可交互 UI 组件。
- **Backgrounds**：Aurora、Particles、Grid Distortion 等背景动效。

> 参考来源：[React Bits 组件总览](https://reactbits.dev/components)、[React Bits jsrepo manifest](https://reactbits.dev/default/jsrepo-manifest.json)

本项目已使用 `framer-motion`，因此建议优先选择 **无额外依赖** 或 **同样基于 framer-motion** 的 React Bits 组件，降低维护成本。

---

## 3. 各板块动效升级建议

### 3.1 Hero 首屏

**当前状态**
- 已有 `BeamsBackground`（Three.js 光束背景）和 `framer-motion` 的淡入上移动画。
- 文字是整体淡入，缺少逐字/逐词的戏剧感。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `SplitText`（Text Animations） | 主标题逐字符/逐词揭示 | 对 `难解的问题，研究着做` 做字符级 stagger 入场，增强首屏冲击力 |
| `BlurText`（Text Animations） | 副标题模糊到清晰 | 对 `复杂场景 AI 落地 · 来自顶尖院校的研究型小团队` 做 blur-in |
| `Magnet`（Animations） | CTA 按钮磁吸 hover | 两个链接按钮在鼠标靠近时轻微被吸引，提升点击欲望 |

**落地注意**
- `SplitText` 依赖 `@react-spring/web`，需评估是否愿意新增依赖；若不想加包，可用 `framer-motion` 自行实现字符拆分动画。
- 已有的 Three.js 背景已较重，首屏不要再叠加大型背景动效，避免性能问题。

---

### 3.2 TrustBar 信任主张

**当前状态**
- 居中大段文字，带轻微发光背景。
- 只有整体淡入动画。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `TextPressure`（Text Animations） | 可变字重压力效果 | 对核心短语 `把 AI 落进真实的业务里` 做鼠标跟随的字重变化（若项目使用可变字体） |
| `FadeContent`（Animations） | 滚动触发淡入 | 替换现有 `motion.p`，让整段文字按行/按词 stagger 淡入 |
| 下划线高亮扫描 | 强调关键句 | 用 CSS 或 framer-motion 对 `非标场景、复杂数据、不确定的技术路线` 做渐变下划线扫过 |

**落地注意**
- `TextPressure` 需要可变字体支持；当前使用 `Noto Serif SC` 等衬线字体，需确认是否为可变字体。

---

### 3.3 Services 服务板块

**当前状态**
- 痛点列表：4 条带编号的问题。
- 方法论：4 张卡片，每张含图标、编号、标题、描述、详情。
- 已有滚动触发的淡入上移动画。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `AnimatedList`（Components） | 列表项依次滑入 | 4 条痛点用列表动画替代现有手写 `motion.div`，更统一 |
| `SpotlightCard`（Components） | 卡片聚光灯跟随 | 4 张方法论卡片加入鼠标跟随的径向光晕，hover 时高亮 |
| `Magnet`（Animations） | 编号/图标磁吸 | 步骤卡片内的图标在 hover 时轻微跟随鼠标 |

**落地注意**
- `SpotlightCard` 纯 CSS 即可实现（radial-gradient 跟随 mouse），不一定需要引入新依赖。
- 痛点列表文字较长，动画幅度要小，避免阅读被打断。

---

### 3.4 Cases 案例板块

**当前状态**
- 2 个 Featured 大案例 + 2 个小案例卡片。
- 已有 `AnimatedMetric`（数字滚动增长）和滚动淡入。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `SpotlightCard`（Components） | 案例卡片光晕 | Featured 案例行 hover 时显示光晕边界 |
| `FadeContent`（Animations） | 内容分批入场 | 案例标题、描述、指标分三批淡入，形成阅读节奏 |
| `Magnet`（Animations） | CTA 箭头磁吸 | `了解研究过程` / `了解改造过程` 链接的箭头在 hover 时被轻微吸引 |

**落地注意**
- 案例是转化核心，动画应服务于「阅读 → 信任 → 点击」的链路，不要喧宾夺主。
- 已有的 `AnimatedMetric` 效果很好，保留并可在更多数字场景复用。

---

### 3.5 LiveDemo 在线体验

**当前状态**
- Tab 切换已有 `layoutId` 滑动背景动画。
- 面板切换有淡入上移。
- 内部 Demo 组件（代码迁移、智能授权等）已有自定义动画。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `AnimatedList`（Components） | 演示步骤依次出现 | 代码迁移的 4 个阶段（解析 AST → RAG 检索 → 生成目标代码 → 编译自检）用列表动画 |
| `SpotlightCard`（Components） | 消息气泡光晕 | 智能客服/智能授权的对话气泡加入 hover 光晕 |
| 打字机效果 | 模拟 AI 输出 | 对 Demo 中的回答文本加入打字机效果，强化「AI 正在思考」的感知 |

**落地注意**
- Demo 已经是交互重心，新增动画要配合现有 `layoutId` Tab 动画风格。
- 打字机效果若过长会影响用户体验，建议控制在 300–600ms 内。

---

### 3.6 WhyUs 关于我们

**当前状态**
- Part A 团队介绍、Part B 对比表、Part C 承诺列表。
- 已有滚动淡入和 stagger 动画。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `SplitText`（Text Animations） | 团队标题逐字揭示 | `我们是谁` 标题做轻微字符动画 |
| `AnimatedList`（Components） | 对比行依次进入 | 4 组 `问题 → 解决方案` 对比行依次从左右滑入 |
| `Magnet`（Animations） | 承诺项 hover | 3 条承诺前面的圆点在 hover 时轻微放大/磁吸 |

**落地注意**
- 对比表需要清晰可读，动画不要遮挡文字。

---

### 3.7 CTA 联系板块

**当前状态**
- 居中大标题 + 副标题 + 按钮 + 二维码弹窗。
- 已有整体淡入。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `BlurText`（Text Animations） | 标题模糊聚焦 | `聊聊你的难题` 做 blur-in 入场 |
| `Magnet`（Animations） | 主按钮磁吸 | `开始沟通` 按钮 hover 时产生磁吸效果，提升点击感 |
| 二维码弹窗弹性展开 | 强化反馈 | 弹窗出现用 spring 弹性动画，替代现有简单显隐 |

**落地注意**
- CTA 是转化终点，动画应引导点击，不要分散注意力。

---

### 3.8 Partners 合作伙伴

**当前状态**
- 3 个合作伙伴 Logo 卡片。
- 已有滚动淡入和 hover 缩放。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `SpotlightCard`（Components） | Logo 卡片光晕 | 鼠标在 Logo 卡片上移动时，光晕跟随 |
| `FadeContent`（Animations） | 卡片依次入场 | 3 个 Logo 卡片 stagger 淡入 |
| 无限滚动 Logo 墙 | 若未来伙伴增多 | 参考 React Bits 的 Marquee / Logo Carousel 组件 |

**落地注意**
- 当前只有 3 个伙伴，Marquee 效果暂时不需要；可用 `SpotlightCard` 提升质感。

---

### 3.9 Navbar 导航栏

**当前状态**
- 固定顶部，滚动后加模糊背景。
- 当前高亮段落通过 IntersectionObserver 实现。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `Magnet`（Animations） | 导航链接磁吸 | 桌面端导航链接 hover 时轻微磁吸 |
| 当前指示器滑动 | 强化位置感知 | 当前 section 对应导航项底部加一个小圆点/下划线滑动动画 |

**落地注意**
- 导航动画要轻，避免影响点击效率。

---

### 3.10 Footer 页脚

**当前状态**
- 公司信息、案例链接、联系方式、备案信息。
- 目前无动画。

**建议加入的动效**

| 动效组件 | 作用 | 建议用法 |
|----------|------|----------|
| `FadeContent`（Animations） | 页脚淡入 | 滚动到页脚时，各列依次淡入 |
| 链接 hover 下划线 | 提升可点击感 | 案例/邮箱链接 hover 时显示下划线 |

**落地注意**
- 页脚信息密集，动画幅度要小。

---

## 4. 推荐优先级与实施顺序

综合考虑视觉冲击、转化贡献、实现成本，建议按以下顺序落地：

1. **P0 – 首屏文字动画**：Hero 的 `SplitText` / `BlurText` 或 framer-motion 等价实现。首屏决定用户留存。
2. **P1 – 卡片光晕**：Services、Cases、Partners 的 `SpotlightCard`。提升整体质感，成本可控。
3. **P1 – CTA 磁吸按钮**：转化终点，直接提升点击率。
4. **P2 – 列表/对比动画**：Services 痛点、WhyUs 对比、LiveDemo 步骤的 `AnimatedList`。
5. **P2 – 导航微交互**：Navbar 磁吸链接 + 当前指示器。
6. **P3 – Demo 打字机与页脚淡入**：锦上添花，可在后续迭代中加入。

---

## 5. 技术实现建议

### 5.1 是否引入 React Bits？

React Bits 的组件是 **copy-paste 形式** 提供，不是通过 `npm install react-bits` 安装。每个组件通常有四种变体：

- `JS-CSS`
- `JS-TW`（Tailwind）
- `TS-CSS`
- `TS-TW`（推荐）

本项目使用 Next.js + TypeScript + Tailwind CSS，建议选择 **TS-TW** 变体，复制到 `src/components/bits/` 目录下使用。

### 5.2 安装方式

以 `SpotlightCard` 为例，可通过 jsrepo CLI 添加：

```bash
npx jsrepo add https://reactbits.dev/default/Components/SpotlightCard
```

或直接访问 [reactbits.dev](https://reactbits.dev) 复制源码。

### 5.3 依赖管理

- 优先选择 **无额外依赖** 的组件（如 `SpotlightCard`、`Magnet`、`FadeContent`）。
- `SplitText`、`BlurText` 依赖 `@react-spring/web`，若不想新增依赖，可用 `framer-motion` 自行实现等效效果。
- 已有 `framer-motion`，大部分入场动画可直接用现有方案，不必全部替换。

### 5.4 目录结构建议

```
src/
  components/
    bits/                 # 从 React Bits 复制或参考实现的组件
      SpotlightCard.tsx
      Magnet.tsx
      FadeContent.tsx
      SplitText.tsx       # 可选
      BlurText.tsx        # 可选
```

---

## 6. 可复用的已有动画资产

| 组件 | 路径 | 当前用途 | 可复用场景 |
|------|------|----------|------------|
| `AnimatedMetric` | `src/components/AnimatedMetric.tsx` | 案例数字滚动增长 | 任何需要强调的数字（如转化率、效率提升） |
| `BeamsBackground` | `src/components/BeamsBackground.tsx` | Hero 背景 | 保留在 Hero，不建议在其他地方复用（性能） |
| `framer-motion` 入场 | 各组件 | 滚动淡入上移 | 继续作为基础动画 |

---

## 7. 风险提示

1. **性能**：Hero 已有 Three.js 背景，不要再叠加复杂背景动效。
2. **可访问性**：所有动画应尊重 `prefers-reduced-motion`，React Bits 部分组件已内置，需检查。
3. **品牌调性**：EasyZ 定位「研究型、克制、专业」，动画应以「 subtle / 精致」为主，避免花哨、弹跳、卡通化效果。
4. **移动端**：磁吸、光晕等鼠标交互效果在移动端无效，需确保移动端有替代或降级方案。

---

## 8. 参考来源

- [React Bits 官网](https://reactbits.dev/)
- [React Bits 组件总览](https://reactbits.dev/components)
- [React Bits jsrepo 组件清单](https://reactbits.dev/default/jsrepo-manifest.json)
- [React Bits GitHub 仓库](https://github.com/DavidHDev/react-bits)
