import { NextRequest, NextResponse } from "next/server";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? "";
const KIT_FORM_ID = process.env.KIT_FORM_ID ?? "";
const KIT_API_KEY = process.env.KIT_API_KEY ?? "";

const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: TURNSTILE_SECRET,
        response: token,
        remoteip: ip,
      }),
    },
  );

  const data = await res.json();
  return data.success === true;
}

async function sendEmailServer(params: {
  name: string;
  email: string;
  message: string;
}) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: params,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`EmailJS ${res.status}: ${text || res.statusText}`);
  }
}

async function subscribeServer(email: string) {
  if (!KIT_FORM_ID || !KIT_API_KEY) return;

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: KIT_API_KEY, email }),
    },
  );

  if (!res.ok) throw new Error(`ConvertKit ${res.status}`);
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, message, turnstileToken, subscribeNewsletter, companyUrl } =
    body as {
      name?: string;
      email?: string;
      message?: string;
      turnstileToken?: string;
      subscribeNewsletter?: boolean;
      companyUrl?: string;
    };

  if (companyUrl) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  if (!turnstileToken) {
    return NextResponse.json(
      { error: "Missing verification token." },
      { status: 400 },
    );
  }

  const valid = await verifyTurnstile(turnstileToken, ip);
  if (!valid) {
    return NextResponse.json(
      { error: "Verification failed." },
      { status: 403 },
    );
  }

  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_PRIVATE_KEY
  ) {
    return NextResponse.json(
      {
        error: "Failed to send message.",
        detail: "EmailJS is not configured. Set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY in Vercel.",
      },
      { status: 500 },
    );
  }

  try {
    await sendEmailServer({ name, email, message });

    if (subscribeNewsletter) {
      await subscribeServer(email).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to send message.", detail: message },
      { status: 500 },
    );
  }
}
