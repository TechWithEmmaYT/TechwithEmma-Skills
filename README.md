# TechWithEmma Skills

Portable instruction sets for coding agents. Each skill lives under `skills/` and can be inspected before installation.

## Install

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills
```

The installer discovers every `skills/*/SKILL.md` entry and lets you choose which skills to install. Use `--skill <name>` to install one directly.

The repository also includes Claude Code plugin metadata in [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json). See [CHANGELOG.md](CHANGELOG.md) for release history.

## Current skills

### Eve Agent Builder

Adds a production Vercel Eve application agent to an existing Next.js, React, Node.js, or MERN project, with authenticated app tools, approvals, schedules, evals, and shared sidebar/full-page `useEveAgent` interfaces.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill eve-agent-builder
```

The complete instructions are in [`skills/eve-agent-builder/SKILL.md`](skills/eve-agent-builder/SKILL.md).

### Node.js Scaffolding

Builds compact TypeScript Express APIs with a CommonJS-first tsup build, versioned routes, typed errors, Helmet, rate limiting, console logging, graceful shutdown, optional Passport JWT authentication, and opt-in MongoDB protection.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-scaffolding
```

The complete instructions are in [`skills/nodejs-scaffolding/SKILL.md`](skills/nodejs-scaffolding/SKILL.md).

### Node.js Testing

Adds risk-focused unit, HTTP integration, real-dependency integration, and API end-to-end tests while preserving the project's existing test stack.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-testing
```

The complete instructions are in [`skills/nodejs-testing/SKILL.md`](skills/nodejs-testing/SKILL.md).

### Node.js Security

Audits backend code and configuration for exploitable vulnerabilities, authorization failures, data exposure, and resource or cost abuse. It reports evidence and recommendations first, then implements only user-selected fixes.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-security
```

The complete instructions are in [`skills/nodejs-security/SKILL.md`](skills/nodejs-security/SKILL.md).

### Node.js Payments

Implements or reviews Stripe, Polar, or Paddle billing with server-owned pricing, verified webhooks, idempotency, subscription state, and durable entitlements.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-payments
```

The complete instructions are in [`skills/nodejs-payments/SKILL.md`](skills/nodejs-payments/SKILL.md).

### Node.js Organizations

Builds a Node.js organization domain with memberships, invitations, teams, RBAC, ownership protection, audit events, and tested tenant isolation while preserving an existing organization library when present.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-organizations
```

The complete instructions are in [`skills/nodejs-organizations/SKILL.md`](skills/nodejs-organizations/SKILL.md).

### Expo NativeWind Theme

Sets up NativeWind v4 with semantic color, spacing, radius, typography, and component-size tokens, Google fonts, coordinated light/dark surfaces, and Sonner Native feedback.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-nativewind-theme
```

The complete instructions are in [`skills/expo-nativewind-theme/SKILL.md`](skills/expo-nativewind-theme/SKILL.md).

### Expo Uniwind Theme

Sets up a lighter Tailwind CSS v4 theme with semantic tokens, Uniwind light/dark/system switching, platform selectors, Expo Router navigation colors, fonts, and optional toast feedback.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-uniwind-theme
```

The complete instructions are in [`skills/expo-uniwind-theme/SKILL.md`](skills/expo-uniwind-theme/SKILL.md).

### Expo Native Builder

Follows an Expo project's existing Uniwind, NativeWind, or StyleSheet system, then builds polished screens and flows with native navigation, purposeful motion, restrained gradients, complete states, and accessibility.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-native-builder
```

The complete instructions are in [`skills/expo-native-builder/SKILL.md`](skills/expo-native-builder/SKILL.md).

### Expo Better Auth

Adds Better Auth email/password, Google, and Apple sign-in with SecureStore sessions and Expo deep-link callbacks.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-better-auth
```

The complete instructions are in [`skills/expo-better-auth/SKILL.md`](skills/expo-better-auth/SKILL.md).

### Full-stack Monorepo Setup

Scaffolds a pnpm and Turborepo workspace with a Node.js API, Vite React admin, Expo mobile app, shared ESLint and TypeScript configs, and a Tailwind web UI package. shadcn/ui stays optional.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill fullstack-monorepo-setup
```

The complete instructions are in [`skills/fullstack-monorepo-setup/SKILL.md`](skills/fullstack-monorepo-setup/SKILL.md).

### Plan Project

Interviews the user in focused batches, resolves product and technical ambiguity, and produces a validated project specification before implementation planning begins.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill plan-project
```

The complete instructions are in [`skills/plan-project/SKILL.md`](skills/plan-project/SKILL.md).

### Mobile UI Design

Turns a mobile app idea, plan, codebase, or references into a complete screen inventory, an approved visual direction, and a copy-ready concept or full-app board prompt. It works standalone and can optionally produce a portable `mobile-design.md` handoff.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill mobile-ui-design
```

The complete instructions are in [`skills/mobile-ui-design/SKILL.md`](skills/mobile-ui-design/SKILL.md).

### Plan Database

Inspects a product or codebase and proposes a concise database diagram, ORM choice, query-backed indexes, Redis decision, and MVP-to-scale plan.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill plan-database
```

The complete instructions are in [`skills/plan-database/SKILL.md`](skills/plan-database/SKILL.md).

## Repository structure

```text
.claude-plugin/
└── plugin.json
skills/
├── eve-agent-builder/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── application-agent.md
│       ├── frontend-integration.md
│       ├── production-checklist.md
│       └── project-topologies.md
├── expo-better-auth/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/better-auth-expo.md
├── expo-nativewind-theme/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/nativewind-theme.md
├── expo-uniwind-theme/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/uniwind-theme.md
├── expo-native-builder/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── gradient-background.md
│       ├── keyboard-controller.md
│       ├── motion-native.md
│       ├── native-ui.md
│       ├── onboarding-flows.md
│       ├── paywall-ui.md
│       └── reusable-components.md
├── fullstack-monorepo-setup/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── deployment.md
│       ├── expo-monorepo.md
│       └── package-layout.md
├── mobile-ui-design/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── board-prompt.md
│       ├── mobile-design-file.md
│       ├── paywall-design.md
│       └── premium-onboarding.md
├── nodejs-scaffolding/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/security-logging-shutdown.md
├── nodejs-testing/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/testing-strategy.md
├── nodejs-security/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/audit-playbook.md
├── nodejs-payments/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/providers.md
├── nodejs-organizations/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/organizations.md
├── plan-database/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── database-plan-template.md
│       └── managed-redis.md
└── plan-project/
    ├── SKILL.md
    └── agents/openai.yaml
site/
├── index.html
├── app.js
├── styles.css
└── tokens.css
CHANGELOG.md
```

Run the static site locally:

```bash
npm run serve
```
