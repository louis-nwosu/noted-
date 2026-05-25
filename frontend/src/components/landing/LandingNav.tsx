'use client';

import Link from 'next/link';

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(10,11,13,0.85)] border-b border-[var(--nt-ink)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium tracking-wider text-[var(--nt-text-primary)]">
            NOTETAKE
          </span>
          <span className="font-mono text-[10px] text-[var(--nt-text-muted)] border border-[var(--nt-ink)] px-1.5 py-0.5 rounded">
            VOL. 01
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-mono text-xs tracking-wider text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="font-mono text-xs tracking-wider px-4 py-2 bg-[var(--nt-accent)] text-[var(--nt-bg)] rounded font-medium hover:opacity-90 transition-all cursor-pointer"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
