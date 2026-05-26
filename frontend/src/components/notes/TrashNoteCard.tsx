'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { Note } from '@/lib/store';
import { RotateCcw, Trash2 } from 'lucide-react';
import { Dialog } from '../ui/Dialog';
import { useToast } from '../ui/Toast';

interface TrashNoteCardProps {
  note: Note;
  onAction: () => void;
}

export function TrashNoteCard({ note, onAction }: TrashNoteCardProps) {
  const [restoring, setRestoring] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const deletedAt = new Date(note.deletedAt!);
  const now = new Date();
  const diffMs = now.getTime() - deletedAt.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const remainingDays = 3 - diffDays;

  const timeRemaining =
    remainingDays > 0
      ? `${remainingDays}d remaining`
      : 'Expiring soon';

  const handleRestore = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setRestoring(true);
    try {
      await api.post(`/notes/${note._id}/restore`);
      onAction();
    } catch {}
    setRestoring(false);
  };

  const handlePermanentDelete = async () => {
    setShowDeleteDialog(false);
    setDeleting(true);
    try {
      await api.delete(`/notes/${note._id}/permanent`);
      toast('Note permanently deleted', 'success');
      onAction();
    } catch {}
    setDeleting(false);
  };

  return (
    <div className="w-full text-left px-3 py-2.5 border-b border-[var(--nt-border)]/50">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-mono text-sm truncate text-[var(--nt-text-muted)] line-through">
            {note.title || 'Untitled'}
          </h3>
          <p className="font-mono text-[10px] text-[var(--nt-text-muted)]/60 mt-0.5">
            Deleted {diffDays === 0 ? 'today' : `${diffDays}d ago`} &middot; {timeRemaining}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleRestore}
            disabled={restoring}
            title="Restore"
            className="p-1.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-accent)] hover:bg-[var(--nt-accent)]/10 transition-all cursor-pointer disabled:opacity-40"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${restoring ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShowDeleteDialog(true); }}
            disabled={deleting}
            title="Delete forever"
            className="p-1.5 rounded text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handlePermanentDelete}
        title="Delete forever"
        message="This note will be permanently deleted and cannot be recovered."
        confirmLabel="Delete forever"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
