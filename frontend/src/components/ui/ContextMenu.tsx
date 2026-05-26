'use client';

import { useEffect, useRef } from 'react';

interface ContextMenuAction {
  label: string;
  icon?: any;
  onClick: () => void;
  separator?: boolean;
  danger?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  actions: ContextMenuAction[];
  onClose: () => void;
}

export function ContextMenu({ x, y, actions, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key === 'Escape') {
        onClose();
        return;
      }
      if (e instanceof MouseEvent && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const adjustedX = Math.min(x, window.innerWidth - 180);
  const adjustedY = Math.min(y, window.innerHeight - actions.length * 36 - 16);

  return (
    <div
      ref={ref}
      className="fixed z-[200] min-w-[160px] rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] py-1 shadow-2xl"
      style={{ left: adjustedX, top: adjustedY }}
    >
      {actions.map((a, i) => (
        <div key={i}>
          {a.separator && <div className="mx-2 my-1 border-t border-[var(--nt-border)]" />}
          <button
            onClick={() => { a.onClick(); onClose(); }}
            className={`w-full text-left flex items-center gap-2 px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
              a.danger
                ? 'text-red-400 hover:bg-red-500/10'
                : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
            }`}
          >
            {a.icon && <span className="h-3.5 w-3.5 shrink-0">{a.icon}</span>}
            {a.label}
          </button>
        </div>
      ))}
    </div>
  );
}
