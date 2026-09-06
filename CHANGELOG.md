# Changelog

All notable changes to TechWithEmma Skills are documented here.

This project follows [Semantic Versioning](https://semver.org/). Changes that alter a skill's expected behavior are called out explicitly so users can decide when to update.

## [Unreleased]

### Added

- `eve-agent-builder` for adding production Eve agents to Next.js, React, Node.js, and MERN applications with authenticated app tools, approvals, schedules, evals, and `useEveAgent` interfaces.
- Claude Code plugin metadata for installing and discovering the skill collection as a plugin.
- `plan-project` for interviewing users, resolving product and technical ambiguity, and producing a validated specification before implementation planning.
- `nodejs-testing` for risk-focused unit, HTTP integration, real-dependency integration, and API end-to-end testing.
- `nodejs-security` for evidence-backed, read-only-first backend audits and explicitly approved security fixes.
- `nodejs-payments` for Stripe, Polar, or Paddle billing with verified webhooks, idempotency, subscription state, and entitlements.
- `nodejs-organizations` for a framework-neutral Node.js organization domain with memberships, invitations, teams, RBAC, ownership protection, audit events, and tenant isolation.
- `expo-native-builder` for implementing intentional Expo screens and flows with responsive spacing, complete UI states, native accessibility, motion, and gradient guidance.
- `expo-uniwind-theme` for Tailwind CSS v4 semantic tokens, light/dark/system themes, platform selectors, Expo Router navigation colors, fonts, and optional toast feedback.
- `mobile-ui-design` for building a complete mobile screen inventory and an adaptive prompt-only, concept-board, or full-app-board handoff without requiring other skills.
- `plan-database` for concise database diagrams, query-backed indexes, Redis decisions, and trigger-based MVP-to-scale planning.

### Changed

- Added flexible welcome-screen composition guidance to `mobile-ui-design` and `expo-native-builder`, covering hero/content proportions, rounded or curved panels, overlapping layers, optional shadows and gradients, and responsive action hierarchy.
- Added a "Search for the control before building it" rule to `expo-native-builder` so pickers, carousels, sheets, sliders, and similar interaction-heavy controls are looked up on npm before being hand-written in JSX, with a package catalogue for wheel and ruler pickers in `motion-native.md`.
- Reworked `fullstack-monorepo-setup` around the standard `eslint-config`, `typescript-config`, and Tailwind `ui` packages; shadcn/ui is now an explicit opt-in, and Expo guidance covers Metro, pnpm installs, native dependency integrity, and app-local EAS Build configuration.
- Fixed `fullstack-monorepo-setup` to use Vite, React, and TypeScript for the admin application instead of leaving the React framework open-ended.
- Added a concise pre-change proposal and explicit confirmation checkpoint to the new Node.js testing, security, payments, and organizations skills.
- Expanded `expo-nativewind-theme` with color and layout-token discovery, a 4-point spacing system, semantic shape/component sizing, and optional Sonner Native toast infrastructure.
- Renamed `expo-nativewind-build` to `expo-native-builder`; it now detects and preserves Uniwind, NativeWind, or StyleSheet instead of assuming Tailwind.
- Added a React Navigation theme bridge to `expo-nativewind-theme` so Expo Router scene backgrounds follow the active NativeWind light or dark palette.
- Added a required full-height, semantic, safe-area-aware screen shell to `expo-native-builder`, with navigator-aware edges and a reusable `Screen` contract.
- Added `react-native-keyboard-controller` guidance for keyboard-aware Expo forms and strengthened semantic token and root-provider requirements across the NativeWind skills.
- Expanded `expo-native-builder` with flexible heterogeneous onboarding steps, reusable component contracts, opt-in Lottie, purposeful motion and gradients, and native-versus-universal UI decisions.
- Added premium onboarding guidance across `mobile-ui-design` and `expo-native-builder`: activation-led journeys, varied step layouts, visible personalization, attribution, contextual permissions, verified social proof, commitment interactions, safe store-rating timing, honest result and paywall transitions, cohesive assets and motion, analytics boundaries, and optional companion-skill routing.
- Strengthened onboarding across `mobile-ui-design`, `react-native-motion`, and `expo-native-builder` with adaptive conversation maps, derived feedback, conditional branches, live charts and controls, cross-screen choreography, recalculation, and branch-boundary verification.
- Added a complete Base-category React Native motion package catalogue to `expo-native-builder`, with selection boundaries for foundations, gestures, data, feedback, celebration, blur, themes, and GPU effects.
- Expanded `nodejs-scaffolding` with `/api/v1` route aggregation, Helmet, Express rate limiting, console-only Winston logging, graceful signal shutdown, and Mongoose query-filter sanitization.
- Added a CommonJS-first tsup production build to `nodejs-scaffolding`, with separate type-checking, Nodemon development, extensionless imports, and selective handling for ESM-only dependencies.
- Clarified the standalone Eve filesystem, optional root `agent.ts`, required subagent configuration, and root-level `evals/` placement in `eve-agent-builder`.

### Removed

- Removed `expo-app-assets` and its historical public variant from the public skill collection. The skill now lives in the private TechWithEmma app repository for the planned paid app-icon and store-asset workflow.

## [0.1.0] - 2026-08-21

### Added

- `nodejs-scaffolding` for compact TypeScript Express APIs, typed errors, optional JWT authentication, opt-in MongoDB, and runtime verification.
- `expo-nativewind-theme` for NativeWind v4, semantic light and dark themes, and Google fonts.
- `expo-better-auth` for Better Auth email/password, Google, and Apple authentication in Expo apps.
- `fullstack-monorepo-setup` for pnpm and Turborepo workspaces containing a Node.js API, Vite React admin, Expo mobile app, and shared packages.
- Static skills catalogue with individual install commands and source links.

[Unreleased]: https://github.com/TechWithEmmaYT/TechwithEmma-Skills/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/TechWithEmmaYT/TechwithEmma-Skills/releases/tag/v0.1.0
