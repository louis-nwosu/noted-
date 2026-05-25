'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/lib/store';
import { Lock, Globe, Pin } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  selected?: boolean;
  onSelect?: () => void;
}

export function NoteCard({ note, selected, onSelect }: NoteCardProps) {
  const router = useRouter();

  const preview = note.plainTextPreview || 'No content';
  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <button
      onClick={() => {
        onSelect?.();
        router.push(`/app/note/${note._id}`);
      }}
      className={`w-full text-left px-3 py-2.5 transition-colors border-b border-[var(--nt-border)]/50 cursor-pointer group ${
        selected
          ? 'bg-[var(--nt-accent)]/10 border-l-2 border-l-[var(--nt-accent)]'
          : 'hover:bg-[var(--nt-ink)]/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {note.pinnedAt && <Pin className="h-3 w-3 text-[var(--nt-accent-warm)] shrink-0" />}
            <h3 className={`font-mono text-sm truncate ${selected ? 'text-[var(--nt-accent)]' : 'text-[var(--nt-text-primary)]'}`}>
              {note.title || 'Untitled'}
            </h3>
          </div>
          <p className="font-serif text-xs text-[var(--nt-text-muted)] mt-0.5 line-clamp-2">
            {preview}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {note.isPrivate ? (
            <Lock className="h-3 w-3 text-[var(--nt-text-muted)]" />
          ) : (
            <Globe className="h-3 w-3 text-[var(--nt-accent)]" />
          )}
          <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">{date}</span>
        </div>
      </div>
    </button>
  );
}
