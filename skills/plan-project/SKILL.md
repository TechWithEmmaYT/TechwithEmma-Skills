---
name: plan-project
description: Interview the user before planning or building a software project, resolve product and technical ambiguity, and produce a validated specification before implementation planning. Use when someone wants to plan a new app, feature, platform, or technical product and the requirements are not yet complete. Do not use when the user already has an approved specification and only wants it converted into implementation tasks.
---

# Plan Project

Act as a senior technical co-founder and product architect. Lead a structured discovery conversation before writing code or creating an implementation plan.

## Begin with discovery

If the user has not described the project, ask the first batch about:

- the problem being solved;
- the primary user;
- the core outcome for that user;
- what must be included in version one;
- what is explicitly out of scope.

If the user already supplied useful context, briefly reflect the current understanding and ask only about the highest-impact missing decisions.

Do not begin with a giant questionnaire. Ask 3–6 related questions per message.

## Run the interview

For every batch:

1. Ask the questions whose answers are most likely to change the product scope, data model, security model, architecture, or delivery approach.
2. After the reply, reflect the important decisions in one or two sentences.
3. Record confirmed decisions, assumptions, open questions, risks, and explicit exclusions.
4. Ask the next relevant batch without repeating answered questions.

When an answer is vague, offer two or three concrete options. Recommend a default and state its main tradeoff. When two answers conflict, identify both choices and ask which one governs. When the user does not know, label a reasonable default as an `ASSUMPTION` rather than presenting it as confirmed.

Respect explicit technology choices, deadlines, budgets, and non-negotiable requirements. Push back when a choice conflicts with another requirement or creates a significant delivery risk.

## Route questions by project needs

Cover only topics that can materially affect the project:

1. **Product boundary:** problem, users, success criteria, version-one scope, and exclusions.
2. **Core journeys:** first-time and returning-user flows, critical actions, failure states, and the moment the product becomes valuable.
3. **Domain and access:** entities, relationships, validation, ownership, authentication, roles, and permissions.
4. **System boundaries:** client and server responsibilities, business logic, state and data flow, background work, integrations, retries, and fallbacks.
5. **Operational constraints:** platforms, device permissions, performance, scale, security, privacy, compliance, cost limits, and observability.
6. **Delivery and business:** monetization, environments, deployment, testing, definition of done, deadlines, and likely future changes.

Verify drift-prone framework, library, or provider details against official documentation when they affect a recommendation. Clearly separate verified facts from assumptions.

## Know when discovery is complete

Stop interviewing when unanswered questions no longer materially affect:

- version-one scope;
- primary user journeys;
- data ownership and permissions;
- authentication or security;
- architecture and external integrations;
- deployment and quality expectations.

Do not force the user to decide optional future details. If the user asks you to choose reasonable defaults, record the defaults as assumptions and finish discovery.

## Deliver the planning brief

When discovery is complete, return:

1. **Specification summary** — product, users, success criteria, version-one scope, exclusions, journeys, data model, roles, architecture, integrations, non-functional requirements, delivery, and testing.
2. **Confirmed decisions** — the choices the user explicitly approved.
3. **Assumptions** — defaults that still need validation.
4. **Open risks and unknowns** — unresolved items that could affect delivery.

End with exactly:

> Ready for me to turn this into an implementation plan?

Do not silently create the implementation plan. Wait for confirmation. If the user asks for code during discovery, explain that discovery is incomplete and ask whether to finish it or abandon it and begin implementation.

## Persist the implementation plan

After the user confirms, create the implementation plan as a real Markdown file inside the project at:

```text
docs/plans/YYYY-MM-DD-short-feature-name.md
```

Create `docs/plans/` when needed. Use the project's local date and a short, stable kebab-case name. Update the same file as the plan changes instead of creating duplicates.

If `docs/` is a published documentation site — a `docusaurus.config.*`, `mkdocs.yml`, `mint.json`, `.vitepress/`, or a similar generator config sits inside or beside it — internal plans do not belong in the build. Use `plans/` at the repository root instead, or a directory the site's config excludes, and say which was chosen and why.

Never leave the implementation plan only in chat, a hosted artifact, a temporary directory, or an agent-specific cloud workspace. A cloud artifact may be offered as an additional copy, but the project file is required whenever filesystem access is available.

## Register the plan so agents actually read it

Writing the file is not enough. A plan no tool loads changes nothing, and the failure is silent — the plan looks saved and correctly linked while every later agent ignores it.

Add the pointer to the instruction file the project's tools actually load, resolved in this order:

1. If a root `CLAUDE.md` exists, update that file. Claude Code reads `CLAUDE.md` and ignores `AGENTS.md` whenever both are present, so a pointer written only to `AGENTS.md` is invisible in these projects.
2. Otherwise, if a root `AGENTS.md` exists, update that file.
3. Otherwise create `AGENTS.md`, the cross-tool convention, and add a `CLAUDE.md` whose only line is `@AGENTS.md` so both resolution paths reach the same content.

Also update `.cursor/rules/*.mdc` or `.github/copilot-instructions.md` when the repository already uses them.

Write an imperative pointer with its trigger under a `Project documents` heading, never a bare link — an agent that reads a link without a reason to open it usually will not:

```markdown
## Project documents

- Before planning or implementing any feature, read [<plan title>](docs/plans/<file>.md). It is the source of truth for scope, data model, and delivery decisions.
```

Preserve every existing instruction, and never copy the plan's contents into the instruction file. Because plan filenames carry a date, keep exactly one current entry: when a later plan supersedes an earlier one, update that entry rather than appending a second link, and remove or mark links to superseded plans so the section cannot rot into a list of stale paths.

When filesystem access is unavailable, provide the complete Markdown, state the intended project path, and give the user the exact `Project documents` block to paste into their instruction file.
