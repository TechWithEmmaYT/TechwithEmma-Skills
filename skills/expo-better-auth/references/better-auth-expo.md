# Better Auth Expo reference

Use this checklist after verifying the installed Better Auth and Expo versions against the current official Expo integration guide.

## Expected boundary

```text
Server or Expo API routes
├── lib/auth.ts
└── api/auth/[...auth] catch-all handler

Expo client
├── app.json or app.config.ts
├── lib/auth-client.ts
├── sign-in screen
├── sign-up screen
└── root layout or auth gate
```

Names and paths may differ. Integrate with the existing structure rather than creating duplicates.

## Server essentials

```ts
import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  appName: "Your App",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: yourExistingAdapter,
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    apple: yourAppleProviderConfiguration,
  },
  trustedOrigins: [
    "yourapp://",
    "yourapp://*",
    "https://appleid.apple.com",
    ...(process.env.NODE_ENV === "development"
      ? ["exp://", "exp://**", "exp://192.168.*.*:*/**"]
      : []),
  ],
  plugins: [expo()],
});
```

The database adapter and Apple configuration are placeholders to adapt, not code to paste unchanged. Follow the official Apple provider guide for its async client-secret JWT configuration.

If using Expo Router API routes, mount the web-standard handler:

```ts
import { auth } from "@/lib/auth";

const handler = auth.handler;
export { handler as GET, handler as POST };
```

## Expo config and client

Use the same lower-case scheme in both places:

```json
{
  "expo": {
    "scheme": "yourapp"
  }
}
```

```ts
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL!,
  plugins: [
    expoClient({
      scheme: "yourapp",
      storagePrefix: "yourapp",
      storage: SecureStore,
    }),
  ],
});
```

The public API URL is not a secret. OAuth client secrets and the Better Auth secret are secrets and must never use `EXPO_PUBLIC_`.

## Client calls

```ts
await authClient.signUp.email({ name, email, password });
await authClient.signIn.email({ email, password });
await authClient.signOut();

await authClient.signIn.social({
  provider: "google",
  callbackURL: "/",
});

await authClient.signIn.social({
  provider: "apple",
  callbackURL: "/",
});
```

Use the session hook from the same client for routing. Keep the splash screen or auth gate visible until the initial session check settles so public screens do not flash for signed-in users.

## OAuth callback checklist

### Google

- Set `BETTER_AUTH_URL` to the backend origin.
- Register `<BETTER_AUTH_URL>/api/auth/callback/google` as an authorized redirect URI.
- Keep the app deep-link scheme in Better Auth trusted origins.
- Verify on both simulator and physical device when the course promises both.

### Apple

- Enable Sign in with Apple on the App ID.
- Create and configure a Service ID for the web authorization flow.
- Register the domain and `<BETTER_AUTH_URL>/api/auth/callback/apple` return URL.
- Use HTTPS; Apple will reject localhost and plain HTTP callbacks.
- Store Team ID, Key ID, private key, and generated client secret only on the server.
- Add the bundle identifier for native ID-token audience validation when that flow is used.
- Persist the first successful Apple profile result; Apple may only return the email on the first authorization.

## Production email checklist

- Configure email verification and password reset delivery.
- Store only hashed passwords through Better Auth's supported flow.
- Use generic messages where account enumeration is possible.
- Rate-limit sign-up, sign-in, verification, and reset endpoints.
- Make cookie and proxy configuration match the deployed HTTPS topology.
