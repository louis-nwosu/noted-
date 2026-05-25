import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="border-b border-[var(--nt-ink)] py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          VI. Begin
        </div>

        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--nt-text-primary)] leading-tight">
          Start your first note
          <br />
          <span className="italic text-[var(--nt-accent-warm)]">tonight.</span>
        </h2>

        <p className="mt-6 font-serif text-lg text-[var(--nt-text-muted)]">
          No credit card. No time limit.
          <br />
          Your notes stay yours.
        </p>

        <div className="mt-10">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--nt-accent)] text-[var(--nt-bg)] font-mono text-sm font-medium rounded hover:opacity-90 transition-all text-lg cursor-pointer"
          >
            → Create your account
          </Link>
        </div>
      </div>
    </section>
  );
}
