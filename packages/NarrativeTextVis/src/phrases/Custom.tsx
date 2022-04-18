import React from 'react';
import { isFunction } from 'lodash';
import { CustomPhraseSpec, DefaultCustomPhraseGeneric } from '@antv/narrative-text-schema';
import { CustomPhraseRender } from '../interface';

interface Props<P> {
  phrase: CustomPhraseSpec<P>;
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
