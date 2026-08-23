# Node.js testing strategy and references

Use current official documentation and the versions installed in the project. Do not copy a configuration from this file without checking compatibility.

## Tool selection

- [Node.js test runner](https://nodejs.org/api/test.html): built-in test discovery, suites, lifecycle hooks, mocking, reporters, and coverage capabilities. Check the stability marker for individual features in the project's Node version.
- [Vitest guide](https://vitest.dev/guide/): TypeScript-friendly test runner. Also consult [mocking](https://vitest.dev/guide/mocking.html), [coverage](https://vitest.dev/guide/coverage.html), and [projects](https://vitest.dev/guide/projects.html) when applicable.
- [Supertest](https://github.com/forwardemail/supertest): HTTP assertions against a Node server or application without manually managing a test port.
- [Testcontainers for Node.js](https://node.testcontainers.org/): disposable real infrastructure for integration tests. Use explicit readiness checks and always stop resources.

## Practical test pyramid

1. Put most business rules in fast unit tests.
2. Use HTTP integration tests for middleware, validation, authentication, authorization, errors, and response contracts.
3. Use real dependency integration tests for queries, constraints, transactions, migrations, serialization, and queue behavior.
4. Keep API end-to-end tests few and focused on revenue, authentication, tenant isolation, destructive operations, and other critical journeys.

For a bug fix, reproduce the bug with a failing test before changing production code when practical. For security fixes, add a regression test that proves the forbidden behavior is denied without disclosing exploit details in logs or fixtures.

