# The First Hurdle for FDE: Aligning with the Client

> EasyZ FDE Methodology · Part 1

Before we got into FDE, we thought the hardest part would be writing code. We later learned the hardest part is talking to clients.

Not that talking itself is hard — it's that **clients often don't know what they want themselves**.

A client says they want a "procurement planning table." We ask which fields they need. "The usual ones." What are "the usual ones"? Inventory? Suppliers? Approval flow? Tax rates? They can't answer — not because they won't, but because they genuinely never thought about it.

This is the first reality of FDE: **you're not facing a client who has it figured out — you're facing a client who figures it out together with you.**

So what do you do? After stepping on a few rakes, we settled on 5 moves.

---

## 1. Align Frequently: Clients Don't Need to "Tell You Once" — They Need to See Something Before They Remember

Many people think: let me do the research first, get everything straight, and then go talk to the client. That way my questions look more professional.

Wrong. **When a client says "the usual ones," it's not laziness — they need to see something before they can remember what they want.**

Ask them "do you need an approval flow?" and they might say "probably not." But put a working demo with an approval flow in front of them, and they immediately say "oh, this I want."

So the key isn't how deep you ask in one session. It's **frequency**.

Our rule of thumb: **align once every day or two.** Even if it's just a 15-minute standup, even if it's only "what we did yesterday, what we're doing today."

You might worry this annoys the client. It doesn't. What clients fear isn't being asked often — it's "I gave you the requirements, waited two weeks, and got something completely off-track."

**The essence of high-frequency alignment is replacing the big-bang requirements review with a small-step feedback loop.**

---

## 2. Morning and Evening Meetings: Replace Retelling with Rhythm

"Talk whenever something comes up" isn't enough. You need **structure**.

In the early phase of a project, we usually run **two meetings a day**:

- **Morning meeting**: align on progress. Which module gets built today, what version ships when it's done, who owns it.
- **Evening meeting**: align on the business. I spend the day at the client's site absorbing their business; in the evening I walk the team through it — what's essential, what's edge-case, what the client says they don't need but actually does.

**Why must the FDE learn the business first-hand?**

Because an FDE is not a "pure middleman." **An FDE also writes code, also designs solutions, also carries delivery.** The client's business isn't something I just relay to the team — I have to understand it deeply myself, and get my own hands dirty.

If the FDE doesn't know the business, the team is forced to write code without understanding it. What comes out makes no sense to the client, and rework costs explode.

We often spend our days embedded at the client's site — **listening to how they complain, watching how they operate, reading their old Excel files**. In the evening we walk through the business with the team until everyone gets it. **The bar: the whole team understands the business together.**

**An FDE is not a megaphone — they're the person leading the team.** Without an FDE guiding the team through the business, the client's business and our code will always speak two different languages.

---

## 3. Do Homework Before Asking: A Questionnaire Beats Small Talk

In the beginning we loved "let's hop on a call and chat." After the call, we discovered: **transcribing the recording was a nightmare.**

Clients talk in fragments, and the main thread gets dragged off by side topics. A two-hour meeting recording took us four hours to distill into requirements.

Later we built a meeting-processing skill that transcribes recordings and extracts requirements and business facts. We thought: finally, this will save us some effort.

Turns out: **tools can't save a meeting.**

A client says "that thing, well, it's kind of like that XX system, and then maybe sometimes…" — and the AI extracts "the system is kind of like that one." And then? Where's the requirement?

If the conversation itself has no quality and no main thread, **feeding it to AI is garbage in, garbage out**. A skill can amplify the efficiency of a structured meeting; it can't rescue an unstructured one.

**The root cause isn't the tool — it's the meeting itself.** Without a structured meeting, no one can organize it into anything useful.

So we got smarter: **get a rough picture first, then design a questionnaire, then go ask with the questionnaire in hand.**

The order matters:

1. **Do a preliminary pass**: look at the client's current systems, process docs, historical tickets — get a map in your head.
2. **Design the questionnaire**: list what needs confirming, grouped by module, three to five questions per block. **The trunk must be clear; branches are allowed.**
3. **Ask with the questionnaire**: the client just answers "yes / no / I don't know" — no storytelling required.

Now recordings are easy to process. The Q&A structure is clear, and when you later want to check "what exactly did they say about the procurement flow," you can locate that sentence in three seconds.

**Without a structured meeting, nobody wants to read the transcript afterwards.**

---

## 4. Clients Don't Know What a Demo Is: Give Them an MVP They Can Touch

We used to tell clients "we built a demo, take a look."

The universal reaction was: **"What's a demo?"**

They're not being modest — they genuinely don't know. "Demo" is tech-industry vocabulary; it means nothing to them. What they care about is:

> "Can I actually use this thing?"
> "Can it run my scenario?"
> "Can I try it tomorrow?"

It took us a while to realize: **clients want an MVP, not a demo.**

- A **demo** is "shown to people" — its purpose is to display capability and explain an approach.
- An **MVP** (Minimum Viable Product) is the "smallest usable product" — its purpose is to let a user actually get their hands on it.

The two look alike, but they're fundamentally different.

Show a client a demo and they'll say "looks nice" — and then? Nothing. **After watching a demo, a client won't go use it on their own, because there's no entry point for "using."**

Hand a client an MVP and they can immediately click around and try things — **and they'll immediately tell you "this is wrong" and "that needs to change."** That feedback is valuable because it comes from real usage and directly drives the next iteration.

So our principle: **ship MVPs, not demos.**

Concretely:

- No "pretty but unclickable" pages → every button and every field must actually work
- No "concept slides" → it must support login, real operations, and real data
- No "framework demos" → it must run inside the client's real business, even if it's ugly

**Clients want something they can see and touch, not something they can admire.** An ugly but usable MVP beats a beautiful but unclickable demo a hundred times over.

---

## 5. Skip the Intermediate Details: Present the Final Form

Having an MVP isn't enough — **how you present** matters too.

We used to make this mistake: when reporting to the client, we'd narrate the whole journey — which versions we tried, what problems we hit in data cleaning, which interface we rewrote twice. We thought this "showed the workload." It only confused them.

Worse: **clients grab onto some intermediate detail and raise a problem that never needed solving.** You casually mention "we abandoned an earlier version of this," and they ask "why? Was that one better?" — and now you spend half an hour discussing a dead end.

So we set a rule: **when delivering interim results or communicating with the client, always present the final form, and omit the intermediate details.**

This isn't hiding things — it's reducing ambiguity. The client cares about "does this result work," not "what did you go through."

Concretely:

- Show them **the final screen, the final table, the final workflow** — never the work-in-progress
- The only two things you need to communicate: **how to use it, and what to watch out for**
- Intermediate options, trial and error, internal debates — **don't narrate unless asked**; if asked, answer in one sentence

**Every intermediate detail you narrate is one more doorway for misunderstanding.** Communication cost doesn't come from talking — it piles up from ambiguity.

---

## Closing Thoughts

The relationship between an FDE and a client is not "vendor and customer."

It's **a relationship where you figure out together something that can't be clearly stated**.

You can't get clear requirements from the client, because the requirements themselves aren't clear yet.
You have to build a bridge between "the client can't articulate it" and "the code has to run."

Five moves build that bridge: **frequency, rhythm, quality, form, and presentation**.

Next: *How an FDE Survives*.
