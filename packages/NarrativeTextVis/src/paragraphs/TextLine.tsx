import React from 'react';
import { IParagraph } from '@antv/text-schema';
import { Phrase } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props {
  spec: IParagraph;
}

export const TextLine: React.FC<Props> = ({ spec }) => {
  if (spec.type === 'text') {
    return (
      <p className={getPrefixCls('p')}>
        <Phrase spec={spec.phrases} />
      </p>
    );
  }

  return null;
};
