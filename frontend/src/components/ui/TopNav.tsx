'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';
import { LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';

export function TopNav() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { toggle, effective } = useTheme();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    logout();
    router.push('/login');
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
        <span className="font-mono text-xs text-[var(--nt-text-muted)]">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut className="h-3 w-3" />
          Logout
        </button>
      </div>
    </header>
  );
}
