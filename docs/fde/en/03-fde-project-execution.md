# How FDEs Drive Projects: Turning Vague Requirements into Verifiable Results

> EasyZ FDE Methodology · Part 3

The first two parts were about the "outside": how to align with the client, and how to survive between the boss and the surprises.

This part is about the "inside": **once requirements are aligned, how do you turn them into a verifiable result?**

Many people assume project execution runs on project-management tools — Gantt charts, kanban boards, milestones. What we've learned on FDE projects: **none of those tools help. What helps is three disciplines.**

Why don't the tools help? Because requirements in an FDE project are fluid; plans never keep up with change. You draw a two-week Gantt chart, and on day three the client changes the requirements. In an uncertain environment, **the only thing you can control is "today."**

The three disciplines are: **the daily plan, module decomposition, and Git discipline.** One governs rhythm, one governs acceptance, one governs traceability.

---

## 1. The Daily Plan: Whatever Module Is Scheduled for Today Gets Done Today

Our rule: **project progress must be written down, at the granularity of "what gets done each day."**

Not "finish the data module this week" — "today, finish the XX endpoint of the data-acquisition module; tomorrow, render the fields of the procurement planning table." Before work starts, today's task is fixed. Before work ends, today's task is done.

Why so granular? Because FDE projects are usually short. Planning by the week equals no plan at all — by the time you notice the week went off-track, the week is gone. **Plan by the day, and you can only ever be one day off-track.**

### Ship something real the same day, even if it's ugly

The most critical line in the plan: **whatever module is scheduled for today, you must see it today — even if it's ugly, get it out the same day.**

Between "ugly but done" and "perfect but unfinished," always choose the former, because:

- Ugly things can be improved; unfinished things can't be anything
- Something shipped today gives tomorrow's plan somewhere to stand
- Tag everything you ship with a **version number** so you can roll back later — when the client says "I think last week's version was better," you can switch straight back instead of relying on memory

### Something real is the precondition for alignment

This connects to the "high-frequency alignment" from Part 1: **when you talk to the client, you must have something real in your hands.**

We stepped on this rake: today's work wasn't finished, so the next day we talked to the client empty-handed — "here's what we plan to do." And the client's reaction? **They agree with everything.** "Yes, yes, do it your way" — because with nothing in front of them, there's nothing to object to.

Then the thing actually gets built, they look at it, and: "This isn't what I wanted."

Verbal alignment has an alignment rate of roughly zero. **When you hold something real, the client can remember what they actually want. When your hands are empty, the client is just being polite.** So the daily plan isn't internal management — it's the precondition for external communication. Today's artifact is tomorrow's ammunition for alignment.

---

## 2. Module Decomposition: Every Module Needs an Entrance and an Exit

Once the requirements are understood, the first move is not writing code. It's **decomposition**.

Break the requirements into modules. Build each one separately, accept each one separately. The key standard: **every module must independently answer "does it run through or not" — it has a clear entrance and a clear exit.**

What does that mean?

- **Data-acquisition module**: the entrance is the data source; the exit is "can I clearly see this module's output" — what the pulled data looks like, whether the fields are right, whether the volume is enough. One glance tells you.
- **Procurement planning table module**: the entrance is cleaned data; the exit is **the procurement planning table itself** — when this module is done, I must be able to see the table, not hear "the logic is all written."

The anti-pattern is **lumping everything together from day one**: data acquisition, cleaning, computation, and display all written as one flow. When it fails to run, you can't tell which link broke; when the client asks "when can I see the procurement table," you can only answer "soon."

Once you decompose, everything changes:

- Every module's progress is **verifiable**, not "I feel it's almost there"
- Problems get located in a specific module instead of requiring a full-chain investigation
- When demoing to the client, you walk through module by module, and every module has something visible to show

**"Almost done" is the most dangerous progress report.** With entrances and exits, progress has only two states: it runs through, or it doesn't.

---

## 3. Git Discipline: Branches Are for Work, the Mainline Is for Records

The third discipline is about Git. First, a premise: **in FDE projects, the mainline history will later be used for rollback and for making changes.** When the client says "go back to Wednesday's version," or the team asks "when was this change introduced," both depend on a clean mainline history.

But writing code is impossible without trial and error. What to do? **Use branches to separate "working" from "archiving":**

- **Start a new branch for every new feature.** One module or one feature, one branch. Trial and error, parameter tuning, tearing it down and starting over — all of it happens on that branch. A messy branch history is fine; it's scratch paper.
- **Merge only after acceptance, and merge with discipline.** When a module runs through and is demoable, the branch gets merged into the mainline. At merge time, the scattered trial-and-error commits get consolidated into one clear record stating what this version "is and can do."
- **The mainline keeps only milestones.** Every node on the mainline should be a point where "if the project breaks tomorrow, I can come back here."

The anti-pattern is committing as you go directly on the mainline: "try this parameter," "revert that change," "try again" — the history drowns in noise, and finding "a version that runs" means digging through dozens of commits. That history is useless.

In one sentence: **branches are scratch paper; the mainline is the archive.** Drafts can be messy; every entry in the archive must mean something.

---

## Closing Thoughts

The three disciplines are really three faces of one thing:

- **The daily plan** guarantees something real every day
- **Module decomposition** guarantees every artifact is verifiable
- **Git discipline** guarantees every artifact is traceable

The essence of project execution is turning "one big vague requirement" into "a chain of small concrete results." **One artifact a day; every artifact verifiable; every acceptance traceable** — with these three in place, a project can only get so chaotic.

Next: *How FDEs Govern Docs and Code* — how to make AI actually useful.
