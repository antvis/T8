import React from 'react';
import { IParagraph } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';

interface Props {
  spec: IParagraph;
}

export const TextLine: React.FC<Props> = ({ spec }) => {
  if (spec.type === 'normal') {
    return (
      <p className={getPrefixCls('p')}>
        <Phrases spec={spec.phrases} />
      </p>
    );
  }

  return null;
};
