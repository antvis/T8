import React from 'react';
import { IParagraph, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { CustomPhraseRender } from '../interface';

interface Props<P> {
  spec: IParagraph<P>;
  customPhraseRender?: CustomPhraseRender<P>;
}

export function TextLine<P extends DefaultCustomPhraseGeneric>({ spec, customPhraseRender }: Props<P>) {
  if (spec.type === 'normal') {
    return (
      <p className={getPrefixCls('p')} style={spec.styles}>
        <Phrases<P> spec={spec.phrases} customPhraseRender={customPhraseRender} />
      </p>
    );
  }

  return null;
}

TextLine.defaultProps = {
  customPhraseRender: null,
};
