'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useNotesStore } from '@/lib/store';
import { Editor } from '../../../../components/editor/Editor';
import { TopNav } from '../../../../components/ui/TopNav';
import { NoteList } from '../../../../components/notes/NoteList';
import { Search, PanelLeftClose, PanelLeft, GripVertical, ArrowLeft } from 'lucide-react';

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

  useEffect(() => {
    const p = new URLSearchParams({ page: '1', limit: '50' });
    if (filter !== 'all') p.set('filter', filter);
    if (searchQuery) p.set('q', searchQuery);
    api.get(`/notes?${p}`).then(({ data }) => { if (data.success) setNotes(data.data); }).catch(() => {});
  }, [filter, searchQuery, setNotes]);

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
            max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:w-full
            max-md:shadow-2xl max-md:border-r-0
            md:relative md:transition-[width] md:duration-200"
          style={{ width: isMobile ? (sidebarOpen ? '100%' : 0) : (sidebarOpen ? sidebarWidth : 0) }}
        >
          {sidebarOpen && isMobile && (
            <div className="fixed inset-0 bg-black/50 -z-10" onClick={toggleSidebar} />
          )}
          <div className="p-3 border-b border-[var(--nt-border)] space-y-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nt-text-muted)]" />
                <input
                  type="text"
                  placeholder="Search notes…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded border border-[var(--nt-border)] bg-[var(--nt-bg)] pl-9 pr-3 py-2 font-mono text-xs text-[var(--nt-text-primary)] outline-none focus:border-[var(--nt-accent)] transition-colors"
                />
              </div>
              <button
                onClick={toggleSidebar}
                className="shrink-0 p-1.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
                title="Close sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleCreate}
              className="flex w-full items-center justify-center gap-2 rounded bg-[var(--nt-accent)] py-2 font-mono text-xs font-medium text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer"
            >
              + New note
            </button>
            {isMobile && (
              <button
                onClick={() => router.push('/app')}
                className="flex w-full items-center justify-center gap-2 rounded border border-[var(--nt-border)] py-2 font-mono text-xs text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] transition-all cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to notes
              </button>
            )}
          </div>

          <div className="flex gap-1 p-3 border-b border-[var(--nt-border)] shrink-0 overflow-x-auto">
            {(['all', 'private', 'shared', 'pinned'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
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

          <div className="flex-1 overflow-y-auto">
            <NoteList notes={notes} selectedId={params.id as string} onSelectNote={toggleSidebar} />
          </div>
        </aside>

        {!isMobile && (
          <>
            {sidebarOpen && (
              <div
                className="w-1.5 shrink-0 cursor-col-resize hover:bg-[var(--nt-accent)]/30 active:bg-[var(--nt-accent)]/50 transition-colors flex items-center justify-center group"
                onMouseDown={handleMouseDown}
              >
                <GripVertical className="h-4 w-4 text-[var(--nt-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="shrink-0 p-1 self-center rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer ml-1"
                title="Open sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}
          </>
        )}

        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
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
      </div>
    </div>
  );
}
