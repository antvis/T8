import React from 'react';
import {
  ParagraphSpec,
  DefaultCustomPhraseGeneric,
  DefaultCustomBlockStructureGeneric,
} from '@antv/narrative-text-schema';

import { Heading } from './Heading';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { WithPhraseProps, WithCustomBlockElement } from '../interface';
import { isHeadingParagraph, isTextParagraph, isBulletParagraph } from './helpers';

type ParagraphProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: ParagraphSpec<S, P>;
  };

export function Paragraph<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, ...phraseProps }: ParagraphProps<S, P>) {
  if ('customType' in spec && spec.customType && customBlockElementRender) {
    return <>{customBlockElementRender(spec)}</>;
  }
  if (isHeadingParagraph(spec)) {
    return <Heading<P> spec={spec} {...phraseProps} />;
  }
  if (isTextParagraph(spec)) {
    return <TextLine<P> spec={spec} {...phraseProps} />;
  }
  if (isBulletParagraph(spec)) {
    return <Bullets<P> spec={spec} {...phraseProps} />;
  }
  return null;
}

export { Headline } from './Headline';
