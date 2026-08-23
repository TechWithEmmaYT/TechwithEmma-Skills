# Payment provider references

Provider APIs change. Use these official sources and verify the installed/current SDK before implementation.

## Stripe

- [Webhook integration](https://docs.stripe.com/webhooks)
- [Webhook signature verification](https://docs.stripe.com/webhooks/signature): verification requires the unchanged raw request body, `Stripe-Signature`, and endpoint secret.
- [Idempotent requests](https://docs.stripe.com/api/idempotent_requests)
- [Subscription webhooks and lifecycle](https://docs.stripe.com/billing/subscriptions/webhooks)
- [Entitlements](https://docs.stripe.com/billing/entitlements)
- [Radar](https://docs.stripe.com/radar)

For Express, mount the raw-body webhook route before a global JSON parser when required by the current Stripe integration guide.

## Polar

- [Polar onboarding and adapters](https://docs.polar.sh/onboarding)
- [TypeScript SDK](https://docs.polar.sh/documentation/sdks/typescript-sdk)
- [Official Polar agent skills](https://github.com/polarsource/skills), including its framework-neutral webhook integration and sandbox-testing guidance
- [Official TypeScript SDK source](https://github.com/polarsource/polar-js)
- [Customer management and external IDs](https://docs.polar.sh/features/customer-management)
- [Benefits and entitlements](https://docs.polar.sh/features/benefits)

Prefer Polar's current adapter or `@polar-sh/sdk/webhooks` verification helper after checking its current documentation. Keep organization access tokens private and bind Polar customers to stable application IDs.

## Paddle

- [Webhook overview](https://developer.paddle.com/webhooks/overview)
- [Signature verification](https://developer.paddle.com/webhooks/signature-verification)
- [Subscriptions overview](https://developer.paddle.com/build/subscriptions/overview)
- [Node SDK](https://github.com/PaddleHQ/paddle-node-sdk)

Prefer the official SDK's webhook verification. Paddle requires the unmodified raw body and `Paddle-Signature` header. Confirm sandbox versus live credentials and endpoints.

## Provider-neutral storage

At minimum, consider durable records for billing customers, subscriptions/orders, processed webhook events, and entitlements. Use unique constraints for provider customer IDs, subscription/order IDs, and event IDs. Store enough state to authorize locally and reconcile with the provider without copying sensitive payment data.
