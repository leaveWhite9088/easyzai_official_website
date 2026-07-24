# 首页资源清单 · Home Page Asset Manifest

> 状态：**v0.3 已锁**（2026-07-24 拍板）
> 用途：实施时直接参照；切换备选素材时查路径

---

## 1. 文件总览

所有资源都集中在 `docs/prototype/` 目录下：

| 资产 | 文件 | 当前是否使用 |
|---|---|---|
| **HTML 原型** | `home.html` | ✅ 主入口 |
| **Hero 视频** | `hero-4.mp4` | ✅ 嵌入使用 |
| **概念图** | `concept-cyanotype-3.png` | ✅ 嵌入使用 |
| 备选视频 A | `hero-1.mp4` | — |
| 备选视频 B | `hero-2.mp4` | — |
| 备选视频 C | `hero-3.mp4` | — |
| 备选概念图 | `concept-cyanotype-1.png` | — |

---

## 2. HTML 原型

- **路径**：`docs/prototype/home.html`
- **入口**：双击在浏览器直接打开
- **当前版本**：v0.3
- **嵌入方式**：所有资源相对路径引用，**整套 `docs/prototype/` 目录要保持完整**

---

## 3. Hero 视频

### 当前使用 · `hero-4.mp4`

- **规格**：6s / 1080P / ~810KB / mp4
- **风格**：大理石墙面 dolly 慢镜头，monumental minimalist architecture
- **prompt**：
  ```
  Slow dolly along white stone wall, soft light, minimalist, peaceful, no people, no text
  ```
- **为什么选它**：同时满足"建筑感"和"大理石质感"，一眼能读出"石头/材质"。克制度比 B 好，比 C 多一点空间感。

### 备选（保留在目录中，方便切换）

| 文件 | 风格 | 适合什么时候切换 |
|---|---|---|
| `hero-1.mp4` | 抽象光影（自然光在白色表面缓慢移动） | 想让 Hero 更"实验记录感"、完全去掉建筑/材料元素 |
| `hero-2.mp4` | 建筑内部 dolly（白柱+光从上来） | 不推荐（建筑事务所感，跟调性最不像） |
| `hero-3.mp4` | 大理石近景纹理 | 想让 Hero 更"标本/材质研究"、更克制 |

**切换方法**：编辑 `home.html`，把 `<source src="hero-4.mp4" ...>` 改成对应文件名。

---

## 4. 概念图

### 当前使用 · `concept-cyanotype-3.png`

- **规格**：2K / 2:3 / ~3.5MB / png
- **风格**：蓝晒植物标本（sparse branch），干净克制
- **prompt**：
  ```
  Cyanotype botanical specimen, deep Prussian blue background
  with subtle paper texture, a single slender dried botanical branch
  with sparse fine leaves and elegant curves, hand-pressed herbarium
  specimen, 19th century scientific archive photography, soft natural
  light, centered subject with abundant negative space, photorealistic,
  quiet restrained composition, no text, no watermark
  ```
- **为什么选它**：边角干净、主体轻盈，符合"研究当手艺、不表演"的气质。第 1 张偏"博物馆/植物图鉴"。

### 备选

| 文件 | 风格 |
|---|---|
| `concept-cyanotype-1.png` | pine/cypress，更"档案/古典"，边角有做旧 |

**切换方法**：编辑 `home.html`，把 `<img src="concept-cyanotype-3.png" ...>` 改成对应文件名。

---

## 5. 设计 Tokens

### 5.1 颜色

```css
/* 背景层级（建筑白） */
paper:    #F2F1ED;  /* 主体背景 */
surface:  #F6F5F1;  /* 次级背景 */
canvas:   #FAF9F5;  /* 最浅背景 */

/* 文字层级 */
ink:      #16161A;  /* 主文字 */
ink-2:    #52525B;  /* 次文字 */
ink-3:    #A1A1AA;  /* 弱文字 */

/* 分隔 */
rule:     #D9D6CE;  /* 主分隔线 */
rule-2:   #E5E2D8;  /* 弱分隔线 */

/* 点缀 */
cyan:     #1B3A5F;  /* 蓝晒蓝（点缀） */
cyan-d:   #13243C;  /* 蓝晒加深 */
```

**关键原则**：白铺底、蓝只点 1 次。`canvas / paper / surface` 三个微差几乎不可见，但给了页面呼吸节奏。

### 5.2 字体

| 角色 | 字体 | 来源 | 用途 |
|---|---|---|---|
| Sans | Inter | Google Fonts | 正文 / UI / 标签 |
| Serif | **Source Serif 4** | Google Fonts | 大标题 / 长文标题 / 图注 |
| Mono | JetBrains Mono | Google Fonts | 日期 / 标签 / 元数据 / 编号 |

### 5.3 字号

```
12 / 14 / 16 / 20 / 32 / 56
```

### 5.4 间距

```
8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160
```

### 5.5 容器

```
max-w-read:  720px   (正文阅读)
max-w-page:  1360px  (页面内容)
max-w-wide:  1480px  (Hero 容器)
```

### 5.6 动效

- 缓动：`cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- 入场：文字 0.6s / 区块 0.8s
- Hero 视频：autoplay / muted / loop / playsinline / 6s 循环

---

## 6. 实施注意事项

### 生产化时需要做的

- [ ] 视频从 AI 生成版换成真实拍摄 / 精修版本
  - 当前：AI 6s / 1080P / ~810KB
  - 目标：< 4MB（首屏 LCP 考虑）
- [ ] 概念图压缩
  - 当前：2K png / ~3.5MB
  - 目标：webp / < 500KB
- [ ] 字体从 Google Fonts CDN 改成 next/font 自托管（生产项目已有此实践）
- [ ] Tailwind 从 CDN 改成生产打包
- [ ] i18n 接入（next-intl），双语文案维护

### 仍占位的内容（待用户/团队提供）

- 团队信息：`Est. 2023 / Researchers · 5 / Shanghai` —— 数字是占位的
- 3 篇思考的标题/摘要/日期 —— 临时写的
- 邮箱 `hi@easyzai.top` —— 假设的
- 思考列表的分类标签（`Research / Method / Engineering`）—— 临时分的

---

## 7. 版本历史

| 日期 | 版本 | 改动 |
|---|---|---|
| 2026-07-23 | v0.1 | 初版：Hero CSS 动画 + 蓝晒 SVG 占位 |
| 2026-07-23 | v0.2 | 重做：编辑式 section 节奏、4 角框、grid、真蓝晒图 |
| 2026-07-24 | **v0.3** | 嵌入 AI 视频 hero-4.mp4 + 移除静态 grid + 大理石 dolly |

---

## 8. 相关文档

- `docs/design-spec.md` — 整体设计 spec（视觉语言 / 4 页地图 / 决策日志）
- `docs/prototype/home.html` — 本清单对应的实际原型文件
- `AGENTS.md` — 项目工程规范（端口 / 命令 / 缓存清理 / 提交原则）
