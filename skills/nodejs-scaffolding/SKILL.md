---
name: nodejs-scaffolding
description: Scaffold or extend production-minded TypeScript Express projects with a fixed src architecture, shared error handling, optional Passport JWT cookie authentication, and opt-in MongoDB setup. Use when creating a Node.js API, adding authentication to one, or configuring MongoDB for it.
---

# Node.js Scaffolding

Build a compact, teachable TypeScript Express API. Preserve existing project choices and files; do not replace a working structure unless the user explicitly asks for a rewrite.

## Choose the requested mode

- **Base scaffold**: create the TypeScript Express foundation. Do not add a database connection.
- **Authentication**: extend the base with Passport JWT authentication stored in an HTTP-only cookie.
- **MongoDB**: add Mongoose only when the user explicitly asks to configure MongoDB.

If the request combines modes, apply them in that order.

## Base scaffold

### 1. Create the complete source tree first

Create every directory before installing packages or writing implementation files:

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── types/
├── utils/
└── validators/
```

Keep empty directories during scaffolding when they communicate the intended architecture. Use this flow for later features:

```text
route -> controller -> service -> model
```

### 2. Install current packages through npm

Initialize `package.json` when it does not exist, then use `npm install` commands. Never invent or hardcode package versions directly in `package.json`.

For the base scaffold, install the runtime and TypeScript packages the implementation actually uses. A typical Express base needs:

```bash
npm install express cors cookie-parser dotenv zod bcryptjs
npm install --save-dev typescript ts-node nodemon @types/node @types/express @types/cors @types/cookie-parser
```

Do not install Mongoose, Passport, JWT, sessions, or unused libraries in the base mode.

### 3. Create the foundation files

Create:

```text
src/config/env.config.ts
src/config/http-status.config.ts
src/middlewares/asyncHandler.middleware.ts
src/middlewares/errorHandler.middleware.ts
src/utils/app-error.ts
src/utils/bcrypt.ts
src/utils/get-env.ts
src/index.ts
.gitignore
nodemon.json
tsconfig.json
```

The base `env.config.ts` should expose `NODE_ENV` and `PORT`, using `getEnv` with sensible defaults. Do not include `MONGO_URI`, `database.config.ts`, or `connectDatabase` in `index.ts` until MongoDB is explicitly requested.

Configure `index.ts` with Express JSON and URL-encoded parsing, cookies, CORS when an origin is configured, a `GET /health` route, and `errorHandler` last. Keep the health response small and deterministic.

Use `asyncHandler.middleware.ts` to forward rejected controller promises to Express error middleware. Keep both `asyncHandler` and `errorHandler` in `src/middlewares`, not `src/utils`.

## Error contract

In `app-error.ts`, define:

```ts
export const ErrorCodes = {
  ERR_INTERNAL: "ERR_INTERNAL",
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_NOT_FOUND: "ERR_NOT_FOUND",
  ERR_VALIDATION: "ERR_VALIDATION",
} as const;
```

Also define `ErrorCodeType`, the `AppError` base class, and these subclasses:

- `InternalServerException`
- `NotFoundException`
- `BadRequestException`
- `UnauthorizedException`
- `ForbiddenException`

The error middleware must handle `ZodError` before `AppError`. Add a `formatZodError` helper that maps issues to readable `{ field, message }` objects and return `ErrorCodes.ERR_VALIDATION`. Do not leak stack traces or raw internal errors in production responses.

## Authentication mode

Use stateless JWT authentication with `passport-jwt` and `jsonwebtoken`. Do not use `passport-local` or `express-session`.

Install current packages through npm:

```bash
npm install passport passport-jwt jsonwebtoken
npm install --save-dev @types/passport @types/passport-jwt @types/jsonwebtoken
```

Add:

```text
src/config/passport.config.ts
src/controllers/auth.controller.ts
src/models/user.model.ts
src/routes/auth.route.ts
src/services/auth.service.ts
src/services/user.service.ts
src/utils/cookie.ts
src/validators/auth.validator.ts
```

Add `JWT_SECRET` and `JWT_EXPIRES_IN` to `env.config.ts`. The Passport strategy must use `ExtractJwt.fromExtractors` and read the token from `req.cookies.accessToken`:

```ts
const cookieExtractor = (req: Request) => req?.cookies?.accessToken ?? null;
```

Use `session: false`, initialize Passport in `index.ts`, mount the auth router, and protect the auth-status endpoint with the JWT middleware.

`cookie.ts` must expose `setJwtAuthCookie` and `clearJwtAuthCookie`. The cookie should be HTTP-only, secure in production, and use an intentional `sameSite` policy. Clear it with the same path and relevant options used when setting it.

Implement register, login, logout, and auth-status endpoints. Validate registration and login input with Zod. Hash passwords through the model or service exactly once, never return a password field, and use a non-enumerating invalid-credentials message for login failures.

## MongoDB mode

Only when the user explicitly asks to configure MongoDB:

1. Run `npm install mongoose`.
2. Create `src/config/database.config.ts`.
3. Add `MONGO_URI` to `env.config.ts` and `.env.example` if that file exists.
4. Connect from the server startup path before reporting that the API is ready.
5. Keep connection errors visible and terminate startup cleanly when the initial connection fails.

If authentication is requested without a database choice, do not silently choose MongoDB. Ask for or adapt to the project's existing persistence layer.

## Verification

After writing files:

1. Run the project's TypeScript check or build.
2. Start the real development server with `npm run dev`.
3. Wait for its ready output, call the health endpoint, and confirm the expected response.
4. Stop the verification process cleanly unless the user asked to keep it running.

Do not report the scaffold as complete based only on `tsc --noEmit`; the server must start successfully.
