# Default Package Layout

Use these packages as the default Turborepo foundation. Keep names under the namespace selected with the user; examples below use `@repo`.

## `packages/typescript-config`

Create a private package such as `@repo/typescript-config` with JSON configurations rather than runtime source code.

- `base.json`: strict shared defaults suitable for the installed TypeScript version.
- `react-library.json`: extends `base.json` and enables the React JSX transform for `packages/ui`.
- Add framework-specific files only when an actual app needs them.

Apps and packages extend these files through their workspace dependency. Keep framework-only options in the consumer instead of forcing browser, Node.js, and Expo projects into one config.

## `packages/eslint-config`

Create a private ESM package such as `@repo/eslint-config` using ESLint flat configuration.

- Export a base TypeScript configuration.
- Export a React configuration for the admin and UI package.
- Keep Vite, Node.js, and Expo-specific rules in their respective consumers unless more than one workspace needs them.

Install the current compatible ESLint packages through pnpm. Do not copy stale versions from an example repository.

## `packages/ui`

Create a private web-only package named `@repo/ui`. At minimum, export:

```json
{
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./components/*": "./src/components/*.tsx"
  }
}
```

Use Tailwind CSS according to the installed major version. The stylesheet must import Tailwind and include any source registration required for classes inside both `packages/ui` and `apps/admin`. Import `@repo/ui/globals.css` once from the admin entry point.

Create a dependency-light default button rather than installing a component system without permission:

```tsx
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export function Button({ className, ...props }: ButtonProps) {
  const classes = [
    "inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white",
    "transition-colors hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}
```

Keep the code style consistent with the repository formatter. Import it from the admin as:

```tsx
import { Button } from "@repo/ui/components/button";
```

Do not expose this package to Expo; it contains DOM elements and web CSS.

## Optional shadcn/ui mode

Enable this mode only after the user requests shadcn/ui.

1. Check the current official shadcn monorepo documentation and installed CLI behavior before changing files.
2. Configure `components.json` in both `apps/admin` and `packages/ui` with correct aliases.
3. Keep `style`, `iconLibrary`, and `baseColor` identical in both files. For Tailwind CSS v4, leave the config path empty as required by the current schema.
4. Point the UI package aliases to `@repo/ui/components`, `@repo/ui/lib`, `@repo/ui/hooks`, and `@repo/ui/lib/utils`.
5. Export `./components/*`, `./lib/*`, `./hooks/*`, and `./globals.css` from `packages/ui`.
6. Run the shadcn add command from `apps/admin`, for example:

   ```bash
   pnpm dlx shadcn@latest add button
   ```

7. Confirm the CLI generated `packages/ui/src/components/button.tsx`, updated the correct package dependencies, and produced valid package-name imports.

Do not create a registry, primitives package, or duplicate app-local copy of a shared shadcn component unless the user explicitly asks for one.
