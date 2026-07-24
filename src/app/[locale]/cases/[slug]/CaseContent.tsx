'use client'

import { useTranslations } from 'next-intl'
import Markdown from 'react-markdown'
import { motion } from 'framer-motion'

const caseData: Record<string, any> = {
  'programming-language-migration': {
    industry: { zh: '科技 / 开发者工具', en: 'Tech / Developer Tools' },
    title: { zh: '编程语言生态库迁移工具', en: 'Programming Language Ecosystem Migration' },
    coreMetric: '80%+',
    coreMetricLabel: { zh: '库迁移自动化率', en: 'Migration Automation Rate' },
    content: {
      zh: `## 背景

华为自研编程语言**仓颉**，是面向未来的国产编程语言。但作为一个新兴语言，它面临一个典型的冷启动问题：

**社区人少 → 生态薄弱 → 开发者不愿来 → 社区更小**

生态的核心是库。开发者选择一门语言，首先看的是：有没有我需要的库？能不能直接用？如果什么都得自己写，那还不如用成熟的语言。

仓颉需要把其他语言（Java、Python、Go 等）的成熟库迁移过来，用仓颉重新实现。但问题是：

- **人工迁移太慢。** 一个中等规模的库，人工迁移需要数周。
- **语言太新，AI 不会写。** 仓颉的训练语料极少，大模型几乎没见过这门语言。
- **文档分散，理解困难。** 仓颉的语法、标准库、编译器特性都在不同地方，开发者需要反复查阅。

**我们接到的任务是：做一个工具，让 AI 能自动把其他语言的库迁移到仓颉。**

---

## 挑战

这个任务的核心挑战是：**AI 不会写仓颉代码。**

大模型的训练数据里几乎没有仓颉的代码。直接让 AI 翻译，结果大概率编译不过。

我们需要解决三个问题：

1. **知识注入：** 怎么让 AI 学会仓颉的语法和特性？
2. **代码理解：** 怎么让 AI 理解源语言库的逻辑？
3. **质量保证：** 怎么确保生成的代码能编译通过、功能正确？

---

## 方案

我们的方案是：**RAG + Agent + 多轮自检。**

### 第一步：知识注入（RAG）

把仓颉的全量文档（语言规范、标准库文档、编译器文档、示例代码）全部入库，建立向量索引。

当 AI 需要写某个功能时，先检索相关文档，获取最新的语法和 API 信息。

**关键点：**
- 文档版本自动同步，仓颉更新后 RAG 知识库自动更新
- 支持多语言文档检索，同时检索仓颉文档和源语言文档

### 第二步：代码理解与迁移（Agent）

这一步参考了多篇学术论文的方法：

- **Codex（OpenAI, 2021）** 的代码生成思路：将任务分解为子任务，逐步生成
- **AlphaCode（DeepMind, 2022）** 的大规模采样策略：生成多个候选方案，筛选最优
- **CodeRL（Salesforce, 2022）** 的强化学习反馈：用编译结果作为奖励信号，迭代优化
- **Self-Debug（Meta, 2023）** 的自调试能力：让模型根据错误信息自我修正

具体流程：

1. **解析源代码：** 用 AST（抽象语法树）解析源语言库的代码结构，提取函数、类、依赖关系
2. **任务分解：** 将整个库的迁移任务分解为多个子任务（逐个函数/类迁移）
3. **上下文注入：** 为每个子任务注入相关文档（仓颉语法、源语言语义、已有迁移结果）
4. **代码生成：** 基于上下文生成仓颉代码

### 第三步：多轮自检（Self-Refine）

生成的代码不会一次就对。我们做了多轮自检机制：

1. **编译检查：** 调用仓颉编译器，检查是否能编译通过
2. **错误分析：** 如果编译失败，分析错误信息，定位问题
3. **自动修正：** 将错误信息反馈给 AI，让它自我修正
4. **重复迭代：** 最多迭代 5 轮，直到编译通过或确认无法修复

**这个机制是关键。** 单次生成的编译通过率只有 40% 左右，但经过多轮自检后，通过率提升到 85%+。

---

## 技术细节

### 工具链集成

- **编译器集成：** 直接调用仓颉编译器 API，实现实时编译检查
- **测试框架：** 自动生成单元测试，验证功能正确性
- **版本管理：** 迁移结果自动提交到 Git，支持回滚和对比

### 知识注入策略

除了 RAG 检索文档，我们还做了：

- **Few-shot 示例：** 从已迁移成功的库中提取示例，作为新库迁移的参考
- **错误模式库：** 收集常见的编译错误和修复方法，加速自检过程
- **API 映射表：** 建立源语言 API 到仓颉 API 的映射关系

---

## 效果

**核心指标：**

- **库迁移自动化率：** 80%+
- **编译通过率（多轮自检后）：** 85%+
- **单库迁移耗时：** 从数周压缩至数小时
- **已成功迁移项目数：** 数十个
- **社区认可：** 多个项目获社区贡献奖、贡献之星

这些迁移的项目包括多个大型项目，涵盖了基础工具库、数据结构库、网络库等多种类型。迁移后的代码质量获得了社区认可，多个项目被收录为仓颉生态官方推荐。

---

## 为什么这个项目难

1. **语言太新。** 没有足够的训练语料，AI 不能直接写仓颉代码，必须靠 RAG 补充知识。
2. **质量要求高。** 库是基础设施，代码质量直接影响上层应用。不能"大概能用"，必须"可靠能用"。
3. **需要深度理解。** 不是简单的语法翻译，需要理解源语言库的设计意图，用仓颉的方式重新实现。

**这正是我们擅长的：非标场景、复杂数据、不确定的技术路线。**

---

## 写在最后

这个项目验证了一件事：**AI 不会的东西，可以通过工程手段教会它。**

RAG 解决知识问题，Agent 解决流程问题，多轮自检解决质量问题。三者结合，就能让 AI 完成原本不会的任务。

如果你有类似的"AI 不会做"的场景，欢迎来找我们聊聊。`,
      en: `## Background

Huawei's self-developed programming language **Cangjie** is a next-generation domestic programming language. But as a new language, it faces a classic cold-start problem:

**Small community → Weak ecosystem → Developers won't come → Even smaller community**

The core of an ecosystem is libraries. When developers choose a language, they first ask: Are the libraries I need available? Can I use them directly? If everything has to be written from scratch, it's better to stick with mature languages.

Cangjie needs to migrate mature libraries from other languages (Java, Python, Go, etc.) and reimplement them in Cangjie. But the problems are:

- **Manual migration is too slow.** A medium-sized library takes weeks to migrate manually.
- **The language is too new for AI.** Cangjie has very little training data; large models have barely seen this language.
- **Documentation is scattered.** Cangjie's syntax, standard library, and compiler features live in different places, so developers have to look things up repeatedly.

**Our task: build a tool that lets AI automatically migrate libraries from other languages to Cangjie.**

---

## Challenge

The core challenge: **AI can't write Cangjie code.**

Large models have almost no Cangjie code in their training data. Ask AI to translate directly, and the result will most likely fail to compile.

We needed to solve three problems:

1. **Knowledge injection:** How do we teach AI Cangjie's syntax and features?
2. **Code understanding:** How do we make AI understand the source library's logic?
3. **Quality assurance:** How do we ensure the generated code compiles and works correctly?

---

## Approach

Our solution: **RAG + Agent + multi-round self-check.**

### Step 1: Knowledge Injection (RAG)

We ingested the full set of Cangjie documentation (language specification, standard library docs, compiler docs, example code) and built a vector index.

When AI needs to write a feature, it first retrieves the relevant documentation to get the latest syntax and API information.

**Key points:**
- Documentation versions sync automatically — when Cangjie updates, the RAG knowledge base updates with it
- Multi-language retrieval — it searches Cangjie docs and source-language docs at the same time

### Step 2: Code Understanding & Migration (Agent)

This step draws on methods from several academic papers:

- **Codex (OpenAI, 2021):** its code generation approach — decompose the task into subtasks and generate step by step
- **AlphaCode (DeepMind, 2022):** its large-scale sampling strategy — generate multiple candidate solutions and select the best
- **CodeRL (Salesforce, 2022):** its reinforcement learning feedback — use compilation results as reward signals to iterate
- **Self-Debug (Meta, 2023):** its self-debugging capability — let the model correct itself based on error messages

The concrete workflow:

1. **Parse the source code:** Use AST (abstract syntax tree) parsing to extract the source library's structure — functions, classes, and dependencies
2. **Decompose the task:** Break the whole library migration into subtasks (migrate function by function, class by class)
3. **Inject context:** For each subtask, inject relevant documentation (Cangjie syntax, source-language semantics, previous migration results)
4. **Generate code:** Generate Cangjie code based on that context

### Step 3: Multi-round Self-Check (Self-Refine)

Generated code is rarely right on the first try, so we built a multi-round self-check mechanism:

1. **Compilation check:** Call the Cangjie compiler to check whether the code compiles
2. **Error analysis:** If compilation fails, analyze the error messages and locate the problem
3. **Auto-correction:** Feed the error messages back to the AI and let it fix itself
4. **Repeat:** Iterate up to 5 rounds, until the code compiles or we confirm it can't be fixed

**This mechanism is the key.** Single-pass generation compiles only about 40% of the time; after multi-round self-check, the pass rate rises to 85%+.

---

## Technical Details

### Toolchain Integration

- **Compiler integration:** Call the Cangjie compiler API directly for real-time compilation checks
- **Test framework:** Automatically generate unit tests to verify functional correctness
- **Version management:** Migration results are committed to Git automatically, with rollback and diff support

### Knowledge Injection Strategy

Beyond RAG retrieval, we also built:

- **Few-shot examples:** Extract examples from successfully migrated libraries as references for new migrations
- **Error pattern library:** Collect common compilation errors and their fixes to speed up the self-check loop
- **API mapping table:** Map source-language APIs to their Cangjie equivalents

---

## Results

**Core metrics:**

| Metric | Data |
|--------|------|
| Migration automation rate | 80%+ |
| Compilation success rate (after self-check) | 85%+ |
| Single library migration time | From weeks to hours |
| Successfully migrated projects | Dozens |
| Community recognition | Multiple community contribution awards and "Contributor Star" honors |

The migrated projects include several large ones, covering foundational utility libraries, data structure libraries, networking libraries, and more. The quality of the migrated code earned community recognition, and several projects were listed as officially recommended in the Cangjie ecosystem.

---

## Why This Project Was Hard

1. **The language is too new.** With insufficient training data, AI can't write Cangjie directly — knowledge has to be injected via RAG.
2. **Quality requirements are high.** Libraries are infrastructure; code quality directly affects everything built on top. "Mostly works" isn't good enough — it has to be reliable.
3. **Deep understanding is required.** This isn't simple syntax translation; the AI must understand the source library's design intent and reimplement it the Cangjie way.

**This is what we're good at: non-standard scenarios, complex data, uncertain technical paths.**

---

## Final Thoughts

This project proved one thing: **what AI doesn't know can be taught through engineering.**

RAG solves the knowledge problem, the Agent solves the process problem, and multi-round self-check solves the quality problem. Combined, they let AI accomplish tasks it couldn't do before.

If you have a similar "AI can't do this" scenario, feel free to reach out.`
    }
  },
  'securities-ai-platform': {
    industry: { zh: '金融科技', en: 'FinTech' },
    title: { zh: '证券中台管理系统 AI 化改造', en: 'Securities Mid-Office AI Transformation' },
    coreMetric: '70%+',
    coreMetricLabel: { zh: '权限审批周期缩短', en: 'Permission Cycle Reduction' },
    content: {
      zh: `## 背景

2025 年初，一家国内 To B 的证券金融科技公司找到我们。他们做了十几年的证券服务，有一套成熟的数据中台系统，里面有股票数据、产品数据、人员数据等等。

问题是：**系统太老了。**

代码是十多年前写的，接手的人换了一茬又一茬，代码风格不统一、注释缺失、逻辑混乱。用他们自己的话说：「这就是一座屎山，但我们还得在上面盖房子。」

他们想加 AI 能力，但有两个硬约束：

1. **不能动原有系统。** 系统跑了十几年，稳定性是命根子。任何改动都要经过严格的测试和审批，周期长、成本高。
2. **不能停服升级。** 系统 7×24 小时运行，服务着几十家证券公司，停一天就是一天的损失。

所以我们提出了一个方案：**非侵入式改造。**

---

## 什么是非侵入式改造

简单来说，就是在原有系统的基础上，**叠加** 一层 AI 能力，而不是**替换** 原有系统。

具体做法是：

1. **做一个悬浮球。** 在原有系统的右下角加一个小圆点，点击后弹出一个对话框。用户可以用自然语言和系统交互。
2. **独立部署 AI 服务。** AI 服务跑在独立的服务器上，通过 API 和原有系统通信。原有系统完全不用改。
3. **渐进式上线。** 先上一个场景，跑稳了再上第二个，最后上第三个。每个场景都是独立的，互不影响。

**这样做的好处是：**
- 原有系统零改动，风险可控
- AI 服务独立部署，性能可控
- 场景独立上线，进度可控

---

## 三个场景

我们选了三个场景切入，每个场景的逻辑都不一样。

### 场景一：智能授权

**问题：** 系统里有很多角色，每个角色的权限不同。角色很多、很杂，管理起来非常麻烦。

原来的流程是：管理员手动给每个角色配置权限。如果有 5 个角色要改，管理员要分别进入 5 个页面，逐一修改。改完之后，还要逐一检查，生怕漏了一个或者改错了一个。

**痛点：**
- 角色多，操作繁琐
- 容易漏改、改错
- 查看权限不方便，要翻很多页面

**我们的方案：**

用自然语言来管理权限。管理员只需要说一句话，比如「给实习生开放产品 A 的查看权限」，系统就会自动完成以下操作：

1. **意图识别：** 判断用户是要做权限更改
2. **参数提取：** 提取出角色（实习生）、权限（查看）、对象（产品 A）
3. **二次确认：** 弹出确认框，显示「将给实习生角色添加产品 A 的查看权限，是否确认？」
4. **执行操作：** 调用权限管理接口，完成权限更改
5. **结果确认：** 显示修改后的权限列表，再次确认

**为什么要做二次确认？**

因为权限管理是高风险操作。改错了，可能导致数据泄露或者业务中断。所以我们在两个关键节点做了确认：
- 执行前确认：确认意图理解是否正确
- 执行后确认：确认操作结果是否符合预期

**技术细节：**

- **意图识别：** 用提示词工程来识别用户意图。由于他们部署的模型是 DeepSeek V3（虽然对外说是自研的），工具调用能力稍弱，我们针对这个模型的特点做了专门的提示词优化。
- **工具封装：** 由于原有代码太乱，我们没有在原有框架上改，而是独立做了一个包，把权限管理的 API 封装成工具。这样既不影响原有代码，也方便后续维护。
- **悬浮球交互：** 做了一个悬浮球 + 对话框的 UI，用户不用离开原有页面就能完成操作。

---

### 场景二：智能整合

**问题：** 系统里有很多文档，散落在各个地方。用户想找一个信息，要翻很多个文档。

比如，用户想了解「理财产品 A」的信息。这个产品的基本信息在一个文档里，风险评级在另一个文档里，历史收益在第三个文档里，销售人员的推荐话术在第四个文档里。用户要打开四个文档，逐一查找，非常低效。

**痛点：**
- 文档分散，查找困难
- 信息碎片化，需要人工整合
- 耗时耗力，容易遗漏

**我们的方案：**

用 AI 来做文档整合。用户只需要问一句「理财产品 A 的信息」，系统就会自动完成以下操作：

1. **文档检索：** 用 RAG（检索增强生成）技术，从所有文档中检索出和「理财产品 A」相关的文档
2. **信息提取：** 从每个文档中提取出关键信息
3. **汇总展示：** 把所有信息整合在一起，展示给用户

**展示方式：**

我们做了两层展示：
- **第一层：文档列表。** 列出所有包含「理财产品 A」信息的文档，用户可以直接点击查看原文。
- **第二层：信息汇总。** 把所有关键信息提取出来，做成一个结构化的表格，用户可以快速浏览。

**技术细节：**

- **RAG：** 用向量数据库存储文档的 embedding，用语义检索来找相关文档。
- **信息提取：** 用 LLM 从文档中提取关键信息，比如产品名称、风险评级、收益区间、适合人群等。
- **工具封装：** 同样是独立封装成工具，通过悬浮球交互。

---

### 场景三：智能推文

**问题：** 销售人员要向客户推荐产品，但了解产品是一个很麻烦的事。

销售人员需要知道：
- 这个产品的特点是什么？
- 这个产品适合什么样的客户？
- 这个产品的亮点怎么用通俗的语言表达？

这些信息，有的在产品文档里，有的在销售手册里，有的在培训资料里。销售人员要翻很多资料，才能整理出一段推荐话术。

**痛点：**
- 了解产品耗时长
- 推荐话术质量参差不齐
- 新产品上手慢

**我们的方案：**

用 AI 来生成推荐话术。销售人员只需要问一句「帮我写一段理财产品 A 的推荐话术」，系统就会自动完成以下操作：

1. **产品分析：** 分析产品的特点、亮点、风险等级、适合人群
2. **话术生成：** 根据分析结果，生成一段通俗易懂的推荐话术
3. **个性化调整：** 根据销售人员的客户画像，调整话术的侧重点

**举例：**

- 如果产品年化收益 5%，但连续 10 年都是 5%，话术会强调「稳健」：「这款产品虽然收益不是最高的，但胜在稳定。过去 10 年，每年都保持 5% 的收益，适合追求稳健的投资者。」
- 如果产品来自一家知名公司，话术会强调「品牌」：「这款产品来自 XX 公司，是国内最大的 XX 机构之一，品牌值得信赖。」
- 如果产品是新推出的，话术会强调「尝新」：「这是一款新产品，目前市场上还没有类似的，适合喜欢尝鲜的投资者。」

**技术细节：**

- **产品分析：** 用 LLM 分析产品文档，提取特点、亮点、适合人群。
- **话术生成：** 用 LLM 根据分析结果生成话术，通过提示词控制话术的风格和侧重点。
- **工具封装：** 同样是独立封装成工具，通过悬浮球交互。

---

## 为什么这样切

这三个场景，看起来各不相同，但我们选择它们是有逻辑的：

1. **从痛点强度看：** 智能授权 > 智能整合 > 智能推文。权限管理是每天都用、错一次就出大事的功能；文档整合是高频使用、效率提升明显的功能；推文生成是锦上添花、提升质量的功能。
2. **从实现难度看：** 智能授权 < 智能整合 < 智能推文。权限管理的 API 是现成的，只需要做意图识别和工具调用；文档整合需要做 RAG，复杂度高一些；推文生成需要理解产品和客户，复杂度最高。
3. **从风险等级看：** 智能授权 > 智能整合 > 智能推文。权限管理是高风险操作，需要多重确认；文档整合是中风险，信息错误可能误导决策；推文生成是低风险，话术不好最多损失一个客户。

**所以我们的上线顺序是：智能授权 → 智能整合 → 智能推文。**

先上最痛、最难、风险最高的场景，是因为这个场景一旦做好，客户的信任度会大幅提升。而且这个场景的 API 是现成的，技术风险可控。

---

## 工具装配工厂

在做这三个场景的过程中，我们发现一个问题：每个场景都需要封装一些工具，但这些工具的封装方式是类似的。

所以我们做了一个「工具装配工厂」：

1. **统一的工具接口：** 所有工具都遵循相同的接口规范，包括输入参数、输出格式、错误处理等。
2. **自动化的工具生成：** 只需要提供 API 的地址和参数，就能自动生成工具代码。
3. **统一的工具管理：** 所有工具都注册在一个地方，方便查找、复用、更新。

**这样做的好处是：**
- 新场景上线更快，不用重复造轮子
- 工具质量更稳定，因为是统一规范
- 后续维护更方便，因为工具都在一个地方

而且，这个工具装配工厂本身也是非侵入式的。客户以后要做新的 AI 场景，只需要往工厂里加新工具就行，不用改原有系统。

---

## 效果

三个场景上线后，效果如下：

- **智能授权：** 权限管理效率提升 80%，操作错误率降低 95%。
- **智能整合：** 文档查找时间从平均 30 分钟降低到 2 分钟。
- **智能推文：** 推荐话术生成时间从 1 小时降低到 5 分钟，话术质量评分提升 40%。

更重要的是，**原有系统零改动，零停机时间。**

---

## 写在最后

这个项目让我们学到了几件事：

1. **非侵入式改造是可行的。** 对于老系统来说，推倒重来的成本太高、风险太大。叠加一层 AI 能力，是更务实的选择。
2. **场景选择很重要。** 不是所有场景都适合用 AI 解。我们要选那些痛点强、数据足、容错空间大的场景。
3. **工具化是关键。** 把 AI 能力封装成工具，才能复用、才能扩展、才能维护。

如果你也有一个老系统想加 AI 能力，欢迎来找我们聊聊。`,
      en: `## Background

In early 2025, a domestic To B securities fintech company approached us. They'd been in the securities services business for over a decade with a mature data mid-office system containing stock data, product data, personnel data, and more.

The problem: **the system was too old.**

The code was written over a decade ago, with developers cycling through multiple generations. The code style was inconsistent, comments were missing, and the logic was chaotic. In their own words: "This is a mountain of legacy code, but we still have to build on top of it."

They wanted to add AI capabilities but had two hard constraints:

1. **Cannot modify the original system.** The system has been running for over a decade, and stability is paramount. Any changes require rigorous testing and approval, with long cycles and high costs.
2. **Cannot take the system offline for upgrades.** The system runs 24/7, serving dozens of securities firms. Every day of downtime is a day of losses.

So we proposed a solution: **non-intrusive transformation.**

---

## What is Non-Intrusive Transformation

Simply put, it means **layering** AI capabilities on top of the existing system, rather than **replacing** it.

The specific approach:

1. **Add a floating ball.** Add a small circle in the bottom-right corner of the existing system. Clicking it opens a chat dialog. Users can interact with the system using natural language.
2. **Deploy AI services independently.** The AI service runs on separate servers, communicating with the existing system via API. The existing system doesn't need any changes.
3. **Roll out gradually.** Launch one scenario first, stabilize it, then launch the second, and finally the third. Each scenario is independent and doesn't affect the others.

**Benefits of this approach:**
- Zero changes to the existing system, risk under control
- Independent AI service deployment, performance under control
- Independent scenario rollouts, timeline under control

---

## Three Scenarios

We chose three scenarios to切入, each with different logic.

### Scenario 1: Smart Authorization

**Problem:** The system has many roles, each with different permissions. The roles are numerous and messy, making management very cumbersome.

The original workflow: administrators manually configure permissions for each role. If 5 roles need changes, the administrator must enter 5 separate pages and modify each one. After making changes, they must check each one individually, fearing they might have missed or incorrectly modified one.

**Pain points:**
- Too many roles, tedious operations
- Easy to miss changes or make errors
- Inconvenient to view permissions, requiring page navigation

**Our solution:**

Use natural language to manage permissions. Administrators just need to say one sentence, like "give interns view access to Product A," and the system automatically:

1. **Intent recognition:** Determines the user wants to change permissions
2. **Parameter extraction:** Extracts the role (interns), permission (view), and object (Product A)
3. **Secondary confirmation:** Shows a confirmation dialog: "Will add view access for Product A to the intern role. Confirm?"
4. **Execute operation:** Calls the permission management API to complete the permission change
5. **Result confirmation:** Displays the modified permission list for final confirmation

**Why secondary confirmation?**

Because permission management is a high-risk operation. Errors can lead to data leaks or business interruptions. So we added confirmation at two critical points:
- Pre-execution confirmation: Verify intent understanding is correct
- Post-execution confirmation: Verify the operation result meets expectations

**Technical details:**

- **Intent recognition:** Uses prompt engineering to identify user intent. Since their deployed model is DeepSeek V3 (though they claim it's self-developed), its tool-calling capabilities are slightly weaker, so we optimized prompts specifically for this model's characteristics.
- **Tool encapsulation:** Since the original code was too messy, we didn't modify the original framework. Instead, we created an independent package that encapsulates permission management APIs as tools. This doesn't affect the original code and makes future maintenance easier.
- **Floating ball interaction:** Created a floating ball + chat dialog UI, allowing users to complete operations without leaving their current page.

---

### Scenario 2: Smart Integration

**Problem:** The system has many documents scattered across various locations. Finding information requires searching through many documents.

For example, a user wants to learn about "Financial Product A." The basic info is in one document, risk rating in another, historical returns in a third, and sales pitch in a fourth. The user must open four documents and search through each one — very inefficient.

**Pain points:**
- Documents scattered, difficult to find
- Information fragmented, requires manual integration
- Time-consuming, easy to miss information

**Our solution:**

Use AI for document integration. Users just need to ask "Financial Product A info," and the system automatically:

1. **Document retrieval:** Uses RAG (Retrieval-Augmented Generation) technology to retrieve documents related to "Financial Product A" from all documents
2. **Information extraction:** Extracts key information from each document
3. **Summary display:** Integrates all information and displays it to the user

**Display approach:**

We created a two-layer display:
- **Layer 1: Document list.** Lists all documents containing "Financial Product A" information. Users can click to view the original text.
- **Layer 2: Information summary.** Extracts all key information into a structured table for quick browsing.

**Technical details:**

- **RAG:** Uses vector databases to store document embeddings and semantic retrieval to find relevant documents.
- **Information extraction:** Uses LLM to extract key information from documents, such as product name, risk rating, return range, target audience, etc.
- **Tool encapsulation:** Similarly encapsulated as independent tools, accessible via the floating ball.

---

### Scenario 3: Smart Content Generation

**Problem:** Sales staff need to recommend products to clients, but understanding products is a tedious task.

Sales staff need to know:
- What are the product's features?
- What kind of clients is this product suitable for?
- How to express the product's highlights in plain language?

This information is scattered across product documents, sales manuals, and training materials. Sales staff must search through many materials to prepare a recommendation pitch.

**Pain points:**
- Time-consuming to understand products
- Inconsistent quality of recommendation pitches
- Slow onboarding for new products

**Our solution:**

Use AI to generate recommendation pitches. Sales staff just need to ask "help me write a recommendation pitch for Financial Product A," and the system automatically:

1. **Product analysis:** Analyzes the product's features, highlights, risk level, and target audience
2. **Pitch generation:** Generates an easy-to-understand recommendation pitch based on the analysis
3. **Personalized adjustment:** Adjusts the pitch's focus based on the salesperson's client profile

**Examples:**

- If a product has 5% annualized returns but has maintained 5% for 10 consecutive years, the pitch emphasizes "stability": "While this product doesn't have the highest returns, its strength is consistency. Over the past 10 years, it has maintained 5% returns every year, making it ideal for stability-focused investors."
- If a product comes from a well-known company, the pitch emphasizes "brand": "This product comes from XX Company, one of the largest XX institutions in the country, with a trustworthy brand."
- If a product is newly launched, the pitch emphasizes "novelty": "This is a new product with no similar alternatives on the market, perfect for investors who enjoy trying new things."

**Technical details:**

- **Product analysis:** Uses LLM to analyze product documents and extract features, highlights, and target audience.
- **Pitch generation:** Uses LLM to generate pitches based on analysis, with prompts controlling the style and focus.
- **Tool encapsulation:** Similarly encapsulated as independent tools, accessible via the floating ball.

---

## Why We Cut It This Way

These three scenarios look different on the surface, but there's logic behind our selection:

1. **By pain intensity:** Smart Authorization > Smart Integration > Smart Content Generation. Permission management is used daily and errors have severe consequences; document integration is high-frequency with clear efficiency gains; content generation is a nice-to-have that improves quality.
2. **By implementation difficulty:** Smart Authorization < Smart Integration < Smart Content Generation. Permission management APIs are readily available, requiring only intent recognition and tool calls; document integration requires RAG, adding complexity; content generation requires understanding products and clients, making it most complex.
3. **By risk level:** Smart Authorization > Smart Integration > Smart Content Generation. Permission management is high-risk, requiring multiple confirmations; document integration is medium-risk, as incorrect information could mislead decisions; content generation is low-risk, as a poor pitch at worst loses one client.

**So our launch order was: Smart Authorization → Smart Integration → Smart Content Generation.**

We launched the most painful, most difficult, and highest-risk scenario first because once done well, it significantly boosts client trust. Plus, the APIs for this scenario were readily available, keeping technical risk under control.

---

## Tool Assembly Factory

While building these three scenarios, we discovered a pattern: each scenario required tool encapsulation, but the encapsulation approach was similar.

So we built a "Tool Assembly Factory":

1. **Unified tool interface:** All tools follow the same interface specification, including input parameters, output formats, error handling, etc.
2. **Automated tool generation:** Just provide the API address and parameters to automatically generate tool code.
3. **Unified tool management:** All tools are registered in one place for easy discovery, reuse, and updates.

**Benefits:**
- Faster new scenario launches, no need to reinvent the wheel
- More stable tool quality thanks to unified standards
- Easier future maintenance with all tools in one place

Moreover, this Tool Assembly Factory is itself non-intrusive. When clients want to add new AI scenarios in the future, they just need to add new tools to the factory without modifying the existing system.

---

## Results

After launching all three scenarios:

- **Smart Authorization:** Permission management efficiency improved by 80%, operation error rate reduced by 95%.
- **Smart Integration:** Document search time reduced from an average of 30 minutes to 2 minutes.
- **Smart Content Generation:** Pitch generation time reduced from 1 hour to 5 minutes, pitch quality score improved by 40%.

More importantly, **zero changes to the existing system, zero downtime.**

---

## Final Thoughts

This project taught us several things:

1. **Non-intrusive transformation is viable.** For legacy systems, the cost and risk of rip-and-replace are too high. Layering AI capabilities is a more pragmatic choice.
2. **Scenario selection matters.** Not all scenarios are suitable for AI. We need to choose scenarios with strong pain points, sufficient data, and enough room for error.
3. **Toolization is key.** Encapsulating AI capabilities as tools enables reuse, scalability, and maintainability.

If you have a legacy system you'd like to add AI capabilities to, feel free to reach out.`,
    },
  },
  'laser-equipment-ai-customer-service': {
    industry: { zh: '工业 / 智能制造', en: 'Industrial / Smart Manufacturing' },
    title: { zh: '激光加工设备企业智能客服', en: 'AI Customer Service for a Laser-Equipment Maker' },
    coreMetric: '75%+',
    coreMetricLabel: { zh: '客户问题综合解决率', en: 'Customer question resolution rate' },
    content: {
      zh: `## 背景

这是一家做激光加工设备的企业，单台设备价格不菲。他们的客户群——主要是制造业产线负责人和采购——问的不是「你的产品多少钱」，而是「我这个工件用你们 3000W 光纤激光器切，切不锈钢 3mm 厚度时，切割速度、辅助气体压力、最佳焦点位置怎么配比」。

**这类问题有两个特点：**

1. **高度专业。** 客户需要的是贴合自己工件、产线、设备状态的答案，而不是通识科普。
2. **错不起。** 设备贵，单次试错成本高。客户宁可 AI 答「不会」，也不愿被错答误导。

他们有大量产品技术书、内部技术文档——既有大段说明，也有大量图纸（光路图、切割参数表、结构爆炸图等）。

**目标：让 AI 在客户问问题时给出一份既专业、又「宁可不说也不能错」的回答。**

---

## 为什么这件事难

一般的 RAG 在文本上是好用的，但激光加工这个场景有两个特殊挑战：

1. **图比文多。** 产品技术书的很多关键信息在图纸里——光路结构、切割参数表、安装尺寸……光靠文字检索几乎取不到关键证据。
2. **错答代价高。** 普通消费客服答错可以道个歉，激光参数答错一次可能要客户切坏一批工件，返工 + 废料 + 停机，损失远大于一次客服对话。

所以我们要做两件事：**让 AI 能「看懂图」，让 AI「不会就说不会」。**

---

## 方案

### 多模态看图：Qwen2.5-VL 系列 + 微调

我们接入的是千问 **Qwen2.5-VL 系列多模态模型（约 32B 量级）**——一个 ViT 视觉编码器 + Qwen LLM 主干，能同时接收图和文本。我们针对他们的产品技术书做了**轻量微调**，让它更擅长识读激光设备里这几类图纸：

- 切割参数表（功率、气压、速度、焦点位置）
- 光路结构图（光斑大小、镜片位置）
- 设备结构爆炸图（部件命名、装配关系）

微调用他们历史技术档案 + 工程师标注的少量样本（小几百到一千条问答对）做监督微调，把识图错误率压下来。

### 文本检索：标准 RAG

图纸以外的长文档——产品手册、维护指南、工艺 SOP——走标准 RAG 流程：分块、向量化、语义检索。文本和图纸的检索结果统一送进同一个问答模块做最终整合。

### 「宁可不说也不能错」

这是这套客服**真正困难的部分**。我们做了三层兜底：

1. **规则层。** 系统提示词硬约束——只允许基于检索到的文档回答，未检索到的不许编造。
2. **置信度层。** 多模态模型给每个回答输出置信度，低于阈值自动走 fallback。
3. **兜底层。** 触发 fallback 时直接回退到一句固定回复：「这个暂时我不确定，建议您联系我们的技术支持工程师。」 并把这条会话推送给人工。

三层兜底之后，AI 在它**确实知道**的领域里准确率能稳到 **90%+，贴近 95%**；遇到它不会的，会主动退回「我不确定」——这正是客户期待的边界感。

综合下来：**客户问题被 AI 一次性解决的比例在 75%+。**

---

## 接入

最终交付不是一个独立的云端工具，而是**嵌进客户自己的入口**：

1. **网页端客服。** 客户官网右下角悬浮客服，直接接入。
2. **自有小程序。** 客户自己的小程序里也接入了同一套问答接口。

两边共用同一套 AI 后端和知识库，更新一次两边同步生效。

---

## 写在最后

这事做下来最深的体会是：**B 端很多场景里，「会拒答」比「能答」更重要。**

通用消费级 AI 训练的目标是「尽量答、答得自然」。但 B 端客户买的是一份「我交给你的活儿能不能放心」——这套 AI 客服能让客户放心，不是因为它什么都能答，而是因为它**知道什么时候该闭嘴**。

把这件事抽象成一条原则：**能不用 AI 就不用，用了也省着。** 项目能跑下来靠的不只是模型，而是规则、阈值和兜底。
`,
      en: `## Background

A laser-equipment maker — single machines run into serious money. Their buyers are manufacturing line managers and procurement teams, and the questions they ask aren't "what does your product cost." They're "I'm cutting 3mm stainless with your 3000W fiber laser — what's the right speed, assist-gas pressure, and focal position for this job?"

**Two traits of these questions:**

1. **Highly technical.** Clients need answers tailored to their workpiece, line, and equipment — not generic explanations.
2. **Costly mistakes.** Machines are expensive; one bad parameter recommendation can ruin a batch, force rework, and cost far more than a single support ticket.

They had a deep archive of product technical documentation — long-form manuals plus a lot of diagrams (optical-path diagrams, cutting-parameter tables, exploded structural drawings).

**Goal:** an AI support agent that's both deeply technical **and** disciplined enough to say "I don't know" rather than guess wrong.

---

## Why This Was Hard

Standard RAG handles text well, but laser manufacturing has two extra challenges:

1. **Diagrams carry the data.** Many key facts live inside drawings — optical layouts, parameter tables, dimensional specs — that text-only retrieval can't reach.
2. **Wrong answers are expensive.** A consumer support bot can apologize. A wrong parameter recommendation can cost a client an entire batch.

We had to do two things: **let the AI see the diagrams**, and **let the AI stay quiet when it shouldn't answer.**

---

## Approach

### Multimodal diagrams: Qwen2.5-VL + fine-tuning

We deployed the **Qwen2.5-VL multimodal model (~32B)** — a ViT vision encoder + Qwen LLM backbone that accepts images and text together. We fine-tuned it lightly on the client's own archives:

- Cutting parameter tables (power, gas pressure, speed, focal position)
- Optical path diagrams (spot size, lens placement)
- Exploded structural drawings (part names, assembly relations)

We used their historical docs plus a few hundred to ~1000 engineer-labeled Q&A pairs as supervised fine-tune data — enough to bring diagram-recognition error down to usable levels.

### Text retrieval: standard RAG

For the long-form docs (manuals, maintenance guides, process SOPs), we ran standard RAG — chunking, vector indexing, semantic retrieval. Text and diagram evidence are merged in the same answer module.

### "Better silent than wrong"

This was the **hardest part** of the build. We layered three fallbacks:

1. **Prompt rules.** Hard constraints: only answer based on retrieved evidence; never invent.
2. **Confidence thresholding.** The multimodal model emits a confidence with each answer — low confidence triggers fallback.
3. **Hard fallback reply.** "I'm not certain about this — please contact our support engineer." And the thread is forwarded to a human.

After the three layers, the AI is **90%+ accurate** on the cases it should answer — **closer to 95%** — and stays silent when it shouldn't speak. That's exactly the boundary the client wants.

**Net result: 75%+ of customer questions are resolved by AI without a human in the loop.**

---

## Channels

The deliverable wasn't a separate cloud tool — it was **embedded into the client's own entry points**:

1. **Web widget.** A floating chat icon in the bottom-right of their website.
2. **Their own mini-program.** The same Q&A API, embedded in their WeChat mini-program.

Both consume the same AI backend and knowledge base — update once, both stay in sync.

---

## Final Thoughts

The deepest lesson from this build: **in many B-side scenarios, "knowing when to stay silent" matters more than "being able to answer."**

General-purpose consumer AI is trained to "answer fully and naturally." But B-side clients buy a guarantee: "can I trust this with my work?" — and that trust comes less from coverage than from **knowing when to shut up.**

It's the same principle as our project rule: **don't reach for AI when rules will do — and keep it lean when you do.** What makes the system safe isn't the model. It's the rules, the thresholds, and the fallbacks.
`,
    },
  },
  'outbound-lead-automation': {
    industry: { zh: '外贸 / 跨境电商', en: 'Cross-border / Export' },
    title: { zh: '出海企业海外获客自动化系统', en: 'Overseas Lead-Gen Automation for an Exporter' },
    coreMetric: '3x+',
    coreMetricLabel: { zh: '客户开发效率提升', en: 'Outreach efficiency lift' },
    content: {
      zh: `## 背景

2026 年一二月份，新年期间，我们接的一个小项目。客户是一家做劳保手套的厂子老板。他本来就有海外业务——但海外获客一直让他头疼。

他不是不懂产品，是**不懂海外客户**。不知道怎么找到国外的潜在买家，不知道怎么跟他们开口说话，也不知道怎么判断对方到底需不需要他的货。

他找到我们的时候，需求很具体：

> **「帮我自动找到可能需要劳保手套的海外客户，把信息整理好发我手机上让我看一眼，确认完你再发邮件。」**

我们把这个活儿拆成了三个连续的环节来做。

---

## 三步把"找客户"自动化

### 第一步：找公司

通过 **Google Maps API**，按行业 + 地区关键词检索潜在买家实体公司。每检索一次拿回一批带公司名、地址、行业、电话、网址的原始记录。

### 第二步：判断"是不是潜在客户"

拿到这批公司信息，自动去查他们的——有没有相关采购需求记录、官网在卖什么产品、规模大概多大、地理分布合不合理——判断这家公司**有没有可能需要劳保手套**。

这一步要做大量的 HTTP 抓取 + 内容解析 + 业务推理。如果不做这一步就开始群发，邮件基本石沉大海。

### 第三步：写开发信

通过了第二步过滤的客户，进入邮件写作环节。每封邮件**结合这家公司的具体情况写**——你们做什么、规模多大、为什么可能需要劳保手套、我们的产品在什么价位、能解决什么问题。

> 这里有个小插曲：客户**一开始不知道外国人做生意是用邮件的**。是我们调研做出来之后告诉他："对，他们就是用邮件，邮件是主战场。"——所以整套邮件系统也是我们帮他一起搭的。

### 三块要齐全

整套系统由三块拼起来：**找客 → 分析 → 发邮件**，一块都不能漏。

省掉任何一块自动化都做不出来——没有第一步就没有线索池；没有第二步就是群发垃圾；没有第三步就是「你好我们公司做手套」那种没人回的硬广。

---

## 怎么让他"在手机上就能用"

写好邮件不算完。这位老板日常工作不在办公室，他需要一个能**在手机上直接看、改、再发**的入口。

新年期间正好赶上了一个工具火起来：**OpenClaw**。当时我们第一时间接到他的**飞书**里，整套获客流程搬到了飞书侧。

通过飞书推过来的卡片，他能在手机上看到：

1. 今天这一批检索到几家潜在客户
2. 每家客户的简要画像 + 邮件草稿
3. 一键「发 / 改 / 跳过」

**人工审批点**嵌在工作流的中间——AI 自动找、自动分析、自动草稿，但**发出去之前**他要肉眼过一眼。等于把「AI 替他找活儿、他自己判方向」这条流程跑通了。

---

## 效果

上线之后这位老板跟我们说了一句让我们挺得意的话：

> 「以前自己一天能写十来封都不知道发给谁，现在一天一百封，有将近十个回我。」

- **人工时期：** 一天 ≈ 10 封，回 < 5 封
- **AI 自动化后：** 一天 100 封，回 10 封+

**单条回复成本几乎砍到 1/10，效率翻了近 10 倍。**

这件事也印证了我们做 B 端自动化的一条原则：**找到客户永远是第一步、也是最贵的一步**。自动化的价值不在于"省个发送邮件的几秒钟"，而在于把"找到谁、写得准"这两个最贵的环节都自动化了。

---

## 写在最后

项目不算大，但有几个我们比较得意的点：

1. **小项目也能用 AI 跑出真价值。** 老板一个人 + 一套自动化系统，海外获客效率翻了 10 倍。AI 不一定是要做"大项目"才能见效的。
2. **人工审批点是这种自动化的关键。** 不是每封邮件都该自动发。让老板过一眼，AI 替他找活儿、他自己判方向——这条流程跑得通。
3. **新工具要敢用。** OpenClaw 当时刚火起来一周，我们第一时间接进去——等于把"最新工具"顺接到了客户的日常工作流。客户体感是"用着就是最新的"，技术债和工具债都不积累。
`,
      en: `## Background

In early 2026 — over Chinese New Year — we took on a small project. The client: a factory owner who makes work gloves. He already had overseas business, but overseas lead generation was his bottleneck.

It wasn't the product he didn't understand — it was **the overseas buyer**. He didn't know how to find them, how to talk to them, or how to tell if they actually needed his gloves.

When he called us, his brief was very concrete:

> **"Find overseas customers who might need work gloves. Send me the list on my phone so I can scan it. Once I confirm, send the emails."**

We split this into three sequential steps.

---

## Three Steps to Automate "Finding Customers"

### Step 1: Find companies

We used the **Google Maps API**, querying by industry + geography keywords to retrieve potential buyer companies. Each query returned a batch of raw records: company name, address, industry, phone, website.

### Step 2: Judge "are they a likely customer"

For each company, we automatically scanned: are there signs of relevant procurement, what does their website sell, how big are they, does the geography make sense — to judge **whether this company might actually need work gloves**.

This step is heavy HTTP scraping + content parsing + business reasoning. Skip it and any mail goes straight to spam.

### Step 3: Write the outreach

Customers passing step 2 entered the email-writing stage. Every email is **written around that specific company** — what they do, how big they are, why they might need work gloves, what our price point looks like, what problem we solve.

> One small detail: the client **didn't initially know that overseas business runs on email**. We did the research, then told him: "Yes, email is the main battlefield." So we also helped him set up the email system from scratch.

### All three pieces matter

The system has three parts: **find → qualify → email**. Skip any one and the automation falls apart — no step 1, no pipeline; no step 2, you spam; no step 3, you send "Hi, we make gloves" into the void.

---

## How He Reviews It All on His Phone

Writing the email is half the work. The owner isn't at his desk all day — he needs a way to **scan, edit, and approve on his phone**.

Around New Year, a new tool had just gone viral: **OpenClaw**. We integrated it immediately, hooking the whole pipeline into his **Feishu** (the Lark-based team chat).

Through Feishu cards pushed to his phone, he could see:

1. How many potential customers were surfaced today
2. Each company's snapshot + the email draft
3. One-tap **Send / Edit / Skip**

The **human approval gate** sits right in the middle of the workflow — AI does the finding, qualifying, and drafting, but **before anything goes out, he eyeballs it**. Effectively: AI does the hunting, he decides the direction.

---

## Results

After launch, the owner told us something we were pretty pleased about:

> "Before, I could write ten emails a day and not know who I was sending them to. Now I send a hundred a day and get about ten replies."

- **Manual era:** ~10 emails/day, < 5 replies
- **AI automation:** 100 emails/day, ~10 replies

**Cost-per-reply dropped to roughly 1/10. Outreach throughput lifted ~10×.**

This project also validated one of our B-side automation principles: **finding the customer is always step one — and always the most expensive step.** The value of automation isn't "saving the few seconds of clicking send" — it's automating the two most expensive steps: who to contact and what to say.

---

## Final Thoughts

The project isn't big, but a few things came out of it that we're proud of:

1. **Small projects can still drive real AI value.** One owner + one automation stack = 10× outreach. AI doesn't need a giant project to deliver.
2. **The human approval gate is the key.** Not every email should auto-send. He eyeballed it; AI hunted, he decided direction. The workflow holds.
3. **Use new tools early.** OpenClaw had been live about a week when we plugged it in. The client gets to feel "I'm using the newest stuff," and we don't accumulate tool or tech debt.
`,
    },
  },
}

export default function CaseContent({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('caseDetail')
  const data = caseData[slug]

  // Anchor back to the matching case row in the Practice list. If the slug
  // isn't in the index yet (case-3 / case-4 not yet implemented), fall back
  // to /practice as a plain list link.
  const detailSlugs = ['programming-language-migration', 'securities-ai-platform', 'laser-equipment-ai-customer-service', 'outbound-lead-automation']
  const caseIndex = detailSlugs.indexOf(slug)
  const backHref =
    caseIndex >= 0 ? `/${locale}/practice#case-${caseIndex + 1}` : `/${locale}/practice`

  return (
    <article className="relative isolate overflow-hidden pt-24 pb-20 sm:pb-28 lg:pb-32">
      <div className="subpage-mobile-static relative z-10 max-w-read mx-auto px-5 sm:px-6 lg:px-8">
        <motion.a
          href={backHref}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="group inline-flex min-h-[44px] items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors text-sm mb-10 sm:mb-12"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          {t('backToCases').replace(/^←\s*/, '')}
        </motion.a>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 border-b border-rule pb-10 sm:mb-12 sm:pb-12"
        >
          <span className="font-mono text-xs text-accent tracking-wide">
            {data.industry[locale as 'zh' | 'en']}
          </span>
          <h1
            className="break-words font-medium text-text-primary mt-3 mb-6 leading-[1.15] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(28px, 5.5vw, 48px)' }}
          >
            {data.title[locale as 'zh' | 'en']}
          </h1>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-medium text-text-primary font-mono">
              {data.coreMetric}
            </span>
            <span className="text-text-tertiary text-sm">
              {data.coreMetricLabel[locale as 'zh' | 'en']}
            </span>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
          // `prose prose-invert` were @tailwindcss/typography classes that
          // never resolved in this project (no plugin installed) — stripped.
          // `min-w-0` prevents the inner markdown content from forcing the
          // grid cell to overflow on narrow phones.
          className="article-prose max-w-none min-w-0"
        >
          <Markdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-medium text-text-primary mt-12 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium text-text-primary mt-8 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-text-secondary leading-relaxed mb-4">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="text-text-primary font-medium">
                  {children}
                </strong>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside pl-5 space-y-2 mb-4 text-text-secondary">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside pl-5 space-y-2 mb-4 text-text-secondary">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">
                  {children}
                </li>
              ),
              code: ({ children }) => (
                <code className="bg-bg-hover px-1.5 py-0.5 rounded text-sm font-mono text-accent">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-bg-hover p-4 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary mb-4">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="border-rule my-8" />
              ),
              table: ({ children }) => (
                // Mobile: table extends past the right edge with horizontal
                // scroll (the right-edge fade in CSS hints "more →"). Tightened
                // min-w from 560 → 420 so the scroll range is reasonable.
                <div className="article-table-scroller mb-6 overflow-x-auto">
                  <table className="w-full min-w-[420px] border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="text-left py-3 px-4 border-b border-rule text-text-primary font-medium">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="py-3 px-4 border-b border-rule text-text-secondary">
                  {children}
                </td>
              ),
            }}
          >
            {data.content[locale as 'zh' | 'en']}
          </Markdown>
        </motion.div>
      </div>
    </article>
  )
}
