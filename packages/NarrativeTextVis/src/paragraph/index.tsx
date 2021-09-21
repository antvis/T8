import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric, DefaultCustomBlockStructureGeneric } from '@antv/text-schema';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { WithPhraseProps, WithCustomBlockElement } from '../interface';

type ParagraphProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: IParagraph<S, P>;
  };

export function Paragraph<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, ...phraseProps }: ParagraphProps<S, P>) {
  if ('customType' in spec && spec.customType && customBlockElementRender) {
    return <>{customBlockElementRender(spec)}</>;
  }
  switch (spec?.type) {
    case 'normal':
      return <TextLine<P> spec={spec} {...phraseProps} />;
    case 'bullets':
      return <Bullets<P> spec={spec} {...phraseProps} />;
    default:
      return null;
  }
}

export { Headline } from './Headline';
