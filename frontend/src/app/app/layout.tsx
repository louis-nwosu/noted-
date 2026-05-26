'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import api from '@/lib/api';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      return;
    }

    if (!user) {
      api
        .get('/auth/me')
        .then(({ data }) => {
          if (data.success) {
            setUser(data.data);
          }
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          router.push('/login');
        });
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--nt-bg)] flex items-center justify-center">
        <div className="font-mono text-sm text-[var(--nt-text-muted)]">Loading…</div>
      </div>
    );
  }

  return <>{children}</>;
}
