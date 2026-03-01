import { NextRequest, NextResponse } from "next/server";

const KIT_FORM_ID = process.env.KIT_FORM_ID ?? "";
const KIT_API_KEY = process.env.KIT_API_KEY ?? "";

const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 3;
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

  const { email } = body as { email?: string };

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { error: "Valid email is required." },
      { status: 400 },
    );
  }

  if (!KIT_FORM_ID || !KIT_API_KEY) {
    return NextResponse.json(
      { error: "Newsletter service is not configured." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: KIT_API_KEY, email }),
      },
    );

    if (!res.ok) throw new Error(`ConvertKit ${res.status}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Subscription failed." },
      { status: 500 },
    );
  }
}
