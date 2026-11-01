import { NextRequest, NextResponse } from "next/server";
import { verifyEbookToken } from "@/lib/ebookToken";

/**
 * Gates /downloads/* behind a signed token issued by /api/contact, so the
 * ebook PDF can only be fetched after the home page form is submitted.
 * The attachment header replaces an <a download> attribute, which would save
 * the redirect's HTML as the file when a link has expired.
 */
export async function proxy(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (await verifyEbookToken(token)) {
    return NextResponse.next({ headers: { "Content-Disposition": "attachment" } });
  }
  return NextResponse.redirect(new URL("/en#ebook", request.url));
}

export const config = { matcher: "/downloads/:path*" };
