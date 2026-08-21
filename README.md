# TechWithEmma Skills

Portable instruction sets for coding agents. Each skill lives under `skills/` and can be inspected before installation.

## Install

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills
```

The installer discovers every `skills/*/SKILL.md` entry and lets you choose which skills to install. Use `--skill <name>` to install one directly.

## Current skills

### Node.js Scaffolding

Builds compact TypeScript Express APIs with a predictable source structure, typed errors, optional Passport JWT authentication, opt-in MongoDB, and real runtime verification.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-scaffolding
```

The complete instructions are in [`skills/nodejs-scaffolding/SKILL.md`](skills/nodejs-scaffolding/SKILL.md).

### Expo NativeWind Theme

Sets up NativeWind v4, a semantic light/dark theme, Google fonts, and coordinated Expo Router navigation surfaces.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-nativewind-theme
```

The complete instructions are in [`skills/expo-nativewind-theme/SKILL.md`](skills/expo-nativewind-theme/SKILL.md).

### Expo Better Auth

Adds Better Auth email/password, Google, and Apple sign-in with SecureStore sessions and Expo deep-link callbacks.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill expo-better-auth
```

The complete instructions are in [`skills/expo-better-auth/SKILL.md`](skills/expo-better-auth/SKILL.md).

## Repository structure

```text
skills/
├── expo-better-auth/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/better-auth-expo.md
├── expo-nativewind-theme/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   └── references/nativewind-theme.md
└── nodejs-scaffolding/
    ├── SKILL.md
    └── agents/openai.yaml
site/
├── index.html
├── app.js
├── styles.css
└── tokens.css
```

Run the static site locally:

```bash
npm run serve
```
