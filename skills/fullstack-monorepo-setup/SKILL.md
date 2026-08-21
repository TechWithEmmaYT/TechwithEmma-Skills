---
name: fullstack-monorepo-setup
description: Scaffold or reorganize a pnpm and Turborepo workspace containing a Node.js API, React admin dashboard with shadcn/ui, Expo mobile app, and shared TypeScript packages. Use when starting a full-stack product whose web, mobile, and backend apps should live in one repository and deploy independently.
---

# Full-stack Monorepo Setup

Create a compact, teachable monorepo in which every application can run, build, and deploy independently while consuming explicitly declared workspace packages. Preserve an existing package manager, framework, and working structure unless the user asks to replace them.

## Confirm the topology

Use this skill when the product needs at least two related applications and benefits from shared code. The default greenfield topology is:

```text
apps/
├── api/       # Node.js and TypeScript backend
├── admin/     # React, Tailwind CSS, and shadcn/ui
└── mobile/    # Expo and React Native
packages/
├── config/    # Shared TypeScript and lint configuration
└── shared/    # Framework-neutral types, schemas, and constants
```

Do not create placeholder apps the user does not need. For an existing repository, inspect the root manifests, lockfile, workspace configuration, app manifests, TypeScript configs, and imports before changing the layout.

## Establish the workspace

Prefer pnpm workspaces and Turborepo for this topology unless the project already uses another supported workspace tool.

1. Create `apps/` and `packages/` before generating applications.
2. Keep one lockfile and one `pnpm-workspace.yaml` at the repository root.
3. Mark the root package private and declare its current package manager version.
4. Install current releases through official package-manager or framework commands. Never fabricate dependency versions in `package.json`.
5. Give every workspace package a unique `name`.
6. Declare every internal dependency explicitly with `workspace:*`; do not rely on accidental hoisting.
7. Add root `dev`, `build`, `typecheck`, and `lint` scripts that delegate to Turbo.
8. Configure Turbo task dependencies and outputs to match the actual frameworks. Do not cache persistent development servers.

Keep runtime environment variables owned by the application that consumes them. Do not put secrets in `packages/shared` or expose server variables through client-side prefixes.

## Scaffold the applications

Use official generators with the user's chosen names and options. Do not initialize nested Git repositories.

### API

Use the requested Node.js framework; default to a small TypeScript Express API only when none is specified. The API must have its own package scripts, entry point, environment validation, health endpoint, build output, and start command. It may import framework-neutral contracts from `packages/shared`.

Do not choose a database, authentication provider, or ORM unless requested. Keep the API independently runnable from both its directory and the workspace root.

### Admin

Create a React TypeScript admin application with the requested router or build tool. Add Tailwind CSS using the setup that matches the installed version, then initialize shadcn/ui inside `apps/admin` with the official CLI.

Install only the shadcn components the requested screens use. Do not create a shared UI registry, a primitives package, or a cross-platform component layer. Web shadcn components remain owned by the admin app.

### Mobile

Create the Expo application with the official Expo generator and keep Expo Router when the chosen template includes it. Use `expo/metro-config`; modern Expo versions detect workspaces automatically, so do not add legacy `watchFolders`, `nodeModulesPath`, or `extraNodeModules` overrides without demonstrated need.

Do not attempt to share DOM components or shadcn/ui with Expo. NativeWind, theming, fonts, and authentication are separate concerns and should be added only when requested.

## Design shared packages deliberately

Keep `packages/shared` free of React, React Native, Node-only APIs, secrets, and side effects. Good candidates include:

- TypeScript types and enums
- Zod request and response schemas
- constants shared by more than one application
- small pure formatting or calculation helpers

Do not move code into a package merely because it might be shared later. Prefer an app-local module until at least two consumers need it.

Expose a clear package entry point and make the package build strategy explicit. If consumers transpile TypeScript source directly, verify that the API bundler, admin build tool, and Expo Metro all resolve it. Otherwise, build the package before dependent applications and publish only its compiled output and declarations.

## Keep deployments independent

Each deployed application is a separate service connected to the same Git repository. A provider may clone the whole repository while building only one app and its dependency graph.

Read [references/deployment.md](references/deployment.md) when configuring Render, Vercel, Cloudflare, or EAS. Never assume setting a provider's root directory to `apps/api` or `apps/admin` is safe when that app needs the root lockfile or `packages/shared`.

## Verify the result

Install dependencies once from the workspace root, then:

1. Run the root typecheck and lint tasks.
2. Build `packages/shared` before consumers when it emits compiled output.
3. Build the API and admin independently with filtered workspace commands.
4. Start the API and call its health endpoint.
5. Start the admin and confirm its initial route renders.
6. Start Expo with a cleared cache after workspace or Metro changes and open at least one native target.
7. Run the root build and confirm Turbo understands the dependency graph.

Report static, runtime, native-device, and deployment verification separately. Do not claim all applications work because only the aggregate build passed.

## Official references

- [Expo monorepos](https://docs.expo.dev/guides/monorepos/)
- [EAS Build with monorepos](https://docs.expo.dev/build-reference/build-with-monorepos/)
- [Turborepo documentation](https://turborepo.com/docs)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [shadcn/ui monorepo installation](https://ui.shadcn.com/docs/installation/monorepo)
