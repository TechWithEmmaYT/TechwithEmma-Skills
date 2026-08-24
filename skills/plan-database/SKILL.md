---
name: plan-database
description: Inspect a product brief or codebase and produce a concise PostgreSQL, MongoDB, or other database plan with an ORM choice, schema diagram, query-driven indexes, Redis decision, and MVP-to-scale guidance. Use before creating models, migrations, or production data architecture. Do not implement the schema unless the user explicitly asks.
---

# Plan Database

Design the database like a senior engineer, but keep the result short enough to review quickly.

## Start safely

Tell the user in one sentence that you will inspect the project and propose the database structure, indexes, Redis decision, and MVP-to-scale split. Planning is read-only by default. Do not create models, migrations, or infrastructure until the user approves and asks for implementation.

## 1. Inspect before asking

Read the available product plan and relevant code:

- routes, controllers, services, models, validators, migrations, and seed files;
- authentication, authorization, payments, search, jobs, analytics, and file storage;
- existing queries, filters, sorts, pagination, transactions, and uniqueness rules;
- ownership, organizations or tenants, retention, audit, and compliance needs.

Separate what already exists from what you propose. Preserve a working database or ORM unless there is a clear reason to change it.

## 2. Ask only what is missing

Ask one compact batch, not a long interview:

- PostgreSQL, MongoDB, another database, or undecided?
- Preferred ORM/query layer, or should you recommend one?
- Hosting platform and deployment region?
- Expected MVP traffic/data volume and realistic growth?
- Any multi-tenancy, strict transactions, search, analytics, retention, or compliance requirements?
- Redis cache: no, yes, or undecided? If yes, which reads should it accelerate?

Do not ask questions already answered by the project.

## 3. Make the storage decision

If the user is undecided, recommend one primary database with a short reason and name the main alternative.

- Prefer PostgreSQL when relationships, constraints, transactions, and reporting dominate.
- Prefer MongoDB when the domain naturally uses document aggregates and evolving nested data.
- Avoid multiple databases in the MVP unless the workload clearly requires them.
- Choose an ORM or query layer that fits the stack and existing conventions; do not switch tools for fashion.

## 4. Model from access patterns

Map each product feature to stored data and its important reads and writes. Define:

- entities or collections, ownership, tenancy, and cardinality;
- required fields, identifiers, timestamps, status values, and lifecycle;
- unique rules, foreign keys or references, and deletion behavior;
- transactional boundaries and historical snapshots;
- money as integer minor units or exact decimals, never floating point;
- MongoDB embed-versus-reference decisions; avoid unbounded embedded arrays;
- SQL normalization and join tables where they protect integrity.

Use a Mermaid `erDiagram`. For MongoDB, treat collections as entities and label relationships as embedded or referenced. Show the important structure, not every low-value field.

## 5. Design indexes from real queries

Every index must support a known query, sort, join, lookup, or uniqueness rule.

- For compound indexes, usually order equality fields, then sort fields, then range fields.
- Use unique, partial, sparse, text, geospatial, or TTL indexes only when the workload justifies them.
- Check whether one compound index can serve multiple access patterns.
- Do not index every field; mention write and storage cost where relevant.

Present indexes as: `Model | Index | Supports | Phase`.

## 6. Separate MVP from scale

Recommend now:

- integrity constraints and schema validation;
- query-backed indexes;
- migrations or controlled schema changes;
- backups, pagination, transactions, and basic observability where required.

Defer replicas, partitioning, sharding, external search, warehouses, and heavy caching until a measurable trigger exists. Pair each later recommendation with a trigger such as query latency, table size, cacheable read volume, or recovery requirement.

## 7. Decide on Redis deliberately

Redis is optional and must not become the source of truth for durable business data.

When caching helps, define:

- exact workload and why the primary database is insufficient;
- key format, TTL, invalidation, ownership, and failure behavior;
- memory/eviction expectations and whether persistence or high availability matters.

Then read [references/managed-redis.md](references/managed-redis.md) and recommend a managed option based on deployment region, protocol and client compatibility, networking, limits, reliability, and cost. Verify current official documentation before naming a provider.

## 8. Deliver the compact plan

Use [references/database-plan-template.md](references/database-plan-template.md). Keep the result concise and include:

1. decision and assumptions;
2. schema or collection diagram;
3. model summary and important invariants;
4. query-backed indexes;
5. MVP versus scale table;
6. Redis decision;
7. risks and unresolved choices.

Offer to save it as `database-plan.md`. Show the complete plan and ask for approval before implementing database code.

## Final check

- Every important feature maps to stored data.
- Ownership, relationships, and invariants are explicit.
- Each index names the query or rule it supports.
- MVP work is separated from trigger-based scale work.
- Redis is justified or explicitly rejected.
- No implementation happened without approval.
