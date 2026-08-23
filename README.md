# TechWithEmma Skills

Portable instruction sets for coding agents. Each skill lives under `skills/` and can be inspected before installation.

## Install

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills
```

The installer discovers every `skills/*/SKILL.md` entry and lets you choose which skills to install. Use `--skill <name>` to install one directly.

The repository also includes Claude Code plugin metadata in [`.claude-plugin/plugin.json`](.claude-plugin/plugin.json). See [CHANGELOG.md](CHANGELOG.md) for release history.

## Current skills

### Node.js Scaffolding

Builds compact TypeScript Express APIs with a predictable source structure, typed errors, optional Passport JWT authentication, opt-in MongoDB, and real runtime verification.

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

### Expo NativeWind Design

Designs and implements polished Expo screens and flows with a compact design brief, consistent NativeWind tokens, flexible onboarding step types, reusable component contracts, optional Lottie motion, complete UI states, and accessibility checks.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-nativewind-design
```

The complete instructions are in [`skills/expo-nativewind-design/SKILL.md`](skills/expo-nativewind-design/SKILL.md).

### Expo App Assets

Generates and configures production app icons, Android adaptive and monochrome layers, iOS variants, and light or dark splash screens without flattening platform-specific artwork.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-app-assets
```

The complete instructions are in [`skills/expo-app-assets/SKILL.md`](skills/expo-app-assets/SKILL.md).

### Expo Better Auth

Adds Better Auth email/password, Google, and Apple sign-in with SecureStore sessions and Expo deep-link callbacks.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-better-auth
```

The complete instructions are in [`skills/expo-better-auth/SKILL.md`](skills/expo-better-auth/SKILL.md).

### Full-stack Monorepo Setup

Scaffolds a pnpm and Turborepo workspace with a Node.js API, Vite React admin using shadcn/ui, Expo mobile app, and focused shared TypeScript packages that remain independently deployable.

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

## Repository structure

```text
.claude-plugin/
└── plugin.json
skills/
├── expo-app-assets/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/expo-asset-config.md
├── expo-better-auth/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/better-auth-expo.md
├── expo-nativewind-theme/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/nativewind-theme.md
├── expo-nativewind-design/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/
│       ├── lottie.md
│       ├── mobile-design-conventions.md
│       ├── native-and-universal-ui.md
│       ├── onboarding-flows.md
│       └── reusable-components.md
├── fullstack-monorepo-setup/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/deployment.md
├── nodejs-scaffolding/
│   ├── SKILL.md
│   └── agents/openai.yaml
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
