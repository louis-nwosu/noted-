'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useNotesStore } from '@/lib/store';
import { Sparkles, X, BookOpen, Link as LinkIcon, Lightbulb, Loader2, AlertCircle, FileText } from 'lucide-react';

interface Props {
  noteContent: string;
}

export function ResearchPanel({ noteContent }: Props) {
  const { researchPanelOpen, toggleResearchPanel, researchData, researchLoading, setResearchData, setResearchLoading } = useNotesStore();
  const [error, setError] = useState('');
  const [autoTriggered, setAutoTriggered] = useState(false);

  useEffect(() => {
    if (researchPanelOpen && !researchData && !researchLoading && noteContent && noteContent !== '{}' && !autoTriggered) {
      setAutoTriggered(true);
      handleResearch();
    }
    if (!researchPanelOpen) {
      setAutoTriggered(false);
    }
  }, [researchPanelOpen]);

  const handleResearch = async () => {
    if (!noteContent || noteContent === '{}') return;
    setError('');
    setResearchLoading(true);
    try {
      const { data } = await api.post('/ai/research', { content: noteContent });
      if (data.success) setResearchData(data.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Research failed');
    } finally {
      setResearchLoading(false);
    }
  };

  return (
    <>
      {researchPanelOpen && (
        <div
          className="w-80 shrink-0 border-l border-[var(--nt-border)] bg-[var(--nt-surface)] flex flex-col overflow-hidden max-md:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--nt-border)] shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--nt-accent)]" />
              <span className="font-mono text-xs font-medium text-[var(--nt-text-primary)]">AI Research</span>
            </div>
            <button
              onClick={toggleResearchPanel}
              className="p-1 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {researchLoading && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 className="h-6 w-6 text-[var(--nt-accent)] animate-spin" />
                <span className="font-mono text-xs text-[var(--nt-text-muted)]">Analyzing note…</span>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded border border-red-500/30 bg-red-500/10 px-3 py-2">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span className="font-mono text-xs text-red-400">{error}</span>
              </div>
            )}

            {!researchLoading && !researchData && (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <Sparkles className="h-8 w-8 text-[var(--nt-text-muted)]" />
                <span className="font-mono text-xs text-[var(--nt-text-muted)] text-center">
                  Write some content first, then open Research to get AI insights
                </span>
              </div>
            )}

            {researchData && (
              <>
                <div>
                  <h3 className="font-mono text-xs font-medium text-[var(--nt-text-primary)] mb-1">Summary</h3>
                  <p className="font-mono text-[11px] text-[var(--nt-text-muted)] leading-relaxed">{researchData.summary}</p>
                </div>

                {researchData.concepts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Lightbulb className="h-3.5 w-3.5 text-[var(--nt-accent-warm)]" />
                      <h3 className="font-mono text-xs font-medium text-[var(--nt-text-primary)]">Key Concepts</h3>
                    </div>
                    <div className="space-y-2">
                      {researchData.concepts.map((c, i) => (
                        <div key={i} className="rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] px-3 py-2">
                          <div className="font-mono text-xs font-medium text-[var(--nt-accent)] mb-0.5">{c.term}</div>
                          <div className="font-mono text-[11px] text-[var(--nt-text-muted)]">{c.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {researchData.relatedTopics.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <BookOpen className="h-3.5 w-3.5 text-[var(--nt-accent)]" />
                      <h3 className="font-mono text-xs font-medium text-[var(--nt-text-primary)]">Related Topics</h3>
                    </div>
                    <div className="space-y-2">
                      {researchData.relatedTopics.map((t, i) => (
                        <div key={i} className="rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] px-3 py-2">
                          <div className="font-mono text-xs font-medium text-[var(--nt-text-primary)] mb-0.5">{t.topic}</div>
                          <div className="font-mono text-[11px] text-[var(--nt-text-muted)]">{t.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {researchData.references.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <LinkIcon className="h-3.5 w-3.5 text-[var(--nt-text-muted)]" />
                      <h3 className="font-mono text-xs font-medium text-[var(--nt-text-primary)]">References</h3>
                    </div>
                    <div className="space-y-2">
                      {researchData.references.map((r, i) => (
                        <div key={i} className="rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] px-3 py-2">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs font-medium text-[var(--nt-accent)] hover:underline block mb-0.5"
                          >
                            {r.title}
                          </a>
                          <div className="font-mono text-[11px] text-[var(--nt-text-muted)]">{r.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {researchData && (
            <div className="px-4 py-3 border-t border-[var(--nt-border)] shrink-0">
              <button
                onClick={handleResearch}
                disabled={researchLoading}
                className="flex w-full items-center justify-center gap-2 rounded border border-[var(--nt-border)] px-4 py-2 font-mono text-xs text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Research again
              </button>
            </div>
          )}
        </div>
      )}

      {!researchPanelOpen && (
        <button
          onClick={toggleResearchPanel}
          className="shrink-0 flex items-center gap-1.5 self-center rounded-l border border-[var(--nt-border)] border-r-0 bg-[var(--nt-surface)] pl-3 pr-2 py-2 text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
          title="Open AI Research"
        >
          <Sparkles className="h-4 w-4" />
          <span className="font-mono text-[10px] tracking-wider uppercase">Research</span>
        </button>
      )}
    </>
  );
}
