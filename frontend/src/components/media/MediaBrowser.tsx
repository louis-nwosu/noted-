'use client';

import { useState, useEffect } from 'react';
import { X, FileText, Image, Video, Loader2 } from 'lucide-react';
import api, { API_BASE } from '@/lib/api';
import { PdfViewerModal } from '../editor/PdfViewerModal';

interface MediaItem {
  _id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  thumbnailUrl: string | null;
  rawText?: string;
  summary?: string;
}

interface Props {
  noteId: string;
  onClose: () => void;
}

type Tab = 'all' | 'images' | 'pdfs' | 'other';

export function MediaBrowser({ noteId, onClose }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('all');
  const [pdfView, setPdfView] = useState<MediaItem | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (pdfView) { setPdfView(null); return; }
        if (lightbox) { setLightbox(null); return; }
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, pdfView, lightbox]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/media/${noteId}`);
        if (data.success) setItems(data.data);
      } catch (err) {
        console.error('Failed to load media', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [noteId]);

  const fullUrl = (url: string) => (url.startsWith('http') ? url : `${API_BASE}${url}`);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    if (diff < 86400000) return 'Today';
    if (diff < 172800000) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const isPdf = (item: MediaItem) =>
    item.type === 'file' || item.mimeType === 'application/pdf';

  const filtered = items.filter((item) => {
    if (tab === 'all') return true;
    if (tab === 'images') return item.type === 'image';
    if (tab === 'pdfs') return isPdf(item);
    return item.type === 'video';
  });

  const handleClick = (item: MediaItem) => {
    if (isPdf(item)) {
      setPdfView(item);
    } else if (item.type === 'image') {
      setLightbox(fullUrl(item.url));
    }
  };

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: items.length },
    { id: 'images', label: 'Images', count: items.filter((i) => i.type === 'image').length },
    { id: 'pdfs', label: 'PDFs', count: items.filter((i) => isPdf(i)).length },
    { id: 'other', label: 'Other', count: items.filter((i) => i.type === 'video').length },
  ];

  const tabClass = (t: Tab) =>
    `flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] transition-all cursor-pointer ${
      tab === t
        ? 'bg-[var(--nt-accent)]/15 text-[var(--nt-accent)]'
        : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
    }`;

  const typeIcon = (item: MediaItem) => {
    if (item.type === 'file') return <FileText className="h-6 w-6" />;
    if (item.type === 'video') return <Video className="h-6 w-6" />;
    return <Image className="h-6 w-6" />;
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/70" onClick={onClose} />
        <div className="relative z-10 flex w-full max-w-4xl flex-col rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] shadow-2xl max-h-[85vh]">
          <div className="flex items-center justify-between border-b border-[var(--nt-border)] px-4 py-3 shrink-0">
            <span className="font-mono text-sm font-medium text-[var(--nt-text-primary)]">
              Media
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 border-b border-[var(--nt-border)] px-4 py-2">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={tabClass(t.id)}>
                {t.label}
                <span className="rounded bg-[var(--nt-ink)] px-1.5 py-0.5 text-[10px]">
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[var(--nt-text-muted)]" />
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center font-serif text-[15px] text-[var(--nt-text-muted)] py-20">
                {tab === 'all' ? 'No media uploaded yet.' : 'No matching media.'}
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filtered.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleClick(item)}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-[var(--nt-border)] bg-[var(--nt-ink)]/30 p-3 hover:border-[var(--nt-accent)]/40 transition-all cursor-pointer text-left"
                  >
                    {item.type === 'image' && item.thumbnailUrl ? (
                      <div className="w-full aspect-video rounded-lg overflow-hidden bg-[var(--nt-ink)]">
                        <img
                          src={fullUrl(item.thumbnailUrl)}
                          alt={item.filename}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full aspect-video rounded-lg bg-[var(--nt-ink)] text-[var(--nt-text-muted)] group-hover:text-[var(--nt-accent)] transition-colors">
                        {typeIcon(item)}
                      </div>
                    )}
                    <div className="w-full min-w-0">
                      <p className="font-mono text-[11px] text-[var(--nt-text-primary)] truncate">
                        {item.filename}
                      </p>
                      <p className="font-mono text-[10px] text-[var(--nt-text-muted)] mt-0.5">
                        {formatSize(item.sizeBytes)} &middot; {formatDate(item.uploadedAt)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {pdfView && (
        <PdfViewerModal
          pdfUrl={pdfView.url}
          filename={pdfView.filename}
          summary={pdfView.summary || ''}
          rawText={pdfView.rawText || ''}
          isScanned={!!pdfView.rawText && pdfView.rawText.trim().length < 20}
          onClose={() => setPdfView(null)}
        />
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80" onClick={() => setLightbox(null)} />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-[111] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightbox}
            alt="Preview"
            className="relative z-10 max-w-full max-h-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
