# Production Checklist

## Identity and authorization

- Replace placeholder auth and fail closed.
- Derive user, organization, tenant, role, and plan from verified server auth.
- Re-check authorization inside every application service called by a tool.
- Test cross-tenant access and removed-user behavior.

## Actions

- Validate every tool input and constrain query size.
- Require approval for destructive, financial, external, or high-impact actions.
- Add idempotency keys or dedupe guards to writes and scheduled jobs.
- Provide undo where the application supports it.
- Keep an audit record of actor, tenant, tool, target, outcome, and approval.

## Data and infrastructure

- Keep secrets server-side and declare external connections explicitly.
- Minimize model and tool output; redact credentials and unnecessary personal data.
- Add rate, token, concurrency, timeout, and egress controls appropriate to cost and risk.
- Use a sandbox for untrusted code or files.
- Do not log hidden reasoning or raw sensitive payloads.

## Schedules and subagents

- Keep channels and schedules on the root agent.
- Record timezone assumptions and test the hosted cron behavior.
- Give subagents only the capabilities they need; never use delegation as authorization.
- Provide disable, revoke, and retry behavior for recurring work.

## Quality gates

- Read installed `node_modules/eve/docs/` before finalizing APIs.
- Run the host project's build or typecheck.
- Run Eve configuration/build checks supported by the installed version.
- Run smoke and strict evals where available.
- Test an authenticated read, an approved write, a denial, and a failure path.
- Verify sidebar and full-page UI with the actual auth and development servers.
- Document deployment topology, origins, cookies or headers, environment variables, and remaining operator steps.
