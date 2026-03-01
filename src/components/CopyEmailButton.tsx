"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CopyEmailButton() {
  const t = useTranslations("about");
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("careers@arsonistai.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copyEmail}
      className="inline-flex items-center gap-2 px-8 py-4 bg-lava/10 text-lava rounded-shape-full hover:bg-lava/20 m3-button font-medium"
    >
      {copied ? t("copied") : t("careersEmail")}
      {!copied && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
      )}
    </button>
  );
}
