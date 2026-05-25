import { Slash, Image, Link2, Timer } from 'lucide-react';

const points = [
  {
    icon: Slash,
    text: 'Slash commands. Type / and pick from 20+ block types without touching the mouse.',
  },
  {
    icon: Image,
    text: 'Inline media. Drop an image, paste a YouTube URL, or embed any link as a rich preview card.',
  },
  {
    icon: Timer,
    text: 'Smart auto-save. No Cmd+S anxiety. Your words are safe 2 seconds after you stop typing.',
  },
  {
    icon: Link2,
    text: 'Tables, code blocks, task lists, blockquotes — all supported, all keyboard-friendly.',
  },
];

export function EditorCallout() {
  return (
    <section className="border-b border-[var(--nt-ink)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          III. The Editor Surface
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-[var(--nt-text-primary)] leading-tight">
              Everything you need.
              <br />
              <span className="italic text-[var(--nt-text-muted)]">Nothing you don&apos;t.</span>
            </h2>

            <div className="mt-10 space-y-8">
              {points.map((p) => (
                <div key={p.text} className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <p.icon className="h-5 w-5 text-[var(--nt-accent)]" />
                  </div>
                  <p className="font-serif text-sm leading-relaxed text-[var(--nt-text-muted)]">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] p-6 overflow-hidden">
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="font-mono text-[11px] text-[var(--nt-text-muted)] bg-[var(--nt-ink)] px-2 py-1 rounded">/</span>
                <span className="font-mono text-[11px] text-[var(--nt-accent)] bg-[var(--nt-ink)] px-2 py-1 rounded">image</span>
                <span className="font-mono text-[11px] text-[var(--nt-text-muted)] bg-[var(--nt-ink)] px-2 py-1 rounded">table</span>
                <span className="font-mono text-[11px] text-[var(--nt-text-muted)] bg-[var(--nt-ink)] px-2 py-1 rounded">code</span>
              </div>
              <div className="h-4 w-full rounded bg-[var(--nt-ink)]" />
              <div className="h-4 w-5/6 rounded bg-[var(--nt-ink)]" />
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--nt-text-muted)]">
                <span className="text-[var(--nt-accent)]">●</span> bold
                <span className="text-[var(--nt-accent)]">●</span> italic
                <span className="text-[var(--nt-accent)]">●</span> link
                <span className="ml-auto">Saving…</span>
              </div>
              <div className="mt-4 h-24 w-full rounded bg-[var(--nt-ink)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
