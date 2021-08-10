import React from 'react';
import { IParagraph } from '@antv/text-schema';
import { Phrases } from '../phrases';
import { getPrefixCls } from '../utils/getPrefixCls';
import { DetailChartDisplayType } from '../interface';

interface Props {
  spec: IParagraph;
  detailChartDisplayType: DetailChartDisplayType;
}

export const TextLine: React.FC<Props> = ({ spec, detailChartDisplayType }) => {
  if (spec.type === 'normal') {
    return (
      <p className={getPrefixCls('p')}>
        <Phrases spec={spec.phrases} detailChartDisplayType={detailChartDisplayType} />
      </p>
    );
  }

  return null;
};
