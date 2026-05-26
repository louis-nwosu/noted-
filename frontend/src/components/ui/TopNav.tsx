'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';
import { LogOut, Sun, Moon, User, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';

export function TopNav() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { toggle, effective } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    setOpen(false);
    try {
      await api.post('/auth/logout');
    } catch {}
    logout();
    router.push('/login');
  };

  const handleProfile = () => {
    setOpen(false);
  };

  return (
    <header className="flex h-12 items-center justify-between border-b border-[var(--nt-border)] bg-[var(--nt-surface)] px-4">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-medium tracking-wider text-[var(--nt-text-primary)]">
          NOTETAKE
        </span>
        <span className="font-mono text-[10px] text-[var(--nt-text-muted)] border border-[var(--nt-ink)] px-1.5 py-0.5 rounded">
          APP
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
          title={`Switch to ${effective === 'light' ? 'dark' : 'light'} mode`}
        >
          {effective === 'light' ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
          {effective === 'light' ? 'Dark' : 'Light'}
        </button>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
          >
            <User className="h-3 w-3" />
            <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <>
              <div
                className="fixed inset-0 z-[70]"
                onClick={() => setOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 z-[80] w-44 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] py-1 shadow-lg">
                <div className="px-3 py-2 font-mono text-xs text-[var(--nt-text-primary)] border-b border-[var(--nt-border)]">
                  {user?.name}
                </div>
                <button
                  onClick={handleProfile}
                  className="flex w-full items-center gap-2 px-3 py-1.5 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
                >
                  <User className="h-3 w-3" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-1.5 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <LogOut className="h-3 w-3" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
