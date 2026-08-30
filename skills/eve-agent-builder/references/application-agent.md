# Application Agent

## Capability map

Before writing tools, make a compact map:

| User job | Existing service | Scope | Risk | Eve capability |
| --- | --- | --- | --- | --- |
| Find a customer | customer query service | tenant | read | tool |
| Update a deal | deal command service | owner or manager | write | tool + approval if high impact |
| Weekly pipeline review | reporting services | tenant | recurring | schedule |
| Research an account | approved sources | tenant | specialist | skill or subagent |

If no existing service safely performs an action, improve the application boundary before exposing it to the agent.

## Eve slots

- `agent.ts`: optional root runtime configuration for model, reasoning, compaction, limits, build behavior, and experimental settings.
- `instructions.md`: short identity, behavior, boundaries, and escalation rules.
- `tools/`: narrow typed operations that call existing application services.
- `skills/`: optional multi-step knowledge loaded only when needed.
- `connections/`: declared external services and secret requirements.
- `subagents/`: specialist delegates with deliberately limited capabilities.
- `schedules/`: root-agent recurring jobs using five-field cron.
- `channels/`: root-agent entry points with fail-closed auth.
- `evals/`: successful tasks, refusals, approvals, and tenant isolation.
- hooks/instrumentation: audit, telemetry, policy, and lifecycle behavior.

Verify exact filenames and APIs against the installed Eve documentation.

## `agent.ts`

Do not generate an empty or decorative config. When explicit runtime configuration is needed, use this shape and replace the model with the user-approved provider or Gateway model supported by the installed Eve version:

```ts
import { defineAgent } from "eve";

export default defineAgent({
  model: "openai/gpt-5.5",
  reasoning: "medium",
});
```

When root `agent.ts` exists, `model` is required. Do not place tools, instructions, channels, or schedules in this file; Eve discovers those through their filesystem slots. Keep limits and compaction intentional instead of copying arbitrary values. A subagent's `agent.ts` is required and must include its description; channels and schedules remain root-only.

## Tools

Each tool should:

- accept the smallest Zod-validated input;
- derive user and tenant from verified server context;
- call one existing service or clear workflow;
- return a compact result meant for the agent;
- preserve service-layer authorization;
- handle retry and idempotency where mutation is possible;
- require approval for destructive, financial, external, or irreversible effects.

Never expose a generic unrestricted database, shell, filesystem, email, or HTTP tool to an application user.

## User knowledge and memory

Use durable Eve sessions for conversation continuity. Retrieve profile, account, CRM, or workspace data through scoped tools when needed. Use dynamic instructions, tools, or skills when capabilities differ by user, team, plan, or role.

Do not use subagents as a security boundary. A subagent still needs safe tools, auth, and approvals.

## Schedules

Schedules belong to the root agent. Store the initiating user/tenant scope, timezone, dedupe key, and revocation path. Jobs must be safe to retry. Remember that hosted cron may evaluate in UTC and local `eve dev` may require explicit schedule dispatch.

## Evals

Start with smoke evals, then cover:

- correct tool selection;
- authorized read and mutation;
- cross-tenant and role denial;
- approval required and approval declined;
- malformed or adversarial input;
- sidebar record context;
- recurring-job safety and deduplication;
- graceful failure when a dependency is unavailable.
