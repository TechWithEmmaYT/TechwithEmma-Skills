# Independent Deployment

Use one deployment target per application. All targets may connect to the same Git repository, but each receives its own build command, start or publish command, environment variables, domain, logs, and scaling policy.

## Workspace invariant

An application importing a workspace package needs access to:

- the root package manifest
- `pnpm-lock.yaml` and `pnpm-workspace.yaml`
- the application's directory
- every internal package in its dependency graph

If a provider's Root Directory feature excludes those files, leave the build context at the repository root and scope commands with pnpm filters. Do not copy shared source into an app during deployment.

Use the real package names from the workspace. Given `@repo/api`, `@repo/admin`, and `@repo/mobile`, filtered commands commonly take this shape:

```bash
pnpm install --frozen-lockfile
pnpm --filter @repo/api... build
pnpm --filter @repo/admin... build
```

The trailing `...` includes the selected package's workspace dependencies. Confirm the exact filter against the installed pnpm version.

## Render API

Create a Render Web Service connected to the monorepo. When the API consumes shared packages, use the repository root as the effective build context.

Typical commands:

```text
Build: pnpm install --frozen-lockfile && pnpm --filter @repo/api... build
Start: pnpm --filter @repo/api start
```

Set health checks to the API's real health route. Store database URLs, auth secrets, and provider keys only on this service.

## Render admin

For a client-rendered React or Vite admin, create a separate Render Static Site rather than serving its output through the API.

Typical build command:

```text
pnpm install --frozen-lockfile && pnpm --filter @repo/admin... build
```

Set the publish directory to the admin's actual output, commonly `apps/admin/dist` when commands run from the repository root. Add a rewrite to `index.html` when client-side routing requires SPA fallback.

Serving the admin from Node is valid when a single deployable unit is an explicit requirement, but it couples releases, scaling, caching, and failures. Do not choose that topology by default.

## Vercel or Cloudflare admin

Create a separate project connected to the same repository. Configure the detected framework, scoped build command, and output directory for `apps/admin`.

On Vercel, select the admin Root Directory and enable access to source files outside it when required by workspace dependencies, or retain a root build context and use a filtered command. Keep internal dependencies explicit so affected-project detection works.

On Cloudflare, choose Pages for a static SPA or Workers when the selected React framework requires server execution. Configure the workspace install and build from a context that includes shared packages.

## Expo and EAS

Keep `eas.json` and the Expo app configuration in `apps/mobile`. Run EAS commands from that application directory while retaining the monorepo's root workspace files in Git:

```bash
cd apps/mobile
eas build --platform ios
eas build --platform android
```

EAS installs workspace dependencies during the remote build. Verify that shared packages needed by mobile contain no Node-only or browser-only code. Use EAS Update or store submission only when the user requests those workflows.

## Change-based builds

Configure provider build filters only after normal deployment succeeds. Changes to `packages/shared`, root workspace configuration, or the lockfile may affect multiple apps and should trigger every dependent deployment.

## Official references

- [Render monorepo support](https://render.com/docs/monorepo-support)
- [Vercel monorepos](https://vercel.com/docs/monorepos)
- [Cloudflare Pages monorepos](https://developers.cloudflare.com/pages/configuration/monorepos/)
- [EAS Build with monorepos](https://docs.expo.dev/build-reference/build-with-monorepos/)
