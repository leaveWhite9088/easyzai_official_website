# AGENTS.md — EasyZ 官网项目笔记

## 项目概况

- **技术栈**: Next.js 14 + React 18 + TypeScript + Tailwind CSS + next-intl
- **端口**: `3010`
- **动画库**: framer-motion、ogl（WebGL）
- **仓库**: GitHub `leaveWhite9088/easyzai_official_website`，主分支 `main`

## 提交原则

- **每一次改动完成后都必须 `git commit` 并 `git push` 到 `main`**，不允许只改不提交
- 多个不相关改动按计划拆分为多个语义化提交（fix / feat / docs / refactor），不要混在一个提交里
- 提交前确保 `npm run typecheck` 通过

## 常见问题：Next.js 热更新缓存损坏

本项目在 Windows 环境下频繁出现 Next.js / Webpack 热更新缓存损坏，典型报错：

```text
Error: Cannot find module './682.js'
Error: Cannot find module './948.js'
Error: Cannot find module './vendor-chunks/framer-motion.js'
```

这些报错**不是代码 bug**，而是 `.next` 目录下的 Webpack 产物和 `node_modules/.cache` 不同步导致的。

### 触发场景

- 安装/卸载依赖后没有清缓存
- 频繁修改组件或依赖后热更新异常
- `npm run dev` 进程被异常中断
- Windows 文件系统下 webpack 缓存失效不及时

### 解决方案

执行以下命令后重新启动：

```bash
npx kill-port 3010
rm -rf .next node_modules/.cache
npm run dev
```

### 预防措施

可以在 `package.json` 中添加一个一键清缓存启动脚本：

```json
{
  "scripts": {
    "dev:clean": "npx kill-port 3010 && rm -rf .next node_modules/.cache && npm run dev"
  }
}
```

需要时直接运行：

```bash
npm run dev:clean
```

## 动画组件使用规范

### Ferrofluid 背景

- 文件: `src/components/Ferrofluid.tsx`（+ `Ferrofluid.css`）
- 基于 React Bits 的 Ferrofluid 组件，使用 `ogl`（WebGL 着色器）
- 仅深色主题 + 桌面端渲染（Hero 的 `showFluid` 门控），浅色主题回退到 CSS 纹理
- 配色为纯白色：`['#ffffff', '#ffffff', '#ffffff']`
- DPR 上限 1.5，鼠标监听挂在 window（上层文字容器会挡住 canvas 的指针事件）
- 注意 BeamsBackground / three 依赖已移除，不要回引

### SpecularButton

- 文件: `src/components/SpecularButton.tsx`（+ `SpecularButton.css`）
- 基于 React Bits 的 Specular Button，使用 `ogl`，用于 CTA 区块「开始沟通」
- 描边色运行时读取 `--c-accent` / `--c-border`，跟随主题切换

### SplitText

- 文件: `src/components/SplitText.tsx`
- 基于 framer-motion，用于主标题字符级 stagger 入场
- 中文按字符拆分，效果更自然

### BlurText

- 文件: `src/components/BlurText.tsx`
- 基于 framer-motion，用于副标题模糊淡入
- 中文应按 `chars` 拆分，按 `words` 拆分对中文无效（中文没有空格）

## 开发检查清单

修改动画或依赖后，按以下顺序验证：

1. `npm run typecheck`
2. `npm run build`
3. 清缓存启动 `npm run dev`（如果遇到过缓存报错）
4. 浏览器访问 `http://localhost:3010/zh` 确认效果

## 部署

- 静态导出: `output: 'export'`
- 构建产物在 `out/` 目录
- 部署前确保 `npm run build` 成功

## 项目目录整洁原则

- **Skill 只放一处**：`.agents/skills/` 是唯一存放点。**不要**生成 `.claude/`、`agent/` 等 agent 专用 symlink 目录，也不要提交 `skills-lock.json`。
- **不创建临时分支**：所有改动直接 commit 到 `main`，不需要 `feature/xxx` 或 `redesign/xxx` 之类的"准备分支"。
- **工具/缓存产物一律 gitignore**：`out/`、`.next/`、`.playwright-mcp/`、`.impeccable/`、`.dev*.log`、`.tsbuildinfo` 等。

## 当前 redesign 实施状态 (2026-07-25)

- **实施版本**：v2.1.0（Home / About / Practice / Thinking + 4 case / 3 thinking 详情 + join 全部上线，已合并到 main）
- **状态**：已合并并发布，`redesign-0723` 分支已删除；今后所有改动仍在 main 上推。
- **未做**：case 详情页视觉升级（保留旧设计但颜色已自动适配 paper + cyan）；用户预告「可能会叫你把所有的详细页都做出来」—— 单独再做

## 移动端适配规范 (2026-07-25)

基础响应式（grid 12 → 9/3、font clamp、44px 触摸目标、移动端跳过 framer-motion 入场）从 redesign v2.1 就有了。本轮做的补充：

### Hero 视频 — 移动端降级
- 文件：`src/components/home/HomeHero.tsx`
- 移动端不渲染 `<video>`（`hidden md:block`），用 `hero-light-texture`（globals.css 已定义）作背景。原因：6s 循环 autoPlay 在 mobile 上烧流量 + 电，且 mobile 视频第一帧容易因为 Safari 节能策略显示成黑屏。
- desktop `poster="/assets/hero-4.mp4"` 错挂（应是图片，已删除）— 改用 `preload="metadata"` 让浏览器自己取首帧。

### 顶部 hero 图 — mobile 缩短
- Thinking 详情：`50vh` → mobile `40vh / 240px`、desktop `50vh / 360px`。
- Join 详情：`78vh` → mobile `56vh / 340px`、desktop `78vh / 520px`。
- 原因：手机 viewport 高 600-800px，50-78% 都是图片，挤压正文；32-50% 让正文仍能进入 first fold。

### 背景大图 — 移动端隐藏
- `HomeSpecimen` 背景 cyanotype 大图：mobile `hidden`、desktop 显示。原因：mobile 前景已经是同一张图的特写，背景再叠一份就是视觉噪音。

### Footer — 微信二维码列独占
- Cases 列、Contact 列：mobile `col-span-12`（独占一列）、`sm:col-span-6`、desktop `col-span-3 / 4`。
- 原因：120px 微信二维码 + 邮箱在小屏占满 50% 太挤，独占一列后给 contact 完整宽度。

### PracticeCases 列表行
- Metric 字号 28px → mobile `24px`、sm+ `28px`。
- 原因：col-span-3 (25%) 在 320 屏 ≈ 80px 宽，28px metric 容易挤。

### CaseContent 详情页
- `prose prose-invert` 清理（项目没装 `@tailwindcss/typography`，从来没生效）。
- 表格 `min-w-[560px]` → `min-w-[420px]`，加 `article-table-scroller` CSS（thin 横向 scrollbar 提示可滚）。
- H1 `text-[2rem] sm:text-3xl lg:text-4xl` 改成 `clamp(28px, 5.5vw, 48px)`：原值在 sm 反而比 base 小，是 bug。

### viewport themeColor
- `src/app/layout.tsx` 的 `viewport.themeColor` 与 `src/app/manifest.ts` 的 `background_color / theme_color` 都从 `#0C0C0F` 改成 `#F2F1ED`，与 paper 主题对齐。

## Windows 环境差异（PowerShell）

- 清理 `.next` 缓存用 `mavis-trash .next`，**不要**用 `rm -rf .next`（`package.json` 里的 `dev:clean` 脚本是 bash 写法，在 PowerShell 下不走）。
- `npx kill-port 3010` 仍然有效，跨平台。
- 提交信息中的中文文件名可能被 PowerShell 显示为乱码（UTF-8 解码问题），但 git 内部存储正确，远程可正常显示。
