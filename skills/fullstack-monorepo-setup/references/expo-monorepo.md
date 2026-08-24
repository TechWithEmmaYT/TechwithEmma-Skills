# Expo in the Monorepo

Follow the current [Expo monorepo guide](https://docs.expo.dev/guides/monorepos/) and inspect the installed Expo SDK before adding compatibility workarounds.

## Metro

Expo SDK 52 and newer automatically configure monorepo support through `expo/metro-config`. If an older project manually sets any of these Metro options, remove them before treating the project as a normal modern workspace:

- `watchFolders`
- `resolver.nodeModulesPaths`
- `resolver.extraNodeModules`
- `resolver.disableHierarchicalLookup`

Then run `npx expo start --clear` once and verify the app. Do not preserve legacy configuration merely because it existed.

## pnpm installation strategy

Expo SDK 54 and newer support pnpm's isolated dependency installation. Keep the normal pnpm strategy by default because it exposes undeclared dependencies instead of hiding them through hoisting.

If a specific React Native library fails because it does not support isolated installs, confirm that incompatibility first. Only then consider this root `pnpm-workspace.yaml` fallback:

```yaml
nodeLinker: hoisted
```

Explain the tradeoff and re-run the native build after changing it. Do not add this setting preemptively.

## Native dependency integrity

Every workspace must declare the dependencies it imports. Prevent duplicate React, React Native, Expo, and native-module versions; a native build cannot safely compile conflicting versions of the same native module.

Use pnpm to inspect unexpected versions:

```bash
pnpm why react
pnpm why react-native
pnpm why expo
```

Add an override only after identifying why normal dependency alignment cannot resolve the duplicate. Do not force versions blindly.

Expo SDK 55 and newer automatically align Metro resolution with native autolinking in monorepos. Do not add the older `experiments.autolinkingModuleResolution` workaround unless the installed SDK requires it.

## Package boundaries

- Keep `packages/ui` web-only; Expo must not import DOM components or web CSS.
- Put a library needed only by mobile in `apps/mobile` until another native consumer exists.
- If Expo consumes a new workspace package, declare it with `workspace:*`, keep its entry points compatible with Metro, and verify iOS and Android separately.

## EAS Build ownership

Run EAS CLI from the Expo app directory. Keep `eas.json`, `credentials.json`, and other EAS-specific files beside that app rather than at the monorepo root. Multiple Expo apps require separate EAS files.

Add an app-local `postinstall` only when EAS must compile a workspace dependency before the native build. Scope that command to the actual package; do not rebuild the entire monorepo without evidence that it is required.
