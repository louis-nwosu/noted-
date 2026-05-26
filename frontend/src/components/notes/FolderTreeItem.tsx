'use client';

import { useState, useRef, useEffect } from 'react';
import { FolderTreeNode } from '@/lib/store';
import { NoteTreeItem } from './NoteTreeItem';
import { ContextMenu } from '../ui/ContextMenu';
import { ChevronRight, ChevronDown, Folder as FolderIcon, Plus, FileText, Pencil, Trash2, FolderPlus } from 'lucide-react';

interface FolderTreeItemProps {
  node: FolderTreeNode;
  depth?: number;
  selectedNoteId?: string;
  onSelectNote?: () => void;
  onCreateNote?: (folderId: string) => void;
  onCreateFolder?: (parentId: string) => void;
  onRenameFolder?: (id: string, name: string) => void;
  onRenameNote?: (id: string, title: string) => void;
  onDeleteFolder?: (id: string) => void;
  onDeleteNote?: (id: string) => void;
  expanded: boolean;
  onToggle: () => void;
}

export function FolderTreeItem({
  node,
  depth = 0,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onCreateFolder,
  onRenameFolder,
  onRenameNote,
  onDeleteFolder,
  onDeleteNote,
  expanded,
  onToggle,
}: FolderTreeItemProps) {
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renaming) {
      setRenameValue(node.name);
      setTimeout(() => inputRef.current?.select(), 0);
    }
  }, [renaming, node.name]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== node.name) {
      onRenameFolder?.(node._id, trimmed);
    }
    setRenaming(false);
  };

  const hasChildren = node.children.length > 0 || node.notes.length > 0;

  return (
    <div>
      <div
        onContextMenu={handleContextMenu}
        onDoubleClick={() => setRenaming(true)}
        className="flex items-center gap-1 px-2 py-1.5 transition-colors cursor-pointer group hover:bg-[var(--nt-ink)]/50"
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`p-0.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] transition-colors cursor-pointer ${hasChildren ? '' : 'invisible'}`}
        >
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </button>
        <FolderIcon className="h-4 w-4 text-[var(--nt-accent-warm)] shrink-0" />
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
          <span className="font-mono text-xs font-medium text-[var(--nt-text-primary)] truncate flex-1">
            {node.name}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onCreateNote?.(node._id); }}
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-accent)] hover:bg-[var(--nt-accent)]/10 transition-all cursor-pointer"
          title="New note"
        >
          <FileText className="h-3 w-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onCreateFolder?.(node._id); }}
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-accent-warm)] hover:bg-[var(--nt-accent-warm)]/10 transition-all cursor-pointer"
          title="New folder"
        >
          <FolderPlus className="h-3 w-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDeleteFolder?.(node._id); }}
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          title="Delete folder"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      {expanded && (
        <div>
          {node.notes.map((note) => (
            <div key={note._id}>
              <NoteTreeItem
                note={note}
                selected={note._id === selectedNoteId}
                onSelect={onSelectNote}
                depth={depth + 1}
                onDelete={onDeleteNote}
                onRename={onRenameNote}
              />
            </div>
          ))}
          {node.children.map((child) => (
            <FolderTreeItemContainer
              key={child._id}
              node={child}
              depth={depth + 1}
              selectedNoteId={selectedNoteId}
              onSelectNote={onSelectNote}
              onCreateNote={onCreateNote}
              onCreateFolder={onCreateFolder}
              onRenameFolder={onRenameFolder}
              onDeleteFolder={onDeleteFolder}
              onDeleteNote={onDeleteNote}
            />
          ))}
        </div>
      )}

      {ctxMenu && (
        <ContextMenu
          x={ctxMenu.x}
          y={ctxMenu.y}
          onClose={() => setCtxMenu(null)}
          actions={[
            { label: 'New Note', icon: <FileText className="h-3.5 w-3.5" />, onClick: () => onCreateNote?.(node._id) },
            { label: 'New Folder', icon: <FolderPlus className="h-3.5 w-3.5" />, onClick: () => onCreateFolder?.(node._id) },
            { label: 'Rename', icon: <Pencil className="h-3.5 w-3.5" />, onClick: () => setRenaming(true), separator: true },
            { label: 'Delete', icon: <Trash2 className="h-3.5 w-3.5" />, onClick: () => onDeleteFolder?.(node._id), danger: true },
          ]}
        />
      )}
    </div>
  );
}

function FolderTreeItemContainer(props: {
  node: FolderTreeNode;
  depth: number;
  selectedNoteId?: string;
  onSelectNote?: () => void;
  onCreateNote?: (folderId: string) => void;
  onCreateFolder?: (parentId: string) => void;
  onRenameFolder?: (id: string, name: string) => void;
  onRenameNote?: (id: string, title: string) => void;
  onDeleteFolder?: (id: string) => void;
  onDeleteNote?: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <FolderTreeItem
      {...props}
      expanded={expanded}
      onToggle={() => setExpanded((v) => !v)}
    />
  );
}
