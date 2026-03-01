# Security Runbook — ArsonistAI

## Project Scope

| Directory | Role |
|---|---|
| `arsonistai/` | Active Next.js application |
| `website_2539b07a/` | Legacy WordPress snapshot — **reference only**, excluded via root `.gitignore` |

Never apply production changes to `website_2539b07a/`. If it contains credentials (it does), treat them as compromised and rotate on the live service.

---

## Deterrence vs Enforceable Controls

### Deterrence (client-side friction)

These slow down casual visitors but **cannot** stop a motivated attacker because the browser is under the visitor's control.

| Measure | Component | Bypass difficulty |
|---|---|---|
| Right-click disabled | `SecurityGuard.tsx` | Trivial (browser settings or JS console) |
| DevTools shortcuts blocked | `SecurityGuard.tsx` | Trivial (menu bar, flags, extensions) |
| Image/video drag disabled | `SecurityGuard.tsx` | Trivial (network tab, view-source) |

Toggle off during development by setting `NEXT_PUBLIC_DISABLE_SECURITY_GUARD=true` in `.env.local`.

### Enforceable Controls (server-side)

These are real security measures that do not depend on client cooperation.

| Measure | Location | What it protects |
|---|---|---|
| Turnstile server verification | `api/contact/route.ts` | Prevents forged captcha tokens |
| IP rate limiting | `api/contact/route.ts`, `api/subscribe/route.ts` | Throttles abuse (per-instance; upgrade to Upstash Redis for distributed) |
| Honeypot field | `api/contact/route.ts` | Catches naive bot submissions |
| Server-proxied API calls | `api/contact/route.ts`, `api/subscribe/route.ts` | Keeps EmailJS & ConvertKit keys off the client |
| Security headers / CSP | `next.config.ts` | Mitigates XSS, clickjacking, MIME-sniffing, mixed content |
| HSTS | `next.config.ts` | Enforces HTTPS |

---

## Environment Variables

All sensitive keys live in **server-only** env vars (no `NEXT_PUBLIC_` prefix). See `.env.local.example` for the full list.

| Variable | Side | Purpose |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client | Renders Turnstile widget |
| `NEXT_PUBLIC_DISABLE_SECURITY_GUARD` | Client | Dev toggle for deterrents |
| `TURNSTILE_SECRET_KEY` | Server | Verifies Turnstile tokens |
| `EMAILJS_SERVICE_ID` | Server | EmailJS service identifier |
| `EMAILJS_TEMPLATE_ID` | Server | EmailJS template identifier |
| `EMAILJS_PUBLIC_KEY` | Server | EmailJS user/public key |
| `EMAILJS_PRIVATE_KEY` | Server | EmailJS access token |
| `KIT_FORM_ID` | Server | ConvertKit form identifier |
| `KIT_API_KEY` | Server | ConvertKit API key |

---

## CSP Policy

The Content-Security-Policy is deployed as **Report-Only** initially. Once validated in staging/production with no unexpected violations:

1. In `next.config.ts`, change the header key from `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.
2. Optionally add a `report-uri` directive pointing to a CSP reporting service (e.g., Sentry, report-uri.com).

---

## Rate Limiting Upgrade Path

The current rate limiter uses an in-memory `Map` per serverless instance. This works for moderate traffic but resets on cold starts and is not shared across instances.

For production-grade rate limiting:

1. Add [Upstash Redis](https://upstash.com/) via `@upstash/ratelimit`.
2. Replace the in-memory `Map` in `api/contact/route.ts` and `api/subscribe/route.ts` with the Upstash sliding-window limiter.

---

## Deployment Note

Removing `output: "export"` from `next.config.ts` was required to enable API Route Handlers and the `headers()` config. All pages remain statically generated at build time via `generateStaticParams`. This is compatible with Vercel, Netlify, and any Node.js-capable host. If you must deploy to a static-only host (GitHub Pages, S3), re-add `output: "export"` and deploy the API routes as separate Cloudflare Workers or similar.
