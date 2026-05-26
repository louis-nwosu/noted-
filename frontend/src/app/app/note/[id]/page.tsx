'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useNotesStore } from '@/lib/store';
import { Editor } from '../../../../components/editor/Editor';
import { TopNav } from '../../../../components/ui/TopNav';
import { NoteList } from '../../../../components/notes/NoteList';
import { FolderTree } from '../../../../components/notes/FolderTree';
import { ResearchPanel } from '../../../../components/ai/ResearchPanel';
import { Search, PanelLeftClose, PanelLeft, GripVertical, Plus } from 'lucide-react';

export default function NoteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const {
    notes, setNotes, setSearchQuery, searchQuery, filter, setFilter,
    sidebarOpen, toggleSidebar, sidebarWidth, setSidebarWidth,
  } = useNotesStore();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const resizing = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    setNote(null);
    api.get(`/notes/${params.id}`)
      .then(({ data }) => { if (data.success) setNote(data.data); })
      .catch(() => router.push('/app'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const fetchNotes = useCallback(async (f?: string, q?: string) => {
    const activeFilter = f ?? filter;
    const activeQuery = q ?? searchQuery;
    if (activeFilter === 'trash') {
      api.get('/notes/trash').then(({ data }) => { if (data.success) setNotes(data.data); }).catch(() => {});
      return;
    }
    const p = new URLSearchParams({ page: '1', limit: '50' });
    if (activeFilter !== 'all') p.set('filter', activeFilter);
    if (activeQuery) p.set('q', activeQuery);
    api.get(`/notes?${p}`).then(({ data }) => { if (data.success) setNotes(data.data); }).catch(() => {});
  }, [filter, searchQuery, setNotes]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  const handleFilterClick = (f: "all" | "private" | "shared" | "pinned" | "trash") => {
    setFilter(f);
    fetchNotes(f, searchQuery);
  };

  const handleSave = async (title: string, content: any) => {
    if (!note) return;
    try {
      const { data } = await api.put(`/notes/${note._id}`, {
        title, content,
        wordCount: JSON.stringify(content).split(/\s+/).length,
      });
      if (data.success) {
        setNote(data.data);
        setNotes(notes.map((n) => (n._id === data.data._id ? data.data : n)));
      }
    } catch {}
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes(notes.filter((n) => n._id !== note._id));
      router.push('/app');
    } catch {}
  };

  const handleCreate = async () => {
    try {
      const { data } = await api.post('/notes', { title: 'Untitled', content: {} });
      if (data.success) router.push(`/app/note/${data.data._id}`);
    } catch {}
  };

  const handleMouseDown = useCallback(() => {
    resizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const onMove = (e: MouseEvent) => { if (resizing.current) setSidebarWidth(e.clientX); };
    const onUp = () => {
      resizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [setSidebarWidth]);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex h-screen flex-col bg-[var(--nt-bg)]">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className="flex flex-col bg-[var(--nt-surface)] border-r border-[var(--nt-border)] overflow-hidden shrink-0
            max-md:fixed max-md:top-12 max-md:left-0 max-md:z-50 max-md:w-full
            max-md:shadow-2xl max-md:border-r-0 max-md:bottom-0
            md:relative md:transition-[width] md:duration-200"
          style={{ width: isMobile ? (sidebarOpen ? '100%' : 0) : (sidebarOpen ? sidebarWidth : 0) }}
        >
          {sidebarOpen && isMobile && (
            <div className="fixed top-12 inset-x-0 bottom-0 bg-black/50 -z-10" onClick={toggleSidebar} />
          )}
          <div className="p-3 border-b border-[var(--nt-border)] space-y-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nt-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search notes…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] pl-9 pr-3 py-2 font-mono text-xs text-[var(--nt-text-primary)] outline-none focus:border-[var(--nt-accent)] transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-1 p-3 border-b border-[var(--nt-border)] shrink-0 overflow-x-auto">
            {(['all', 'private', 'shared', 'pinned', 'trash'] as const).map((f) => (
              <button
                key={f}
                onClick={() => handleFilterClick(f)}
                className={`px-2.5 py-1 rounded font-mono text-[10px] tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap ${
                  filter === f
                    ? 'bg-[var(--nt-accent)] text-[var(--nt-bg)]'
                    : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {filter === 'trash' ? (
              <NoteList notes={notes} selectedId={undefined} onSelectNote={isMobile ? toggleSidebar : undefined} trash={true} onTrashAction={fetchNotes} />
            ) : (
              <FolderTree selectedNoteId={params.id as string} onSelectNote={isMobile ? toggleSidebar : undefined} />
            )}
          </div>
          {isMobile && sidebarOpen && filter !== 'trash' && (
            <button
              onClick={() => { handleCreate(); }}
              className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--nt-accent)] text-[var(--nt-bg)] shadow-xl hover:opacity-90 transition-all cursor-pointer"
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </aside>

        {!isMobile && (
          <>
            {sidebarOpen && (
              <div
                className="w-2 shrink-0 cursor-col-resize bg-[var(--nt-border)]/20 hover:bg-[var(--nt-accent)]/25 active:bg-[var(--nt-accent)]/40 transition-colors flex flex-col items-center justify-center group relative"
                onMouseDown={handleMouseDown}
              >
                <GripVertical className="h-4 w-4 text-[var(--nt-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSidebar(); }}
                  className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-8 rounded-r bg-[var(--nt-surface)] border border-[var(--nt-border)] border-l-0 text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all opacity-0 group-hover:opacity-100 cursor-pointer -right-5"
                  title="Close sidebar"
                >
                  <PanelLeftClose className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="shrink-0 flex items-center gap-1.5 self-center rounded-r border border-[var(--nt-border)] border-l-0 bg-[var(--nt-surface)] pl-2 pr-3 py-2 text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
                title="Open sidebar"
              >
                <PanelLeft className="h-4 w-4" />
                <span className="font-mono text-[10px] tracking-wider uppercase">Sidebar</span>
              </button>
            )}
          </>
        )}

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto hide-scrollbar">
              {loading ? (
                <div className="pt-32 text-center">
                  <div className="font-mono text-sm text-[var(--nt-text-muted)] animate-pulse">Loading note…</div>
                </div>
              ) : note ? (
                <div>
                  {isMobile && (
                    <div className="flex items-center gap-2 px-4 pt-3 pb-0">
                      <button
                        onClick={toggleSidebar}
                        className="p-1.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
                        title="Open notes list"
                      >
                        <PanelLeft className="h-4 w-4" />
                      </button>
                      <span className="font-mono text-xs text-[var(--nt-text-muted)] truncate">{note?.title || 'Untitled'}</span>
                    </div>
                  )}
                  <Editor key={params.id as string} note={note} onSave={handleSave} onDelete={handleDelete} onWordCountChange={setWordCount} />
                </div>
              ) : (
                <div className="pt-32 text-center">
                  <div className="font-mono text-sm text-[var(--nt-text-muted)]">Note not found</div>
                </div>
              )}
            </main>
            <div className="flex items-center gap-4 border-t border-[var(--nt-border)] px-6 py-2 font-mono text-[10px] text-[var(--nt-text-muted)] shrink-0">
              <span>{wordCount} words</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
          <ResearchPanel noteContent={note ? JSON.stringify(note.content) : '{}'} />
        </div>
      </div>
    </div>
  );
}
