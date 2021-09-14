import React from 'react';
import { IHeadline, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';

type HeadlineProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IHeadline<P>;
};

export function Headline<P extends DefaultCustomPhraseGeneric>({ spec, ...phraseProps }: HeadlineProps<P>) {
  if (spec && spec.type === 'headline') {
    return (
      <h1 className={getPrefixCls('headline')} style={spec.styles}>
        <Phrases spec={spec.phrases} {...phraseProps} />
      </h1>
    );
  }
  return null;
}
