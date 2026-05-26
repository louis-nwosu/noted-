import '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mathInline: {
      setMathInline: (latex: string) => ReturnType;
    };
    mathDisplay: {
      setMathDisplay: (latex: string) => ReturnType;
    };
  }
}
