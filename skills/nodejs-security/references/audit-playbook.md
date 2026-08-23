# Node.js backend security audit playbook

Use the framework's current official documentation and these primary security references:

- [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [API4: Unrestricted Resource Consumption](https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/)
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
- [Express production security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Express performance and reliability](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js HTTP API](https://nodejs.org/api/http.html) for server request, headers, keep-alive, and timeout controls
- [Helmet documentation](https://helmetjs.github.io/)

## Evidence collection

Use read-only searches and project-native checks first. Trace untrusted data from source to security-sensitive sink and confirm whether validation or authorization dominates the path. A vulnerable package is a finding only when the installed version and reachable use create meaningful exposure; otherwise record it as dependency risk.

Do not infer that a platform proxy supplies a control without deployment evidence. Mark infrastructure items as “not verifiable from repository” and provide exact questions or configuration checks.

## Resource-abuse review

Rate limiting alone is insufficient. Check:

- per-IP, per-account, per-organization, and per-operation controls;
- distributed stores when multiple instances serve traffic;
- proxy configuration used to derive client identity;
- maximum body, upload, array, batch, page, and query complexity;
- timeouts, abort signals, concurrency caps, queue depth, and retry ceilings;
- cache-key cardinality and cache stampede behavior;
- paid API budgets and user-level quotas;
- response behavior when limits are reached;
- metrics and alerts for rejection rate, latency, error rate, queue depth, and unusual spend.

Recommend values from measured traffic and business requirements. Do not invent universal limits.

## Finding template

```text
[SEC-001] High — Missing object-level authorization
Confidence: High
Evidence: src/routes/orders.ts:42
Attack path: An authenticated user can substitute another order ID.
Impact: Cross-account order disclosure.
Recommendation: Scope the lookup to the authenticated owner and test denial.
Behavior change: Requests for non-owned IDs return 404.
Reference: OWASP API1 / Authorization Cheat Sheet
```

