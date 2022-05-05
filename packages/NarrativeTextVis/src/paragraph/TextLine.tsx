import React from 'react';
import { TextParagraphSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { P as StyledP } from '../styled';
import { Phrases } from '../phrases';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps, ThemeProps } from '../interface';

type TextLineProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = ThemeProps &
  WithPhraseProps<P> & {
    spec: TextParagraphSpec<P>;
  };

export function TextLine<P extends DefaultCustomPhraseGeneric>({
  spec,
  size = 'normal',
  ...phraseProps
}: TextLineProps<P>) {
  return (
    <StyledP size={size} className={cx(getPrefixCls('p'), spec.className)} style={spec.styles}>
      <Phrases<P> spec={spec.phrases} size={size} {...phraseProps} />
    </StyledP>
  );
}
