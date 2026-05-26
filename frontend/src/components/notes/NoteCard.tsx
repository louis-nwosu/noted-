'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Note, useNotesStore } from '@/lib/store';
import { ContextMenu } from '../ui/ContextMenu';
import { Dialog } from '../ui/Dialog';
import { useToast } from '../ui/Toast';
import { Lock, Globe, Pin, Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  selected?: boolean;
  onSelect?: () => void;
}

export function NoteCard({ note, selected, onSelect }: NoteCardProps) {
  const router = useRouter();
  const { setNotes } = useNotesStore();
  const { toast } = useToast();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const preview = note.plainTextPreview || 'No content';
  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDelete = async () => {
    setShowDeleteDialog(false);
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes(useNotesStore.getState().notes.filter((n) => n._id !== note._id));
      toast('Note moved to trash', 'success');
    } catch {}
  };

  return (
    <>
      <button
        onClick={() => {
          onSelect?.();
          router.push(`/app/note/${note._id}`);
        }}
        onContextMenu={handleContextMenu}
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
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDeleteDialog(true); }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            title="Delete note"
          >
            <Trash2 className="h-3 w-3" />
          </button>
          {note.isPrivate ? (
            <Lock className="h-3 w-3 text-[var(--nt-text-muted)]" />
          ) : (
            <Globe className="h-3 w-3 text-[var(--nt-accent)]" />
          )}
          <span className="font-mono text-[10px] text-[var(--nt-text-muted)]">{date}</span>
        </div>
        </div>
      </button>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          actions={[
            { label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => setShowDeleteDialog(true), danger: true },
          ]}
        />
      )}

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete note"
        message={`Move "${note.title || 'Untitled'}" to trash?`}
        confirmLabel="Delete"
        variant="danger"
      />
    </>
  );
}
