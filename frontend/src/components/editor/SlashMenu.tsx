'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';
import {
  Type, Heading1, Heading2, Heading3, List, ListOrdered,
  CheckSquare, Quote, Code2, Table, Image, Minus,
} from 'lucide-react';

interface SlashMenuProps {
  editor: Editor;
}

interface SlashItem {
  icon: any;
  label: string;
  description: string;
  action: (editor: Editor) => void;
}

const items: SlashItem[] = [
  { icon: Type, label: 'Paragraph', description: 'Normal text', action: (e) => e.chain().focus().setParagraph().run() },
  { icon: Heading1, label: 'Heading 1', description: 'Large heading', action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run() },
  { icon: Heading2, label: 'Heading 2', description: 'Medium heading', action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run() },
  { icon: Heading3, label: 'Heading 3', description: 'Small heading', action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run() },
  { icon: List, label: 'Bullet List', description: 'Unordered list', action: (e) => e.chain().focus().toggleBulletList().run() },
  { icon: ListOrdered, label: 'Ordered List', description: 'Numbered list', action: (e) => e.chain().focus().toggleOrderedList().run() },
  { icon: CheckSquare, label: 'Task List', description: 'Checklist', action: (e) => e.chain().focus().toggleTaskList().run() },
  { icon: Quote, label: 'Blockquote', description: 'Quote text', action: (e) => e.chain().focus().toggleBlockquote().run() },
  { icon: Code2, label: 'Code Block', description: 'Code with syntax highlighting', action: (e) => e.chain().focus().toggleCodeBlock().run() },
  { icon: Table, label: 'Table', description: 'Insert a 3x3 table', action: (e) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  { icon: Minus, label: 'Divider', description: 'Horizontal rule', action: (e) => e.chain().focus().setHorizontalRule().run() },
];

export function SlashMenu({ editor }: SlashMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [show, setShow] = useState(false);
  const slashPos = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filtered = items.filter(
    (item) => item.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setShow(false);
    setQuery('');
    slashPos.current = null;
    setSelectedIndex(0);
  }, []);

  const execute = useCallback(
    (item: SlashItem) => {
      if (slashPos.current === null) return;
      const { from, to } = editor.state.selection;
      const fromPos = slashPos.current;

      if (fromPos < from) {
        editor.chain().focus().deleteRange({ from: fromPos, to }).run();
      }
      item.action(editor);
      close();
    },
    [editor, close]
  );

  useEffect(() => {
    if (!open || filtered.length === 0) return;
    const idx = Math.max(0, Math.min(selectedIndex, filtered.length - 1));
    setSelectedIndex(idx);
  }, [open, filtered.length, selectedIndex]);

  useEffect(() => {
    const dom = editor.view.dom;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open && e.key === '/') {
        const sel = editor.state.selection;
        if (sel.empty) {
          const { from } = sel;
          const $pos = editor.state.doc.resolve(from);
          const startOfBlock = $pos.start();
          const textInBlock = editor.state.doc.textBetween(startOfBlock, from);
          const atLineStart = textInBlock.trim() === '' || textInBlock.endsWith(' ');

          if (atLineStart) {
            e.preventDefault();
            slashPos.current = from;
            setQuery('');
            setOpen(true);
            setSelectedIndex(0);

            const editorRoot = dom.closest('[data-editor-root]') as HTMLElement;
            if (editorRoot) {
              const rect = editorRoot.getBoundingClientRect();
              const coords = editor.view.coordsAtPos(from);
              setPos({
                top: coords.top - rect.top + 24,
                left: Math.max(8, Math.min(coords.left - rect.left, rect.width - 280)),
              });
            }
            requestAnimationFrame(() => setShow(true));
            return;
          }
        }
      }

      if (open) {
        if (e.key === 'Escape') {
          e.preventDefault();
          close();
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % filtered.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
          return;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          if (filtered[selectedIndex]) {
            execute(filtered[selectedIndex]);
          }
          return;
        }
      }
    };

    const handleInput = () => {
      if (!open || slashPos.current === null) return;
      const { from } = editor.state.selection;
      const text = editor.state.doc.textBetween(slashPos.current + 1, from);
      setQuery(text);

      if (from <= slashPos.current) {
        close();
        return;
      }
    };

    dom.addEventListener('keydown', handleKeyDown);
    dom.addEventListener('input', handleInput);

    return () => {
      dom.removeEventListener('keydown', handleKeyDown);
      dom.removeEventListener('input', handleInput);
    };
  }, [editor, open, filtered, selectedIndex, close, execute]);

  if (!show || !open || filtered.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-64 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] shadow-xl overflow-hidden"
      style={{ top: pos.top, left: pos.left }}
    >
      <div className="p-1.5 max-h-64 overflow-y-auto">
        {filtered.map((item, i) => (
          <button
            key={item.label}
            onClick={() => execute(item)}
            onMouseEnter={() => setSelectedIndex(i)}
            className={`flex w-full items-center gap-3 rounded px-2.5 py-2 text-left transition-colors cursor-pointer ${
              i === selectedIndex
                ? 'bg-[var(--nt-accent)]/10 text-[var(--nt-accent)]'
                : 'text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
            }`}
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded border ${
              i === selectedIndex ? 'border-[var(--nt-accent)]/30 bg-[var(--nt-accent)]/5' : 'border-[var(--nt-border)] bg-[var(--nt-bg)]'
            }`}>
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-mono text-xs">{item.label}</div>
              <div className="font-mono text-[10px] text-[var(--nt-text-muted)]">{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
