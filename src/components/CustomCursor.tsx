"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const raf = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const POS_LERP = 0.15;
    const SCALE_LERP = 0.2;
    const OFFSET = 3;

    const onPointerMove = (e: PointerEvent) => {
      target.current.x = e.clientX - OFFSET;
      target.current.y = e.clientY - OFFSET;
    };

    const onClick = () => {
      scale.current = 1.8;
      targetScale.current = 1;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * POS_LERP;
      pos.current.y += (target.current.y - pos.current.y) * POS_LERP;
      scale.current += (targetScale.current - scale.current) * SCALE_LERP;

      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale.current})`;

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("click", onClick);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "0.6rem",
        height: "0.6rem",
        borderRadius: "100%",
        backgroundColor: "white",
        mixBlendMode: "difference",
        zIndex: 99999999,
        userSelect: "none",
        pointerEvents: "none",
        willChange: "transform",
      }}
    />
  );
}
