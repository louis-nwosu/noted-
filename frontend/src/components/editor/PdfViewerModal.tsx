'use client';

import { useEffect, useState, useMemo } from 'react';
import { X, ExternalLink, FileText, Sparkles, AlignLeft, Scan, Eye, ListChecks, FileSearch, Target } from 'lucide-react';
import { API_BASE } from '@/lib/api';

interface Props {
  pdfUrl: string;
  filename: string;
  summary: string;
  rawText: string;
  isScanned: boolean;
  onClose: () => void;
}

type Tab = 'pdf' | 'summary' | 'raw';

interface ParsedSummary {
  Overview?: string;
  Key_Points?: string | string[];
  Details?: string;
  Conclusions?: string;
  [key: string]: any;
}

const sectionConfig: Record<string, { icon: any; gradient: string; border: string; label: string }> = {
  Overview: {
    icon: Eye,
    gradient: 'from-blue-500/10 to-indigo-500/5',
    border: 'border-blue-500/20',
    label: 'Overview',
  },
  Key_Points: {
    icon: ListChecks,
    gradient: 'from-amber-500/10 to-orange-500/5',
    border: 'border-amber-500/20',
    label: 'Key Points',
  },
  Details: {
    icon: FileSearch,
    gradient: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-500/20',
    label: 'Details',
  },
  Conclusions: {
    icon: Target,
    gradient: 'from-purple-500/10 to-pink-500/5',
    border: 'border-purple-500/20',
    label: 'Conclusions',
  },
};

export function PdfViewerModal({ pdfUrl, filename, summary, rawText, isScanned, onClose }: Props) {
  const [tab, setTab] = useState<Tab>(summary ? 'summary' : 'pdf');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const fullUrl = pdfUrl.startsWith('http') ? pdfUrl : `${API_BASE}${pdfUrl}`;

  const parsedSummary = useMemo<ParsedSummary | null>(() => {
    if (!summary) return null;
    try {
      return JSON.parse(summary);
    } catch {
      return null;
    }
  }, [summary]);

  const renderValue = (value: any): React.ReactNode => {
    if (Array.isArray(value)) {
      return (
        <ul className="space-y-1.5">
          {value.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (typeof value === 'string') {
      return <p>{value}</p>;
    }
    return null;
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'pdf', label: 'PDF', icon: FileText },
    ...(summary ? [{ id: 'summary' as const, label: 'Summary', icon: Sparkles }] : []),
    { id: 'raw', label: 'Raw Text', icon: AlignLeft },
  ];

  const tabClass = (t: Tab) =>
    `flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all cursor-pointer ${
      tab === t
        ? 'bg-[var(--nt-accent)]/15 text-[var(--nt-accent)]'
        : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-5xl flex-col rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] shadow-2xl max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-[var(--nt-border)] px-4 py-3 shrink-0 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-medium text-[var(--nt-text-primary)] truncate max-w-[180px] md:max-w-md">
              {filename}
            </span>
            {isScanned && (
              <span className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] text-amber-400 bg-amber-500/10">
                <Scan className="h-3 w-3" /> Scanned
              </span>
            )}
            <a
              href={fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-1">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={tabClass(t.id)}>
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
            <div className="mx-1 h-4 w-px bg-[var(--nt-ink)]" />
            <button
              onClick={onClose}
              className="p-1 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {tab === 'pdf' && (
            <iframe
              src={fullUrl}
              className="w-full h-full min-h-[70vh]"
              title={filename}
            />
          )}
          {tab === 'summary' && parsedSummary && (
            <div className="h-full min-h-[70vh] overflow-y-auto p-4 md:p-6 space-y-4">
              {Object.entries(parsedSummary).map(([key, value]) => {
                if (!value) return null;
                const config = sectionConfig[key] || {
                  icon: Sparkles,
                  gradient: 'from-gray-500/10 to-gray-500/5',
                  border: 'border-gray-500/20',
                  label: key.replace(/_/g, ' '),
                };
                const Icon = config.icon;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border bg-gradient-to-br ${config.gradient} ${config.border} p-4 md:p-5 font-serif text-[15px] leading-relaxed text-[var(--nt-text-primary)]`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`flex items-center justify-center h-7 w-7 rounded-lg bg-gradient-to-br ${config.gradient} border ${config.border}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-mono text-[11px] font-semibold tracking-wider uppercase opacity-70">
                        {config.label}
                      </span>
                    </div>
                    <div className="pl-0 md:pl-9">
                      {renderValue(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {tab === 'summary' && !parsedSummary && summary && (
            <div className="h-full min-h-[70vh] overflow-y-auto p-6 font-serif text-[15px] leading-relaxed text-[var(--nt-text-primary)] whitespace-pre-wrap">
              {summary}
            </div>
          )}
          {tab === 'raw' && (
            <div className="h-full min-h-[70vh] overflow-y-auto p-6">
              {rawText ? (
                <pre className="font-mono text-[13px] leading-relaxed text-[var(--nt-text-primary)] whitespace-pre-wrap">
                  {rawText}
                </pre>
              ) : (
                <p className="font-serif text-[15px] text-[var(--nt-text-muted)]">
                  {isScanned ? 'No text could be extracted — this appears to be a scanned document.' : 'No text extracted.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
