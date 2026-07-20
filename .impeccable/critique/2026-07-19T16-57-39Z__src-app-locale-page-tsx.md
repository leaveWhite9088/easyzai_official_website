---
target: 首页（含子页面）
total_score: 27
p0_count: 2
p1_count: 2
timestamp: 2026-07-19T16-57-39Z
slug: src-app-locale-page-tsx
---
# 设计评审：EasyZ 官网首页（含子页面）

Method: dual-agent (A: agent-2 设计评审 · B: agent-3 检测器+浏览器证据)

## Design Health Score: 27/40(Good,下限)

| # | 启发式 | 分 | 关键问题 |
|---|--------|---|---------|
| 1 | 系统状态可见 | 3 | scroll-spy、demo 进度好;案例 3/4 无链接也无提示 |
| 2 | 系统与现实匹配 | 3 | 中文文案极佳;英文开发术语标签(THE PROBLEMS)中文用户无感 |
| 3 | 用户控制与自由 | 3 | Esc/键盘/主题/reduced-motion 齐全 |
| 4 | 一致性与标准 | 3 | CTA 邮箱纯文本 vs 页脚 mailto;首页行式 vs 思考页卡片 |
| 5 | 错误预防 | 3 | 交互面小,demo 内示范二次确认 |
| 6 | 识别优于回忆 | 3 | 锚点导航清晰,返回链接位置标准 |
| 7 | 灵活性与效率 | 3 | 双语双主题;无搜索、无快速联系捷径 |
| 8 | 美学与极简 | 3 | TrustBar 整屏一句话,极简滑向空洞 |
| 9 | 错误恢复 | 2 | 案例 3/4 死元素;无 404 引导 |
| 10 | 帮助与文档 | 2 | 无 FAQ,无"联系前该准备什么"的引导 |

## Anti-Patterns 判定

**LLM 评审**:会被认出"AI 做的",属 editorial-typographic 车道:每节英文 eyebrow(SectionLabel)、01-04 编号脚手架(问题/方法/案例/思考/Part ABC)、hero-metric 大指标、mono 标签 + 发丝线 + 单色克制。未命中渐变文字/玻璃拟态/幽灵卡片。

**确定性扫描**:detect.mjs 对 src/components + src/app 零命中。浏览器证据(9 组截图):无溢出/错位/渲染错误,仅 3 处低危(THE PROBLEMS 装饰线对齐不一、WhyUs 对比表左列偏暗、Hero 光束极暗)。fullPage 截图的黑块为 whileInView 未触发的截图伪影,非 bug。

## Overall Impression

执行细节远超平均,品牌语言仍困在 Linear 系 AI 模板。文案和 demo 的诚实是最像"人"的部分。最紧迫的不是视觉翻新,而是转化终局(二维码 + 死邮箱)和英文版翻译事故。

## What's Working

1. 文案是全站最大资产:用客户自己的语言("这就是一座屎山")
2. LiveDemo 诚实框架("纯前端模拟")反而建立可信度
3. 工程级素养:scroll-spy、ARIA、reduced-motion、token 化主题

## Priority Issues

1. **P0 转化终局太弱**:唯一转化动作=扫二维码(移动端需第二台设备),邮箱不可点击,无回复时效/免费沟通安抚
2. **P0 英文版案例详情残留中文**:CaseContent.tsx 中 `risk可控`、`to切入`、`performance可控` 5 处;EN 版比 ZH 版少约 40% 内容
3. **P1 移动端主标题断行**:390px 下逗号孤悬行首("难解的问题/,研究着做")
4. **P1 WhyUs 对比表可读性**:列头重复 h2、右对齐列、左列偏暗
5. **P2 案例 3/4 死元素**:无链接无详情页,与可点击案例并列制造坏 affordance

## Persona Red Flags

- **Jordan**:全站找不到显眼联系按钮;到底部看到需第二台设备的二维码;邮箱不可点
- **Riley**:EN 页中文残留;浅色主题云汉黑砖;案例 3/4 无链接;WhyUs 列头重复
- **Casey**:10,352px 超长页无回到顶部;手机上无法扫自己手机里的二维码——移动端实际无转化路径

## Minor Observations

- LineSidebar 刻度线在宽屏左边距漂浮
- "开始沟通 +" 的 + 号语义错误
- 页脚案例列只链 2/4 个案例
- 个人 163 邮箱 + 个人二维码 vs 公司主体名的品牌层级落差

## Questions to Consider

1. "只做一件事"的宣言为什么需要 10,000 像素才能说完?
2. 唯一联系方式是匿名个人微信号时,前九屏的"研究型团队"人设在扫码那一刻是加分还是清零?
3. 敢不敢在 80%+ 旁边写上统计口径和样本量?
