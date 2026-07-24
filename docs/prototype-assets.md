# 原型资源清单 · Prototype Assets

> 状态：v0.3 (Home) / v0.1 (About) 已锁 · 2026-07-24
> 用途：实施时直接参照（不记录备选 / 切换方法 / 详细 prompt）

---

## 文件位置

`docs/prototype/` 目录：

| 资产 | 文件 | 用途 |
|---|---|---|
| 首页 | `home.html` | v0.5 已锁（04 段 = 线上零售 AI 提效 case 预览 + 45%+ metric） |
| 关于页 | `about.html` | v0.1 已锁 |
| 实践页 | `practice.html` | v0.2 已锁 |
| 思考页（列表） | `thinking.html` | **v0.4 已锁**（最终版：820px 窄列、报纸头、inline meta） |
| 思考详情 | `thinking-detail.html` | v0.1 已锁（50vh 顶部概念图） |
| Hero 视频 | `hero-4.mp4` | 首页 Hero（大理石墙面 dolly，6s 1080P） |
| 概念图 | `concept-cyanotype-3.png` | 首页 + 思考方法论类（蓝晒 sparse branch，2K） |
| 大理石纹理 | `marble-texture.png` | 关于页 + 实践 + 思考案例复盘类 + 思考详情（2K） |
| 建筑结构图 | `thinking-arch.png` | 思考技术观点类（2K） |
| 合作伙伴 1 | `partner-1.png` | 云汉孵化中心（**原色呈现**） |
| 合作伙伴 2 | `partner-2.png` | 智猩猩（**原色呈现**） |
| 合作伙伴 3 | `partner-3.png` | 连尚集团（**原色呈现**） |

---

## 设计 Tokens

### 颜色

```css
paper:    #F2F1ED  /* 主体背景 */
surface:  #F6F5F1  /* 次级背景 */
canvas:   #FAF9F5  /* 最浅背景 */
ink:      #16161A  /* 主文字 */
ink-2:    #52525B  /* 次文字 */
ink-3:    #A1A1AA  /* 弱文字 */
rule:     #D9D6CE  /* 主分隔线 */
rule-2:   #E5E2D8  /* 弱分隔线 */
cyan:     #1B3A5F  /* 蓝晒蓝（点缀） */
cyan-d:   #13243C
```

### 字体

- **Sans**: Inter（正文 / UI / 标签）
- **Serif**: Source Serif 4（**只用在每页 1 处开场**——视觉降级原则）
- **Mono**: JetBrains Mono（日期 / 编号 / 元数据）

### 容器

```
max-w-read:  720px
max-w-page:  1360px
max-w-wide:  1480px
```

---

## 仍占位的内容

- 3 篇思考的标题 / 摘要 / 日期
- 邮箱地址
- 团队信息（如需要）

---

## 版本历史

| 日期 | 改动 |
|---|---|
| 2026-07-23 | home v0.1 / v0.2（初版 + 编辑式重做） |
| 2026-07-24 | home v0.3（嵌入 AI 视频 hero-4 + 移除静态 grid） |
| 2026-07-24 | about v0.1（4 块结构 + 大理石 + 3 个合作伙伴 + 3 条原则） |
| 2026-07-24 | 资源清单重构（home-assets → prototype-assets） |

---

## 相关文档

- `docs/design-spec.md` — 整体设计 spec（视觉语言 / 4 页地图 / 决策日志）
- `docs/prototype/*.html` — 原型文件
- `AGENTS.md` — 项目工程规范
