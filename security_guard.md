# Security Guard Implementation

A client-side guard that discourages casual inspection and copying by blocking right-click, common dev-tools shortcuts, view source, and dragging of media. Control it via an environment variable so you can turn it off for development or debugging.

**Note:** This is a light deterrent only. Determined users can still open dev tools via the browser menu or other methods. Do not rely on it for real security.

---

## What It Blocks

| Action | Description |
|--------|-------------|
| **Right-click** | Context menu (Inspect, Save image, Copy, etc.) is disabled. |
| **F12** | Opening dev tools with F12 is prevented. |
| **Ctrl+Shift+I** | DevTools (Elements). |
| **Ctrl+Shift+J** | DevTools (Console). |
| **Ctrl+Shift+C** | Element picker. |
| **Ctrl+U** (or Cmd+U) | View page source. |
| **Ctrl+S** (or Cmd+S) | Save page. |
| **Drag** | Dragging `<img>`, `<video>`, and `<canvas>` elements is disabled. |

---

## Environment Variable

| Variable | Values | Effect |
|----------|--------|--------|
| `NEXT_PUBLIC_DISABLE_SECURITY_GUARD` | `true` | Guard is **off**. Right-click, F12, and other shortcuts work normally. |
| Unset or any other value | — | Guard is **on**. The blocks above are active. |

- **Local:** Add to `.env.local` (e.g. `NEXT_PUBLIC_DISABLE_SECURITY_GUARD=true` to disable during development).
- **Vercel:** Project → Settings → Environment Variables. Add the variable for Production / Preview / Development as needed. Use the value `true` (no quotation marks).

---

## Implementation Steps

### 1. Create the component

Create a client component, e.g. `src/components/SecurityGuard.tsx`:

```tsx
"use client";

import { useEffect } from "react";

const BLOCKED_KEYS = new Set(["F12"]);
const BLOCKED_CTRL_SHIFT = new Set(["I", "J", "C"]);
const BLOCKED_CTRL = new Set(["U", "S"]);

export default function SecurityGuard() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISABLE_SECURITY_GUARD === "true") return;

    function handleContextMenu(e: MouseEvent) {
      e.preventDefault();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (BLOCKED_KEYS.has(e.key)) {
        e.preventDefault();
        return;
      }
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.shiftKey && BLOCKED_CTRL_SHIFT.has(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }
      if (ctrl && !e.shiftKey && BLOCKED_CTRL.has(e.key.toUpperCase())) {
        e.preventDefault();
        return;
      }
    }

    function handleDragStart(e: DragEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "IMG" ||
        target.tagName === "VIDEO" ||
        target.tagName === "CANVAS"
      ) {
        e.preventDefault();
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
```

### 2. Mount it in the root layout

In your root layout (e.g. `src/app/layout.tsx` or `app/[locale]/layout.tsx`), render the guard so it runs on every page:

```tsx
import SecurityGuard from "@/components/SecurityGuard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <SecurityGuard />
      </body>
    </html>
  );
}
```

### 3. Configure the environment variable

- **Development:** In `.env.local`, set `NEXT_PUBLIC_DISABLE_SECURITY_GUARD=true` if you want to disable the guard locally.
- **Vercel:** In the project’s Environment Variables, add `NEXT_PUBLIC_DISABLE_SECURITY_GUARD` and set it to `true` only for environments where you want the guard off (e.g. Preview). Leave it unset for Production if you want the guard on in production.

---

## Customization

- **Block more keys:** Add key names to `BLOCKED_KEYS`, `BLOCKED_CTRL_SHIFT`, or `BLOCKED_CTRL`.
- **Allow right-click in specific areas:** In `handleContextMenu`, check `(e.target as HTMLElement).closest("[data-allow-context-menu]")` and skip `e.preventDefault()` when true; add `data-allow-context-menu` to elements that should allow right-click.
- **Respect prefers-reduced-motion:** You can skip attaching the guard when `window.matchMedia("(prefers-reduced-motion: reduce)").matches` if you want to avoid blocking for users who prefer reduced motion.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Add `SecurityGuard.tsx` (client component) with the logic above. |
| 2 | Render `<SecurityGuard />` in your root layout. |
| 3 | Use `NEXT_PUBLIC_DISABLE_SECURITY_GUARD=true` in `.env.local` or Vercel to turn the guard off when needed. |
