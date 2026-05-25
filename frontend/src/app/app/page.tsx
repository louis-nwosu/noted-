'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Search, PanelLeftClose, PanelLeft, GripVertical } from 'lucide-react';
import { useNotesStore } from '@/lib/store';
import { NoteList } from '../../components/notes/NoteList';
import { TopNav } from '../../components/ui/TopNav';

export default function AppPage() {
  const router = useRouter();
  const {
    notes, setNotes, setSearchQuery, searchQuery, filter, setFilter,
    sidebarOpen, toggleSidebar, sidebarWidth, setSidebarWidth,
  } = useNotesStore();
  const resizing = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams({ page: '1', limit: '50' });
    if (filter !== 'all') params.set('filter', filter);
    if (searchQuery) params.set('q', searchQuery);
    api.get(`/notes?${params}`).then(({ data }) => { if (data.success) setNotes(data.data); }).catch(() => {});
  }, [filter, searchQuery, setNotes]);

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

  const sidebarStyle = isMobile
    ? { width: '100%' }
    : { width: sidebarOpen ? sidebarWidth : 0 };

  return (
    <div className="flex h-screen flex-col bg-[var(--nt-bg)]">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className="flex flex-col bg-[var(--nt-surface)] border-r border-[var(--nt-border)] overflow-hidden shrink-0 transition-[width] duration-200"
          style={sidebarStyle}
        >
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
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="shrink-0 p-1.5 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
                  title="Close sidebar"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleCreate}
              className="flex w-full items-center justify-center gap-2 rounded bg-[var(--nt-accent)] py-2 font-mono text-xs font-medium text-[var(--nt-bg)] hover:opacity-90 transition-all cursor-pointer"
            >
              + New note
            </button>
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
            <NoteList notes={notes} onSelectNote={toggleSidebar} />
          </div>
        </aside>

        {sidebarOpen && !isMobile && (
          <div
            className="w-1.5 shrink-0 cursor-col-resize hover:bg-[var(--nt-accent)]/30 active:bg-[var(--nt-accent)]/50 transition-colors flex items-center justify-center group"
            onMouseDown={handleMouseDown}
          >
            <GripVertical className="h-4 w-4 text-[var(--nt-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {!sidebarOpen && !isMobile && (
          <button
            onClick={toggleSidebar}
            className="shrink-0 p-1 self-center rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer ml-1"
            title="Open sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        {!isMobile && (
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-3xl text-[var(--nt-text-muted)] mb-2">Select a note</div>
              <p className="font-mono text-xs text-[var(--nt-text-muted)]">or create a new one to get started</p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
