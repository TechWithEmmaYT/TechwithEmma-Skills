# TechWithEmma Skills

Portable instruction sets for coding agents. Each skill lives under `skills/` and can be inspected before installation.

## Install

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills
```

## Current skill

### Node.js Scaffolding

Builds compact TypeScript Express APIs with a predictable source structure, typed errors, optional Passport JWT authentication, opt-in MongoDB, and real runtime verification.

```bash
npx skills add TechWithEmmaYT/TechwithEmma-Skills --skill nodejs-scaffolding
```

The complete instructions are in [`skills/nodejs-scaffolding/SKILL.md`](skills/nodejs-scaffolding/SKILL.md).

## Repository structure

```text
skills/
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
