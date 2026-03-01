"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import NewsletterForm from "./NewsletterForm";

function LocationTimestamp() {
  const [time, setTime] = useState<string>("");
  const [tz, setTz] = useState<string>("PST");

  useEffect(() => {
    function update() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const tzStr = now
        .toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          timeZoneName: "short",
        })
        .split(" ")
        .pop() ?? "PST";
      setTime(timeStr);
      setTz(tzStr);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-center gap-2.5 text-muted text-body-sm tracking-widest uppercase select-none">
      <span>San Francisco, CA&nbsp;&nbsp;{time} {tz}</span>
      <span className="relative flex items-center justify-center w-3 h-3">
        <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-[sfPulse_2.4s_ease-in-out_infinite]" />
        <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
      </span>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const pageLinks = [
    { href: "/products" as const, label: tn("products") },
    { href: "/services" as const, label: tn("services") },
    { href: "/insights" as const, label: tn("insights") },
    { href: "/about-us" as const, label: tn("about") },
    { href: "/partnerships" as const, label: tn("partnerships") },
  ];

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/arsonistai/", icon: <InstagramIcon /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/arsonistai/", icon: <LinkedInIcon /> },
  ];

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-12 mb-14">
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">
            <img
              src="/Logo_Orange.svg"
              alt="ArsonistAI"
              width={120}
              height={32}
              className="h-8 heat-wave"
            />
            <LocationTimestamp />
          </div>

          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-3 items-start">
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-lg text-muted hover:text-lava m3-transition transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:col-span-4 lg:col-span-6 lg:justify-self-end w-full max-w-xl">
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-border my-10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 gap-x-8 items-center">
          <div className="md:col-span-3 flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 flex items-center justify-center rounded-shape-full text-muted hover:text-lava hover:bg-surface-container-high m3-transition transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap md:justify-center items-center gap-x-6 gap-y-2 text-body-sm text-muted">
            <Link
              href="/legal-terms"
              className="hover:text-lava m3-transition transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-lava m3-transition transition-colors"
            >
              {t("privacy")}
            </Link>
            <span>{t("copyright", { year: String(year) })}</span>
          </div>

          <div className="md:col-span-3 lg:col-span-2 md:justify-self-end">
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-2 text-label-lg text-muted hover:text-lava m3-transition transition-colors cursor-pointer"
            >
              <ArrowUpIcon />
              {t("backToTop")}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
