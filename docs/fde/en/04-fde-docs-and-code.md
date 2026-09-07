# How FDEs Govern Docs and Code: Making AI Actually Useful

> EasyZ FDE Methodology · Part 4

Part 3 covered the three disciplines of project execution: the daily plan, module decomposition, and Git branch discipline.

This part addresses something more fundamental: **the governance of documents and code.**

Why do these two things need "governance"? Because in FDE projects, **AI is the primary producer of code** — and when AI writes code, it reads your documents extensively and works through your codebase. The quality of what you feed it is the quality of what it produces.

Documents used to be written for humans. Humans have a talent: finding information in chaos. Slightly messy docs, imperfect naming, an outdated version — humans tolerate it, guess around it, ask about it. **AI can't. Feed it a pile of chaotic documents and it will earnestly produce chaotic code.**

So the goal of governance is clear: **every document and every piece of code AI touches must be clean, isolated, and current.**

---

## 1. Document Minimalism: Keep Only the Useful Ones, and Name Every One Well

The first principle runs against intuition: **documents aren't better when there are more — they're better when there are fewer.**

Our practice: **keep only the handful of documents that are actually useful.** Outdated proposals, obsolete meeting notes, intermediate trial drafts — clear them all out. Why? Because AI can't tell "is this document deprecated?" It believes whatever it reads. An outdated requirements doc left in the directory is a ticking time bomb.

For the documents that remain, do three things:

1. **Categorize them.** Requirements, business rules, API specs, data structures — each in its own directory, never mixed.
2. **Name them well.** Naming is AI's navigation. `procurement-table-fields-v3.md` versus `new-doc-final-FINAL.md` — AI's comprehension cost for the former is far lower. Same for humans.
3. **Version numbers must be explicit.** When the business plan changes, the document's version bumps. If AI reads an old-version document, it writes old-version logic — and this kind of bug is extremely hard to track down: the code looks "obviously correct," except it's correct for a requirement from three months ago.

**Version chaos in documents eventually becomes hidden bugs in code.**

---

## 2. Understand the Business and the Data Before Writing Code

The second principle is about what happens before anyone touches a keyboard: **before writing code, the whole team must understand the business.**

Note: the *whole team*, not just the FDE. Part 1 described how the FDE spends days at the client site and walks the team through the business each evening — after all that, there's one more pass before building: **ask about every business detail, as thoroughly as possible.**

To be clear: you can never ask about everything; there will always be fuzzy corners. But between "ask as thoroughly as possible" and "close enough, let's start coding" lies the entire project's rework rate.

After the business questions, there's a step many people skip: **look at the data sources, and decide whether data governance is needed.**

- Where does the data come from? How many sources?
- Are the formats consistent? Do the fields line up?
- Is there dirty data, missing values, inconsistent definitions?

**Some data sources are so messy that nothing works without data governance first.** When the client's finance system and inventory system don't reconcile, you have to clean the data before anything built on top of it means anything — however good the code is, the numbers it computes will be wrong.

Data governance isn't sexy, but it's the foundation. **Skip the foundation, and the faster you build, the louder the collapse.**

---

## 3. Documents and Code Must Both Be "AI-Facing"

The third principle is the most counterintuitive: **the document system and the code structure must both be designed for AI.**

### Separate the documents: context must not mix

**Keep frontend and backend docs separate, and keep different business domains' docs separate.** Otherwise, when AI writes code, its context contains everything at once — total chaos: frontend component work polluted with backend API details, the procurement module's work polluted with inventory rules. Output quality drops immediately.

Once separated, each task is fed only the relevant documents, and AI's attention stays focused.

### Isolate the code: don't chase reuse

This one is even more counterintuitive. Traditional software engineering worships DRY (Don't Repeat Yourself) — reuse whatever can be reused. **In AI-collaborative projects, our principle is the opposite: keep code isolated; don't pursue reuse.**

Why? Because reuse is friendly to humans but is coupling to AI:

- When a human modifies a shared module, they know to check every caller
- **When AI modifies a shared module, it only looks at the context you gave it. It finishes, side-effects ripple into every place that uses the module, and it thinks it did a great job.**

With isolated code, every module is independent, replaceable, and independently verifiable. When AI changes module A, it is *physically impossible* for it to break module B. A bit of duplicated code buys a dramatically smaller blast radius — worth it however you do the math.

**Design code for humans and you optimize for "write less." Design code for AI and you optimize for "can't break it."**

---

## Closing Thoughts

The three principles are one thing: **lower AI's comprehension cost.**

- **Document minimalism** ensures what AI reads is correct
- **Understanding the business and data first** ensures what AI builds is correct
- **AI-facing docs and code** ensure AI doesn't break everything else while changing one thing

Governing documents and code looks like "housekeeping." In the AI era, it's actually an FDE's core competency. **The cleaner your raw materials, the more reliable AI's output.**

Next: *How FDEs Work with AI* — keeping AI inside its boundaries in complex business.
