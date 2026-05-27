'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExt from '@tiptap/extension-image';
import Link from 'next/link';
import { API_BASE } from '@/lib/api';

interface PublicViewerProps {
  note: {
    title: string;
    content: any;
    plainTextPreview: string;
    coverImage: string | null;
    tags: string[];
    wordCount: number;
    readingTime: number;
    createdAt: string;
    updatedAt: string;
    author: { name: string; email: string; avatarUrl: string | null };
    mode: string;
  };
}

function prefixImageSrcs(node: any): any {
  if (!node || typeof node !== 'object') return node;
  if (node.type === 'image' && node.attrs?.src?.startsWith('/')) {
    return { ...node, attrs: { ...node.attrs, src: `${API_BASE}${node.attrs.src}` } };
  }
  if (node.content) {
    return { ...node, content: node.content.map(prefixImageSrcs) };
  }
  return node;
}

const imageUrl = (src: string) => {
  if (src.startsWith('/')) return `${API_BASE}${src}`;
  return src;
};

export function PublicViewer({ note }: PublicViewerProps) {
  const content = note.content
    ? (Array.isArray(note.content) ? note.content.map(prefixImageSrcs) : prefixImageSrcs(note.content))
    : '';

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExt.configure({ inline: false }),
    ],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'text-[var(--nt-text-primary)]',
      },
    },
  });

  const date = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const coverSrc = note.coverImage ? imageUrl(note.coverImage) : null;

  return (
    <div className="min-h-screen bg-[var(--nt-bg)]">
      <header className="border-b border-[var(--nt-border)]">
        <div className="mx-auto max-w-3xl px-6 py-3 flex items-center justify-between">
          <span className="font-mono text-sm font-medium tracking-wider text-[var(--nt-text-primary)]">
            FOLIO
          </span>
          <Link
            href="/register"
            className="font-mono text-[10px] text-[var(--nt-accent)] hover:underline cursor-pointer"
          >
            Get Folio →
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12">
        {coverSrc && (
          <div className="mb-8">
            <img
              src={coverSrc}
              alt="Cover"
              className="w-full rounded-lg object-cover max-h-80"
            />
          </div>
        )}

        <div className="mb-8">
          <h1 className="font-display text-4xl sm:text-5xl text-[var(--nt-text-primary)] leading-tight mb-4">
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-[var(--nt-text-muted)]">
            <span>By {note.author?.name || 'Unknown'}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{note.wordCount} words</span>
            <span>·</span>
            <span>{note.readingTime} min read</span>
          </div>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded border border-[var(--nt-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--nt-text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {editor && (
          <div className="max-w-none font-serif text-base leading-relaxed text-[var(--nt-text-primary)]">
            <EditorContent editor={editor} />
          </div>
        )}
      </article>

      <footer className="border-t border-[var(--nt-border)] py-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-[10px] text-[var(--nt-text-muted)]">
            Published with{' '}
            <Link href="/" className="text-[var(--nt-accent)] hover:underline cursor-pointer">
              Folio
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
