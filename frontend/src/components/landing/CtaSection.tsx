'use client';

import Link from 'next/link';
import { AnimateIn } from './AnimateIn';

export function CtaSection() {
  return (
    <section className="border-b border-[var(--nt-ink)] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,240,74,0.04)_0%,transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 text-center relative">
        <AnimateIn>
          <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
            VI. Begin
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[var(--nt-text-primary)] leading-tight">
            Try Folio free.
            <br />
            <span className="italic text-[var(--nt-accent-warm)]">Forever.</span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="mt-6 font-serif text-lg text-[var(--nt-text-muted)]">
            No credit card. No time limit. No data mining.
            <br />
            Just the best notes experience you&apos;ll ever have.
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <div className="mt-10">
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--nt-accent)] text-[var(--nt-bg)] font-mono text-sm font-medium rounded hover:opacity-90 transition-all text-lg cursor-pointer relative overflow-hidden"
            >
              <span className="relative z-10">→ Create your account</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
