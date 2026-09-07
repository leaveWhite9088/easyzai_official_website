# How an FDE Survives: Earn Trust First, Then Absorb the Chaos

> EasyZ FDE Methodology · Part 2

In Part 1 we covered how an FDE aligns with the client — 5 moves for day-to-day communication.

But the truly hard part of FDE isn't "communication skills."

It's **survival**.

No matter how good your work is, two things can kill you:

- **The boss doesn't trust you** — you never even get through the door
- **Reality hits you with surprises** — however well you planned, you get sent back

These two aren't problems "technique" can solve. They're **reality you have to accept**.

---

## 1. How to Make the Boss Trust You

This is the hardest part — and the most critical.

An FDE doesn't just build a system and walk away. **An FDE actually changes how the client works.**

You ask the client to change established processes, abandon established habits, and trust something new. Inside the client's organization, that creates resistance.

The most typical scene we've encountered: you present the plan to the business side, they nod along the whole time, and at the end they say—

> "Our old process works just fine. Why should we relearn everything for your 'AI efficiency'?"

They're not targeting you. **They're accountable for their own KPIs.** The old process runs fine; changing it offers them only risk and no upside: if the change works, it's "expected"; if it fails, it's their fault. So their natural instinct is to stall — and to downplay your results.

In this situation, an FDE alone can't push anything through. **You need the boss's support — not a department manager, the real decision-maker.**

### The chicken-and-egg problem: why should the boss trust you?

You haven't built anything yet. Why should they believe in you?

Our lesson: don't try to solve this by *talking*. Solve it by *doing*:

1. **Build one small but complete result first.** Pick the most painful scenario inside the client's organization that's also easy to show results on, and build something that runs in a week or two. It doesn't have to be perfect — it has to make the boss see, at a glance, "oh, so this can be done this way."
2. **Speak with results, not with plans.** The boss can't follow your technical plan and doesn't want to. But they understand "this table used to take half a day of manual work; now it's one click." **Show them the result. Don't lecture them on architecture.**
3. **Talk directly to the top.** Don't let your "contact person" filter the information. A contact person may, out of self-protection, water down your results or shelve your proposal — your hard work may never reach the decision-maker's desk at all.

Some of our current projects are stuck for exactly this reason: **we only talked to the business side, never to the boss.** The business side doesn't want to change, or finds the cost too high to risk — and things freeze. When you can talk directly to the top, much of that resistance simply isn't resistance anymore.

### A deeper judgment

If you fail to win the boss's support, the FDE engagement at this client is basically dead.

**That's not a capability problem. It's a project-structure problem.**

Recognizing that structure matters more than pushing harder. Pushing harder usually ends like this: you give ten parts of effort, get three parts of cooperation, the delivery falls short — and the blame is still yours.

---

## 2. Accept the Complexity of Reality: There Are Always Surprises

The second reality — and the least motivational-sounding one:

**In FDE projects, there are always surprises.**

The requirements document describes the ideal process. The real business is something else:

- One of the client's business lines is running a big promotion next week; the system can't be touched this month.
- A third-party platform suddenly changes its API; your code stops working.
- The client's finance system and inventory system don't reconcile; you have to clean the data first.
- Every platform has its own rules: some rate-limit you, some maintain at midnight, some have documentation that doesn't match actual behavior.
- Some of the client's business steps "break all the time" and have always been patched manually by one veteran — who's on leave next week.
- The client's leadership suddenly changes, and the new leader wants to re-evaluate the project.

**None of these things appear in any requirements document.** You only run into them, one by one, by being on-site every day.

And note the last point: **many surprises can't be solved by technology — they have to be handled by a person.** When a step of the system breaks, the FDE steps in; when platform rules block a process, someone has to sit with the client and find a way around. Expecting AI or process automation to digest these surprises is unrealistic.

FDE is not a job where "good planning means smooth execution." **It's a job of "planning + constant firefighting."**

### Our surprise-response mechanism

Accept this, then build your own mechanism for handling surprises:

- Every module has a degradation plan. If the main path breaks, is there a backup route?
- Every critical node has a Plan B. If this platform acts up, where else can the data come from?
- Before leaving work each day, confirm: "If this breaks tomorrow, what are my options?" Thinking it through before you leave beats being woken up by a phone call at midnight.

This isn't pessimism. It's the real rhythm of FDE. **People who treat surprises as the norm are the ones surprises can't derail.**

---

## Closing Thoughts

Part 1 covered aligning with the client — those 5 moves are the "daily routine."

But in real FDE work, **the routine is only half the job. The other half is surviving.**

How do you survive?

- Make the boss trust you; win top-down support
- Accept surprises; build a response mechanism

These aren't one-time tasks. They run **through the entire project**.

FDE is not a "deliver to plan" job. FDE is **getting things done in a reality that keeps changing**.

Next: *How FDEs Drive Projects*.
