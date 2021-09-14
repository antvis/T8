import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';

type TextLineProps<P extends DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IParagraph<P>;
};

export function TextLine<P extends DefaultCustomPhraseGeneric>({ spec, ...phraseProps }: TextLineProps<P>) {
  if (spec.type === 'normal') {
    return (
      <p className={getPrefixCls('p')} style={spec.styles}>
        <Phrases<P> spec={spec.phrases} {...phraseProps} />
      </p>
    );
  }

  return null;
}
