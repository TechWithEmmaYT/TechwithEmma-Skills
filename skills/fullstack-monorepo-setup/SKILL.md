---
name: fullstack-monorepo-setup
description: Scaffold or reorganize a pnpm and Turborepo workspace containing a Node.js API, Vite React admin, Expo mobile app, shared ESLint and TypeScript configuration packages, and a Tailwind CSS UI package. Use when related web, mobile, and backend apps should live in one repository and deploy independently, with optional shadcn/ui support for the web UI package.
---

# Full-stack Monorepo Setup

Create a compact, readable monorepo in which every application can run, build, and deploy independently while consuming explicitly declared workspace packages. Preserve an existing package manager, framework, and working structure unless the user asks to replace them.

Before changing files, inspect the repository and briefly tell the user the proposed app/package layout, package namespace, generators, and optional features. Ask for confirmation when the choice would materially change the structure, especially shadcn/ui. Do not add applications, packages, or tooling the user did not request.

## Confirm the topology

Use this skill when the product needs at least two related applications and benefits from one workspace. The default greenfield topology is:

```text
apps/
├── api/                   # Node.js and TypeScript backend
├── admin/                 # Vite, React, TypeScript, and Tailwind CSS
└── mobile/                # Expo and React Native
packages/
├── eslint-config/         # Shared flat ESLint configurations
├── typescript-config/     # Shared TypeScript configurations
└── ui/                    # Web-only Tailwind CSS components
    └── src/
        ├── components/button.tsx
        └── styles/globals.css
```

This mirrors the normal Turborepo split between applications, shared tooling configuration, and reusable web UI. Do not create generic `packages/config`, `packages/shared`, `packages/registry`, `packages/primitives`, or `packages/utils` folders by default. Add another package only when it has a real responsibility and at least two consumers.

Do not create placeholder apps the user does not need. For an existing repository, inspect the root manifests, lockfile, workspace configuration, app manifests, TypeScript configs, and imports before changing the layout.

## Establish the workspace

Prefer pnpm workspaces and Turborepo for this topology unless the project already uses another supported workspace tool.

1. Create `apps/` and `packages/` before generating applications.
2. Keep one lockfile and one `pnpm-workspace.yaml` at the repository root.
3. Mark the root package private and declare its current package-manager version.
4. Install current releases through official package-manager or framework commands. Never fabricate dependency versions in `package.json`.
5. Use one namespace consistently, such as `@repo/api`, `@repo/admin`, and `@repo/ui`, unless the user selects another.
6. Declare every internal dependency explicitly with `workspace:*`; do not rely on accidental hoisting.
7. Add root `dev`, `build`, `typecheck`, and `lint` scripts that delegate to Turbo.
8. Configure Turbo task dependencies and outputs to match the actual frameworks. Do not cache persistent development servers.

Keep runtime environment variables owned by the application that consumes them. Never put secrets in a reusable package or expose server variables through client-side prefixes.

Read [references/package-layout.md](references/package-layout.md) while creating the configuration and UI packages.

## Scaffold the applications

Use official generators with the user's chosen names and options. Do not initialize nested Git repositories.

### API

Use the requested Node.js framework; default to a small TypeScript Express API only when none is specified. The API must have its own package scripts, entry point, environment validation, health endpoint, build output, and start command.

Do not choose a database, authentication provider, or ORM unless requested. Keep the API independently runnable from both its directory and the workspace root. The API may extend the shared TypeScript and ESLint configurations, but it must not depend on `packages/ui`.

### Admin

Create `apps/admin` with Vite's React TypeScript template. Do not substitute Next.js, Remix, TanStack Start, or another React framework. Add the requested client-side router only when the project needs multiple routes.

Add Tailwind CSS using the official Vite setup for the installed version. Import the UI package's exported global stylesheet once at the admin entry point and render its simple Button in the initial screen to verify workspace resolution and Tailwind class discovery.

Do not initialize shadcn/ui automatically. If the user asks for shadcn/ui, convert `packages/ui` into the shared shadcn UI package using the official monorepo workflow in [references/package-layout.md](references/package-layout.md). Run the CLI from the admin app so generated web components land in `packages/ui`; do not hand-write generated shadcn components.

Keep the Vite build output at its normal `dist` location unless the deployment target requires a deliberate change.

### Mobile

Create the Expo application with the official Expo generator and keep Expo Router when the chosen template includes it. Install dependencies from the monorepo root after generation.

Use `expo/metro-config`. Expo SDK 52 and newer configure Metro for monorepos automatically, so do not add legacy `watchFolders`, `nodeModulesPath`, `extraNodeModules`, or `disableHierarchicalLookup` overrides without demonstrated need. Read [references/expo-monorepo.md](references/expo-monorepo.md) for pnpm installation strategy and native dependency checks.

Do not import DOM components, Tailwind web CSS, or shadcn/ui from `packages/ui` into Expo. NativeWind, native reusable components, theming, fonts, and authentication are separate concerns and should be added only when requested.

## Keep packages focused

- `packages/typescript-config` owns reusable base and React-library TypeScript configurations. Each app extends the closest config and keeps app-specific compiler options locally.
- `packages/eslint-config` owns reusable flat ESLint configurations such as base and React. Each workspace keeps only its framework-specific additions locally.
- `packages/ui` owns web-only React components and Tailwind CSS consumed by the admin. Export components and the stylesheet through explicit package exports.

Do not move types, schemas, constants, or helpers into a vague shared package merely because they might be reused later. When two applications genuinely need framework-neutral contracts, propose a clearly named package such as `packages/contracts` and explain its consumers before creating it.

## Keep deployments independent

Each deployed application is a separate service connected to the same Git repository. A provider may clone the whole repository while building only one app and its dependency graph.

Read [references/deployment.md](references/deployment.md) when configuring Render, Vercel, Cloudflare, or EAS. Never assume setting a provider's root directory to `apps/api` or `apps/admin` is safe when that app needs the root lockfile or workspace packages.

## Verify the result

Install dependencies once from the workspace root, then:

1. Run the root typecheck and lint tasks.
2. Build the API and admin independently with filtered workspace commands.
3. Start the API and call its health endpoint.
4. Start the admin and confirm Tailwind styles and the shared Button render.
5. If shadcn was requested, add one component with the CLI and confirm it was generated in `packages/ui` and imported by package name.
6. Start Expo with a cleared cache after workspace or Metro changes and open at least one native target.
7. Run the root build and confirm Turbo understands the dependency graph.

Report static, runtime, native-device, and deployment verification separately. Do not claim all applications work because only the aggregate build passed.

## Official references

- [Turborepo documentation](https://turborepo.com/docs)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [shadcn/ui monorepo](https://ui.shadcn.com/docs/monorepo)
- [Expo monorepos](https://docs.expo.dev/guides/monorepos/)
- [EAS Build with monorepos](https://docs.expo.dev/build-reference/build-with-monorepos/)
