import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import type { RawCommands } from '@tiptap/core'
import './types'
import { MathDisplayView } from '../../components/editor/MathDisplayView'

export const MathDisplay = Node.create({
  name: 'mathDisplay',

  group: 'block',

  atom: true,

  selectable: true,

  draggable: false,

  addAttributes() {
    return {
      latex: {
        default: '',
        parseHTML: (el) => (el as HTMLElement).getAttribute('data-latex'),
        renderHTML: (attrs) => ({ 'data-latex': attrs.latex }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-math-display]' }]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-math-display': '' }),
      node.attrs.latex,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathDisplayView)
  },

  addCommands() {
    return {
      setMathDisplay:
        (latex: string) =>
        ({ commands }: { commands: any }) =>
          commands.insertContent({
            type: this.name,
            attrs: { latex },
          }),
    } as Partial<RawCommands>
  },
})
