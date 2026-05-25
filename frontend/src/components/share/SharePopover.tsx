'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { Share2, Copy, Check, X } from 'lucide-react';

interface SharePopoverProps {
  noteId: string;
  isPrivate: boolean;
  shareToken: string | null;
}

export function SharePopover({ noteId, isPrivate, shareToken }: SharePopoverProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'view' | 'comment'>('view');
  const [token, setToken] = useState<string | null>(shareToken);
  const [copied, setCopied] = useState(false);

  const shareUrl = token
    ? `${window.location.origin}/s/${token}`
    : null;

  const handleGenerateLink = async () => {
    try {
      const { data } = await api.post(`/notes/${noteId}/share`, { mode });
      if (data.success) {
        setToken(data.data.shareToken);
      }
    } catch {}
  };

  const handleRevoke = async () => {
    try {
      await api.delete(`/notes/${noteId}/share`);
      setToken(null);
      setCopied(false);
    } catch {}
  };

  const handleCopy = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] transition-all cursor-pointer ${
          !isPrivate
            ? 'bg-[var(--nt-accent)]/20 text-[var(--nt-accent)]'
            : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)]'
        }`}
      >
        <Share2 className="h-3 w-3" />
        {!isPrivate ? 'Shared' : 'Share'}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-50 w-72 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-mono text-xs font-medium text-[var(--nt-text-primary)]">Share</h3>
              <button onClick={() => setOpen(false)} className="text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] cursor-pointer">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {!token ? (
              <div className="space-y-3">
                <div>
                  <label className="font-mono text-[10px] text-[var(--nt-text-muted)]">Share mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value as 'view' | 'comment')}
                    className="mt-1 w-full rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] px-2 py-1.5 font-mono text-xs text-[var(--nt-text-primary)] outline-none"
                  >
                    <option value="view">View only</option>
                    <option value="comment">Comment</option>
                  </select>
                </div>
                <button
                  onClick={handleGenerateLink}
                  className="w-full rounded bg-[var(--nt-accent)] px-3 py-2 font-mono text-xs font-medium text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer"
                >
                  Generate share link
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] px-2.5 py-2">
                  <span className="flex-1 truncate font-mono text-[10px] text-[var(--nt-text-muted)]">
                    {shareUrl}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 text-[var(--nt-text-muted)] hover:text-[var(--nt-accent)] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <select
                    value={mode}
                    onChange={async (e) => {
                      const newMode = e.target.value as 'view' | 'comment';
                      setMode(newMode);
                      await api.patch(`/notes/${noteId}/share`, { mode: newMode });
                    }}
                    className="flex-1 rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] px-2 py-1.5 font-mono text-[10px] text-[var(--nt-text-primary)] outline-none"
                  >
                    <option value="view">View only</option>
                    <option value="comment">Comment</option>
                  </select>
                  <button
                    onClick={handleRevoke}
                    className="rounded border border-red-500/30 px-2.5 py-1.5 font-mono text-[10px] text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
