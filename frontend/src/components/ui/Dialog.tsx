'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  loading?: boolean;
}

export function Dialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'default', loading }: DialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handler);
      confirmRef.current?.focus();
      return () => document.removeEventListener('keydown', handler);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-mono text-sm font-medium text-[var(--nt-text-primary)]">{title}</h3>
          <button onClick={onClose} className="text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="font-serif text-sm text-[var(--nt-text-muted)] mb-5 leading-relaxed">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg px-3 py-1.5 font-mono text-xs text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer disabled:opacity-40"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all cursor-pointer disabled:opacity-40 ${
              variant === 'danger'
                ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                : 'bg-[var(--nt-accent)] text-[var(--nt-bg)] hover:opacity-90'
            }`}
          >
            {loading ? 'Loading\u2026' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
