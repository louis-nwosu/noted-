'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useNotesStore } from '@/lib/store';
import { FolderTreeItem } from './FolderTreeItem';
import { NoteTreeItem } from './NoteTreeItem';
import { Dialog } from '../ui/Dialog';
import { useToast } from '../ui/Toast';
import { FolderOpen, FileText, Loader2, Plus, ChevronsDownUp, ChevronsUpDown } from 'lucide-react';

interface FolderTreeProps {
  selectedNoteId?: string;
  onSelectNote?: () => void;
}

export function FolderTree({ selectedNoteId, onSelectNote }: FolderTreeProps) {
  const router = useRouter();
  const {
    folderTree, unorganizedNotes, expandedFolders, toggleFolder, setAllExpanded,
    setFolderTree, setNotes,
  } = useNotesStore();
  const [initialLoad, setInitialLoad] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'folder' | 'note'; id: string; name: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (folderTree.length === 0 && unorganizedNotes.length === 0) {
      setInitialLoad(true);
    }
    fetchTree();
  }, []);

  const fetchTree = async () => {
    try {
      const { data } = await api.get('/folders/tree');
      if (data.success) {
        setFolderTree(data.data.folders, data.data.unorganized);
      }
    } catch {}
    setInitialLoad(false);
  };

  const handleCreateNote = async (folderId?: string) => {
    try {
      const body: any = { title: 'Untitled', content: {} };
      if (folderId) body.folderId = folderId;
      const { data } = await api.post('/notes', body);
      if (data.success) {
        fetchTree();
        router.push(`/app/note/${data.data._id}`);
      }
    } catch {}
  };

  const handleCreateFolder = async (parentId?: string) => {
    try {
      const body: any = { name: 'New Folder' };
      if (parentId) body.parentId = parentId;
      const { data } = await api.post('/folders', body);
      if (data.success) {
        if (parentId && !expandedFolders[parentId]) toggleFolder(parentId);
        fetchTree();
      }
    } catch {}
  };

  const handleRenameFolder = async (id: string, name: string) => {
    try {
      await api.put(`/folders/${id}`, { name });
      fetchTree();
    } catch {}
  };

  const handleDeleteFolder = async (id: string) => {
    const folder = folderTree.find((f) => f._id === id)
      || folderTree.flatMap((f) => [f, ...f.children]).find((f) => f._id === id);
    setDeleteTarget({ type: 'folder', id, name: folder?.name || 'this folder' });
  };

  const handleRenameNote = async (id: string, title: string) => {
    try {
      await api.put(`/notes/${id}`, { title });
      fetchTree();
    } catch {}
  };

  const handleDeleteNote = async (id: string) => {
    const note = [...folderTree.flatMap((f) => f.notes), ...unorganizedNotes].find((n) => n._id === id);
    setDeleteTarget({ type: 'note', id, name: note?.title || 'Untitled' });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === 'folder') {
        await api.delete(`/folders/${deleteTarget.id}`);
        toast('Folder deleted', 'success');
      } else {
        await api.delete(`/notes/${deleteTarget.id}`);
        setNotes(useNotesStore.getState().notes.filter((n) => n._id !== deleteTarget.id));
        toast('Note moved to trash', 'success');
      }
      fetchTree();
    } catch {}
    setDeleteTarget(null);
  };

  if (initialLoad) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-4 w-4 text-[var(--nt-text-muted)] animate-spin" />
      </div>
    );
  }

  if (folderTree.length === 0 && unorganizedNotes.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <FolderOpen className="h-8 w-8 text-[var(--nt-text-muted)] mx-auto mb-2" />
        <p className="font-mono text-xs text-[var(--nt-text-muted)]">No folders or notes yet</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <button
            onClick={() => handleCreateNote()}
            className="flex items-center gap-1.5 rounded bg-[var(--nt-accent)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            New note
          </button>
          <button
            onClick={() => handleCreateFolder()}
            className="flex items-center gap-1.5 rounded border border-[var(--nt-border)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
          >
            <Plus className="h-3 w-3" />
            New folder
          </button>
        </div>
      </div>
    );
  }

  const allExpanded = folderTree.every((n) => expandedFolders[n._id] !== false);

  return (
    <div className="py-1">
      <div className="flex items-center gap-2 px-3 py-2 mb-1">
        <button
          onClick={() => handleCreateNote()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded bg-[var(--nt-accent)] py-1.5 font-mono text-xs font-medium text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          New note
        </button>
        <button
          onClick={() => handleCreateFolder()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded border border-[var(--nt-border)] py-1.5 font-mono text-xs font-medium text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          New folder
        </button>
      </div>

      {folderTree.length > 0 && (
        <div className="flex items-center justify-between px-3 py-1">
          <span className="font-mono text-[10px] tracking-wider text-[var(--nt-text-muted)] uppercase">
            Folders
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setAllExpanded(!allExpanded)}
              className="p-0.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
              title={allExpanded ? 'Collapse all' : 'Expand all'}
            >
              {allExpanded ? <ChevronsDownUp className="h-3.5 w-3.5" /> : <ChevronsUpDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      )}

      {folderTree.map((node) => (
        <FolderTreeItem
          key={node._id}
          node={node}
          selectedNoteId={selectedNoteId}
          onSelectNote={onSelectNote}
          onCreateNote={(fid) => handleCreateNote(fid)}
          onCreateFolder={(pid) => handleCreateFolder(pid)}
          onRenameFolder={handleRenameFolder}
          onRenameNote={handleRenameNote}
          onDeleteFolder={handleDeleteFolder}
          onDeleteNote={handleDeleteNote}
          expanded={expandedFolders[node._id] ?? true}
          onToggle={() => toggleFolder(node._id)}
        />
      ))}

      {unorganizedNotes.length > 0 && (
        <div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 mt-1">
            <FileText className="h-3 w-3 text-[var(--nt-text-muted)]" />
            <span className="font-mono text-[10px] tracking-wider text-[var(--nt-text-muted)] uppercase">
              Notes
            </span>
          </div>
          {unorganizedNotes.map((note) => (
            <NoteTreeItem
              key={note._id}
              note={note}
              selected={note._id === selectedNoteId}
              onSelect={onSelectNote}
              onDelete={handleDeleteNote}
              onRename={handleRenameNote}
            />
          ))}
        </div>
      )}

      <Dialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title={deleteTarget?.type === 'folder' ? 'Delete folder' : 'Delete note'}
        message={
          deleteTarget?.type === 'folder'
            ? `Delete "${deleteTarget.name}"? Notes inside will be moved to unorganized. Child folders will be reparented.`
            : `Move "${deleteTarget?.name}" to trash?`
        }
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
