# Frontend Integration

Use Eve's React integration directly. Do not build the UI around AI SDK `useChat`.

## Core hook

Confirm the installed API, then follow this shape:

```tsx
"use client";

import { useEveAgent } from "eve/react";

export function AgentComposer() {
  const agent = useEveAgent();
  const busy = agent.status === "submitted" || agent.status === "streaming";

  return (
    <button
      disabled={busy}
      onClick={() => void agent.send({ message: "Summarize my open deals" })}
    >
      Ask agent
    </button>
  );
}
```

For a separate Eve origin, provide the supported `host` and authenticated headers. Prefer same-origin cookies where the app topology allows it. Never put secrets in browser configuration.

## One agent, two surfaces

### Contextual right sidebar

- Opens without hiding the page the user is working on.
- Suggests actions relevant to the current route or record.
- Sends only safe identifiers or supported context metadata.
- Lets server-side tools reload the record and enforce access.
- Shows citations, proposed mutations, and approvals close to the affected object.

### Full-page agent home

- Provides a strong prompt composer and suggested tasks.
- Shows resumable conversations and recent runs.
- Provides clear approval, schedule, and failure states.
- Supports broader cross-domain work without losing user or tenant scope.

Both surfaces must use the same backend agent. Reuse a small UI layer for message parts, status, composer, approvals, and errors; do not duplicate agent logic.

## Interaction states

Implement the states supported by the installed Eve version:

- empty and suggested tasks;
- submitted and streaming;
- tool activity with user-readable summaries;
- approval requested, accepted, and declined;
- retryable and terminal errors;
- reconnect or resume;
- completion with a concise result and affected-record link.

Render agent output safely. Never execute arbitrary markup, links, commands, or tool payloads from model text.
