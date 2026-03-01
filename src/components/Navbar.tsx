"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LanguagePicker from "./LanguagePicker";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about-us", key: "about" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products" },
  { href: "/partnerships", key: "partnerships" },
  { href: "/insights", key: "insights" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 heat-wave">
          <img
            src="/Logo_Orange.svg"
            alt="ArsonistAI"
            width={120}
            height={32}
            className="h-8"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`text-label-lg m3-transition transition-colors relative ${
                  isActive
                    ? "text-lava"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {t(link.key)}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lava rounded-shape-full" />
                )}
              </Link>
            );
          })}
          <LanguagePicker />
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-6 h-0.5 bg-foreground m3-transition transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground m3-transition transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-foreground m3-transition transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden bg-background border-b border-border"
          style={{ animation: "m3-slide-down var(--motion-medium) var(--ease-emphasized)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-body-lg m3-transition transition-colors ${
                    isActive ? "text-lava font-medium" : "text-muted"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
            <LanguagePicker />
          </div>
        </div>
      )}
    </nav>
  );
}
