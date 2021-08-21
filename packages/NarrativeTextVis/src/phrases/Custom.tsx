import React from 'react';
import { ICustomPhrase, DefaultCustomPhraseGeneric } from '@antv/text-schema';
import { CustomPhraseRender } from '../interface';
import { isFunction } from '../utils/type';

interface Props<P> {
  phrase: ICustomPhrase<P>;
  customPhraseRender?: CustomPhraseRender<P>;
}

export function Custom<P extends DefaultCustomPhraseGeneric>({ phrase, customPhraseRender }: Props<P>) {
  if (!isFunction(customPhraseRender)) {
    return phrase?.styles ? <span style={phrase?.styles}>{phrase?.value}</span> : <>{phrase?.value}</>;
  }
  return <>{customPhraseRender(phrase)}</>;
}

Custom.defaultProps = {
  customPhraseRender: null,
};
