# AgentZ Launch Marketing Pack

Everything here is written to post as-is. Links and names are already filled in:

- Landing page / waitlist: `https://accuknox.com/platform/agentz`
- Posting owner: LinkedIn posts go out from **Likhita**. Email, Slack, and Reddit go out from **Kavitha**.
- `{first_name}` in the emails is a recipient merge field. Fill it from your list.

Known links you can use directly:
- Product walkthrough / demo: `https://accuknox.com/demo`
- Company: `https://accuknox.com`
- Waitlist: the "Join the waitlist" button on the landing page (Tally form).

---

## 1. Product analysis

**One line.** AgentZ is a Zero Trust platform to build, run, and govern AI agents in production. Secure by default. Built by AccuKnox.

**What it actually is.** A control plane for agents. You describe a job, it writes the skill and wires the steps. You bring any model or framework. It runs the agent with scoped access, isolation, memory, and a signed record of everything that happened.

**What it is not.** It is not an agent framework. Frameworks help you write an agent. AgentZ runs it in production, with policy at the edge, per-tool-call permissions, and a signed trace for every step. LangChain, CrewAI, and your own code sit happily on top of it.

**Why it is credible.** AccuKnox has done kernel-level runtime security for cloud and Kubernetes for years (KubeArmor, OpenBao, Sigstore, OpenTelemetry in the stack). The hard part of agents in production is security and audit, and that is exactly the ground AccuKnox already owns. The security is not bolted on. It is the starting point.

**The five things that carry the story:**
1. Any model. Claude, Gemini, GPT, Qwen, or your own. Sandbox and persistent memory from the first run.
2. Scoped access. Permissions are set per tool call, not per integration. Secrets stay in the vault, the agent never sees the key.
3. MCP out of the box. Connect a server, authorize, watch it go Ready.
4. Run it your way. Chat, API, CLI, or a schedule. Edit the cron, timeout, and retention in place, no redeploy.
5. See everything. Watch a workflow run live, then read a signed trace down to the token. Profile every MCP call.

**The narrative hook that sells it.** AgentZ proposes, you decide. It asks before anything it cannot undo and pushes back when you are about to make a mistake. Autonomy you can hand real access to.

---

## 2. ICP profile (who this is for)

**Primary buyer / champion**
- Head of Platform Engineering, Platform / DevEx leads, staff and principal engineers building an internal agent platform.
- They have agent prototypes. They cannot get them to production because access, audit, and blast radius are unsolved.

**Security stakeholder (the approver, and AccuKnox's home turf)**
- CISO, Head of Security Engineering, SecOps leads.
- They are the reason agent projects stall. AgentZ is the thing that lets them say yes.

**Day-to-day users**
- DevOps and SRE, SecOps analysts, data and ops engineers who will actually run the agents.

**Company shape**
- Mid-market to enterprise (roughly 200 to 5,000+ people), and AI-forward scale-ups.
- Extra pull in regulated or security-conscious sectors: fintech, healthtech, infra, B2B SaaS.

**The trigger and the pain**
- "We built an agent that works in a demo. Now security, compliance, and ops all want answers before it touches anything real."
- Standing credentials nobody wants to grant. No audit trail. MCP tool sprawl with no governance. No way to see what the agent did.

**The value in their words**
- Get agents into production without becoming the next incident.
- Pass the compliance review instead of running a project for it.
- One control plane for every agent, model, and team.
- Bring the model and framework you already use, no migration.

**Not the target right now**
- Hobbyists wanting a free chatbot builder, teams with no security or compliance needs, pure no-code business users. The buyer is technical.

---

## 3. Clip reference (what each tour clip shows, and where to use it)

| Clip file | Shows | Best used for |
|---|---|---|
| `01_create-agents-any-llm-sandbox-memory.mp4` | Create-agent screen, sandbox, persistent memory, and a long model picker (Claude, Gemini, GPT, Qwen, Llama, more) | "Any model" / builder posts |
| `02_sandboxes-fine-grained-permissions.mp4` | Sandbox wizard: identity, packages, MCP, skills, allowed hosts, per-tool toggles | Zero Trust / security posts |
| `03_mcp-server-support.mp4` | Connect an MCP server, it goes Ready | MCP / integrations posts |
| `04_workflow-runs-chat-tour.mp4` | Chat interface plus the file explorer with real generated artifacts | Product intro / "what is it" posts |
| `05_editing-crons-and-schedules.mp4` | Triggers table and editing cron, timeout, retention in place | Automation / scheduling posts |
| `06_live-workflow-graph.mp4` | A workflow run graph moving through Succeeded and Running, with step detail | Observability posts |
| `07_traces.mp4` | Signed trace: spans, model calls, tool calls, durations, token counts | Observability / audit / security posts |
| `08_mcp-profiling.mp4` | MCP call graph with per-call latency | Developer / performance posts |

Note on format: for LinkedIn, trim clips to 12 to 20 seconds, add a one-line caption burned into the first frame, and upload native video (not a YouTube link). Vertical or square crops get more reach in-feed.

---

## 4. LinkedIn posts (5 angles)

Each is a standalone announcement. None is a countdown. Post them roughly a week apart, in this order. Publish from **Likhita's** LinkedIn profile.

---

### Post 1 · Angle: what it is (category introduction)
**Clip: `04_workflow-runs-chat-tour.mp4`**

Most AI agents never make it past the demo.

They work in a notebook. Then someone asks the real questions. What can it access? What did it actually do? Who approved that? And the project quietly dies.

We built AgentZ to answer those questions on day one.

AgentZ is a platform to build, run, and govern AI agents in production, secure by default. Describe the job in a sentence and it writes the skill and wires the steps. Bring any model. Security stays underneath, from the very first run.

It is not another agent framework. Frameworks help you write an agent. AgentZ runs it, with policy at the edge, scoped access, and a signed trace for every step.

Built by AccuKnox. Live in August.

If your team has agents stuck at the demo stage, this is for you. Join the waitlist: https://accuknox.com/platform/agentz

`#AgentZ #AIagents #AgenticAI #ZeroTrust #AccuKnox`

---

### Post 2 · Angle: Zero Trust security (AccuKnox DNA)
**Clip: `02_sandboxes-fine-grained-permissions.mp4`**

Here is the uncomfortable question about AI agents.

What happens the first time one runs a command you did not expect, with credentials you forgot it had?

AgentZ is built so that question has a boring answer.

Every skill runs with the narrowest permissions that do the job. Permissions are scoped per tool call, not per integration. Secrets stay in the vault and the agent never sees the key. Every network egress is allowed or blocked at the kernel and recorded. Every run leaves a signed trace you can replay.

Zero Trust, applied to agents. Trust none by default.

This is what AccuKnox has done for cloud and Kubernetes runtime for years. Now it is for your agents.

AgentZ launches in August. Waitlist is open: https://accuknox.com/platform/agentz

`#ZeroTrust #AISecurity #AgenticAI #AgentZ #CISO`

---

### Post 3 · Angle: any model + MCP (builder appeal)
**Clip: `01_create-agents-any-llm-sandbox-memory.mp4`** (also strong: `03_mcp-server-support.mp4`)

Create an agent. Pick the model. Claude, Gemini, GPT, Qwen, or your own.

Every agent gets a sandbox and persistent memory from the first run. Connect your stack in seconds, MCP servers work out of the box. Give each agent only the tools it needs, scoped per tool call.

Then chat, build, and run in one place. Files, artifacts, and full run history stay with the agent.

No migration. Bring the framework and model you already use. AgentZ handles the parts that keep agents out of production: access, isolation, memory, and audit.

That is the platform. Built by AccuKnox, live in August.

Waitlist: https://accuknox.com/platform/agentz

`#AIagents #MCP #LLM #AgentZ #DevTools`

---

### Post 4 · Angle: observability (see everything)
**Clip: `07_traces.mp4`** (also strong: `06_live-workflow-graph.mp4`, `08_mcp-profiling.mp4`)

"The agent did something. We think." is not an answer your auditor will accept.

AgentZ gives you the whole picture instead.

Watch a workflow run live. Every step named, ordered, and inspectable as it executes. When it finishes, open the signed trace: every span, every tool call, every token. Profile your MCP calls and see each one's latency in a single graph.

Nothing your agent does is a mystery. That is the difference between an agent demo and an agent you can put in front of a compliance review.

AgentZ, by AccuKnox. Live in August.

See it: https://accuknox.com/platform/agentz

`#Observability #AIagents #AgenticAI #AgentZ #Compliance`

---

### Post 5 · Angle: control (it pushes back)
**Clip: a screen capture of the "Govern every agent" control view on the site, or the hero workflow-graph clip**

A teammate told our agent: delete the staging environment and the old repo to cut costs.

The agent killed staging. Then it stopped.

"The repo has 3 open PRs and a commit from today. I would hold. Archive it instead?"

Good catch. Archive it.

This is how AgentZ is built to work. It proposes, you decide. It asks before anything it cannot undo, and it pushes back when you are about to make a mistake. Every sensitive action waits on your approval. Every action is scoped, logged, and signed.

Autonomy you can actually hand real access to. Govern every agent, trust none by default.

AgentZ, by AccuKnox. Live in August.

https://accuknox.com/platform/agentz

`#AgenticAI #AIagents #ZeroTrust #AgentZ #EngineeringLeadership`

---

## 5. Email sequence (3 emails)

Send about 5 to 7 days apart. Keep them plain-text-feeling even in HTML. One clear CTA each.

---

### Email 1 · Teaser

**Subject line A:** Agents that can actually touch production
**Subject line B:** The missing layer for AI agents
**Preview text:** A Zero Trust platform to build, run, and govern agents. From AccuKnox. Live in August.

Hi {first_name},

Your team can build an AI agent in an afternoon. Getting it to do real work is where it stalls.

The moment an agent needs production access, the questions start. What can it reach? What did it do? Who signed off? Most stacks have no answer, so the agent stays a demo.

We have been building the layer that fixes this. It is called AgentZ, and it goes live in August.

AgentZ is a Zero Trust platform to build, run, and govern AI agents, secure by default. Built by AccuKnox.

We are opening early access as spots free up. If you want an early look, join the waitlist.

[Join the waitlist](https://accuknox.com/platform/agentz)

More soon,
Kavitha
AccuKnox

---

### Email 2 · What it is

**Subject line A:** Meet AgentZ: build, run, and govern AI agents
**Subject line B:** Any model. Scoped access. Signed traces.
**Preview text:** One control plane for every agent, model, and team.
**Suggested media:** embed `04_workflow-runs-chat-tour.mp4` or `01_create-agents-any-llm-sandbox-memory.mp4`

Hi {first_name},

Here is what AgentZ does.

- **Build fast.** Describe the job in a sentence. AgentZ writes the skill and wires every step.
- **Any model.** Claude, Gemini, GPT, Qwen, or your own. Sandbox and persistent memory from the first run.
- **Scoped access.** Permissions are set per tool call, not per integration. Secrets stay in the vault.
- **Connect your stack.** MCP servers work out of the box. Authorize once, watch it go Ready.
- **Run it your way.** Chat, API, CLI, or a schedule. Edit the cron, timeout, and retention in place, no redeploy.
- **See everything.** Watch a run live, then read a signed trace down to the token.

It is not an agent framework. Frameworks help you write an agent. AgentZ runs it in production with security underneath.

Who it is for: platform, security, and ops teams that want agents doing real work without a new class of risk.

AgentZ launches in August. Get in early.

[Join the waitlist](https://accuknox.com/platform/agentz)

Kavitha
AccuKnox

---

### Email 3 · Launch is close

**Subject line A:** AgentZ goes live in August. Get in early.
**Subject line B:** Your spot on the AgentZ waitlist
**Preview text:** Early access, first look at the policy edge and signed traces.

Hi {first_name},

AgentZ is almost here. It launches in August, and we are letting waitlist teams in first.

Early access gets you:
- A spot as we open access, before general availability.
- A first look at the policy edge and signed traces.
- Your own model and framework, no migration.

If you are trying to move agents from prototype to production, this is the fastest way to do it without leaving security as a later problem.

[Join the waitlist](https://accuknox.com/platform/agentz)

Want a walkthrough with your stack in the room? Reply to this email, or see the platform here: https://accuknox.com/demo

Kavitha
AccuKnox

---

## 6. Slack community messages

Etiquette first, because it decides whether this lands or gets you muted:
- Post in the right channel only (usually `#show-and-tell`, `#launches`, `#self-promotion`, or an intro channel). If unsure, ask a mod.
- Lead with value, not the ask. Be a person, not a press release.
- One message, no repeats across channels in the same community.
- Post as: **Kavitha**.

**Ultra-short (self-promo / launch channel)**

> AgentZ (by AccuKnox) launches in August: build, run, and govern AI agents, secure by default. Any model, permissions scoped per tool call, a signed trace for every run. Waitlist is open if that is useful to your team → https://accuknox.com/platform/agentz

**What / who (a touch more context)**

> 👋 We are launching AgentZ next month. It is a Zero Trust platform for running AI agents in production: pick any model, scope tools per call, connect MCP servers out of the box, and get a signed trace of everything the agent did. Built for platform, security, and ops teams stuck getting agents past the demo stage. Early access: https://accuknox.com/platform/agentz

**Intro-channel version**

> Hi all 👋 I am Kavitha from AccuKnox. We are about to launch AgentZ, a platform for running AI agents in production with Zero Trust security: scoped tools, kernel-enforced egress, signed traces, any model. If your team is trying to get agents past the prototype stage, I would genuinely value your take. Waitlist: https://accuknox.com/platform/agentz

**Show-and-tell version (pair with a clip)**

> Sharing something we have been building. AgentZ lets you spin up an agent on any model, give it only the tools it needs (per tool call, not per integration), run it from chat or a schedule, and then read a signed trace down to the token. Launches in August. Short clip below. Feedback welcome. https://accuknox.com/platform/agentz
> _Attach: `06_live-workflow-graph.mp4` or `07_traces.mp4`_

---

## 7. Reddit post

Reddit rewards honesty and punishes marketing. Post as yourself, disclose the AccuKnox affiliation, and ask for real feedback. Posting as: **Kavitha**.

**Suggested subreddits:** r/AI_Agents, r/mcp, r/LLMDevs, r/devops, r/kubernetes (AccuKnox / KubeArmor angle), r/LocalLLaMA (the "any model, bring your own" angle).

**Title options**
- We built a Zero Trust platform to run AI agents in production (launching in August)
- Agents are easy to demo and hard to trust with prod access. Here is what we built.

**Body**

Full disclosure: I work at AccuKnox, and this is about a product we are launching in August. Not trying to hard-sell, I would rather get holes poked in it.

Every team I talk to can build an agent. Almost none can put it into production, because the moment it needs real access, three problems show up: what can it reach, what did it actually do, and who is accountable when it does something dumb.

We built AgentZ to make those problems boring.

What it does:
- Run an agent on any model (Claude, Gemini, GPT, Qwen, or your own). Sandbox and persistent memory from the first run.
- Permissions are scoped per tool call, not per integration. Secrets stay in a vault, the agent never sees the key.
- Network egress is allowed or blocked at the kernel and logged (this part comes from our runtime security lineage, KubeArmor).
- MCP servers connect out of the box.
- Every run produces a signed trace: spans, tool calls, tokens. You can also profile MCP call latency.
- It asks before anything irreversible and pushes back when a request looks like a mistake.

It is not a framework. Bring LangChain, CrewAI, or your own code. AgentZ is the layer that runs and governs it.

Who I think it is for: platform, security, and ops teams that want agents doing real work without opening a new hole.

It is in preview, launching in August. Waitlist is here if you want early access: https://accuknox.com/platform/agentz

Genuinely interested in what would stop you from trusting an agent with production access, and whether this covers it. Happy to answer anything.

---

## 8. Company general channel (internal, for AccuKnox)

For `#general` or `#company-wide`. Goal: get the team sharing on launch.

> 📣 **AgentZ is almost here.**
>
> Our new platform for building, running, and governing AI agents, secure by default, goes live in **August**. The site and waitlist are up now.
>
> **In one line:** Zero Trust for AI agents. Any model, permissions scoped per tool call, signed traces, built on the same runtime security that powers KubeArmor.
>
> **The single most useful thing you can do today: share it.** Your network reaching one platform lead or security engineer is worth more than any ad.
>
> How to help, pick one:
> 1. Repost the company LinkedIn launch post (link in `#marketing`).
> 2. Or post in your own words. Copy-paste blurb below.
> 3. Tag it `#AgentZ` so we can find and amplify it.
>
> **Blurb to copy:**
> AccuKnox is launching AgentZ: a Zero Trust platform to build, run, and govern AI agents in production. Any model, scoped access per tool call, a signed trace for every run. Live in August. Waitlist open → https://accuknox.com/platform/agentz
>
> **Assets** (logo, clips, more copy): see `marketing/` in the agentz-website repo.
> Questions, leads, or feedback: drop them in `#agentz-launch`.

---

## 9. Asset index

- **Logo:** `marketing/logo/` · geometric mark (`agentz-mark.svg`, recommended), editorial/serif mark (`agentz-mark-serif.svg`), horizontal lockups (`agentz-logo.svg`, `agentz-logo-serif.svg`), PNG exports at 32 to 512px, and `preview.html` to compare both directions on light and dark.
- **Tour clips:** `tour-clips/01` through `08`. See the clip reference table in section 3.
- **Demo / platform link:** https://accuknox.com/demo
