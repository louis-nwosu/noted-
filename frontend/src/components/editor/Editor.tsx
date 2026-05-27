'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { Dialog } from '../ui/Dialog';
import { Prompt } from '../ui/Prompt';
import { useToast } from '../ui/Toast';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
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
import { SlashMenu } from './SlashMenu';
import { QuizModal } from '../ai/QuizModal';
import { PdfViewerModal } from './PdfViewerModal';
import { MediaBrowser } from '../media/MediaBrowser';
import { MathInline } from '@/lib/extensions/MathInline';
import { MathDisplay } from '@/lib/extensions/MathDisplay';
import '@/lib/extensions/types';
import 'katex/dist/katex.min.css';
import {
  Mic, Headphones, Trash2, Circle, Sparkles,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code2, Table as TableIcon, Image, Link as LinkIcon,
  Minus, CheckSquare, Undo2, Redo2, Palette, X, Sigma, FileText, Pin, PinOff,
} from 'lucide-react';
import api, { API_BASE } from '@/lib/api';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

interface EditorProps {
  note: any;
  onSave: (title: string, content: any, wordCount?: number) => void;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLinkPrompt, setShowLinkPrompt] = useState(false);
  const [showMathPrompt, setShowMathPrompt] = useState(false);
  const [mathMode, setMathMode] = useState<'inline' | 'display'>('inline');
  const [coverImage, setCoverImage] = useState<string | null>(note?.coverImage || null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showMediaBrowser, setShowMediaBrowser] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfResult, setPdfResult] = useState<{ url: string; filename: string; summary: string; rawText: string; isScanned: boolean } | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const pdfFileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isPinned, setIsPinned] = useState(!!note?.pinnedAt);
  const pendingTranscriptRef = useRef('');

  const {
    isListening,
    transcript,
    interimTranscript,
    supported: speechSupported,
    error: speechError,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    onResult: (text) => {
      pendingTranscriptRef.current = text;
    },
    onInterim: () => {},
    onError: (err) => {
      if (err === 'not-allowed') toast('Microphone access denied. Please allow microphone permissions.', 'error');
      else if (err === 'no-speech') {} // silent
      else toast(`Speech recognition error: ${err}`, 'error');
    },
  });

  useEffect(() => {
    if (speechError === 'not-allowed') {
      toast('Microphone access denied. Please allow microphone permissions and try again.', 'error');
    }
  }, [speechError]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
      const text = pendingTranscriptRef.current.trim();
      if (text && editor) {
        editor.chain().focus().insertContent(text + ' ').run();
      }
      pendingTranscriptRef.current = '';
    } else {
      startListening();
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
      ImageExt,
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: 'Start writing\u2026' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table,
      TableRow,
      TableCell,
      TableHeader,
      MathInline,
      MathDisplay,
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
        onSave(title, ed.getJSON(), words);
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
    setIsPinned(!!note?.pinnedAt);
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
      const isMobileView = window.innerWidth < 768;
      const toolbarWidth = isMobileView ? 260 : 340;
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
        onSave(newTitle, editor?.getJSON() || {}, wordCount);
        setTimeout(() => setSaveStatus('saved'), 500);
      }, 2000);
    },
    [editor, onSave, wordCount]
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('noteId', note._id);

      const { data } = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        const imageUrl = `${API_BASE}${data.data.url}`;
        editor.chain().focus().setImage({ src: imageUrl }).run();
        toast('Image inserted', 'success');
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleLinkSubmit = (url: string) => {
    if (!editor) return;
    editor.chain().focus().setLink({ href: url }).run();
    toast('Link inserted', 'success');
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !note) return;

    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('noteId', note._id);

      const { data } = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        const imageUrl = `${API_BASE}${data.data.url}`;
        setCoverImage(imageUrl);
        onSave(title, editor?.getJSON() || {}, wordCount);
        try { await api.put(`/notes/${note._id}`, { coverImage: imageUrl }); } catch {}
        toast('Cover image set', 'success');
      }
    } catch {
      toast('Cover upload failed', 'error');
    } finally {
      setUploadingCover(false);
      e.target.value = '';
    }
  };

  const handleRemoveCover = async () => {
    if (!note) return;
    setCoverImage(null);
    try { await api.put(`/notes/${note._id}`, { coverImage: null }); } catch {}
    onSave(title, editor?.getJSON() || {}, wordCount);
  };

  const handlePinToggle = async () => {
    if (!note) return;
    try {
      const pinnedAt = isPinned ? null : new Date().toISOString();
      const { data } = await api.put(`/notes/${note._id}`, { pinnedAt });
      if (data.success) {
        setIsPinned(!!pinnedAt);
        toast(pinnedAt ? 'Note pinned' : 'Note unpinned', 'success');
      }
    } catch {}
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !note) return;

    setUploadingPdf(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (note._id) formData.append('noteId', note._id);

      const { data } = await api.post('/pdf/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (data.success) {
        setPdfResult({ url: data.data.url, filename: data.data.filename, summary: data.data.summary, rawText: data.data.rawText, isScanned: data.data.isScanned });
        setShowPdfModal(true);
        toast('PDF uploaded and summarized', 'success');
      }
    } catch (err) {
      console.error('PDF upload failed', err);
      toast('PDF upload failed', 'error');
    } finally {
      setUploadingPdf(false);
      e.target.value = '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };
    if (showColorPicker) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPicker]);

  const TEXT_COLORS = [
    { label: 'Default', value: '' },
    { label: 'Gray', value: '#6B6F78' },
    { label: 'Red', value: '#EF4444' },
    { label: 'Orange', value: '#F97316' },
    { label: 'Yellow', value: '#EAB308' },
    { label: 'Green', value: '#22C55E' },
    { label: 'Teal', value: '#14B8A6' },
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Purple', value: '#A855F7' },
    { label: 'Pink', value: '#EC4899' },
  ];

  if (!editor) return null;

  const toolbarItems: ToolbarItem[] = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold'), label: 'Bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic'), label: 'Italic' },
    { icon: UnderlineIcon, action: () => editor.chain().focus().toggleUnderline().run(), active: editor.isActive('underline'), label: 'Underline' },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike'), label: 'Strikethrough' },
    { icon: Code, action: () => editor.chain().focus().toggleCode().run(), active: editor.isActive('code'), label: 'Code' },
  ];

  const headingItems: ToolbarItem[] = [
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }), label: 'H1' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }), label: 'H2' },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }), label: 'H3' },
  ];

  const listItems: ToolbarItem[] = [
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList'), label: 'Bullet list' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList'), label: 'Ordered list' },
    { icon: CheckSquare, action: () => editor.chain().focus().toggleTaskList().run(), active: editor.isActive('taskList'), label: 'Task list' },
  ];

  const blockItems: ToolbarItem[] = [
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote'), label: 'Quote' },
    { icon: Code2, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock'), label: 'Code block' },
    { icon: TableIcon, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), active: editor.isActive('table'), label: 'Table' },
    { icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), active: false, label: 'Divider' },
  ];

  const btnClass = (active: boolean) =>
    `shrink-0 rounded-md p-1.5 transition-colors cursor-pointer ${
      active
        ? 'bg-[var(--nt-accent)]/15 text-[var(--nt-accent)]'
        : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
    }`;

  const renderToolbarGroup = (items: ToolbarItem[]) =>
    items.map((item) => (
      <button key={item.label} onClick={item.action} title={item.label} className={btnClass(item.active)}>
        <item.icon className="h-3.5 w-3.5" />
      </button>
    ));

  const separator = <div className="mx-1 h-4 w-px shrink-0 bg-[var(--nt-ink)]" />;

  const persistentToolbar = (
    <div className="flex items-center gap-0.5 overflow-x-auto rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] px-2 py-1.5 shadow-sm [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      <button onClick={() => editor.chain().focus().undo().run()} title="Undo" className={btnClass(false)}>
        <Undo2 className="h-3.5 w-3.5" />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} title="Redo" className={btnClass(false)}>
        <Redo2 className="h-3.5 w-3.5" />
      </button>
      {separator}
      {renderToolbarGroup(toolbarItems)}
      {separator}
      {renderToolbarGroup(headingItems)}
      {separator}
      {renderToolbarGroup(listItems)}
      {separator}
      {renderToolbarGroup(blockItems)}
      {separator}
      <div className="relative" ref={colorPickerRef}>
        <button onClick={() => setShowColorPicker(!showColorPicker)} title="Text color" className={btnClass(false)}>
          <Palette className="h-3.5 w-3.5" />
        </button>
        {showColorPicker && (
          <div className="absolute top-full left-0 mt-1 z-50 flex flex-wrap gap-1 rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] p-2 shadow-xl w-44">
            {TEXT_COLORS.map((c) => (
              <button
                key={c.label}
                onClick={() => { editor.chain().focus()[c.value ? 'setColor' : 'unsetColor'](c.value).run(); setShowColorPicker(false); }}
                title={c.label}
                className={`h-6 w-6 rounded-full border border-[var(--nt-border)] transition-transform hover:scale-110 cursor-pointer ${!c.value ? 'flex items-center justify-center' : ''}`}
                style={c.value ? { backgroundColor: c.value } : {}}
              >
                {!c.value && <X className="h-3 w-3 text-[var(--nt-text-muted)]" />}
              </button>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => fileInputRef.current?.click()} title="Upload image" className={btnClass(false)} disabled={uploading}>
        {uploading ? (
          <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-[var(--nt-accent)]" />
        ) : (
          <Image className="h-3.5 w-3.5" />
        )}
      </button>
      <button onClick={() => setShowLinkPrompt(true)} title="Insert link" className={btnClass(editor.isActive('link'))}>
        <LinkIcon className="h-3.5 w-3.5" />
      </button>
      <button onClick={() => { setMathMode('inline'); setShowMathPrompt(true); }} title="Inline math" className={btnClass(false)}>
        <Sigma className="h-3.5 w-3.5" />
      </button>
      <button onClick={() => { setMathMode('display'); setShowMathPrompt(true); }} title="Display math" className={btnClass(false)}>
        <Sigma className="h-3.5 w-3.5" />
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
    </div>
  );

  return (
    <div className="px-4 md:px-12 py-4 md:py-8" data-editor-root>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          {saveStatus === 'saving' && (
            <span className="font-mono text-[10px] text-[var(--nt-accent-warm)]">Saving\u2026</span>
          )}
          {saveStatus === 'saved' && (
            <span className="font-mono text-[10px] text-[var(--nt-accent)]">Saved {'\u2713'}</span>
          )}
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          {isListening && (
            <span className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] text-red-400 bg-red-500/10">
              <Circle className="h-2 w-2 fill-red-400 animate-pulse" />
              {interimTranscript || 'Listening\u2026'}
            </span>
          )}
          <button
            onClick={handleMicClick}
            disabled={!speechSupported}
            title={
              !speechSupported
                ? 'Voice input not supported in this browser'
                : isListening
                  ? 'Stop recording'
                  : 'Start voice input'
            }
            className={`flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] transition-all cursor-pointer ${
              isListening
                ? 'text-red-400 bg-red-500/10 hover:bg-red-500/20'
                : speechSupported
                  ? 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
                  : 'text-[var(--nt-text-muted)] opacity-40 cursor-not-allowed'
            }`}
          >
            <Mic className={`h-3 w-3 ${isListening ? 'animate-pulse' : ''}`} />
            <span className="hidden md:inline">{isListening ? 'Stop' : 'Voice'}</span>
          </button>
          <button title="Listen \u2014 coming soon" disabled className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] opacity-40 cursor-not-allowed">
            <Headphones className="h-3 w-3" /> <span className="hidden md:inline">Listen</span>
          </button>
          <button
            onClick={handlePinToggle}
            className={`flex items-center gap-1 rounded px-1.5 md:px-2 py-1 font-mono text-[10px] transition-all cursor-pointer ${
              isPinned
                ? 'text-[var(--nt-accent-warm)] bg-amber-500/10 hover:bg-amber-500/20'
                : 'text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)]'
            }`}
            title={isPinned ? 'Unpin note' : 'Pin note'}
          >
            {isPinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
            <span className="hidden md:inline">{isPinned ? 'Pinned' : 'Pin'}</span>
          </button>
          <SharePopover noteId={note._id} isPrivate={note.isPrivate} shareToken={note.shareToken} />
          <ExportDropdown getHTML={() => editor.getHTML()} title={title} />
          <button
            onClick={() => setShowQuizModal(true)}
            className="flex items-center gap-1 rounded px-1.5 md:px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-accent)] hover:bg-[var(--nt-accent)]/10 transition-all cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span className="hidden md:inline">Quiz</span>
          </button>
          <button
            onClick={() => setShowMediaBrowser(true)}
            className="flex items-center gap-1 rounded px-1.5 md:px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-accent)] hover:bg-[var(--nt-accent)]/10 transition-all cursor-pointer"
          >
            <Image className="h-3 w-3" />
            <span className="hidden md:inline">Media</span>
          </button>
          <input ref={pdfFileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handlePdfUpload} />
          <button
            onClick={() => pdfFileInputRef.current?.click()}
            disabled={uploadingPdf}
            className="flex items-center gap-1 rounded px-1.5 md:px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-accent)] hover:bg-[var(--nt-accent)]/10 transition-all cursor-pointer"
          >
            {uploadingPdf ? (
              <span className="h-3 w-3 animate-pulse rounded-full bg-[var(--nt-accent)]" />
            ) : (
              <FileText className="h-3 w-3" />
            )}
            <span className="hidden md:inline">{uploadingPdf ? 'Uploading' : 'Upload PDF'}</span>
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-1 rounded px-1.5 md:px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            <span className="hidden md:inline">Delete</span>
          </button>
        </div>
      </div>

      <div className="sticky top-2 md:top-4 z-10 mb-4">
        {persistentToolbar}
      </div>

      {coverImage ? (
        <div className="relative mb-6">
          <img src={coverImage} alt="Cover" className="w-full h-48 md:h-64 object-cover rounded-lg" />
          <button
            onClick={handleRemoveCover}
            className="absolute top-3 right-3 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 transition-all cursor-pointer"
            title="Remove cover image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => coverInputRef.current?.click()}
            disabled={uploadingCover}
            className="flex items-center gap-2 rounded-lg border border-dashed border-[var(--nt-border)] px-4 py-2 font-mono text-[11px] text-[var(--nt-text-muted)] hover:border-[var(--nt-accent)] hover:text-[var(--nt-accent)] transition-all cursor-pointer"
          >
            {uploadingCover ? 'Uploading\u2026' : '+ Add cover image'}
          </button>
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
        </div>
      )}

      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Untitled"
        className="w-full border-0 bg-transparent font-display text-2xl md:text-4xl text-[var(--nt-text-primary)] outline-none placeholder:text-[var(--nt-text-muted)]/40 mb-4 md:mb-6"
      />

      <EditorContent editor={editor} />

      <SlashMenu editor={editor} />

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
        <div className="flex items-center gap-0.5">
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
          {headingItems.map((item) => (
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
          {listItems.map((item) => (
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

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => { onDelete?.(); setShowDeleteDialog(false); toast('Note moved to trash', 'success'); }}
        title="Delete note"
        message="Are you sure you want to move this note to trash? It will be permanently deleted after 3 days."
        confirmLabel="Move to trash"
        variant="danger"
      />

      <Prompt
        open={showLinkPrompt}
        onClose={() => setShowLinkPrompt(false)}
        onSubmit={(url) => { handleLinkSubmit(url); setShowLinkPrompt(false); }}
        title="Insert link"
        placeholder="https://example.com"
        submitLabel="Insert"
      />

      <Prompt
        open={showMathPrompt}
        onClose={() => setShowMathPrompt(false)}
        onSubmit={(latex) => {
          if (mathMode === 'inline') {
            editor?.chain().focus().setMathInline(latex).run();
          } else {
            editor?.chain().focus().setMathDisplay(latex).run();
          }
          setShowMathPrompt(false);
        }}
        title={mathMode === 'inline' ? 'Inline math (LaTeX)' : 'Display math (LaTeX)'}
        placeholder="e.g. E = mc^2"
        submitLabel="Insert"
      />

      {showQuizModal && (
        <QuizModal
          noteContent={editor ? JSON.stringify(editor.getJSON()) : '{}'}
          onClose={() => setShowQuizModal(false)}
        />
      )}

      {showPdfModal && pdfResult && (
        <PdfViewerModal
          pdfUrl={pdfResult.url}
          filename={pdfResult.filename}
          summary={pdfResult.summary}
          rawText={pdfResult.rawText}
          isScanned={pdfResult.isScanned}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {showMediaBrowser && (
        <MediaBrowser
          noteId={note._id}
          onClose={() => setShowMediaBrowser(false)}
        />
      )}

      {uploadingPdf && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-[var(--nt-border)] bg-[var(--nt-surface)] px-8 py-10 shadow-2xl">
            <div className="relative flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--nt-border)] border-t-[var(--nt-accent)]" />
              <FileText className="absolute h-5 w-5 text-[var(--nt-accent)]" />
            </div>
            <div className="text-center">
              <p className="font-mono text-sm font-medium text-[var(--nt-text-primary)]">
                Processing PDF
              </p>
              <p className="font-mono text-[10px] text-[var(--nt-text-muted)] mt-1">
                Extracting text &amp; generating AI summary...
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
