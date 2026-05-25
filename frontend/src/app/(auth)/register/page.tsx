'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      if (data.success) {
        localStorage.setItem('accessToken', data.data.accessToken);
        setUser(data.data.user);
        router.push('/app');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm px-6">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl text-[var(--nt-text-primary)]">Create your account</h1>
        <p className="font-mono text-xs text-[var(--nt-text-muted)] mt-2">Start writing today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="font-mono text-xs text-[var(--nt-text-muted)]">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded border border-[var(--nt-border)] bg-[var(--nt-surface)] px-3 py-2 font-mono text-sm text-[var(--nt-text-primary)] outline-none focus:border-[var(--nt-accent)] transition-colors"
          />
        </div>

        <div>
          <label className="font-mono text-xs text-[var(--nt-text-muted)]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded border border-[var(--nt-border)] bg-[var(--nt-surface)] px-3 py-2 font-mono text-sm text-[var(--nt-text-primary)] outline-none focus:border-[var(--nt-accent)] transition-colors"
          />
        </div>

        <div>
          <label className="font-mono text-xs text-[var(--nt-text-muted)]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 w-full rounded border border-[var(--nt-border)] bg-[var(--nt-surface)] px-3 py-2 font-mono text-sm text-[var(--nt-text-primary)] outline-none focus:border-[var(--nt-accent)] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[var(--nt-accent)] px-4 py-2 font-mono text-sm font-medium text-[var(--nt-bg)] hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center font-mono text-xs text-[var(--nt-text-muted)]">
        Already have an account?{' '}
        <Link href="/login" className="text-[var(--nt-accent)] hover:underline cursor-pointer">
          Sign in
        </Link>
      </p>
    </div>
  );
}
