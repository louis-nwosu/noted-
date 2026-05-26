"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimateIn } from "./AnimateIn";

const faqs = [
  {
    q: "Is NoteTake really free?",
    a: "Yes. No credit card required. There are no paid plans, no hidden limits, and no time restrictions. If that ever changes, grandfathered users keep everything.",
  },
  {
    q: "Where is my data stored?",
    a: "Your notes are stored in the cloud on encrypted MongoDB databases. We never share, sell, or train on your content. Full database export is available on request.",
  },
  {
    q: "Can I export my notes?",
    a: "Yes. Every note can be exported as Markdown or PDF with one click. Bulk export is on the roadmap. Your data is yours — no lock-in.",
  },
  {
    q: "How does speech-to-text work?",
    a: "Click the microphone icon in the editor to start dictating. Your speech is transcribed in real-time using your browser's built-in speech recognition. Click stop and the text is inserted at your cursor. No server upload, no third-party services — everything stays local.",
  },
  {
    q: "What are AI auto-research and quizzes?",
    a: "When you write about a topic, AI auto-research enriches your note with deeper explanations, related concepts, and source references. AI quizzes let you generate custom tests from any note — answer them in-app and get instant grading to reinforce your learning.",
  },
  {
    q: "Who can see my notes?",
    a: "By default, nobody but you. Each note is private until you explicitly generate a share link. Shared links are view-only and can be revoked instantly.",
  },
  {
    q: "Do I need an account to view shared notes?",
    a: "No. Shared notes are accessible via a unique link — no login required. Perfect for publishing drafts, documentation, or quick references.",
  },
  {
    q: "What happens to deleted notes?",
    a: "Deleted notes stay in your trash for 3 days. You can restore them anytime during that window. After 3 days, they are permanently removed from our servers.",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[var(--nt-border)] last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="font-serif text-base text-[var(--nt-text-primary)] group-hover:text-[var(--nt-accent)] transition-colors duration-200 pr-4">
          {q}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--nt-text-muted)] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-60 pb-5 opacity-100" : "max-h-0 pb-0 opacity-0"
        }`}
      >
        <p className="font-serif text-sm leading-relaxed text-[var(--nt-text-muted)]">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <AnimateIn>
          <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase text-center">
            Questions
          </div>
        </AnimateIn>
        <AnimateIn delay={100}>
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--nt-text-primary)] leading-tight text-center">
            Frequently asked.
          </h2>
        </AnimateIn>
        <AnimateIn delay={150}>
          <p className="font-serif text-sm text-[var(--nt-text-muted)] text-center mt-3 mb-12">
            Everything you didn&apos;t know you needed to know.
          </p>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] px-6">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
