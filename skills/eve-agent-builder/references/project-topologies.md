# Project Topologies

Choose after inspecting the existing repository. Preserve its package manager, workspace layout, auth, API boundaries, and business services.

## Standalone Eve agent

Use Eve's nested filesystem-first layout:

```text
my-agent/
├── README.md
├── package.json
├── tsconfig.json
├── agent/
│   ├── agent.ts
│   ├── instructions.md
│   ├── instrumentation.ts
│   ├── channels/
│   ├── connections/
│   ├── hooks/
│   ├── skills/
│   ├── lib/
│   ├── sandbox/
│   ├── tools/
│   ├── schedules/
│   └── subagents/
└── evals/
```

`instructions.md` is the minimal authored root-agent requirement. Root `agent.ts` is optional when defaults are sufficient; author it for an explicit model, reasoning, compaction, limits, build behavior, or experimental runtime settings. `evals/` belongs beside `agent/`. Add optional directories only when the product uses those capabilities.

## Next.js, one application

Prefer:

```text
app/
agent/
  agent.ts
  instructions.md
  tools/
  skills/
evals/
next.config.ts
```

Wrap the existing Next config with the installed Eve version's `withEve` API. Keep the browser same-origin so cookies and `/eve/v1/*` work naturally. Use `useEveAgent` from `eve/react` in client components.

## Next.js monorepo or separate agent folder

Prefer:

```text
apps/
  web/
  agent/
packages/
  domain/
```

Point `withEve` at the agent root with its supported `eveRoot` option. Share domain types and services through existing workspace packages; do not copy them into the agent.

## React or Vite plus Node/MERN

Prefer:

```text
apps/
  web/
  api/
  agent/
packages/
  domain/
```

Run Eve as its own Node service unless the installed Eve documentation explicitly supports the host server topology. The React app calls Eve with `useEveAgent({ host, ... })`. Eve tools call the existing domain package or an authenticated internal API.

Do not move the database layer into Eve. The API or shared service layer remains the source of authorization and business rules.

## Node-only application

Keep Eve in a clear `agent/` root or workspace app. Server-side jobs and services should use the typed `Client` from `eve/client`; React hooks belong only in React clients.

## Initialization rules

- Run `npx eve@latest init .` only in the confirmed agent root.
- Avoid creating a nested Git repository inside an existing repository.
- Do not let a scaffold overwrite owned config, scripts, ports, or environment files.
- In a monorepo, prefer workspace dependencies and existing scripts.
- If the official initializer conflicts with the host layout, install and wire Eve manually according to the installed docs.
