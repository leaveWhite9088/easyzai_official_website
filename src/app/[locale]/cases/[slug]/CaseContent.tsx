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
- Zero changes to the existing system, keeping risk under control
- Independent AI service deployment, keeping performance under control
- Independent scenario rollouts, keeping the timeline under control

---

## Three Scenarios

We chose three scenarios as entry points, each with its own logic.

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

If you have a legacy system you'd like to add AI capabilities to, feel free to reach out.`
    }
  },
}

export default function CaseContent({ locale, slug }: { locale: string; slug: string }) {
  const t = useTranslations('caseDetail')
  const data = caseData[slug]

  return (
    <article className="relative isolate overflow-hidden pt-24 pb-20 sm:pb-28 lg:pb-32">
      <div className="subpage-mobile-static relative z-10 max-w-read mx-auto px-5 sm:px-6 lg:px-8">
        <motion.a
          href={`/${locale}#cases`}
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
          className="mb-10 border-b border-border-subtle pb-10 sm:mb-12 sm:pb-12"
        >
          <span className="font-mono text-xs text-accent tracking-wide">
            {data.industry[locale as 'zh' | 'en']}
          </span>
          <h1 className="break-words text-[2rem] sm:text-3xl lg:text-4xl font-medium text-text-primary mt-3 mb-6 leading-tight">
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
          className="article-prose prose prose-invert max-w-none min-w-0"
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
                <hr className="border-border-subtle my-8" />
              ),
              table: ({ children }) => (
                <div className="max-w-full overflow-x-auto mb-6">
                  <table className="min-w-[560px] w-full border-collapse">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="text-left py-3 px-4 border-b border-border-subtle text-text-primary font-medium">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="py-3 px-4 border-b border-border-subtle text-text-secondary">
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
