'use client';

import { FileText, FileDown, Globe, Link, Smartphone, Monitor, Mic, Sparkles, GraduationCap } from 'lucide-react';
import { AnimateIn } from './AnimateIn';

const integrations = [
  { icon: Mic, label: 'Speech-to-text', desc: 'Dictate notes hands-free' },
  { icon: Sparkles, label: 'AI auto-research', desc: 'Deepen any topic instantly' },
  { icon: GraduationCap, label: 'AI quizzes', desc: 'Test your knowledge, get graded' },
  { icon: FileText, label: 'Markdown export', desc: 'Download any note as .md' },
  { icon: FileDown, label: 'PDF export', desc: 'Clean A4 PDF with one click' },
  { icon: Globe, label: 'Shareable links', desc: 'Public notes via unique URL' },
  { icon: Link, label: 'Social unfurl', desc: 'Paste a URL, get a rich preview' },
  { icon: Monitor, label: 'Desktop browser', desc: 'Works in any modern browser' },
  { icon: Smartphone, label: 'Mobile browser', desc: 'Fully responsive on all devices' },
];

const ORBIT_DURATION = 24;
const ORBIT_RADIUS = 175;
const CARD_W = 120;
const CARD_H = 92;

export function IntegrationsSection() {

  return (
    <section className="border-b border-[var(--nt-ink)] py-24 bg-[var(--nt-surface)] overflow-hidden">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(${ORBIT_RADIUS}px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(${ORBIT_RADIUS}px) rotate(-360deg); }
        }
        .orbit-card {
          animation: orbit ${ORBIT_DURATION}s linear infinite;
        }
        .orbit-container:hover .orbit-card {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <AnimateIn>
              <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
                Everywhere
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="font-display text-4xl sm:text-5xl text-[var(--nt-text-primary)] leading-tight">
                Works wherever you do.
              </h2>
            </AnimateIn>
            <AnimateIn delay={150}>
              <p className="font-serif mt-4 text-sm leading-relaxed text-[var(--nt-text-muted)] max-w-md">
                No native app to download. No platform to install. Open a browser, sign in, and start writing.
                Export to the formats you need. Share with whoever you want.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn delay={200}>
            <div className="hidden md:flex items-center justify-center">
              <div
                className="relative orbit-container"
                style={{ width: ORBIT_RADIUS * 2 + CARD_W + 20, height: ORBIT_RADIUS * 2 + CARD_W + 20 }}
              >
                <div
                  className="absolute rounded-full border border-dashed border-[var(--nt-border)] pointer-events-none"
                  style={{
                    top: (CARD_W + 20) / 2,
                    left: (CARD_W + 20) / 2,
                    width: ORBIT_RADIUS * 2,
                    height: ORBIT_RADIUS * 2,
                  }}
                />
                {integrations.map((item, i) => {
                  const delay = -((ORBIT_DURATION / integrations.length) * i);
                  return (
                    <div
                      key={item.label}
                      className="absolute left-1/2 top-1/2 orbit-card"
                      style={{
                        width: CARD_W,
                        height: CARD_H,
                        marginLeft: -CARD_W / 2,
                        marginTop: -CARD_H / 2,
                        animationDelay: `${delay}s`,
                      }}
                    >
                      <div
                        className="flex flex-col items-center justify-center gap-1.5 w-full h-full rounded-xl border border-[var(--nt-border)] bg-[var(--nt-bg)] px-3 py-2 text-center hover:border-[var(--nt-accent)]/40 hover:bg-[var(--nt-accent)]/5 hover:shadow-[0_0_24px_rgba(200,240,74,0.06)] transition-all duration-300 cursor-default"
                      >
                        <item.icon className="h-4 w-4 text-[var(--nt-accent)]" />
                        <span className="font-mono text-[10px] text-[var(--nt-text-primary)] leading-tight">{item.label}</span>
                        <span className="font-serif text-[8px] text-[var(--nt-text-muted)] leading-tight">{item.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3">
              {integrations.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-bg)] p-4 text-center hover:border-[var(--nt-accent)]/30 hover:bg-[var(--nt-accent)]/5 transition-all duration-300 group cursor-default"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] group-hover:border-[var(--nt-accent)]/30 transition-colors duration-300">
                    <item.icon className="h-5 w-5 text-[var(--nt-accent)]" />
                  </div>
                  <span className="font-mono text-[11px] text-[var(--nt-text-primary)]">{item.label}</span>
                  <span className="font-serif text-[10px] text-[var(--nt-text-muted)] leading-tight">{item.desc}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
