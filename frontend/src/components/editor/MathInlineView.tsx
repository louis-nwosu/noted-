'use client';

import { useEffect, useRef } from 'react';
import { NodeViewProps } from '@tiptap/react';
import katex from 'katex';

export function MathInlineView({ node, selected }: NodeViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const latex = node.attrs.latex as string;

  useEffect(() => {
    if (ref.current && latex) {
      try {
        katex.render(latex, ref.current, { displayMode: false, throwOnError: false });
      } catch {
        ref.current.textContent = latex;
      }
    }
  }, [latex]);

  return (
    <span
      ref={ref}
      contentEditable={false}
      className={`inline-block px-1 mx-0.5 rounded cursor-default ${
        selected ? 'ring-2 ring-[var(--nt-accent)]' : ''
      }`}
    />
  );
}
