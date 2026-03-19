# Contact Form: EmailJS + Cloudflare Turnstile

This specification describes how to implement a contact form that sends email via **EmailJS** and protects submissions with **Cloudflare Turnstile** (CAPTCHA alternative). It is written for a **Next.js** app with an API route and can be adapted to any project.

---

## Architecture Overview

```
[Client]  Form + Turnstile widget  →  POST /api/contact (token, name, email, message)
                                            ↓
[API Route]  1. Rate limit check
             2. Honeypot check (optional)
             3. Validate required fields
             4. Verify Turnstile token with Cloudflare
             5. Send email via EmailJS API
             6. Return 200 OK or error
```

- **Turnstile** runs in the browser and issues a one-time token after the user passes the challenge.
- The client sends that token with the form data to your API.
- The API verifies the token with Cloudflare’s `siteverify` endpoint, then sends the email server-side via EmailJS so the private key never touches the client.

---

## Part 1: Cloudflare Turnstile

### 1.1 Create a Turnstile widget

1. Log in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Turnstile** (in the sidebar or via the products menu).
3. Click **Add site**.
4. **Site name:** e.g. `My App Contact Form`.
5. **Domain:** Add every domain where the widget will run:
   - Production: `yourdomain.com`, `www.yourdomain.com`
   - Local: `localhost` (for development).
6. **Widget Mode:** Choose **Managed** (recommended) or **Non-interactive** / **Invisible** as needed.
7. Create the widget. You will get:
   - **Site Key** (public) → used in the frontend.
   - **Secret Key** (private) → used only in the API route.

### 1.2 Where to use the keys

| Key        | Used in              | Environment variable              |
|-----------|----------------------|-----------------------------------|
| Site Key  | Client (form page)   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  |
| Secret Key| API route (server)   | `TURNSTILE_SECRET_KEY`            |

- Never put the secret key in client-side code or in a `NEXT_PUBLIC_` variable.
- Add both to Vercel (or your host) under **Settings → Environment Variables** for Production (and Preview if you use it).

---

## Part 2: EmailJS

### 2.1 Create service and template

1. Log in at [emailjs.com](https://www.emailjs.com/) (or [dashboard.emailjs.com](https://dashboard.emailjs.com)).
2. **Email Service**
   - Go to **Email Services** → **Add New Service**.
   - Connect your email (Gmail, Outlook, or custom SMTP).
   - Note the **Service ID** (e.g. `service_xxxxx`).
3. **Email Template**
   - Go to **Email Templates** → **Create New Template**.
   - Set subject and body. Use variables that match what your API sends, for example:
     - `{{name}}`
     - `{{email}}`
     - `{{message}}`
   - Note the **Template ID** (e.g. `template_xxxxx`).
4. **Account keys**
   - **Account** or **API Keys** in the dashboard:
     - **Public Key** (User ID, e.g. `user_xxxxx`) → safe for client; for server you can use the same value.
     - **Private Key** (Access Token) → server only; never expose to the client.

### 2.2 Where to use the values

| Value       | Used in    | Environment variable           |
|------------|------------|---------------------------------|
| Service ID | API route  | `EMAILJS_SERVICE_ID`            |
| Template ID| API route  | `EMAILJS_TEMPLATE_ID`           |
| Public Key | API route  | `EMAILJS_PUBLIC_KEY`            |
| Private Key| API route  | `EMAILJS_PRIVATE_KEY`           |

Use the same Service ID, Template ID, and Public Key in the API when calling the EmailJS send endpoint. The template variables in the template (e.g. `{{name}}`, `{{email}}`, `{{message}}`) must match the keys you send in `template_params`.

---

## Part 3: Environment Variables

### 3.1 Summary

| Variable                         | Where     | Required | Description                    |
|----------------------------------|-----------|----------|--------------------------------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`| Client    | Yes*     | Turnstile site key             |
| `TURNSTILE_SECRET_KEY`          | API route | Yes*     | Turnstile secret key           |
| `EMAILJS_SERVICE_ID`            | API route | Yes      | EmailJS service ID             |
| `EMAILJS_TEMPLATE_ID`           | API route | Yes      | EmailJS template ID            |
| `EMAILJS_PUBLIC_KEY`            | API route | Yes      | EmailJS public key (user ID)   |
| `EMAILJS_PRIVATE_KEY`           | API route | Yes      | EmailJS private key (token)    |

\* If the Turnstile secret is not set, the API can skip verification (useful for local dev); if the site key is not set, the widget is hidden and the form can still submit (token will be empty—handle in API).

### 3.2 Local development

Create `.env.local` in the project root (do not commit it):

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

### 3.3 Vercel

In the Vercel project: **Settings → Environment Variables**. Add each variable and select the right environment (Production, Preview, Development). Use the value `true` or `false` without quotation marks when adding boolean-like values elsewhere; for these, use the raw keys/IDs with no extra quotes.

---

## Part 4: Next.js Implementation

### 4.1 Dependencies

Install the Turnstile React component:

```bash
npm install @marsidev/react-turnstile
```

No extra package is required for EmailJS on the server; use `fetch` to call the EmailJS API from the API route.

### 4.2 Head / CSP (Content Security Policy)

Turnstile loads scripts and a frame from Cloudflare. Allow them in your CSP and optionally preconnect for performance.

**In `layout.tsx` (or root layout):**

```tsx
<link rel="preconnect" href="https://challenges.cloudflare.com" />
<link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
```

**In `next.config.ts` (or your CSP config):** allow Cloudflare for scripts, connections, and frames:

- `script-src`: add `https://challenges.cloudflare.com`
- `connect-src`: add `https://challenges.cloudflare.com`
- `frame-src`: add `https://challenges.cloudflare.com`

Example (adjust to your existing CSP):

```ts
// Example CSP snippet
"script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com";
"connect-src 'self' https://challenges.cloudflare.com";
"frame-src https://challenges.cloudflare.com";
```

### 4.3 Client: Contact form component

The form must:

1. Be a client component (`"use client"`).
2. Render the Turnstile widget when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set.
3. Store the token from `onSuccess` and clear it on `onExpire` / `onError`.
4. Submit only when a token is present (if Turnstile is enabled); disable the submit button until then.
5. Send a POST request to `/api/contact` with JSON body: `name`, `email`, `message`, `turnstileToken`, and any optional fields (e.g. honeypot, newsletter).

**Minimal structure:**

```tsx
"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    // Optional: honeypot
    const honeypot = formRef.current.querySelector<HTMLInputElement>("[name='company_url']");
    if (honeypot?.value) return;

    if (!turnstileToken && TURNSTILE_SITE_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const fd = new FormData(formRef.current);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          turnstileToken,
          companyUrl: fd.get("company_url"),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      formRef.current.reset();
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Honeypot (hidden from users) */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <textarea name="message" required />

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          options={{ theme: "dark", size: "flexible" }}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken(null)}
          onError={() => setTurnstileToken(null)}
        />
      )}

      <button
        type="submit"
        disabled={status === "sending" || (!!TURNSTILE_SITE_KEY && !turnstileToken)}
      >
        Submit
      </button>

      {status === "success" && <p>Message sent.</p>}
      {status === "error" && <p>Something went wrong.</p>}
    </form>
  );
}
```

### 4.4 API route: Verify Turnstile and send with EmailJS

Create `app/api/contact/route.ts` (or equivalent). Flow:

1. **Rate limiting (optional but recommended)**  
   Use IP (e.g. `x-forwarded-for` or `x-real-ip`) to limit requests per IP per time window.

2. **Parse body**  
   Expect JSON: `name`, `email`, `message`, `turnstileToken`, and optional fields.

3. **Honeypot**  
   If a hidden field like `companyUrl` is filled, return `200 OK` without sending email (bot trap).

4. **Validation**  
   Return `400` if required fields or `turnstileToken` are missing.

5. **Turnstile verification**  
   POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify`:

   ```json
   {
     "secret": "<TURNSTILE_SECRET_KEY>",
     "response": "<turnstileToken from body>",
     "remoteip": "<client IP>"
   }
   ```

   If the JSON response has `success !== true`, return `403`.

6. **EmailJS send**  
   POST to `https://api.emailjs.com/api/v1.0/email/send`:

   ```json
   {
     "service_id": "<EMAILJS_SERVICE_ID>",
     "template_id": "<EMAILJS_TEMPLATE_ID>",
     "user_id": "<EMAILJS_PUBLIC_KEY>",
     "accessToken": "<EMAILJS_PRIVATE_KEY>",
     "template_params": {
       "name": "<from body>",
       "email": "<from body>",
       "message": "<from body>"
     }
   }
   ```

   If the response is not OK, return `500` and optionally include the response body or a `detail` message for debugging.

7. **Success**  
   Return `200` with `{ "ok": true }`.

**Minimal verify + send helpers:**

```ts
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) return true; // skip when not configured
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

async function sendEmail(params: { name: string; email: string; message: string }) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}
```

Use the client IP from `request.headers.get("x-forwarded-for")?.split(",")[0]` or `request.headers.get("x-real-ip")` (Vercel sets these).

---

## Part 5: Optional Enhancements

- **Rate limiting:** Store per-IP counts in memory (or Redis) and return `429` when over threshold.
- **Honeypot:** Hidden field; if set, treat as bot and respond with success without sending email.
- **Error detail in 500 response:** Return a `detail` field (e.g. EmailJS error body) so you can debug from the browser Network tab; avoid exposing sensitive data in production if needed.
- **Newsletter:** If you have a second service (e.g. ConvertKit), call it after a successful send and use separate env vars for that integration.

---

## Checklist

| Step | Action |
|------|--------|
| 1 | Create Turnstile widget in Cloudflare; add production and localhost domains; copy Site Key and Secret Key. |
| 2 | Create EmailJS service and template; ensure template variables match `template_params` (e.g. `name`, `email`, `message`); copy Service ID, Template ID, Public Key, Private Key. |
| 3 | Add all env vars to `.env.local` and to Vercel (Production/Preview). |
| 4 | Install `@marsidev/react-turnstile` and add CSP + preconnect for `challenges.cloudflare.com`. |
| 5 | Implement the contact form component with Turnstile widget and submit to `POST /api/contact`. |
| 6 | Implement the API route: validate input → verify Turnstile → send email via EmailJS → return 200 or error. |
| 7 | Test with Turnstile in managed mode; confirm email delivery and that 500 responses include enough detail to fix config issues. |
