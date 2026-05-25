'use client';

import { useRef, useState, useEffect } from 'react';
import { Download, FileText, FileDown } from 'lucide-react';
import TurndownService from 'turndown';
import html2pdf from 'html2pdf.js';

interface ExportDropdownProps {
  getHTML: () => string;
  title: string;
}

export function ExportDropdown({ getHTML, title }: ExportDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleExportMarkdown = () => {
    const turndown = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });
    const body = turndown.turndown(getHTML());
    const md = `# ${title}\n\n${body}`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'untitled'}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const handleExportPDF = async () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 28px; margin-bottom: 16px;">${title}</h1>${getHTML()}`;
    wrapper.style.padding = '40px';
    wrapper.style.fontFamily = 'Lora, Georgia, serif';
    wrapper.style.fontSize = '16px';
    wrapper.style.lineHeight = '1.8';
    wrapper.style.color = '#1a1a1a';
    wrapper.style.maxWidth = '800px';
    wrapper.style.margin = '0 auto';
    wrapper.style.background = 'white';
    document.body.appendChild(wrapper);

    try {
      await html2pdf()
        .set({
          margin: [0.75, 0.75, 0.75, 0.75],
          filename: `${title || 'untitled'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        })
        .from(wrapper)
        .save();
    } finally {
      document.body.removeChild(wrapper);
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] text-[var(--nt-text-muted)] hover:text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-all cursor-pointer"
      >
        <Download className="h-3 w-3" /> Export
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] rounded-lg border border-[var(--nt-border)] bg-[var(--nt-surface)] py-1 shadow-xl">
          <button
            onClick={handleExportMarkdown}
            className="flex w-full items-center gap-2 px-3 py-2 font-mono text-xs text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-colors cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5 text-[var(--nt-text-muted)]" />
            Export as Markdown
          </button>
          <button
            onClick={handleExportPDF}
            className="flex w-full items-center gap-2 px-3 py-2 font-mono text-xs text-[var(--nt-text-primary)] hover:bg-[var(--nt-ink)] transition-colors cursor-pointer"
          >
            <FileDown className="h-3.5 w-3.5 text-[var(--nt-text-muted)]" />
            Export as PDF
          </button>
        </div>
      )}
    </div>
  );
}
