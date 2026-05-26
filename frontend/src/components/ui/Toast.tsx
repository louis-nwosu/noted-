'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: 'border-[var(--nt-accent)]/40 text-[var(--nt-accent)]',
  error: 'border-red-500/40 text-red-400',
  info: 'border-[var(--nt-accent-warm)]/40 text-[var(--nt-accent-warm)]',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const Icon = icons[t.variant];
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-2 rounded-xl border bg-[var(--nt-surface)] px-4 py-3 shadow-xl animate-in slide-in-from-right ${colors[t.variant]}`}
              style={{ animation: 'toast-in 0.25s ease-out' }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="font-mono text-xs text-[var(--nt-text-primary)]">{t.message}</span>
              <button onClick={() => remove(t.id)} className="ml-1 text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
