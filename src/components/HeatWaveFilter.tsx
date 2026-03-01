"use client";

import { useEffect, useRef } from "react";

const BUTTON_FILTER_ID = "heat-wave-button";
const LOGO_FILTER_ID = "heat-wave-logo";
const LOGO_DISPLACEMENT_ID = "heat-wave-logo-displacement";

const SVG_MARKUP = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none">
  <defs>
    <filter id="${BUTTON_FILTER_ID}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.15"
                    numOctaves="2" seed="5" result="noise">
        <animate attributeName="baseFrequency" dur="4s"
                 values="0.02 0.15;0.05 0.1;0.02 0.15"
                 repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="noise"
                         scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>

    <filter id="${LOGO_FILTER_ID}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.15"
                    numOctaves="2" seed="5" result="noise">
        <animate attributeName="baseFrequency" dur="4s"
                 values="0.02 0.15;0.05 0.1;0.02 0.15"
                 repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap id="${LOGO_DISPLACEMENT_ID}" in="SourceGraphic" in2="noise"
                         scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>`;

export default function HeatWaveFilter() {
  const logoRafIds = useRef<number[]>([]);

  useEffect(() => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = SVG_MARKUP;
    const svg = wrapper.firstElementChild!;
    document.body.prepend(svg);

    const logoDisplacement = document.getElementById(LOGO_DISPLACEMENT_ID);
    const logoElements = new Set<Element>();
    const buttonElements = new Set<Element>();

    function onEnter(this: Element) {
      (this as HTMLElement).style.filter = `url(#${BUTTON_FILTER_ID})`;
    }

    function onLeave(this: Element) {
      (this as HTMLElement).style.filter = "";
    }

    function runLogoRipple() {
      if (!logoDisplacement || logoElements.size === 0) return;
      const maxScale = 4;
      const durationMs = 4000;
      const fadeMs = 900;
      const startedAt = performance.now();

      logoElements.forEach((el) => {
        (el as HTMLElement).style.filter = `url(#${LOGO_FILTER_ID})`;
      });

      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const clamped = Math.min(elapsed, durationMs);
        let intensity = 1;

        if (clamped < fadeMs) {
          intensity = clamped / fadeMs;
        } else if (clamped > durationMs - fadeMs) {
          intensity = (durationMs - clamped) / fadeMs;
        }

        logoDisplacement.setAttribute("scale", (maxScale * Math.max(0, Math.min(1, intensity))).toFixed(3));

        if (elapsed < durationMs) {
          const id = window.requestAnimationFrame(tick);
          logoRafIds.current.push(id);
          return;
        }

        logoDisplacement.setAttribute("scale", "0");
        logoElements.forEach((el) => {
          (el as HTMLElement).style.filter = "";
        });
      };

      const id = window.requestAnimationFrame(tick);
      logoRafIds.current.push(id);
    }

    function attach() {
      document.querySelectorAll(".heat-wave").forEach((el) => {
        if (el.getAttribute("data-hw") === "1") return;
        el.setAttribute("data-hw", "1");
        logoElements.add(el);
      });

      document.querySelectorAll(".m3-button").forEach((el) => {
        if (el.getAttribute("data-hw") === "1") return;
        el.setAttribute("data-hw", "1");
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        buttonElements.add(el);
      });
    }

    attach();
    runLogoRipple();
    const logoIntervalId = window.setInterval(runLogoRipple, 8000);
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearInterval(logoIntervalId);
      logoRafIds.current.forEach((id) => window.cancelAnimationFrame(id));
      logoElements.forEach((el) => {
        (el as HTMLElement).style.filter = "";
      });
      buttonElements.forEach((el) => {
        (el as HTMLElement).style.filter = "";
      });
      document.querySelectorAll("[data-hw]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeAttribute("data-hw");
      });
      svg.remove();
    };
  }, []);

  return null;
}
