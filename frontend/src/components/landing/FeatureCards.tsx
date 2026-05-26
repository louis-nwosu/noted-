"use client";

import { AnimateIn } from "./AnimateIn";
import { ChevronRight } from "lucide-react";

const features = [
  {
    number: "01",
    title: "Write",
    tagline: "A surface built for thought.",
    description: [
      "Full rich-text editor with images, tables, code blocks with syntax highlighting, task lists, blockquotes, and slash commands.",
      "Voice input for hands-free dictation. Cover images, text color, inline links, and floating toolbar.",
      "Auto-save after 2 seconds of pause — no Cmd+S needed. Keyboard-first, distraction-free by default.",
    ],
    highlights: ["20+ block types", "Speech-to-text", "Auto-save", "Cover images"],
    accent: "default",
  },
  {
    number: "02",
    title: "Organise",
    tagline: "Your library, your system.",
    description: [
      "Notes grouped automatically by date — Today, Yesterday, This Week, This Month, Older. Pin what matters to the top.",
      "Search everything instantly. Filter by All, Private, Shared, Pinned, or Trash. Tag notes for cross-sectional discovery.",
      "Trash with 3-day recovery window. Restore or permanently delete. Nothing is ever truly gone until you say so.",
    ],
    highlights: ["Date grouping", "Search & filter", "Pin to top", "3-day trash recovery"],
    accent: "default",
  },
  {
    number: "03",
    title: "Share & Export",
    tagline: "Your words, wherever they need to go.",
    description: [
      "One click generates a secure, revocable share link — no account required for viewers. Choose view-only mode or disable entirely.",
      "Export any note as clean Markdown or formatted PDF with a single click. Perfect for publishing, documentation, or backup.",
      "Paste a URL in your note and get a rich preview card automatically. Set optional link expiry for time-sensitive content.",
    ],
    highlights: ["One-click links", "Markdown / PDF export", "Link unfurl", "View-only mode"],
    accent: "default",
  },
  {
    number: "04",
    title: "Privacy",
    tagline: "Private by default. Public on your terms.",
    description: [
      "Every note starts invisible. No public profiles, no activity feeds, no algorithm. Generate a share link only when you choose.",
      "Revoke any share link instantly. The link dies immediately — no caching, no lingering access. Full control, zero friction.",
      "Your data stays yours. We never share, sell, or train on your content. Encrypted in transit and at rest.",
    ],
    highlights: ["Private by default", "Instant revoke", "No training on your data", "Encrypted storage"],
    accent: "default",
  },
  {
    number: "05",
    title: "AI-Powered",
    tagline: "Learn faster. Write smarter.",
    description: [
      "Auto-research enriches your notes automatically. Write about any topic and get deeper explanations, related concepts, and source references surfaced in a companion panel.",
      "Generate custom quizzes from any note — multiple choice, true/false, or short answer. Test your knowledge right inside the editor.",
      "AI grades your answers instantly with detailed feedback. Track your learning progress over time. Turn every note into a study session.",
    ],
    highlights: ["Auto-research", "AI quizzes", "Instant grading", "Learning progress"],
    accent: "ai",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--nt-accent)]/[0.02] via-transparent to-[var(--nt-accent)]/[0.01] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <AnimateIn>
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase border border-[var(--nt-accent)]/20 rounded-full px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--nt-accent)] animate-pulse" />
            II. Capabilities
          </div>
        </AnimateIn>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <AnimateIn delay={100}>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--nt-text-primary)] leading-tight max-w-3xl">
              Everything you need to
              <br />
              <span className="italic text-[var(--nt-accent-warm)]">write, learn, and remember.</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="font-serif text-base text-[var(--nt-text-muted)] italic lg:text-right lg:max-w-sm shrink-0 leading-relaxed">
              Five capabilities. Zero compromises.
              <br />
              <span className="not-italic text-[var(--nt-accent)]">All included from day one.</span>
            </p>
          </AnimateIn>
        </div>

        <div className="space-y-8">
          {features.map((f, i) => (
            <AnimateIn key={f.number} delay={300 + i * 100}>
              <div
                className={`group relative rounded-2xl border transition-all duration-500 cursor-default overflow-hidden ${
                  f.accent === 'ai'
                    ? 'border-[var(--nt-accent)]/30 bg-gradient-to-br from-[var(--nt-accent)]/[0.04] via-[var(--nt-surface)] to-[var(--nt-surface)] hover:border-[var(--nt-accent)]/50 hover:shadow-[0_0_60px_rgba(200,240,74,0.08)]'
                    : 'border-[var(--nt-border)] bg-[var(--nt-surface)] hover:bg-[var(--nt-surface)]/80 hover:border-[var(--nt-border)]/80'
                }`}
              >
                {f.accent === 'ai' && (
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-[var(--nt-accent)]/10 rounded-full blur-3xl pointer-events-none" />
                )}
                <div className="p-8 sm:p-12">
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-1">
                      <span className={`font-display text-6xl sm:text-7xl select-none transition-opacity duration-500 ${
                        f.accent === 'ai' ? 'text-[var(--nt-accent)]/30' : 'text-[var(--nt-accent)]/15 group-hover:opacity-30'
                      }`}>
                        {f.number}
                      </span>
                    </div>

                    <div className="lg:col-span-6">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`font-display text-3xl sm:text-4xl ${
                          f.accent === 'ai' ? 'text-[var(--nt-accent)]' : 'text-[var(--nt-text-primary)]'
                        }`}>
                          {f.title}
                        </h3>
                        {f.accent === 'ai' && (
                          <span className="lg:hidden font-mono text-[9px] tracking-wider text-[var(--nt-accent)] bg-[var(--nt-accent)]/10 border border-[var(--nt-accent)]/20 rounded-full px-2 py-0.5 animate-pulse shrink-0">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-sm italic text-[var(--nt-text-muted)] mb-4">
                        {f.tagline}
                      </p>
                      <div className="space-y-2.5">
                        {f.description.map((line, li) => (
                          <p key={li} className="font-serif text-sm leading-relaxed text-[var(--nt-text-muted)]/80 flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--nt-accent)]/40 shrink-0" />
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9 flex items-start justify-start lg:justify-end">
                      <div className="flex flex-wrap gap-x-2 gap-y-2.5 justify-start lg:justify-end">
                        {f.highlights.map((h) => (
                          <span
                            key={h}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border font-mono text-[10px] tracking-wider transition-all duration-300 ${
                              f.accent === 'ai'
                                ? 'border-[var(--nt-accent)]/30 bg-[var(--nt-accent)]/5 text-[var(--nt-accent)] group-hover:border-[var(--nt-accent)]/50 group-hover:bg-[var(--nt-accent)]/10'
                                : 'border-[var(--nt-border)] bg-[var(--nt-bg)] text-[var(--nt-text-muted)] group-hover:border-[var(--nt-accent)]/20 group-hover:text-[var(--nt-text-primary)]'
                            }`}
                          >
                            <span className={`${f.accent === 'ai' ? 'text-[var(--nt-accent)]' : 'text-[var(--nt-accent)]'}`}>●</span>
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 h-px w-0 group-hover:w-full transition-all duration-500 ${
                    f.accent === 'ai'
                      ? 'bg-gradient-to-r from-[var(--nt-accent)]/60 to-transparent'
                      : 'bg-gradient-to-r from-[var(--nt-accent)]/30 to-transparent'
                  }`} />
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={800}>
          <div className="mt-16 text-center">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--nt-accent)] text-[var(--nt-bg)] font-mono text-sm font-medium rounded-xl hover:opacity-90 transition-all cursor-pointer group shadow-lg shadow-[var(--nt-accent)]/10"
            >
              Start writing — it&apos;s free
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
