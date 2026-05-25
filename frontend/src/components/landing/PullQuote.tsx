const cities = [
  '6.52°N Lagos',
  '40.71°N New York',
  '51.51°N London',
  '1.35°N Singapore',
  '25.03°N Taipei',
  '48.86°N Paris',
  '37.77°N San Francisco',
];

export function PullQuote() {
  const cityContent = cities.map((c) => `· ${c}  `).join('');

  return (
    <section className="border-b border-[var(--nt-ink)] py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
          V. From The Field
        </div>

        <blockquote className="mx-auto max-w-3xl">
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl italic leading-snug text-[var(--nt-text-primary)]">
            &ldquo;NoteTake is the first notes app where I&apos;ve never wished I was in a
            different one.&rdquo;
          </p>
          <footer className="mt-6 font-mono text-[11px] text-[var(--nt-text-muted)] tracking-wider">
            — Adaeze O., Product Designer, Lagos
          </footer>
        </blockquote>

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
