import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { Phrases } from '../phrases';
import { classnames as cx } from '../utils/classnames';
import { getPrefixCls } from '../utils/getPrefixCls';
import { WithPhraseProps } from '../interface';

type TextLineProps<P extends DefaultCustomPhraseGeneric = DefaultCustomPhraseGeneric> = WithPhraseProps<P> & {
  spec: IParagraph<null, P>;
};

export function TextLine<P extends DefaultCustomPhraseGeneric>({ spec, ...phraseProps }: TextLineProps<P>) {
  if (spec.type === 'normal') {
    return (
      <p className={cx(getPrefixCls('p'), spec.className)} style={spec.styles}>
        <Phrases<P> spec={spec.phrases} {...phraseProps} />
      </p>
    );
  }
  return null;
}
