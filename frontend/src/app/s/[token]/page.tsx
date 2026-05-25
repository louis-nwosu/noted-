'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/lib/api';
import { PublicViewer } from '../../../components/share/PublicViewer';

export default function SharedNotePage() {
  const params = useParams();
  const [note, setNote] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.token) return;

    api
      .get(`/share/${params.token}`)
      .then(({ data }) => {
        if (data.success) setNote(data.data);
        else setError(data.error?.message || 'Note not found');
      })
      .catch((err) => {
        setError(err.response?.data?.error?.message || 'Failed to load note');
      })
      .finally(() => setLoading(false));
  }, [params.token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--nt-bg)] flex items-center justify-center">
        <div className="font-mono text-sm text-[var(--nt-text-muted)]">Loading shared note…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--nt-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-4xl text-[var(--nt-text-muted)] mb-2">404</div>
          <p className="font-mono text-xs text-[var(--nt-text-muted)]">{error}</p>
        </div>
      </div>
    );
  }

  return <PublicViewer note={note} />;
}
