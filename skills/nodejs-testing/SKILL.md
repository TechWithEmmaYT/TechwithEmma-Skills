---
name: nodejs-testing
description: Design, add, review, or repair tests for Node.js and TypeScript backends, including unit tests, HTTP integration tests, database integration tests, and API end-to-end tests. Use when a user asks to test a Node.js API, improve backend test coverage, choose a test runner, add Vitest or node:test, use Supertest or Testcontainers, or diagnose unreliable backend tests.
---

# Node.js Testing

Build the smallest reliable test suite that matches the application's real risks. Preserve a working test stack unless the user explicitly asks to replace it.

## Confirm before changing

Inspect read-only first. Before writing files, installing packages, updating configuration, generating coverage, or running a command that may change state, show a proposal of no more than five short bullets covering the tests to add, files or areas affected, tools/packages, verification, and anything intentionally excluded. Wait for confirmation, then perform only the approved work. Do not repeat documentation or narrate routine steps unless asked.

## Inspect before choosing tools

Read `package.json`, lockfiles, test configuration, application entrypoints, routes, services, database setup, authentication, and existing tests. Identify:

- runtime, module system, TypeScript execution, framework, and package manager;
- the existing runner and assertion/mocking tools;
- boundaries that can be tested without starting a network listener;
- stateful dependencies such as databases, caches, queues, object storage, and provider APIs;
- critical flows and failure cases.

If there is no runner, prefer the stable built-in `node:test` runner for a small dependency-light project. Prefer Vitest when the project benefits from TypeScript-first configuration, familiar mocking, workspaces, or richer coverage. Install current packages through the package manager; never invent versions.

Read [references/testing-strategy.md](references/testing-strategy.md) before creating or substantially restructuring a suite.

## Use the right test boundary

- **Unit**: test pure functions, validators, policies, and service decisions with controlled collaborators.
- **HTTP integration**: exercise the real router, middleware, validation, authorization, serialization, and error handling with Supertest or the framework's injection API.
- **Dependency integration**: exercise the real database, cache, or queue in an isolated test environment. Use Testcontainers when a disposable service is practical.
- **API end-to-end**: start the production-shaped application and verify a few highest-value user journeys across real boundaries.

Do not call a controller-only test end-to-end. Do not mock the database in a test whose purpose is to validate persistence behavior.

## Keep the application testable

Separate application construction from listening. Export an app or factory so HTTP tests do not bind a port. Inject only genuine external boundaries such as clocks, random IDs, mail, payment clients, and third-party APIs; avoid rewriting the application into an abstraction framework for tests.

Use a dedicated test environment and database. Never use production credentials. Make setup deterministic, isolate each test, and clean up connections, servers, timers, containers, files, and mocked state.

## Cover behavior and risk

For each important route or service, cover the useful subset of:

- successful behavior and response contract;
- invalid input and boundary values;
- unauthenticated and unauthorized access;
- missing resources and ownership or tenant isolation;
- dependency failure, timeout, retry, and idempotency where applicable;
- concurrency or duplicate requests when correctness depends on them;
- sensitive-data redaction in errors or logs.

Prefer assertions on public behavior and durable state. Avoid snapshots for volatile payloads and avoid tests coupled to private implementation details.

## Coverage and CI

Use coverage to locate untested risk, not as proof of correctness. Add thresholds only after measuring the current baseline, and do not inflate numbers with meaningless tests. Run deterministic tests in CI, cache dependencies rather than mutable service state, and keep flaky tests visible until fixed.

## Verification and handoff

Run the narrow tests first, then the full suite, typecheck, and relevant build. Report:

1. test layers and critical behaviors added;
2. commands and exact pass/fail results;
3. real dependencies used versus mocked boundaries;
4. important risks still untested;
5. any failures that existed before the change.
