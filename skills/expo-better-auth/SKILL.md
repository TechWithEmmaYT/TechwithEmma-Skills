---
name: expo-better-auth
description: Add or repair Better Auth in Expo and React Native apps with email and password, Google, and Apple sign-in. Use when configuring an Expo auth backend or client, SecureStore sessions, deep-link callbacks, social providers, protected routes, or production auth checks.
---

# Expo Better Auth

Implement Better Auth for Expo or React Native with email/password plus Google and Apple sign-in. Keep secrets on the server, use secure session storage on the device, and preserve the project's existing database and navigation choices.

## Inspect before changing files

Read `package.json`, the Expo app config, environment examples, router layout, current API/backend structure, auth files, database schema, and existing sign-in screens. Determine the installed Expo and Better Auth versions and use their matching official documentation.

Do not expose `.env` contents in output. Do not upgrade Better Auth or Expo unless the user asks.

## Choose the backend topology

Better Auth requires a server-side auth instance.

- **Expo Router API routes**: mount the handler in the Expo app when web/server deployment supports API routes.
- **Separate backend**: use the existing Node, Hono, Next.js, or other supported server and point the Expo client at its public URL.
- **Framework-less React Native**: use a separate backend; do not pretend the mobile bundle can safely hold Better Auth server secrets.

Adapt to the existing database adapter. Do not silently introduce a database or ORM.

Read [references/better-auth-expo.md](references/better-auth-expo.md) for the configuration contract and provider checklist.

## Install current compatible packages

Use the project's package manager. Install `better-auth` and `@better-auth/expo` on the relevant client/server sides. The Expo client normally also needs `expo-secure-store` and `expo-network`; browser-based social sign-in needs `expo-linking`, `expo-web-browser`, and `expo-constants` when they are not already present.

Keep `better-auth` and all `@better-auth/*` packages on compatible versions. Never fabricate versions directly in `package.json`.

## Configure the server

Create one Better Auth instance with:

- an explicit production `baseURL`
- a high-entropy `BETTER_AUTH_SECRET`
- the project's database adapter and schema
- `emailAndPassword.enabled: true`
- Google and Apple entries under `socialProviders`
- the Expo server plugin
- tightly scoped `trustedOrigins`

Trust the app's custom scheme in every environment. Allow `exp://` wildcard origins only in development. Apple also requires `https://appleid.apple.com` in trusted origins for its flow.

Provider client secrets, Apple private keys, database credentials, and the Better Auth secret must remain server-only. Only public API URLs and genuinely public identifiers may use Expo's `EXPO_PUBLIC_` prefix.

## Configure the Expo client

Create the client from `better-auth/react` and add `expoClient` from `@better-auth/expo/client`. Configure the same app scheme used in the Expo app config, a stable storage prefix, and `expo-secure-store`.

The client `baseURL` must be reachable from the device. Do not use `localhost` for a physical device unless the backend is actually on that device; use an appropriate LAN URL for local testing or an HTTPS deployment.

Do not disable Metro package exports. If Metro or auth resolution changed, restart Expo with a cleared cache.

## Implement authentication flows

Provide:

- email sign-up with name, email, and password
- email sign-in
- sign-out
- session loading and protected/public navigation
- Google social sign-in
- Apple social sign-in
- clear pending and error states that prevent duplicate submissions

Use `authClient.signIn.social({ provider, callbackURL })` for the Better Auth browser flow. On native, navigate after it resolves when needed. Keep callback paths valid Expo Router destinations.

If the user explicitly wants native provider SDK buttons and ID-token sign-in, follow the provider-specific ID-token instructions, validate nonce handling, and configure every accepted audience. Do not mix browser-flow credentials with native ID-token assumptions.

Before production, add a real email delivery service for verification and password reset, use non-enumerating responses, and rate-limit sensitive endpoints. Never log passwords, reset tokens, OAuth codes, cookies, or secrets.

## Provider requirements

For Google, register Better Auth's server callback URL, not the app deep link, in Google Cloud. Configure `baseURL` correctly so Better Auth generates the same callback URL.

For Apple, use an active Apple Developer account, an App ID, Service ID, Sign in with Apple key, HTTPS domain, and HTTPS return URL. Apple does not accept localhost or non-TLS return URLs. Generate the Apple client-secret JWT on the server and plan rotation before its maximum six-month expiry. For native Apple ID-token sign-in, configure the app bundle identifier as an accepted audience.

## Verify on real targets

1. Run the Better Auth schema generation or migration required by the chosen adapter.
2. Run typecheck and lint.
3. Start the backend and Expo app.
4. Test email sign-up, email sign-in, sign-out, and session restoration.
5. Test Google on a real native target and verify the deep link returns to the app.
6. Test Apple on iOS with production-like HTTPS callbacks.
7. Confirm protected routes cannot flash before session loading completes.
8. Confirm no server secret is included in the client bundle or committed files.

Do not report Google or Apple as verified from compilation alone.

## Official references

- [Better Auth Expo integration](https://better-auth.com/docs/integrations/expo)
- [Better Auth email and password](https://better-auth.com/docs/authentication/email-password)
- [Better Auth Google provider](https://better-auth.com/docs/authentication/google)
- [Better Auth Apple provider](https://better-auth.com/docs/authentication/apple)
