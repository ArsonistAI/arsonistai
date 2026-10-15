"use client";

import { useEffect } from "react";

// House rule: no wrapped line anywhere on the site may hold four words or
// fewer. CSS cannot guarantee that (`text-wrap: pretty` only guards against a
// one-word last line), so this measures each text block after layout and, when
// a line comes up short, first tries the browser's own wrap modes and then
// picks the line breaks outright.
//
// Picking breaks inserts <br class="fit-break"> elements and splits text nodes,
// which is only safe on text React will not re-render. Forms, buttons and nav
// are skipped for that reason; mark anything else whose text changes after
// load with `data-nofit`.

const BLOCKS =
  "p, li, h1, h2, h3, h4, h5, h6, blockquote, figcaption, dt, dd, td, th";
const SKIP =
  'nav, form, button, label, script, style, [data-nofit], [contenteditable], [aria-hidden="true"]';
const MIN_WORDS = 5;

interface Word {
  text: Text;
  at: number;
  width: number;
  // A word that starts its text node may be glued to the one before it, so a
  // line can only start at a word that follows whitespace in the same node.
  open: boolean;
}

function textNodes(node: Element): Text[] {
  const out: Text[] = [];
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
    acceptNode: (text) =>
      text.parentElement?.closest('[aria-hidden="true"]')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  for (let text = walker.nextNode(); text; text = walker.nextNode()) {
    out.push(text as Text);
  }
  return out;
}

function lineWords(node: Element): number[] {
  const lines: { top: number; bottom: number; words: number }[] = [];
  const range = document.createRange();
  for (const text of textNodes(node)) {
    for (const word of text.data.matchAll(/\S+/g)) {
      range.setStart(text, word.index);
      range.setEnd(text, word.index + word[0].length);
      const box = range.getClientRects()[0];
      if (!box) continue;
      const middle = (box.top + box.bottom) / 2;
      const line = lines.find((l) => middle > l.top && middle < l.bottom);
      if (line) line.words += 1;
      else lines.push({ top: box.top, bottom: box.bottom, words: 1 });
    }
  }
  return lines.map((line) => line.words);
}

function settled(node: Element): boolean {
  const lines = lineWords(node);
  return lines.length < 2 || lines.every((count) => count >= MIN_WORDS);
}

// Wrapping greedily at one width cannot reach every set of breaks. Choose them
// directly: the fewest lines of MIN_WORDS words or more, evened out.
function setBreaks(node: HTMLElement, full: number): boolean {
  const words: Word[] = [];
  const range = document.createRange();
  // Whether the text so far ends in a space, so that a link or bold phrase
  // that follows one can still start a line.
  let spaced = false;
  for (const text of textNodes(node)) {
    for (const word of text.data.matchAll(/\S+/g)) {
      range.setStart(text, word.index);
      range.setEnd(text, word.index + word[0].length);
      words.push({
        text,
        at: word.index,
        width: range.getBoundingClientRect().width,
        open: word.index > 0 || spaced,
      });
    }
    if (text.data.length) spaced = /\s$/.test(text.data);
  }
  const probe = document.createElement("span");
  probe.textContent = " ";
  node.appendChild(probe);
  const gap = probe.getBoundingClientRect().width;
  probe.remove();

  // best[i] is the cheapest way to set the words from i to the end.
  type Plan = { lines: number; slack: number; next?: number };
  const best: (Plan | null)[] = Array(words.length + 1).fill(null);
  best[words.length] = { lines: 0, slack: 0 };
  for (let i = words.length - MIN_WORDS; i >= 0; i -= 1) {
    if (i > 0 && !words[i].open) continue;
    let width = -gap;
    for (let j = i; j < words.length; j += 1) {
      width += words[j].width + gap;
      if (width > full) break;
      const rest = best[j + 1];
      if (j - i < MIN_WORDS - 1 || !rest) continue;
      const lines = rest.lines + 1;
      const slack = rest.slack + (full - width) ** 2;
      const current = best[i];
      if (
        !current ||
        lines < current.lines ||
        (lines === current.lines && slack < current.slack)
      ) {
        best[i] = { lines, slack, next: j + 1 };
      }
    }
  }
  if (!best[0]) return false;

  const starts: Word[] = [];
  for (let i = best[0].next!; i < words.length; i = best[i]!.next!) {
    starts.push(words[i]);
  }
  for (const { text, at } of starts.reverse()) {
    const br = document.createElement("br");
    br.className = "fit-break";
    text.after(br, text.splitText(at));
  }
  return true;
}

function clearBreaks(node: HTMLElement) {
  for (const made of node.querySelectorAll("br.fit-break")) made.remove();
  node.normalize();
}

// In a flex or grid row (a bullet beside its text, say) the text flows in one
// child, and that child's width is the one that matters.
function flowRoot(node: HTMLElement): HTMLElement | null {
  let el = node;
  for (;;) {
    const display = getComputedStyle(el).display;
    if (!display.includes("flex") && !display.includes("grid")) return el;
    const looseText = [...el.childNodes].some(
      (child) => child.nodeType === Node.TEXT_NODE && child.textContent?.trim()
    );
    const holders = [...el.children].filter(
      (child) =>
        child.getAttribute("aria-hidden") !== "true" &&
        child.textContent?.trim()
    );
    if (looseText || holders.length !== 1) return null;
    el = holders[0] as HTMLElement;
  }
}

function contentWidth(node: HTMLElement): number {
  const style = getComputedStyle(node);
  const box = node.getBoundingClientRect().width;
  const sides = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"] as const;
  return box - sides.reduce((sum, side) => sum + parseFloat(style[side]), 0);
}

// What each block was last fitted for, so unchanged blocks are left alone.
let fittedFor = new WeakMap<HTMLElement, string>();

function fit(node: HTMLElement) {
  const room = `${node.parentElement?.clientWidth}|${node.textContent}`;
  if (fittedFor.get(node) === room) return;
  fittedFor.set(node, room);

  clearBreaks(node);
  const lay = (wrap: string) => {
    node.style.textWrap = wrap;
    return settled(node);
  };
  if (lay("") || lay("pretty") || lay("balance")) return;

  lay("");
  if (setBreaks(node, contentWidth(node) - 0.5) && !settled(node)) {
    clearBreaks(node);
  }
}

// Every block to check, those on screen first.
function collect(): HTMLElement[] {
  const nodes = new Set<HTMLElement>();
  for (const block of document.body.querySelectorAll<HTMLElement>(BLOCKS)) {
    if (block.closest(SKIP) || block.querySelector(BLOCKS)) continue;
    // Breaks written into the markup (an address block, say) are deliberate.
    if (block.querySelector("br:not(.fit-break)")) continue;
    const node = flowRoot(block);
    if (node && node.offsetParent) nodes.add(node);
  }
  const distance = (node: HTMLElement) => {
    const box = node.getBoundingClientRect();
    return box.bottom > 0 && box.top < window.innerHeight ? -1 : Math.abs(box.top);
  };
  return [...nodes]
    .map((node) => ({ node, d: distance(node) }))
    .sort((a, b) => a.d - b.d)
    .map(({ node }) => node);
}

// A long article holds hundreds of blocks, so the work is sliced across frames
// rather than run as one long task that would freeze scrolling.
const SLICE_MS = 8;

export default function LineFitter() {
  useEffect(() => {
    let frame = 0;
    // Only changes that add or alter text blocks matter; the footer clock, for
    // one, ticks every second outside any block.
    const touchesBlocks = (record: MutationRecord) => {
      const target =
        record.target instanceof Element ? record.target : record.target.parentElement;
      if (target?.closest(BLOCKS)) return true;
      return [...record.addedNodes].some(
        (added) =>
          added instanceof Element &&
          (added.matches(BLOCKS) || added.querySelector(BLOCKS) !== null)
      );
    };
    const observer = new MutationObserver((records) => {
      if (records.some(touchesBlocks)) schedule();
    });
    const watch = () =>
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });

    let pending: HTMLElement[] = [];
    let stale = true;
    const root = document.documentElement;

    function run() {
      frame = 0;
      // The fitter's own edits would otherwise wake the observer again.
      observer.disconnect();
      if (stale) {
        pending = collect();
        stale = false;
      }
      const stop = performance.now() + SLICE_MS;
      while (pending.length && performance.now() < stop) {
        const node = pending.shift()!;
        if (node.isConnected) fit(node);
      }
      watch();
      // Read by tests and tooling to know when the page has settled.
      root.dataset.linefit = pending.length ? "busy" : "idle";
      if (pending.length) frame = requestAnimationFrame(run);
    }
    function schedule() {
      stale = true;
      root.dataset.linefit = "busy";
      if (!frame) frame = requestAnimationFrame(run);
    }

    // Line breaks move once the real typeface loads, so measure again.
    function refit() {
      fittedFor = new WeakMap();
      schedule();
    }

    schedule();
    document.fonts.ready.then(refit);
    document.fonts.addEventListener("loadingdone", refit);
    window.addEventListener("resize", schedule);
    watch();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", refit);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
