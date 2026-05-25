export function TickerBar() {
  const items = [
    'Full rich-text editor',
    'Inline image & video embeds',
    'Private by default',
    'Share any note with a link',
    'Date-organised notes',
    'Export to PDF & Markdown',
    'Auto-save',
    'Slash command menu',
    'No subscription needed',
  ];

  const content = items.map((item) => `● ${item}  ·  `).join('');

  return (
    <div className="border-y border-[var(--nt-border)] bg-[var(--nt-surface)] overflow-hidden py-3">
      <div className="animate-marquee flex whitespace-nowrap font-mono text-[11px] text-[var(--nt-text-muted)] tracking-[0.15em] uppercase">
        <span className="mr-8">{content}</span>
        <span className="mr-8">{content}</span>
      </div>
    </div>
  );
}
