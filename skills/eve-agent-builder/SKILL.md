---
name: eve-agent-builder
description: Add, implement, or improve a production Vercel Eve application agent in an existing Next.js, React, Node.js, or MERN project, including authenticated app tools, skills, approvals, subagents, schedules, evals, and useEveAgent UI. Use when a user asks to add an AI agent or assistant to a web application, or explicitly mentions Eve. Do not use for a generic AI SDK chat endpoint.
---

# Eve Agent Builder

Build one secure application agent that can understand the signed-in user and perform the same authorized work as the host application.

## Verify Eve first

1. Inspect the repository, package manager, framework, auth, data layer, service layer, and existing AI code.
2. If Eve is installed, read the relevant files in `node_modules/eve/docs/` before writing APIs. Eve is evolving; installed documentation wins over remembered syntax.
3. If Eve is absent, confirm the intended topology before installing or running `npx eve@latest init .`.
4. Treat `npx skills add vercel/eve` as optional coding-agent knowledge, not the Eve runtime installation.

Do not replace a working application architecture or create a second copy of its business logic.

## Propose before changing

Summarize in at most five bullets:

- where the Eve agent will live;
- which user jobs become tools or skills;
- how user, role, and tenant identity will be enforced;
- which UI surfaces will expose the agent;
- how the result will be verified.

Wait for confirmation before installing packages or restructuring the repository.

## Choose the topology

Read [project-topologies.md](references/project-topologies.md). Prefer the smallest topology that fits the current repository:

- colocated `agent/` for a simple Next.js app;
- a dedicated agent folder or workspace app for a monorepo, React plus Node, or MERN system;
- a standalone Eve service for non-Next frontends;
- `eve/client` for server-side callers and `useEveAgent` from `eve/react` for React UI.

Never use AI SDK `useChat` as the Eve frontend integration.

## Design the application agent

Read [application-agent.md](references/application-agent.md).

Map each requested user job to the existing application service that already performs it. Classify it as read-only, reversible write, sensitive write, external side effect, scheduled work, or specialist delegation.

Then add only the Eve slots the product needs:

- `agent.ts` when the root needs an explicit model, reasoning, limits, compaction, or runtime configuration;
- concise stable instructions;
- Zod-validated tools that call existing services;
- skills for optional multi-step workflows;
- approvals for destructive, financial, external, or high-impact actions;
- subagents only for genuinely specialist work;
- schedules only for real recurring jobs;
- evals for permissions, tool selection, and important workflows.

Keep `evals/` beside `agent/`, never inside it. Root `agent.ts` is optional when Eve defaults are sufficient; if authored, configure it with the installed version's `defineAgent` API and a required model. Every subagent must have its own `agent.ts` and description.

“The agent knows the user” means authenticated, scoped retrieval through tools or dynamic capabilities. Never dump an entire database into the prompt or trust client-supplied identity.

## Build both UI surfaces

Read [frontend-integration.md](references/frontend-integration.md).

Use the same Eve backend and resumable conversation model for:

1. a contextual right sidebar for the current page or record;
2. a full-page agent home for broad requests, history, approvals, runs, and schedules.

Preserve the project's components and styling system. Show streaming, pending, approval, failure, reconnect, and empty states. Client page context may help the agent focus, but authorization must always be resolved on the server.

## Production rules

Read [production-checklist.md](references/production-checklist.md) before completion.

- Fail closed when authentication or tenant context is missing.
- Enforce role and ownership checks inside the called application service.
- Make non-idempotent actions idempotent or approval-gated.
- Minimize tool output and redact secrets and unnecessary personal data.
- Record auditable mutations without exposing private reasoning.
- Keep schedules timezone-aware, deduplicated, and safe to retry.
- Add evals for allowed and forbidden behavior, including cross-tenant denial.

## Verify and hand off

Use commands supported by the installed Eve version. At minimum, verify:

- the host application build or typecheck;
- Eve configuration and build;
- agent evals, including an authorization failure case;
- one authenticated read and one approved write when applicable;
- both the sidebar and full-page UI on the real development stack.

Report what was run, what passed, what remains environment-dependent, and any production credentials or deployment steps the user must supply.
