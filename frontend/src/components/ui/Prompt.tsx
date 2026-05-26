'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface PromptProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  placeholder?: string;
  initialValue?: string;
  submitLabel?: string;
}

export function Prompt({ open, onClose, onSubmit, title, placeholder = '', initialValue = '', submitLabel = 'Insert' }: PromptProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handler);
      inputRef.current?.focus();
      return () => document.removeEventListener('keydown', handler);
    }
  }, [open, initialValue, onClose]);

  const handleSubmit = () => {
    if (value.trim()) onSubmit(value.trim());
  };

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
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[var(--nt-border)] bg-[var(--nt-bg)] px-3 py-2 font-mono text-sm text-[var(--nt-text-primary)] outline-none focus:border-[var(--nt-accent)] transition-colors mb-4"
        />
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 font-mono text-xs text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!value.trim()}
            className="rounded-lg px-3 py-1.5 font-mono text-xs font-medium bg-[var(--nt-accent)] text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer disabled:opacity-40"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
