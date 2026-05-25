'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import ImageExt from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { SharePopover } from '../share/SharePopover';
import { ExportDropdown } from './ExportDropdown';
import {
  Mic, Headphones, Trash2,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code2, Table as TableIcon, Image, Link as LinkIcon,
  Minus, CheckSquare,
} from 'lucide-react';

interface EditorProps {
  note: any;
  onSave: (title: string, content: any) => void;
  onDelete?: () => void;
  onWordCountChange?: (words: number) => void;
}

type ToolbarItem = {
  icon: any;
  action: () => void;
  active: boolean;
  label: string;
};

export function Editor({ note, onSave, onDelete, onWordCountChange }: EditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const saveTimer = useRef<NodeJS.Timeout | null>(null);
  const [wordCount, setWordCount] = useState(note?.wordCount || 0);
  const [floatPos, setFloatPos] = useState({ top: 0, left: 0 });
  const [showFloat, setShowFloat] = useState(false);
  const floatRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      ImageExt,
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: 'Start writing…' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: note?.content || '',
    onUpdate: ({ editor: ed }) => {
      const text = ed.getText();
      const words = text.split(/\s+/).filter(Boolean).length || 0;
      setWordCount(words);
      onWordCountChange?.(words);
      setSaveStatus('unsaved');
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        setSaveStatus('saving');
        onSave(title, ed.getJSON());
        setTimeout(() => setSaveStatus('saved'), 500);
      }, 2000);
    },
    editorProps: {
      attributes: {
        class:
          'max-w-none focus:outline-none min-h-[400px] px-0 py-4 font-serif text-base leading-relaxed text-[var(--nt-text-primary)]',
      },
    },
  });

  useEffect(() => {
    setTitle(note?.title || '');
    if (editor && note?.content) {
      editor.commands.setContent(note.content);
    }
  }, [note?._id]);

  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom;
    const onDblClick = (e: MouseEvent) => {
      const editorRoot = dom.closest('[data-editor-root]') as HTMLElement | null;
      if (!editorRoot) return;
      const editorRect = editorRoot.getBoundingClientRect();
      const toolbarWidth = 340;
      let left = e.clientX - toolbarWidth / 2;
      left = Math.max(editorRect.left + 8, Math.min(left, editorRect.right - toolbarWidth - 8));
      setFloatPos({
        top: e.clientY - 10,
        left,
      });
      setShowFloat(true);
    };
    dom.addEventListener('dblclick', onDblClick);
    return () => dom.removeEventListener('dblclick', onDblClick);
  }, [editor]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (floatRef.current && !floatRef.current.contains(e.target as Node)) {
        setShowFloat(false);
      }
    };
    if (showFloat) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFloat]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      setSaveStatus('unsaved');
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        setSaveStatus('saving');
        onSave(newTitle, editor?.getJSON() || {});
        setTimeout(() => setSaveStatus('saved'), 500);
      }, 2000);
    },
    [editor, onSave]
  );

  if (!editor) return null;

  const toolbarItems: ToolbarItem[] = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'Bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'Italic' },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), label: 'Underline' },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), label: 'Strikethrough' },
    { icon: Code, action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code'), label: 'Code' },
  ];

  const blockItems: ToolbarItem[] = [
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), label: 'H1' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), label: 'H2' },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }), label: 'H3' },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), label: 'Bullet list' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), label: 'Ordered list' },
    { icon: CheckSquare, action: () => editor.chain().focus().toggleTaskList().run(), active: editor.isActive('taskList'), label: 'Task list' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), label: 'Quote' },
    { icon: Code2, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock'), label: 'Code block' },
  ];

  return (
    <div className="px-12 py-8" data-editor-root>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {saveStatus === 'saving' && (
            <span className="font-mono text-[10px] text-[var(--nt-accent-warm)]">Saving…</span>
          )}
          {saveStatus === 'saved' && (
            <span className="font-mono text-[10px] text-[var(--nt-accent)]">Saved ✓</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button title="Voice input — coming soon" disabled className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] opacity-40 cursor-not-allowed">
            <Mic className="h-3 w-3" /> Voice
          </button>
          <button title="Listen — coming soon" disabled className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] opacity-40 cursor-not-allowed">
            <Headphones className="h-3 w-3" /> Listen
          </button>
          <SharePopover noteId={note._id} isPrivate={note.isPrivate} shareToken={note.shareToken} />
          <ExportDropdown getHTML={() => editor.getHTML()} title={title} />
          <button
            onClick={() => {
              if (window.confirm('Delete this note? It will be moved to trash.')) {
                onDelete?.();
              }
            }}
            className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <Trash2 className="h-3 w-3" /> Delete
          </button>
        </div>
      </div>

      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled"
        className="w-full border-0 bg-transparent font-display text-4xl text-[var(--nt-text-primary)] outline-none placeholder:text-[var(--nt-text-muted)]/40 mb-6"
      />

      <EditorContent editor={editor} />

      <div
        ref={floatRef}
        className={`fixed z-50 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] px-2 py-1.5 shadow-xl transition-all duration-150 ${
          showFloat ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{
          top: floatPos.top,
          left: floatPos.left,
        }}
      >
        <div className="flex items-center gap-0.5 flex-wrap">
          {toolbarItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              title={item.label}
              className={`p-1 rounded transition-colors cursor-pointer ${
                item.active
                  ? 'bg-[var(--nt-accent)]/20 text-[var(--nt-accent)]'
                  : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
              }`}
            >
              <item.icon className="h-4 w-4" />
            </button>
          ))}
          <div className="w-px h-5 bg-[var(--nt-ink)] mx-1" />
          {blockItems.slice(0, 3).map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              title={item.label}
              className={`p-1 rounded transition-colors cursor-pointer ${
                item.active
                  ? 'bg-[var(--nt-accent)]/20 text-[var(--nt-accent)]'
                  : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
              }`}
            >
              <item.icon className="h-4 w-4" />
            </button>
          ))}
          <div className="w-px h-5 bg-[var(--nt-ink)] mx-1" />
          {blockItems.slice(3).map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              title={item.label}
              className={`p-1 rounded transition-colors cursor-pointer ${
                item.active
                  ? 'bg-[var(--nt-accent)]/20 text-[var(--nt-accent)]'
                  : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
              }`}
            >
              <item.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
