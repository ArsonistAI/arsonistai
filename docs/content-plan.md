# Content plan: AI integration articles

Each article targets one service and one primary search query, links to its `/services/[slug]` page and to a relevant case study, and ships in English and Spanish. Articles live in `src/content/posts.ts` with `serviceId` set, which adds the "service behind this article" card on the post, lists the post under "Guides on this topic" on the service page, ties the BlogPosting schema to the Service node through `about`, and puts it in `/llms.txt`.

The nine design-era posts from before October 2026 stay as they are. Do not edit them; they may move to Syntheticist later.

Target cadence: two articles a month. Length: 1,200 to 1,800 words. Every draft goes to Jon for review before merge.

## Published

| # | Title | Service | Primary query | Date |
|---|---|---|---|---|
| 1 | What an MCP Server Is and When Your Business Needs One | custom-mcp-servers | custom MCP server development | 2026-10-18 |
| 2 | How to Cut Your LLM Bill Without Making the Product Worse | llm-cost-optimization | reduce LLM API costs | 2026-10-18 |
| 3 | Chatbot Audit Checklist: 12 Things That Break in Production | chatbot-audit | chatbot audit | 2026-10-18 |

## Backlog

### 4. Which workflows to automate with AI first

- **Service:** `ai-workflow-automation`
- **Primary query:** AI workflow automation for small business
- **Secondary:** n8n vs Make vs Zapier for AI, automate repetitive tasks with AI
- **Case study link:** Hiring Signal Pipeline (a daily automated pipeline where a person approves every send)
- **Outline:**
  - The test for a good first workflow: frequent, rule-heavy, low cost when wrong, easy to check
  - Five common first wins (inbox triage, lead research, document intake, report drafting, CRM cleanup)
  - Where AI belongs in a workflow and where plain rules are better
  - n8n, Make, and Zapier compared on cost, hosting, and AI steps
  - Keeping a person in the loop: approval steps and audit trails
  - How to measure time saved honestly

### 5. Designing a voice agent people do not hang up on

- **Service:** `voice-agent-design`
- **Primary query:** voice AI agent design
- **Secondary:** AI phone agent script, Retell AI prompt, Vapi call flow
- **Outline:**
  - Why voice is harder than chat: latency, interruptions, no scrollback
  - The first ten seconds: greeting, purpose, permission
  - Writing for the ear: short turns, confirmations, spelling names and numbers
  - Handling "talk to a human" and angry callers
  - Grading real calls: what to listen for, and a simple scorecard
  - Before and after testing on the same call set

### 6. Claude Code vs Cursor for teams: how to roll out either

- **Service:** `claude-cursor-training`
- **Primary query:** Claude Code training for teams
- **Secondary:** Cursor team rollout, AI coding assistant adoption
- **Case study link:** Design Engineer IDE (built by running several coding agents at once)
- **Outline:**
  - What each tool is best at, in plain terms
  - Why rollouts stall: no shared conventions, no review habits, no project context files
  - A two-week rollout plan: setup, shared rules files, first real tasks, review norms
  - Security and data questions to settle first
  - Measuring adoption without vanity metrics

### 7. Openclaw setup: what self-hosting takes

- **Service:** `openclaw-installation`
- **Primary query:** Openclaw installation
- **Secondary:** self-host Openclaw, Openclaw integration
- **Outline:**
  - What Openclaw is and who it suits
  - Hardware, hosting, and account requirements
  - The install steps that trip people up
  - Connecting it to the tools a team already uses
  - Maintenance after day one: updates, backups, access control
- **Note:** confirm current Openclaw requirements against its official docs before drafting.

### 8. How to pick an AI integration partner

- **Service:** hub, links to `/services`
- **Primary query:** AI integration consultant
- **Secondary:** AI consulting firm, hire AI developer for business
- **Outline:**
  - Questions to ask before signing: ownership of code, testing, data handling, support
  - Warning signs: no tests, no source access, vague pricing, "AI strategy" with no build
  - Fixed tiers vs hourly: which suits which project
  - What a good first project looks like (small, measurable, reversible)
  - How ArsonistAI works, briefly, with links to each service

## Per-article checklist

- [ ] Title under 60 characters with the primary query near the front; excerpt 120 to 155 characters
- [ ] `title`, `pageTitle`, `cardTitle`, and `excerpt` keys in both `messages/en.json` and `messages/es.json`
- [ ] `author: "ArsonistAI"` (never a personal name while the business is in stealth), `serviceId`, `section: "AI Integration"`, and an image set in `posts.ts`
- [ ] Links to the service page and at least one case study, written as `/services/...` and `/work/...` so the locale is added automatically
- [ ] Every factual claim about a third party (pricing, features, rulings) checked against a primary source
- [ ] No em dashes, and no backticks or `${` inside the template literal
- [ ] Build passes, and the post appears in `/sitemap.xml` and `/llms.txt`
- [ ] LinkedIn post for the company page drafted using the `src/content/linkedin-*.md` pattern
