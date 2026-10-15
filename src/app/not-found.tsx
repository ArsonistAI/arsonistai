import type { Metadata } from "next";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import "./globals.css";

/**
 * Root 404 for URLs that match no route at all (e.g. /does-not-exist).
 * Without this, Next renders its unbranded default, which inherits the root
 * layout's `index, follow` robots directive and emits a conflicting pair of
 * robots tags. Requests inside a locale segment are handled by
 * `[locale]/not-found.tsx` instead.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} className="dark">
      <body className="bg-background text-foreground antialiased">
        <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
          <p className="text-8xl font-bold text-lava mb-6">404</p>
          <h1 className="text-headline-md font-bold mb-4">Page not found</h1>
          <p className="text-body-lg text-muted mb-10 max-w-md">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href={`/${routing.defaultLocale}`}
            className="px-8 py-3 bg-lava text-background font-bold rounded-shape-full m3-button"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
