"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

const words = [
  "Rich text editing", "Voice dictation", "AI auto-research", "AI quizzes",
  "Code blocks", "Tables & math", "Share links", "PDF export",
];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <AnimateIn>
          <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
            I. The Editor
          </div>
        </AnimateIn>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <AnimateIn delay={100}>
              <h1 className="font-display text-4xl leading-tight sm:text-6xl lg:text-8xl text-[var(--nt-text-primary)]">
                Your thoughts,
                <br />
                <span className="italic">instantly captured.</span>
              </h1>
            </AnimateIn>
            <AnimateIn delay={200}>
              <p className="font-serif mt-6 text-lg leading-relaxed text-[var(--nt-text-muted)] max-w-lg">
                Fast, distraction-free notes that stay organized automatically.
                Rich text, AI research, voice input, and privacy you control —
                all in one place.
              </p>
            </AnimateIn>
            <AnimateIn delay={300}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--nt-accent)] text-[var(--nt-bg)] font-mono text-sm font-medium rounded hover:opacity-90 transition-all cursor-pointer"
                >
                  → Start writing — it&apos;s free
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--nt-border)] text-[var(--nt-text-primary)] font-mono text-sm rounded hover:bg-[var(--nt-surface)] transition-all cursor-pointer"
                >
                  See how it works ↓
                </Link>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={400} type="fade-in">
            <div className="relative flex items-center justify-center">
              <div className="animate-float-slow w-full max-w-lg rounded-lg border border-[var(--nt-border)] shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden bg-[var(--nt-surface)]">
                <div className="flex items-center gap-1 border-b border-[var(--nt-border)] px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-3 font-mono text-[10px] text-[var(--nt-text-muted)]">
                    untitled — Folio
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-[var(--nt-accent)]">
                    auto-save on
                  </span>
                </div>

                <div className="px-4 pt-3 pb-1">
                  <div className="flex items-center gap-0.5 overflow-x-auto rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] px-1.5 py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)]">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v10l7-5zM21 7v10l-7-5z"/></svg>
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)]">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v10l-7-5zM3 7v10l7-5z"/></svg>
                    </span>
                    <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded font-bold text-[11px] text-[var(--nt-text-muted)] font-serif">
                      B
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded italic text-[11px] text-[var(--nt-text-muted)] font-serif">
                      I
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded underline text-[11px] text-[var(--nt-text-muted)] font-serif">
                      U
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded line-through text-[11px] text-[var(--nt-text-muted)] font-serif">
                      S
                    </span>
                    <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)]" style={{ fontFamily: 'serif', fontSize: 10, fontWeight: 700 }}>
                      H1
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)]" style={{ fontFamily: 'serif', fontSize: 10, fontWeight: 600 }}>
                      H2
                    </span>
                    <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] text-[10px]">
                      ≡
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] text-[10px]">
                      1.
                    </span>
                    <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-accent)] text-[10px] bg-[var(--nt-accent)]/10" style={{ fontFamily: 'serif' }}>
                      /
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="rounded-lg border border-dashed border-[var(--nt-border)] px-3 py-2">
                    <span className="font-mono text-[9px] text-[var(--nt-text-muted)]">
                      + Add cover image
                    </span>
                  </div>

                  <div className="font-display text-lg text-[var(--nt-text-primary)]">
                    Untitled
                  </div>

                  <div className="text-[12px] leading-[1.7] font-serif text-[var(--nt-text-primary)] space-y-2">
                    <p>
                      A blank page can feel like a lot of pressure.
                      <span className="italic"> Not anymore.</span>
                    </p>

                    <h4 className="font-display text-sm text-[var(--nt-text-primary)]">
                      Getting Started
                    </h4>

                    <ul className="space-y-0.5 pl-3.5 list-disc text-[var(--nt-text-muted)]">
                      <li>Write naturally with rich text support</li>
                      <li>Organize with tags and folders</li>
                    </ul>

                    <div className="border-l-2 border-[var(--nt-accent)] pl-3 italic text-[var(--nt-text-muted)]">
                      The best interface is no interface at all.
                    </div>

                    <div className="rounded bg-[var(--nt-ink)] p-2 font-mono text-[10px] leading-relaxed text-[var(--nt-text-primary)]">
                      const note = await api.create(content)
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--nt-border)] px-4 py-2">
                  <span className="font-mono text-[9px] text-[var(--nt-text-muted)]">
                    89 words · 1 min read
                  </span>
                  <span className="font-mono text-[9px] text-[var(--nt-accent)]">
                    Saved {'\u2713'}
                  </span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={500}>
          <div className="mt-16 border-t border-[var(--nt-ink)] pt-8">
            <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--nt-text-muted)]">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--nt-accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--nt-accent)]" />
                </span>
                <span className="tracking-wider uppercase text-[var(--nt-text-muted)]/60">Supports</span>
              </span>
              <span className="w-px h-4 bg-[var(--nt-ink)]" />
              <div className="relative h-4 overflow-hidden w-[140px]">
                {words.map((w, i) => (
                  <span
                    key={w}
                    className={`absolute left-0 top-0 transition-all duration-500 ease-in-out ${
                      i === wordIndex ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
