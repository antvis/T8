import React from 'react';
import { HeadlineSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { Headline as StyledHeadline } from '../styled';
import { Phrases } from '../phrases';
import { classnames } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';

type HeadlineProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: HeadlineSpec<P>;
};

export function Headline<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric>({
  spec,
  ...phraseProps
}: HeadlineProps<P>) {
  return (
    <StyledHeadline className={classnames(getPrefixCls('headline'), spec.className)} style={spec.styles}>
      <Phrases spec={spec.phrases} {...phraseProps} />
    </StyledHeadline>
  );
}
