import { Lock, Link, Clock, Eye, EyeOff } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Private by default',
    desc: 'Every note starts invisible. Nobody sees it but you — no exceptions.',
  },
  {
    icon: Link,
    title: 'Share with a link',
    desc: 'One click generates a secure, view-only link. Revoke it anytime.',
  },
  {
    icon: Clock,
    title: 'Set to expire',
    desc: 'Add an expiry date to shared links. They die automatically.',
  },
  {
    icon: EyeOff,
    title: 'Stay invisible',
    desc: 'No public profiles, no activity feeds, no algorithm.',
  },
];

export function PrivacySection() {
  return (
    <section className="border-b border-[var(--nt-ink)] py-24 bg-[var(--nt-surface)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          IV. Control
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--nt-text-primary)] leading-tight">
              Private by default.
              <br />
              <span className="italic text-[var(--nt-accent-warm)]">Public on your terms.</span>
            </h2>
            <p className="font-serif mt-4 text-sm leading-relaxed text-[var(--nt-text-muted)] max-w-md">
              Every note starts invisible. No public profiles, no activity feeds, no algorithm.
              Your data stays yours — we never share, sell, or train on your content.
            </p>

            <div className="mt-10 space-y-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--nt-border)] bg-[var(--nt-bg)] group-hover:border-[var(--nt-accent)]/50 transition-colors">
                    <f.icon className="h-4 w-4 text-[var(--nt-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-[var(--nt-text-primary)]">{f.title}</h3>
                    <p className="font-serif text-xs text-[var(--nt-text-muted)] mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm">
              <div className="rounded-lg border border-[var(--nt-border)] bg-[var(--nt-bg)] overflow-hidden">
                <div className="p-5 border-b border-[var(--nt-border)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-[var(--nt-accent)]" />
                      <span className="font-mono text-xs text-[var(--nt-text-primary)]">Note privacy</span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--nt-accent)]">Active</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-[var(--nt-accent)]/30 bg-[var(--nt-accent)]/5 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-[var(--nt-accent)]/10">
                        <Lock className="h-3.5 w-3.5 text-[var(--nt-accent)]" />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[var(--nt-text-primary)]">Private</span>
                        <p className="font-mono text-[9px] text-[var(--nt-text-muted)] tracking-wider">Only you can view</p>
                      </div>
                    </div>
                    <div className="h-4 w-8 rounded-full bg-[var(--nt-accent)] relative">
                      <div className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] p-3 opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-[var(--nt-ink)]">
                        <Link className="h-3.5 w-3.5 text-[var(--nt-text-muted)]" />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-[var(--nt-text-muted)]">Shared</span>
                        <p className="font-mono text-[9px] text-[var(--nt-text-muted)] tracking-wider">Anyone with the link</p>
                      </div>
                    </div>
                    <div className="h-4 w-8 rounded-full bg-[var(--nt-ink)] relative">
                      <div className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-[var(--nt-text-muted)]" />
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5">
                  <div className="rounded-lg border border-dashed border-[var(--nt-border)] bg-[var(--nt-surface)]/50 p-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link className="h-3 w-3 text-[var(--nt-text-muted)]" />
                      <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">folio.app/s/••••••</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-3 font-mono text-[10px] text-[var(--nt-text-muted)] text-center tracking-wider">
                One toggle. Instant link. Full control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
