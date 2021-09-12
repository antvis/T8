import React from 'react';
import { IHeadline, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { CustomPhraseRender } from '../interface';

interface Props<P> {
  spec: IHeadline<P>;
  customPhraseRender?: CustomPhraseRender<P>;
}

export function Headline<P extends DefaultCustomPhraseGeneric>({ spec, customPhraseRender }: Props<P>) {
  if (spec && spec.type === 'headline') {
    return (
      <h1 className={getPrefixCls('headline')} style={spec.styles}>
        <Phrases spec={spec.phrases} customPhraseRender={customPhraseRender} />
      </h1>
    );
  }
  return null;
}

Headline.defaultProps = {
  customPhraseRender: null,
};
