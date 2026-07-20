# EasyZ 官网项目

## 品牌定位

**易智软件 (EasyZ)** — AI 落地集成服务商

Slogan: 你的需求，我们来实现

核心业务：AI Agent 开发 / RAG 知识工程 / Workflow 自动化 / 私有化大模型部署 / 复杂系统 AI 改造

## 技术栈

- **框架**: Next.js 14 (App Router)，静态导出 (`output: 'export'`)
- **UI**: React 18 + Tailwind CSS + TypeScript
- **国际化**: next-intl，双语 `zh` / `en`（文案集中在 `messages/zh.json`、`messages/en.json`）
- **动效**: framer-motion；WebGL 背景与按钮光效用 ogl
- **内容渲染**: react-markdown（思考文章）

## 常用命令

```bash
npm run dev         # 开发服务器，端口 3010
npm run dev:clean   # 清缓存启动（kill-port + 删 .next 和 node_modules/.cache）
npm run typecheck   # TypeScript 检查
npm run build       # 构建并静态导出到 out/
npm run test:site   # 站点契约测试（读取 out/，需先 build）
```

开发检查清单：`typecheck` → `build` → `test:site` → 浏览器访问 `http://localhost:3010/zh`。

## 目录结构

```
src/
├── app/
│   ├── layout.tsx            # 根布局
│   ├── page.tsx              # 根路径重定向
│   ├── manifest.ts / robots.ts / sitemap.ts
│   └── [locale]/
│       ├── layout.tsx        # 语言布局（next-intl）
│       ├── page.tsx          # 首页
│       ├── cases/[slug]/     # 案例详情页
│       └── thinking/         # 思考文章列表 + [slug] 详情
├── components/
│   ├── Navbar.tsx            # 固定顶部导航
│   ├── Hero.tsx              # 首屏（Ferrofluid WebGL 背景 + SplitText 标题 + BlurText 副标题）
│   ├── TrustBar.tsx          # 服务行业条
│   ├── Services.tsx          # 服务能力
│   ├── Cases.tsx             # 落地案例
│   ├── LiveDemo.tsx          # 交互演示
│   ├── WhyUs.tsx             # 为什么选我们
│   ├── Partners.tsx          # 合作伙伴
│   ├── CTA.tsx               # 行动召唤（含微信二维码悬浮）
│   ├── Footer.tsx            # 页脚
│   ├── StructuredData.tsx    # JSON-LD 结构化数据（SEO/GEO）
│   ├── Ferrofluid.tsx / SpecularButton.tsx / SplitText.tsx / BlurText.tsx  # 动画组件
│   └── bits/ demos/ theme/ ui/                              # 子组件库
├── lib/structured-data.ts    # 结构化数据节点生成
├── hooks/                    # useTimers、useTypewriter
└── i18n.ts                   # next-intl 配置

messages/                     # zh.json / en.json 双语文案
tests/site-contracts.test.mjs # 站点契约测试（基于构建产物 out/）
```

## 设计系统

- 所有颜色通过 CSS 变量解析（见 `globals.css`），Tailwind 色板（`bg-base`、`accent`、`text-primary` 等）映射到变量，亮/暗主题经 `html[data-theme]` 切换
- 品牌色为暖矿中性色（warm mineral neutrals），不用通用的 AI 蓝紫
- 最大内容宽度：`max-w-content` (1152px)
- 标题字号用 `text-display` / `text-h1` / `text-h2`（clamp 流式字号）

## 首页区块顺序

1. Navbar（固定顶部）
2. Hero
3. TrustBar
4. Services
5. Cases
6. LiveDemo
7. WhyUs
8. Partners
9. CTA
10. Footer

## 部署

- 静态导出，构建产物在 `out/` 目录
- 部署前确保 `npm run build` 与 `npm run test:site` 通过
- 详见 `DEPLOY.md`

## 其他笔记

- Windows 下热更新缓存损坏（`Cannot find module './xxx.js'`）不是代码问题，运行 `npm run dev:clean` 即可；详见 `AGENTS.md`
- 动画组件使用规范（Ferrofluid 背景、SpecularButton、SplitText、BlurText 的中文拆分方式）见 `AGENTS.md`
