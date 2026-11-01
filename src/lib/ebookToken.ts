/**
 * Signed, expiring tokens that gate the ebook PDF download. Tokens are issued
 * by /api/contact after a lead email is sent and checked by src/proxy.ts.
 * Uses Web Crypto so it runs in both the Node and proxy runtimes. The key is
 * EMAILJS_PRIVATE_KEY, a server-only secret the contact API already requires.
 */

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

const encoder = new TextEncoder();

function payload(exp: number | string): string {
  return `ebook-download:${exp}`;
}

function importKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage],
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    return null;
  }
}

export async function createEbookToken(): Promise<string> {
  const secret = process.env.EMAILJS_PRIVATE_KEY ?? "";
  const exp = Date.now() + TOKEN_TTL_MS;
  const key = await importKey(secret, "sign");
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload(exp)));
  return `${exp}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyEbookToken(token: string | null): Promise<boolean> {
  const secret = process.env.EMAILJS_PRIVATE_KEY;
  if (!secret || !token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [expPart, sigPart] = parts;

  if (!/^\d+$/.test(expPart)) return false;
  const exp = Number(expPart);
  if (!Number.isFinite(exp) || exp <= Date.now()) return false;

  const signature = fromBase64Url(sigPart);
  if (!signature) return false;

  try {
    const key = await importKey(secret, "verify");
    return await crypto.subtle.verify("HMAC", key, signature, encoder.encode(payload(expPart)));
  } catch {
    return false;
  }
}
