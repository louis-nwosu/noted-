"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimateIn } from "./AnimateIn";

const quotes = [
  {
    text: "NoteTake is the first notes app where I've never wished I was in a different one.",
    author: "Adaeze O.",
    role: "Product Designer",
    location: "Lagos",
  },
  {
    text: "I've tried everything — Notion, Obsidian, Craft. NoteTake is the only one that stays out of my way and lets me write.",
    author: "Marcus L.",
    role: "Engineering Lead",
    location: "Berlin",
  },
  {
    text: "The privacy-first approach is what sold me. Finally a notes app that doesn't try to be a social network.",
    author: "Priya K.",
    role: "UX Researcher",
    location: "Toronto",
  },
  {
    text: "I export everything to PDF for my editors. One click, clean formatting, no fuss. It just works.",
    author: "James W.",
    role: "Freelance Writer",
    location: "Melbourne",
  },
  {
    text: "Slash commands, auto-save, keyboard shortcuts — it's like someone built a notes app specifically for how my brain works.",
    author: "Aiko S.",
    role: "Developer",
    location: "Tokyo",
  },
];

const cities = [
  "6.52°N Lagos",
  "40.71°N New York",
  "51.51°N London",
  "1.35°N Singapore",
  "25.03°N Taipei",
  "48.86°N Paris",
  "37.77°N San Francisco",
  "52.52°N Berlin",
  "43.65°N Toronto",
  "37.81°S Melbourne",
  "35.68°N Tokyo",
];

export function PullQuote() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % quotes.length);
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const quote = quotes[index];
  const cityContent = cities.map((c) => `· ${c}  `).join("");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <AnimateIn>
          <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
            V. From The Field
          </div>
        </AnimateIn>

        <div className="mx-auto max-w-3xl min-h-[200px] flex flex-col justify-center">
          <blockquote>
            <p
              className={`font-display text-2xl sm:text-4xl lg:text-5xl italic leading-snug text-[var(--nt-text-primary)] transition-all duration-300 ${
                animating
                  ? "opacity-0 translate-y-4 scale-[0.98]"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer
              className={`mt-6 font-mono text-[11px] text-[var(--nt-text-muted)] tracking-wider transition-all duration-300 delay-75 ${
                animating
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              — {quote.author}, {quote.role}, {quote.location}
            </footer>
          </blockquote>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === index) return;
                setAnimating(true);
                setTimeout(() => {
                  setIndex(i);
                  setTimeout(() => setAnimating(false), 50);
                }, 300);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? "w-6 bg-[var(--nt-accent)]"
                  : "w-1.5 bg-[var(--nt-ink)] hover:bg-[var(--nt-text-muted)]"
              }`}
            />
          ))}
        </div>

        <div className="mt-16 border-t border-[var(--nt-ink)] pt-4 overflow-hidden">
          <div className="animate-marquee flex whitespace-nowrap font-mono text-[11px] text-[var(--nt-text-muted)] tracking-wider">
            <span className="mr-8">{cityContent}</span>
            <span className="mr-8">{cityContent}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
