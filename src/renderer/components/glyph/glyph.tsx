import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import './glyph.scss';

export const GLYPHS = {
  dot: '•'
} as const;

export type GlyphProps = {
  id: keyof typeof GLYPHS
};

const Glyph: Component<GlyphProps> = () => {
  const component = new forgo.Component<GlyphProps>({
    render(props) {
      return (
        <span class='Glyph' aria-hidden='true'>
          {GLYPHS[props.id]}
        </span>
      );
    }
  });

  return component;
};

export default Glyph;
