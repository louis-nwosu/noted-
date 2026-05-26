"use client";

import {
  Slash,
  Image,
  Timer,
  Link2,
  Bold,
  Italic,
  Underline,
  Code,
  Undo2,
  Redo2,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code2,
  Table,
  Minus,
  Palette,
  Link,
  Mic,
  Headphones,
  Share2,
  Download,
  Trash2,
  Type,
  ListChecks,
  Braces,
  GripVertical,
} from "lucide-react";
import { AnimateIn } from "./AnimateIn";

const points = [
  {
    icon: Slash,
    text: "Slash commands. Type / and pick from 20+ block types without touching the mouse.",
  },
  {
    icon: Image,
    text: "Inline media. Drop an image, paste a YouTube URL, or embed any link as a rich preview card.",
  },
  {
    icon: Timer,
    text: "Smart auto-save. No Cmd+S anxiety. Your words are safe 2 seconds after you stop typing.",
  },
  {
    icon: Link2,
    text: "Tables, code blocks, task lists, blockquotes — all supported, all keyboard-friendly.",
  },
];

export function EditorCallout() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <AnimateIn>
              <div className="mb-4 font-mono text-[11px] tracking-[0.2em] text-[var(--nt-accent)] uppercase">
                III. The Editor Surface
              </div>
            </AnimateIn>
            <AnimateIn delay={100}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--nt-text-primary)] leading-tight">
                Everything you need.
                <br />
                <span className="italic text-[var(--nt-text-muted)]">
                  Nothing you don&apos;t.
                </span>
              </h2>
            </AnimateIn>

            <div className="mt-10 space-y-6">
              {points.map((p, i) => (
                <AnimateIn key={p.text} delay={200 + i * 80}>
                  <div className="flex gap-4 group">
                    <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] group-hover:border-[var(--nt-accent)]/30 transition-colors duration-300">
                      <p.icon className="h-4 w-4 text-[var(--nt-accent)]" />
                    </div>
                    <p className="font-serif text-sm leading-relaxed text-[var(--nt-text-muted)] pt-1">
                      {p.text}
                    </p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          <AnimateIn delay={300} type="fade-in">
            <div className="rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] overflow-hidden shadow-sm max-md:max-h-[300px]">
              <div className="flex items-center gap-1 border-b border-[var(--nt-border)] px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 font-mono text-[10px] text-[var(--nt-text-muted)]">
                  untitled — NoteTake
                </span>
                <span className="ml-auto font-mono text-[10px] text-[var(--nt-accent)]">
                  auto-save on
                </span>
              </div>

              <div className="px-3 pt-3 pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[var(--nt-accent)]">
                    Saved {'\u2713'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                      <Mic className="h-3 w-3" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded text-[var(--nt-text-muted)] opacity-40 cursor-not-allowed">
                      <Headphones className="h-3 w-3" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                      <Share2 className="h-3 w-3" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                      <Download className="h-3 w-3" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-red-500/10 hover:text-red-400 cursor-pointer">
                      <Trash2 className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 overflow-x-auto rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] px-1.5 py-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Undo2 className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Redo2 className="h-3 w-3" />
                  </span>
                  <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Bold className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Italic className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Underline className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Strikethrough className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Code className="h-3 w-3" />
                  </span>
                  <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Heading1 className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Heading2 className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Heading3 className="h-3 w-3" />
                  </span>
                  <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <List className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <ListOrdered className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <CheckSquare className="h-3 w-3" />
                  </span>
                  <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Quote className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Code2 className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Table className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Minus className="h-3 w-3" />
                  </span>
                  <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Palette className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Image className="h-3 w-3" />
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer">
                    <Link className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="rounded-lg border border-dashed border-[var(--nt-border)] px-4 py-3">
                  <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">
                    + Add cover image
                  </span>
                </div>

                <div className="font-display text-xl text-[var(--nt-text-primary)]">
                  Untitled
                </div>

                <div className="text-[13px] leading-[1.75] font-serif text-[var(--nt-text-primary)] space-y-3">
                  <p>
                    A blank page can feel like a lot of pressure.{" "}
                    <span className="italic">Not anymore.</span> Start typing
                    and let the editor get out of your way.
                  </p>

                  <h3 className="font-display text-base text-[var(--nt-text-primary)]">
                    Why we built it
                  </h3>

                  <ul className="space-y-1 pl-4 list-disc text-[var(--nt-text-muted)]">
                    <li>Zero-config formatting that just works</li>
                    <li>
                      <span className="text-[var(--nt-text-primary)]">Markdown shortcuts</span> for
                      power users
                    </li>
                    <li>Offline-first with instant sync</li>
                  </ul>

                  <div className="border-l-2 border-[var(--nt-accent)] pl-4 italic text-[var(--nt-text-muted)]">
                    The best interface is no interface at all. We designed every
                    interaction to fade into the background so your ideas take
                    center stage.
                  </div>

                  <div className="relative rounded bg-[var(--nt-ink)] p-3 font-mono text-[11px] leading-relaxed text-[var(--nt-text-primary)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Braces className="h-3 w-3 text-[var(--nt-accent)]" />
                      <span className="text-[var(--nt-accent)]">javascript</span>
                    </div>
                    <div className="space-y-0.5 opacity-80">
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">notes</span> ={" "}
                      <span className="text-yellow-400">await</span>{" "}
                      <span>api</span>.<span className="text-blue-400">get</span>(
                      <span className="text-green-400">'/notes'</span>)
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="h-16 rounded bg-[var(--nt-ink)] flex items-center justify-center text-[var(--nt-text-muted)]">
                      <Image className="h-4 w-4" />
                    </div>
                    <div className="h-16 rounded bg-[var(--nt-ink)] flex items-center justify-center text-[var(--nt-text-muted)]">
                      <Image className="h-4 w-4" />
                    </div>
                    <div className="h-16 rounded bg-[var(--nt-ink)] flex items-center justify-center text-[var(--nt-text-muted)]">
                      <Image className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-1 right-4 z-10 w-52 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] py-1 shadow-xl">
                    <div className="px-3 py-1.5 font-mono text-[11px] text-[var(--nt-accent)] bg-[var(--nt-accent)]/5">
                      <Slash className="h-3 w-3 inline mr-1.5" />
                      <span>slash commands</span>
                    </div>
                    {[
                      { icon: Type, label: "Paragraph" },
                      { icon: Heading1, label: "Heading 1" },
                      { icon: Heading2, label: "Heading 2" },
                      { icon: ListChecks, label: "Task List" },
                      { icon: Braces, label: "Code Block" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] text-[var(--nt-text-muted)] hover:bg-[var(--nt-ink)] cursor-pointer"
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--nt-border)] px-5 py-2">
                <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">
                  142 words · 2 min read
                </span>
                <span className="font-mono text-[10px] text-[var(--nt-accent)]">
                  Saved {'\u2713'}
                </span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
