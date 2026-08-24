# Managed Redis decision guide

Read this only after identifying a real Redis workload.

## Provider shortlist

| Option | Consider when | Verify before choosing |
| --- | --- | --- |
| [Upstash Redis](https://upstash.com/docs/redis/features/restapi) | Serverless or edge workloads benefit from an HTTP/REST client | Region, command/client compatibility, request and storage limits, persistence, and cost |
| [Redis Cloud](https://redis.io/docs/latest/operate/rc/) | The application needs managed Redis with standard Redis clients and operational controls | Region, plan limits, networking, high availability, backups, and cost |
| [AWS ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.corecomponents.html) | The application already runs in AWS and benefits from VPC-local infrastructure | Engine choice, serverless versus node-based mode, TLS, failover, region, and cost |
| Deployment provider's Redis or Valkey | Co-location and simple operations matter most | Current official docs, protocol compatibility, durability, limits, and portability |

## Required decision record

- Reads being cached and the expected benefit.
- Durable source of truth.
- Key naming and tenant isolation.
- TTL and invalidation owner.
- Eviction and degraded-mode behavior.
- Region and network path.
- Protocol, commands, and library compatibility.
- Persistence, availability, monitoring, limits, and estimated cost.

Do not recommend self-hosting unless the user explicitly accepts the operational burden. Re-check official documentation because products and limits change.
