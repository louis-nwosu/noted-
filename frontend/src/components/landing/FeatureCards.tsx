import { PenSquare, Layers, Share2 } from 'lucide-react';

const features = [
  {
    number: '01',
    icon: PenSquare,
    title: 'Write',
    description: 'Full Tiptap editor with images, video, code blocks, tables, and slash commands.',
  },
  {
    number: '02',
    icon: Layers,
    title: 'Organise',
    description: 'Date-grouped notes, pin, search, and tag filter for fast retrieval.',
  },
  {
    number: '03',
    icon: Share2,
    title: 'Share',
    description: 'One link, view-only. Private by default. Revoke anytime.',
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="border-b border-[var(--nt-ink)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          II. Capabilities
        </div>
        <h2 className="font-display text-5xl sm:text-6xl text-[var(--nt-text-primary)] leading-tight">
          The editor is the product.
        </h2>
        <p className="font-serif text-xl text-[var(--nt-text-muted)] italic mt-2 mb-16">
          Three things done right.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.number}
              className="group relative rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] p-8 overflow-hidden transition-all hover:border-[var(--nt-text-muted)]"
            >
              <div className="absolute -top-6 -right-6 font-display text-[120px] text-[var(--nt-accent)] opacity-[0.08] select-none pointer-events-none">
                {f.number}
              </div>
              <f.icon className="h-8 w-8 text-[var(--nt-accent)] mb-4" />
              <h3 className="font-display text-xl text-[var(--nt-text-primary)] mb-3">{f.title}</h3>
              <p className="font-serif text-sm leading-relaxed text-[var(--nt-text-muted)]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
