'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Note } from '@/lib/store';
import { ContextMenu } from '../ui/ContextMenu';
import { FileText, Lock, Globe, Trash2, Pencil } from 'lucide-react';

interface NoteTreeItemProps {
  note: Note;
  selected?: boolean;
  onSelect?: () => void;
  depth?: number;
  onDelete?: (id: string) => void;
  onRename?: (id: string, title: string) => void;
}

export function NoteTreeItem({ note, selected, onSelect, depth = 0, onDelete, onRename }: NoteTreeItemProps) {
  const router = useRouter();
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(note.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renaming) {
      setRenameValue(note.title);
      setTimeout(() => inputRef.current?.select(), 0);
    }
  }, [renaming, note.title]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== note.title) {
      onRename?.(note._id, trimmed);
    }
    setRenaming(false);
  };

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); setRenaming(true); }}
        className={`w-full text-left flex items-center gap-2 px-2 py-1.5 transition-colors cursor-pointer group ${
          selected
            ? 'bg-[var(--nt-accent)]/10 text-[var(--nt-accent)]'
            : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]/50'
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        <FileText className="h-3.5 w-3.5 shrink-0" />
        {renaming ? (
          <input
            ref={inputRef}
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onBlur={handleRenameSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRenameSubmit();
              if (e.key === 'Escape') setRenaming(false);
            }}
            className="flex-1 min-w-0 bg-[var(--nt-bg)] border border-[var(--nt-accent)] rounded px-1 py-0 font-mono text-xs text-[var(--nt-text-primary)] outline-none"
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <span
            className="font-mono text-xs truncate flex-1"
            onClick={() => {
              onSelect?.();
              router.push(`/app/note/${note._id}`);
            }}
          >
            {note.title || 'Untitled'}
          </span>
        )}
        {!renaming && (
          <>
            {note.isPrivate ? (
              <Lock className="h-2.5 w-2.5 shrink-0 opacity-50" />
            ) : (
              <Globe className="h-2.5 w-2.5 shrink-0 text-[var(--nt-accent)] opacity-70" />
            )}
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete?.(note._id); }}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
              title="Delete note"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </>
        )}
      </div>

      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
          actions={[
            { label: 'Rename', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => setRenaming(true) },
            { label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => onDelete?.(note._id), danger: true, separator: true },
          ]}
        />
      )}
    </>
  );
}