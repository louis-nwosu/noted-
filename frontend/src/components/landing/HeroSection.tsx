'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const [stats, setStats] = useState({
    notesCreated: '—',
    wordsWritten: '—',
    avgReadingTime: '—',
    activeUsersThisWeek: '—',
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/stats`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStats({
            notesCreated: d.data.notesCreated.toLocaleString(),
            wordsWritten: (d.data.wordsWritten / 1_000_000).toFixed(1) + 'M',
            avgReadingTime: d.data.avgReadingTime + ' min',
            activeUsersThisWeek: d.data.activeUsersThisWeek.toLocaleString(),
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[var(--nt-ink)]">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          I. The Editor
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-5xl leading-tight sm:text-6xl lg:text-8xl text-[var(--nt-text-primary)]">
              Write anything.
              <br />
              <span className="italic">Own everything.</span>
            </h1>
            <p className="font-serif mt-6 text-lg leading-relaxed text-[var(--nt-text-muted)] max-w-lg">
              Notes with full editorial control — rich text, embedded media, private by default,
              shareable on your terms.
            </p>
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
          </div>

          <div className="relative flex items-center justify-center">
            <div className="animate-float-slow w-full max-w-lg rounded-lg border border-[var(--nt-border)] shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden bg-[var(--nt-surface)]">
              <div className="p-4 border-b border-[var(--nt-border)]">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-3 font-mono text-[11px] text-[var(--nt-text-muted)]">
                    untitled — NoteTake
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-8 w-3/4 rounded bg-[var(--nt-ink)]" />
                <div className="h-4 w-full rounded bg-[var(--nt-ink)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--nt-ink)]" />
                <div className="h-4 w-4/6 rounded bg-[var(--nt-ink)]" />
                <div className="mt-4 h-32 w-full rounded bg-[var(--nt-ink)]" />
                <div className="h-4 w-3/4 rounded bg-[var(--nt-ink)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--nt-ink)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--nt-ink)] pt-6">
          <div className="flex flex-wrap gap-8 font-mono text-[11px] text-[var(--nt-text-muted)]">
            <span>● Notes created: {stats.notesCreated}</span>
            <span>● Words written: {stats.wordsWritten}</span>
            <span>● Avg. reading time: {stats.avgReadingTime}</span>
            <span>● Users this week: {stats.activeUsersThisWeek}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
