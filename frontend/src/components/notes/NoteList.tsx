'use client';

import { Note } from '@/lib/store';
import { NoteCard } from './NoteCard';
import { getDateGroup } from '@/lib/utils';

interface GroupedNotes {
  [key: string]: Note[];
}

interface NoteListProps {
  notes: Note[];
  selectedId?: string;
  onSelectNote?: () => void;
}

export function NoteList({ notes, selectedId, onSelectNote }: NoteListProps) {
  const pinned = notes.filter((n) => n.pinnedAt);
  const unpinned = notes.filter((n) => !n.pinnedAt);

  const grouped: GroupedNotes = {};
  unpinned.forEach((note) => {
    const group = getDateGroup(note.createdAt);
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(note);
  });

  return (
    <div className="py-2">
      {pinned.length > 0 && (
        <div>
          <div className="px-3 py-1.5 font-mono text-[10px] tracking-wider text-[var(--nt-text-muted)] uppercase">
            📌 Pinned
          </div>
          {pinned.map((note) => (
            <NoteCard key={note._id} note={note} selected={note._id === selectedId} onSelect={onSelectNote} />
          ))}
          <div className="mx-3 my-2 border-t border-[var(--nt-ink)]" />
        </div>
      )}

      {Object.entries(grouped).map(([group, groupNotes]) => (
        <div key={group}>
          <div className="px-3 py-1.5 font-mono text-[10px] tracking-wider text-[var(--nt-text-muted)] uppercase">
            {group}
          </div>
          {groupNotes.map((note) => (
            <NoteCard key={note._id} note={note} selected={note._id === selectedId} onSelect={onSelectNote} />
          ))}
        </div>
      ))}

      {notes.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="font-mono text-xs text-[var(--nt-text-muted)]">No notes yet</p>
        </div>
      )}
    </div>
  );
}
