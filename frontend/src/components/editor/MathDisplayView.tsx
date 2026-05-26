'use client';

import { useEffect, useRef } from 'react';
import { NodeViewProps } from '@tiptap/react';
import katex from 'katex';

export function MathDisplayView({ node, selected }: NodeViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const latex = node.attrs.latex as string;

  useEffect(() => {
    if (ref.current && latex) {
      try {
        katex.render(latex, ref.current, { displayMode: true, throwOnError: false });
      } catch {
        ref.current.textContent = latex;
      }
    }
  }, [latex]);

  return (
    <div
      ref={ref}
      contentEditable={false}
      className={`my-2 py-2 overflow-x-auto cursor-default ${
        selected ? 'ring-2 ring-[var(--nt-accent)] rounded' : ''
      }`}
    />
  );
}
