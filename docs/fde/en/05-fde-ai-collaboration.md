# How FDEs Work with AI: Keeping AI Inside Its Boundaries in Complex Business

> EasyZ FDE Methodology · Part 5

The previous four parts — from aligning with the client to governing docs and code — were all, in a sense, preparation for this one: **how to put AI to work for real, without letting it spin out of control.**

A fact up front: in our FDE projects, AI is not an auxiliary tool. **It is the primary executor** — a large share of the code, document processing, and data wrangling is done by AI.

But AI has a defining trait: **it works extremely fast, and it makes mistakes extremely fast.** If you don't draw its boundaries, it can make a bigger mess in ten minutes than a person could in a week.

So working with AI is not about "getting AI to do more." It's about **keeping AI inside its boundaries**. Our answer is three things: **isolation, fast localization, and knowing what AI can't do**.

---

## 1. Isolation: AI Works Inside One Module at a Time

In Part 3 we talked about module decomposition — every module has an entrance and an exit, so progress is verifiable. In AI collaboration, **the same move has a second layer of value: it draws AI's task boundary.**

This is the exact opposite of "letting AI freestyle."

Freestyling looks like this: you tell AI "build me a procurement planning system," and watch it generate several thousand lines of code in one breath, with data acquisition, cleaning, computation, and display all tangled together. It looks impressive at first glance, and fails everywhere when you run it — **and when something breaks you can't fix it, because you can't understand the giant blob it wrote either.**

Our approach is the reverse: **isolate the modules, and let AI work inside one module's boundary at a time.** Each module's Input and Output is AI's task spec — it only needs to know "what do I get, what must I hand back," not understand the whole system.

**The more an AI task looks like an "interface," the more reliable its output. The more it looks like a "vision," the more its output looks like a disaster.**

---

## 2. Fast Localization: If You Can't Locate the Problem, AI Will Burn Through Your Tokens

The biggest payoff of modularization only shows up when something breaks: **localization.**

What happens when a problem can't be located precisely? **AI goes looking for it across the entire chain.**

An error surfaces, and you ask AI "what's going on?" If module boundaries are unclear, here's what AI does: it reads the data-acquisition code, then the cleaning logic, then the computation, then the display — guessing and attempting fixes at every step. After a full round:

- **Time cost**: a ten-minute fix turns into an afternoon of investigation
- **Token cost**: AI read through mountains of irrelevant code — that's real money
- **Worse**: in the course of "investigating," it casually modifies things it shouldn't — fixing one bug and introducing three

With proper modularization, troubleshooting is a completely different picture: every module has a clear Input and Output, so **when something breaks, first check whether the output is wrong, then whether the input was right** — right input plus wrong output means the problem is inside this module; wrong input means move one module upstream. Two checks, and the location is pinned down.

**Precise localization is a seriously underrated capability in AI collaboration.** With it, AI fixing a problem is surgery; without it, AI fixing a problem is fumbling in the dark — billed by the token.

---

## 3. Know the Boundary: AI Does the Work; Humans Absorb the Chaos

The last thing — and the one requiring the most clear-eyed honesty: **there are things AI definitively cannot do.**

Part 2 said it: real business always has surprises. Platform rate limits, interfaces down for midnight maintenance, business steps that break all the time, the veteran on leave. These things share one trait — **they appear in no document, follow no pattern, and look different every time.**

AI can't handle this class of problem, and shouldn't be asked to:

- AI is good at tasks that are **structured, describable, and have clear inputs and outputs**
- Real-business surprises are **unstructured, ad hoc, and require judgment and coordination**

So our division of labor is: **AI does the work; humans absorb the chaos.**

But "humans absorb the chaos" doesn't mean absorbing it forever. It's a three-stage handover:

1. **Absorb it yourself first.** Early in a project, the FDE handles surprises on-site in person — when a system step breaks, we step in; when platform rules block a process, we sit with the client and find a way around. This stage can't be skipped: if you're never on-site, you never learn what the business really looks like.
2. **Then teach the client's people to absorb it.** An FDE can't stay embedded at the client's site forever. So while absorbing, we distill the response playbook and teach it to the client's own team — who to call when which step breaks, which backup path to take when a platform acts up, what to escalate and when.
3. **Finally, the client absorbs it themselves.** By late in the project, when a surprise happens, it should be the client's own team handling it — not us. Only then is the FDE's delivery truly complete.

AI runs the structured parts fast and steadily; the time that frees up is exactly what the humans spend walking through these three stages. **Finishing only the first stage makes you an outsourcing vendor. Finishing all three makes you an FDE.**

This isn't a defect of AI — it's a division of labor. **Expecting AI to digest every surprise is like expecting navigation software to drive the car for you — it can tell you which way to go, but when the road collapses, a human foot has to hit the brake.**

---

## Closing Thoughts

This series is now complete. Five parts, five faces of one job:

1. **Alignment**: the client figures it out together with you — through frequency, rhythm, quality, form, and presentation
2. **Survival**: win the boss's support; accept that surprises never stop
3. **Execution**: one artifact a day; every artifact verifiable; every acceptance traceable
4. **Governance**: docs and code designed for AI, so AI gets clean raw materials
5. **Collaboration**: draw AI's boundaries, localize problems fast, and hand chaos from yourself to the client's own team

The essence of the FDE role is being the human bridge between "a business that can't be articulated" and "a system that has to run" — and AI doesn't remove that bridge; it makes building it an order of magnitude faster. **Provided that you know how to keep it inside its boundaries.**

If you have a complex business scenario that "can't be clearly stated but badly wants to be built," come talk to us. We can't promise there will be no surprises — but we can promise that when surprises come, someone absorbs them, and before we leave, we'll teach your people to absorb them too.
