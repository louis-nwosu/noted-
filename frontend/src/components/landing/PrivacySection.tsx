import { Lock, Link, Clock } from 'lucide-react';

const cards = [
  {
    icon: Lock,
    title: 'Private',
    desc: 'Default for every note. No exceptions.',
  },
  {
    icon: Link,
    title: 'Shareable',
    desc: 'One click to generate a view-only link.',
  },
  {
    icon: Clock,
    title: 'Expiring',
    desc: 'Set an expiry date. Link dies automatically.',
  },
];

export function PrivacySection() {
  return (
    <section className="border-b border-[var(--nt-ink)] py-24 bg-[var(--nt-surface)]">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          IV. Control
        </div>
        <h2 className="font-display text-4xl sm:text-5xl text-[var(--nt-text-primary)] leading-tight">
          Private by default.
          <br />
          <span className="italic text-[var(--nt-accent-warm)]">Public on your terms.</span>
        </h2>

        <div className="mt-16 mx-auto max-w-lg">
          <div className="flex items-center justify-center gap-6 p-6 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-bg)]">
            <div className="flex flex-col items-center gap-2 p-4 rounded border border-[var(--nt-border)] bg-[var(--nt-surface)]">
              <Lock className="h-6 w-6 text-[var(--nt-accent)]" />
              <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">Private</span>
              <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">Only you</span>
            </div>
            <span className="font-mono text-2xl text-[var(--nt-text-muted)]">→</span>
            <div className="flex flex-col items-center gap-2 p-4 rounded border border-[var(--nt-border)] bg-[var(--nt-surface)]">
              <Link className="h-6 w-6 text-[var(--nt-accent-warm)]" />
              <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">Shared</span>
              <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">Anyone</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-lg border border-[var(--nt-border)] bg-[var(--nt-bg)] p-6 text-left"
            >
              <c.icon className="h-5 w-5 text-[var(--nt-accent)] mb-3" />
              <h3 className="font-display text-lg text-[var(--nt-text-primary)] mb-1">{c.title}</h3>
              <p className="font-mono text-xs text-[var(--nt-text-muted)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
