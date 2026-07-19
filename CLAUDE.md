# CLAUDE.md — EasyZ 官网项目笔记

## 项目概况

- **技术栈**: Next.js 14 + React 18 + TypeScript + Tailwind CSS + next-intl
- **端口**: `3010`
- **动画库**: framer-motion、@react-three/fiber、@react-three/drei、three
- **仓库**: Gitee `leaveWhite9088/official_website2`，主分支 `master`

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

### Beams 背景

- 文件: `src/components/BeamsBackground.tsx`
- 基于 React Bits 的 Beams 组件，使用 `@react-three/fiber` + `@react-three/drei` + `three`
- Canvas 使用 `alpha: true`，让 Hero 的 CSS 背景色透出来，避免主题切换时背景色不同步
- 默认 `lightColor="#ffffff"`，通过降低 `directionalLight` / `ambientLight` 的 intensity 让光束成为点缀

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
