"use client";

import { useEffect } from "react";

const BLOCKED_KEYS = new Set(["F12"]);

const BLOCKED_CTRL_SHIFT = new Set([
  "I",
  "J",
  "C",
]);

const BLOCKED_CTRL = new Set([
  "U",
  "S",
]);

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
