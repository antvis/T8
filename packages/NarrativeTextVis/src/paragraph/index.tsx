import React from 'react';
import {
  ParagraphSpec,
  DefaultCustomPhraseGeneric,
  DefaultCustomBlockStructureGeneric,
} from '@antv/narrative-text-schema';

import { Heading } from './Heading';
import { TextLine } from './TextLine';
import { Bullets } from './Bullets';
import { WithPhraseProps, WithCustomBlockElement, ThemeProps } from '../interface';
import { isHeadingParagraph, isTextParagraph, isBulletParagraph } from './helpers';

type ParagraphProps<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
> = ThemeProps &
  WithPhraseProps<P> &
  WithCustomBlockElement<S> & {
    spec: ParagraphSpec<S, P>;
  };

export function Paragraph<
  S extends DefaultCustomBlockStructureGeneric = null,
  P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric,
>({ spec, customBlockElementRender, size = 'normal', ...phraseProps }: ParagraphProps<S, P>) {
  if ('customType' in spec && spec.customType && customBlockElementRender) {
    return <>{customBlockElementRender(spec)}</>;
  }
  if (isHeadingParagraph(spec)) {
    return <Heading<P> spec={spec} {...phraseProps} />;
  }
  if (isTextParagraph(spec)) {
    return <TextLine<P> spec={spec} size={size} {...phraseProps} />;
  }
  if (isBulletParagraph(spec)) {
    return <Bullets<P> spec={spec} size={size} {...phraseProps} />;
  }
  return null;
}

export { Headline } from './Headline';
