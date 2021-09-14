import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { WithPhraseProps } from '../interface';

type ParagraphProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IParagraph<P>;
};

export function Paragraph<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric>({
  spec,
  ...phraseProps
}: ParagraphProps<P>) {
  switch (spec.type) {
    case 'normal':
      return <TextLine<P> spec={spec} {...phraseProps} />;
    case 'bullets':
      return <Bullets<P> spec={spec} {...phraseProps} />;
    default:
      return null;
  }
}

export { Headline } from './Headline';
